# MCP Configuration

This directory contains documentation and examples for MCP integrations.

## Quick Start

```bash
# 1. Add the Google Workspace MCP server to Claude Code
claude mcp add google-workspace \
  -e GOOGLE_OAUTH_CLIENT_ID=your-client-id \
  -e GOOGLE_OAUTH_CLIENT_SECRET=your-client-secret \
  -- uvx workspace-mcp

# 2. Restart Claude Code, then add your Google account:
# "Add my Google account you@example.com"
```

Get OAuth credentials from: https://console.cloud.google.com/apis/credentials

## Where Credentials Live

| What | Location | Committed? |
|------|----------|------------|
| OAuth app secrets | Claude Code MCP config | No |
| OAuth tokens | `~/.google-mcp-accounts/<email>.json` | No |

## Current Setup

| Service | MCP Server | Install | Transport |
|---------|------------|---------|-----------|
| Google Workspace | [taylorwilsdon/google_workspace_mcp](https://github.com/taylorwilsdon/google_workspace_mcp) | `uvx workspace-mcp` | stdio |
| Trello | [delorenj/mcp-server-trello](https://github.com/delorenj/mcp-server-trello) | `bunx @delorenj/mcp-server-trello` | stdio |

**Google Workspace Features**: Gmail, Drive, Calendar, Docs, Sheets, Slides, Forms, Tasks, Chat. Multi-account OAuth 2.1.

**Trello Features**: Boards, Lists, Cards, Checklists, Comments, Attachments. Multi-board support with dynamic switching.

## Multi-Account Usage

One OAuth app supports multiple Google accounts:

```
"Add my Google account work@company.com"
"Add my Google account personal@gmail.com"
```

Account selection:
- **Explicit**: "Check my work@company.com calendar"
- **Project default**: Set in project's `_STATE.md` Integrations section
- **Global default**: Set in `GLOBAL_STATE.md` Default Integrations

## Files

| File | Purpose |
|------|---------|
| `google-credentials.example.json` | Reference for Google OAuth app structure |
| `trello.example.json` | Reference for Trello API credentials |

## Resources

- [Google Workspace Setup](../../docs/mcp/google-workspace.md) - Full setup guide
- [Trello Setup](../../docs/mcp/trello.md) - Full setup guide
- [MCP Architecture](../../docs/mcp/ARCHITECTURE.md) - How it all fits together
