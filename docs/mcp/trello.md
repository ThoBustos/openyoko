# Trello MCP Integration

Setup guide for Trello integration with OpenYoko via MCP.

## Summary Table

| Field | Value |
|-------|-------|
| **Server** | [delorenj/mcp-server-trello](https://github.com/delorenj/mcp-server-trello) |
| **Stars** | 232 |
| **Transport** | stdio (no port needed) |
| **Runtime** | Bun (recommended) or Node.js |
| **Install** | `bunx @delorenj/mcp-server-trello` |
| **Auth** | API Key + Token |
| **Multi-board** | Yes (dynamic switching) |
| **Rate Limits** | 300 req/10s per key, 100 req/10s per token |

---

## Available Tools

| Category | Tools |
|----------|-------|
| **Boards** | `list_boards`, `set_active_board`, `get_active_board_info` |
| **Workspaces** | `list_workspaces`, `set_active_workspace` |
| **Lists** | `get_lists` |
| **Cards** | `get_card`, `get_cards_by_list_id`, `add_card_to_list` |
| **Checklists** | `get_checklist_items`, `add_checklist_item`, `get_acceptance_criteria` |
| **Comments** | `add_comment`, `update_comment`, `delete_comment`, `get_comments` |
| **Activity** | `get_recent_activity` |
| **Attachments** | `add_url_attachment` |

---

## Implementation Plan

### Phase 1: Prerequisites (5 min)

| Step | Action | Command/Link |
|------|--------|--------------|
| 1.1 | Verify Bun installed | `bun --version` |
| 1.2 | Install Bun if needed | `brew install oven-sh/bun/bun` |

### Phase 2: Trello API Credentials (10 min)

| Step | Action | Details |
|------|--------|---------|
| 2.1 | Get API Key | Visit: https://trello.com/app-key |
| 2.2 | Generate Token | Use authorization URL (see below) |
| 2.3 | Store securely | Add to `~/.config/personal-agent-os/trello/` |

**Token Generation URL:**
```
https://trello.com/1/authorize?expiration=never&name=OpenYoko&scope=read,write&response_type=token&key=YOUR_API_KEY
```

> **Security Note:** For production, consider `expiration=30days` instead of `never`.

### Phase 3: MCP Server Installation (5 min)

| Step | Action | Command |
|------|--------|---------|
| 3.1 | Add to Claude Code | See config below |
| 3.2 | Restart Claude Code | `claude` (new session) |
| 3.3 | Verify connection | `/mcp` |

**Claude Code Configuration:**

```bash
claude mcp add trello \
  -e TRELLO_API_KEY=your-api-key \
  -e TRELLO_TOKEN=your-token \
  -- bunx @delorenj/mcp-server-trello
```

Or manually add to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "trello": {
      "command": "bunx",
      "args": ["@delorenj/mcp-server-trello"],
      "env": {
        "TRELLO_API_KEY": "your-api-key",
        "TRELLO_TOKEN": "your-token"
      }
    }
  }
}
```

### Phase 4: Verification (5 min)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 4.1 | List boards | "List my Trello boards" → shows boards |
| 4.2 | Set active board | "Set active board to [name]" → confirmed |
| 4.3 | Get cards | "Show cards in [list]" → shows cards |

### Phase 5: Documentation (5 min)

| Step | Action | File |
|------|--------|------|
| 5.1 | Update MCP README | `config/mcp/README.md` |
| 5.2 | Add credentials example | `config/mcp/trello.example.json` |

---

## Credentials Storage

Following OpenYoko pattern:

```
~/.config/personal-agent-os/
└── trello/
    └── credentials.json    # API key + token (you create)

~/.trello-mcp/
└── config.json             # Active board/workspace (server creates)
```

**credentials.json format:**
```json
{
  "api_key": "your-api-key",
  "token": "your-token"
}
```

---

## Port & Resource Notes

| Concern | Status |
|---------|--------|
| **Port usage** | None - uses stdio transport |
| **Memory** | Minimal (~50MB) |
| **Network** | Only Trello API calls |
| **Persistence** | Board selection persists in `~/.trello-mcp/config.json` |

---

## Timeline

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Prerequisites | 5 min | 5 min |
| API Credentials | 10 min | 15 min |
| Installation | 5 min | 20 min |
| Verification | 5 min | 25 min |
| Documentation | 5 min | **30 min total** |

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| "Invalid API key" | Wrong key | Re-copy from trello.com/app-key |
| "Invalid token" | Token expired/wrong | Regenerate with auth URL |
| Server not in `/mcp` | Config syntax | Check JSON validity |
| Rate limited | Too many requests | Wait 10 seconds |

---

## Resources

- [GitHub: delorenj/mcp-server-trello](https://github.com/delorenj/mcp-server-trello)
- [Trello API Key](https://trello.com/app-key)
- [Trello API Docs](https://developer.atlassian.com/cloud/trello/)
