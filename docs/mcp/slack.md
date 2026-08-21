# Slack MCP Integration

Connect Slack to Claude Code for message search, channel history, DMs, and workspace-wide context using **korotovsky/slack-mcp-server**.

## Quick Setup Checklist

- **Time:** ~5 minutes
- **Risk Level:** Low (official bot token, scoped permissions)
- **Prerequisites:** Slack account with permission to create an app, Node.js (for `npx`)
- **Skills Required:** Basic terminal usage

## Why Slack MCP?

**Use Cases:**
- Search Slack history when working on projects
- Surface unread threads during `/scan`
- Include Slack conversations in weekly reviews
- Capture decisions from Slack discussions
- Find context from past conversations

**Why korotovsky/slack-mcp-server?**
- Most feature-complete Slack MCP available
- DMs and group DMs support (unlike the official deprecated server)
- Supports a real bot token, so it never expires like a scraped browser session
- Smart history fetch by date or count
- Actively maintained, good documentation
- Ships as a single npm binary, no Go toolchain or Docker needed

---

## MCP Server Options

| Server | Type | Recommendation |
|--------|------|----------------|
| **korotovsky/slack-mcp-server** | Local (npm binary) | ✅ **Recommended** |
| @modelcontextprotocol/server-slack | Local (npm) | ❌ Deprecated, unmaintained |
| Official Slack MCP | Remote | ⏳ Coming Summer 2025 |
| AVIMBU/slack-mcp-server | Local | ❌ Less features |

### Decision: korotovsky/slack-mcp-server, bot token auth

**Rationale:**
- Full feature set (DMs, search, threads)
- A real Slack app with a bot token (`xoxb-`) never expires and doesn't depend on a live browser session
- Distributed on npm as a prebuilt binary, `npx -y slack-mcp-server` just works, no Go install, no Docker
- This is the same setup already running in production for the Yoko agent

**Trade-offs:**
- Requires creating a Slack app once (about 5 minutes, see below)
- A workspace admin may need to approve the app install

---

## Setup Guide

### Step 1: Create a Slack App and Bot Token

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and create a new app
2. Under **OAuth & Permissions**, add these Bot Token Scopes:
   - `channels:history`
   - `channels:read`
   - `groups:history`
   - `groups:read`
   - `im:history`
   - `im:read`
   - `mpim:history`
   - `mpim:read`
   - `search:read`
   - `users:read`
3. Install the app to your workspace
4. Copy the **Bot User OAuth Token** (`xoxb-...`)

### Step 2: Add the MCP Server to Claude Code

```bash
claude mcp add slack \
  -e SLACK_MCP_XOXB_TOKEN=xoxb-your-bot-token \
  -e SLACK_MCP_ADD_MESSAGE_TOOL=false \
  -- npx -y slack-mcp-server
```

This stores the token in Claude Code's own MCP config (`~/.claude.json`, user scope), not in this repo. `npx` downloads the prebuilt binary on first run and caches it.

### Step 3: Test Connection

```bash
# Check it's connected:
/mcp

# Test with:
"List my Slack channels"
"Search Slack for 'deployment'"
```

---

## Available Tools

| Tool | Function | Default |
|------|----------|---------|
| `conversations_history` | Get messages from channel/DM | ✅ Enabled |
| `conversations_replies` | Get thread replies | ✅ Enabled |
| `conversations_search_messages` | Search workspace-wide | ✅ Enabled |
| `channels_list` | List all channels (public, private, DMs) | ✅ Enabled |
| `conversations_add_message` | Post messages | ❌ Disabled |

### Enabling Message Posting (Optional)

```bash
claude mcp add slack \
  -e SLACK_MCP_XOXB_TOKEN=xoxb-your-bot-token \
  -e SLACK_MCP_ADD_MESSAGE_TOOL=true \
  -- npx -y slack-mcp-server
```

`SLACK_MCP_ADD_MESSAGE_TOOL` also accepts a comma-separated channel ID list instead of `true`, to restrict posting to specific channels.

**Warning:** Consider carefully before enabling. Read-only is safer for personal use.

---

## Example Prompts

| Goal | Say This |
|------|----------|
| List channels | "List my Slack channels" |
| Search messages | "Search Slack for 'api deployment'" |
| Channel history | "Show recent messages in #engineering" |
| DM history | "Get my DMs with @alice from last week" |
| Thread | "Show the full thread for this message" |
| Context | "What did we discuss about X in Slack?" |

### With Filters

```
Search Slack for messages:
- From: @alice
- In: #platform
- Contains: "deployment"
- After: 2026-01-20
```

---

## Integration with Personal Agent OS

### Skill Integration

**`/scan` Enhancement:**
```markdown
## Slack Pulse
- [ ] Check for unread mentions
- [ ] Surface important threads from last 24h
- [ ] Flag discussions needing response
```

**`/weekly` Enhancement:**
```markdown
## Communication Review
- Key Slack discussions this week
- Decisions made in Slack (capture to vault)
- Threads to follow up on
```

**`/unload` Enhancement:**
```markdown
## Capture from Slack
- Important decisions from today's Slack
- Context to add to project notes
```

### Project Integration

In project `_STATE.md`:

```markdown
## Integrations

| Integration | Account/Workspace | Purpose |
|-------------|-------------------|---------|
| Slack | [workspace-name] | Team communication, decisions |

## Slack Channels
- #project-name - Main project channel
- #project-name-dev - Technical discussions
```

### Workflow Examples

**1. Context Retrieval:**
- Working on a bug → "Search Slack for when we last discussed this issue"
- Captures relevant context without leaving Claude

**2. Decision Capture:**
- "What did we decide about X in Slack last week?"
- Claude summarizes → you confirm → log to vault Decisions/

**3. Weekly Review:**
- "Summarize key Slack threads I was mentioned in this week"
- Include highlights in weekly reflection

---

## Troubleshooting

### "Invalid auth" or Authentication Error

**Cause:** Bot token revoked, or the app was reinstalled with a new token

**Fix:**
1. Get the current token from **OAuth & Permissions** in your Slack app settings
2. Update it: `claude mcp remove slack -s user && claude mcp add slack -e SLACK_MCP_XOXB_TOKEN=xoxb-new-token -e SLACK_MCP_ADD_MESSAGE_TOOL=false -- npx -y slack-mcp-server`
3. Restart Claude Code

### Changed the config (token, `SLACK_MCP_ADD_MESSAGE_TOOL`, etc.) but nothing happened

**Cause:** `claude mcp add`/`remove` only edits `~/.claude.json`. The MCP server already running for this session was spawned once at session start with the old env baked in, editing the file doesn't touch that live process. `claude mcp get slack` reads the file, so it looks updated even though the running process isn't.

**Fix:** Run `/mcp`, select `slack`, and reconnect, that respawns just this one server with the new env. A full Claude Code restart also works but isn't required.

### "Channel not found"

**Cause:** Using channel name instead of ID, or the bot hasn't been added to that channel

**Fix:**
1. Invite the bot to the channel in Slack (`/invite @your-bot-name`)
2. Use the channel ID (C1234...) instead of the name if the lookup still fails
3. Verify the bot has the right scopes for that conversation type (channel vs. group vs. DM)

### Slow Startup

**Cause:** `npx` re-resolving the package each time

**Fix:** This is normal on the first run per cache expiry; `npx` caches the binary afterward and subsequent starts are fast.

### Server Not Appearing in `/mcp`

**Cause:** Config error, or Node/npx not on PATH

**Fix:**
1. Verify Node is installed: `npx --version`
2. Check the server status: `claude mcp get slack`
3. Check Claude Code logs for errors

---

## Security

### Token Safety

| Asset | Location | Committed? |
|-------|----------|------------|
| Bot token | Claude Code MCP config (`~/.claude.json`, user scope) | No |
| Example config | `config/mcp/slack.example.json` | Yes, placeholder only |

### Best Practices

1. **Never commit tokens.** `config/mcp/*.json` is gitignored except `*.example.json`. Only the example (placeholder) files are committed.
2. **Scope the bot narrowly.** Only grant the OAuth scopes actually needed (see Step 1).
3. **Keep write disabled** unless you specifically need Claude to post. Read-only is safer for personal use.
4. **Restrict channels** if enabling write, via `SLACK_MCP_ADD_MESSAGE_TOOL=C12345,C67890` instead of `true`.

### Token Scope (Bot Token)

**What it can access:**
- ✅ Channels the bot has been invited to
- ✅ DMs and group DMs the bot is part of
- ✅ Search across workspace (with `search:read`)
- ✅ Thread history
- ❌ Channels the bot hasn't joined
- ❌ Admin settings
- ❌ Other users' private DMs the bot isn't part of

### Revoking Access

Revoke in Slack workspace settings → **Apps** → find the app → **Remove App**, or rotate the bot token from **OAuth & Permissions** and update the MCP config.

---

## Configuration Reference

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SLACK_MCP_XOXB_TOKEN` | Bot token (`xoxb-...`) | Yes, for bot-token auth (recommended) |
| `SLACK_MCP_XOXC_TOKEN` | Browser session token (`xoxc-...`) | Alternative: stealth mode, no app needed, expires periodically |
| `SLACK_MCP_XOXD_TOKEN` | Browser session cookie (`xoxd-...`) | Alternative: stealth mode, paired with `XOXC_TOKEN` |
| `SLACK_MCP_ADD_MESSAGE_TOOL` | Enable posting: `true`, `false`, or a comma-separated channel ID list | No (default: `false`) |
| `SLACK_MCP_HOST` / `SLACK_MCP_PORT` | Bind address/port, only relevant for `http`/`sse` transport | No |

Stealth mode (`XOXC`/`XOXD`) works without creating a Slack app, but the tokens come from your live browser session and expire every couple of weeks. Bot-token mode is the recommended default for this repo and is what the production Yoko agent uses.

### Full Config Example

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "slack-mcp-server"],
      "env": {
        "SLACK_MCP_XOXB_TOKEN": "xoxb-...",
        "SLACK_MCP_ADD_MESSAGE_TOOL": "false"
      }
    }
  }
}
```

---

## Resources

### Official
- [korotovsky/slack-mcp-server (GitHub)](https://github.com/korotovsky/slack-mcp-server)
- [Documentation](https://github.com/korotovsky/slack-mcp-server/tree/master/docs)
- [Slack API](https://api.slack.com/)

### Personal Agent OS
- [MCP Integration Overview](README.md)
- [Secrets Management](secrets-management.md)

---

## Quick Reference

### Installation

```bash
# 1. Create a Slack app and bot token (see Step 1 above)

# 2. Add to Claude Code
claude mcp add slack \
  -e SLACK_MCP_XOXB_TOKEN=xoxb-your-bot-token \
  -e SLACK_MCP_ADD_MESSAGE_TOOL=false \
  -- npx -y slack-mcp-server

# 3. Verify
/mcp
```

### Common Operations

```bash
# List channels
"List my Slack channels"

# Search
"Search Slack for 'deployment issue'"
"Search Slack for messages from @alice about API"

# History
"Show last 20 messages in #engineering"
"Get my DMs with @alice"

# Threads
"Show the full thread for this message"
"Get all replies to the deployment announcement"
```

---

**Setup Status:** Live, matches the production Yoko agent setup
**Last Updated:** 2026-08-21
**Maintained By:** Personal Agent OS
