# Hermes Agent Setup

Yoko runs in any agent harness, not just one. This guide covers Hermes, an open source agent by Nous Research, as the harness for running Yoko remotely and unattended, on your own server.

Use this when you want Yoko reachable from WhatsApp or Slack, or when you want cron jobs and automation running even with your laptop closed. For local, interactive work, run Yoko through Claude Code or Codex instead. Same vault, same conventions, different harness.

You get an agent that reads your vault, runs your daily cadence, and answers you on WhatsApp or Slack. It runs on a machine you control, not a third party's cloud.

## What You Need

- A Linux server (a small VPS works fine)
- SSH access to that server
- A GitHub account
- 30 to 60 minutes

## Step 1: Bootstrap the Server With Dotfiles

Use [ThoBustos/dotfiles](https://github.com/ThoBustos/dotfiles), a chezmoi-based dotfiles repo. It installs Node, Docker, and Hermes itself, and hardens the server (firewall rules, SSH config, fail2ban).

Install chezmoi and apply the dotfiles:

```bash
sh -c "$(curl -fsLS get.chezmoi.io)" -- -b /usr/local/bin

/usr/local/bin/chezmoi init \
  --promptString "email=you@example.com" \
  --promptBool "Is this an Ubuntu Desktop (not a remote VPS)=false" \
  --promptBool "Will you code directly on this VPS (install tmux/nvim/zed/ghostty)=false" \
  --promptBool "Run the security/service bootstrap (hardening, Tailscale, Docker, Hermes)=true"

chezmoi apply --dry-run --verbose
chezmoi apply --force
```

Run the dry run first, always. Read the diff before you apply it to a machine you care about.

The hardening step disables root SSH login. Before you close your session, open a second connection and confirm you can still log in as the new `deploy` user.

## Step 2: Run the Hermes Setup Wizard

```bash
hermes setup
```

Choices that matter:

- **Model provider**: pick API key, not Claude Pro/Max OAuth. OAuth on a headless server violates most providers' terms and can drain the wrong usage pool.
- **Terminal backend**: Docker. It isolates the agent's shell and file access from the host.
- **Egress credential firewall**: enable it. It keeps your real API keys out of the sandbox the agent runs in.

## Step 3: Choose Docker or Local

Hermes can run your commands in a Docker sandbox or directly on the host.

| | Docker | Local |
|---|---|---|
| Isolation | Strong. A compromised agent can't touch host files or secrets directly. | None. The agent has full access to the host. |
| Setup | More steps. See below for the credential and egress patterns you need. | Simple. Things just work. |
| Best for | Multiple people can reach the agent, or you want a real security boundary. | Single trusted user, you want zero friction. |

Pick Docker unless you have a specific reason not to. The rest of this guide assumes Docker.

## Step 4: Give the Agent Git Access

The agent's shell runs inside a container, and the container's home directory does not persist across restarts. Two things follow from that.

Store credentials in the persistent volume, not the home directory:

```bash
CONTAINER=$(docker ps --filter "name=hermes-" --format "{{.Names}}" | head -1)
TOKEN=$(grep '^GITHUB_TOKEN=' ~/.hermes/.env | cut -d= -f2-)

docker exec -u root "$CONTAINER" git config --global \
  credential.helper 'store --file=/workspace/.git-credentials'
docker exec -u root "$CONTAINER" bash -c \
  "echo 'https://YOUR_GITHUB_USERNAME:${TOKEN}@github.com' > /workspace/.git-credentials"
```

`/workspace` is the one path Hermes guarantees will survive a container restart. Anything written to the home directory is gone the next time the container restarts.

Use a fine-grained GitHub token, scoped to only the repos the agent needs. Not your main personal access token.

## Step 5: Set One Container for Every Channel

By default, Hermes starts a new sandbox container for every session. That means a file the agent writes in a WhatsApp conversation is invisible in a Slack conversation five minutes later.

Fix it in `~/.hermes/config.yaml`:

```yaml
terminal:
  backend: docker
  container_persistent: true
  docker_persist_across_processes: true
```

Restart the gateway after this change:

```bash
docker stop $(docker ps --filter "name=hermes-" -q)
docker rm $(docker ps --filter "name=hermes-" -q)
hermes gateway restart --all
```

## Step 6: Connect a Messaging Platform

WhatsApp needs no app registration. Run the pairing flow and scan the QR code:

```bash
hermes whatsapp
```

Slack needs an app manifest. Generate one and paste it into a new Slack app:

```bash
hermes slack manifest --agent-view --write
```

Set `SLACK_ALLOWED_USERS` to your own Slack member ID in `~/.hermes/.env`. This is the actual access control. Without it, Hermes denies everyone by default, which is correct, but leaving it unset makes the agent look broken to you.

**Known bug, check before you rely on it**: Slack slash commands do not currently pass through the `SLACK_ALLOWED_USERS` check. Anyone in your workspace can run any registered slash command against your bot. Until this is fixed upstream, remove the `slash_commands` section from your app manifest and rely on direct messages and mentions instead. Those are properly gated.

## Step 7: Set Up Cron Jobs Correctly

Cron jobs run one of two ways, and mixing them up wastes hours of debugging.

**Script-only jobs** (`--no-agent`) run on the host, not in the sandbox. Use these for anything that just needs a shell command on a schedule, like syncing your vault:

```bash
hermes cron create "every 5m" \
  --no-agent --script vault-sync.sh --name "vault-sync"
```

**Agent-mode jobs** run in the same Docker sandbox as a chat session. Use these when the task needs reasoning, not just a fixed command:

```bash
hermes cron create "0 0 * * *" \
  "Summarize what happened in the vault today" \
  --deliver whatsapp:YOUR_NUMBER --name "daily-summary"
```

One trap: a cron job's schedule is interpreted using the server's system timezone. If your server runs UTC and you want a job to fire at a specific local time, either set the server's timezone with `timedatectl set-timezone`, or do the math yourself and expect to redo it twice a year for daylight saving.

## Security Checklist

Work through this before you consider the setup done.

- [ ] `SLACK_ALLOWED_USERS` and `WHATSAPP_ALLOWED_USERS` are set to your own ID only
- [ ] Slack slash commands are removed from the app manifest (see Step 6)
- [ ] GitHub tokens are fine-grained, scoped to specific repos, not your main personal token
- [ ] `~/.hermes/.env` is `chmod 600`
- [ ] Any cron job that can send messages or run shell commands goes through `approvals.mode: manual`, not `off`
- [ ] Channel content the agent reads is treated as untrusted input, same as a webpage. Anyone who can post in a channel your agent is in can plant instructions in that content.

## Common Failures and What They Actually Mean

**Agent says "I don't have that tool" when you expect it to send a message.** It's telling the truth. Hermes deliberately does not give the agent an autonomous message-sending tool, on any platform. This is intentional, not a bug. It stops a prompt-injected agent from messaging people on your behalf. If you need this capability, add a dedicated MCP server for it and gate it behind explicit approval.

**A shell command works when you run it yourself but fails with "command not found" when the agent runs it.** The agent's shell runs inside the Docker sandbox. Your own SSH session runs on the host. They see different filesystems.

**An outbound API call hangs for a long time and then fails with no error on either side.** Check the egress proxy's `upstream_deny_cidrs` list in `~/.hermes/proxy/proxy.yaml`. If you added a new service that lives on a private IP range, it may be silently blocked as a security precaution.

**An outbound API call fails fast with a 403.** The egress proxy only allows a specific list of domains. Add the new domain to the allowlist in `~/.hermes/proxy/proxy.yaml` and run `hermes egress reload`. No restart needed for allowlist changes. Rotated credentials do need a restart: `hermes egress restart`.

## Where to Go From Here

- [`CADENCES.md`](CADENCES.md): the daily, weekly, and monthly rituals the agent runs
- [`SKILLS_ARCHITECTURE.md`](SKILLS_ARCHITECTURE.md): how to write new skills for the agent
- [ThoBustos/dotfiles](https://github.com/ThoBustos/dotfiles): the server bootstrap this guide depends on
