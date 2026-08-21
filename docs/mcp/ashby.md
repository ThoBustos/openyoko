# Ashby MCP Integration

Connect your Ashby ATS to Claude Code for candidate lookups, pipeline context, and interview prep, using Ashby's own first-party MCP server (Open Beta).

## Summary Table

| Field | Value |
|-------|-------|
| **Server** | Ashby MCP Server (first-party, built by Ashby) |
| **Endpoint** | `https://mcp.ashbyhq.com/mcp/v1` |
| **Transport** | HTTP |
| **Auth** | Per-user OAuth, mirrors your existing Ashby permissions |
| **Availability** | Open Beta, all Ashby plans |
| **Credentials to store** | None, OAuth tokens are managed by Claude Code itself |

## Prerequisites

An organization admin must enable it first: **Admin → Organization Setup → Opt-In Features → MCP Server**. Without this, the OAuth step below fails.

## Installation

```bash
claude mcp add --transport http ashby https://mcp.ashbyhq.com/mcp/v1
```

Then run `/mcp`, select `ashby`, and complete the OAuth login/approval flow. No API key or `.env` entry is needed, this is OAuth, not a static token.

## Available Tools

| Category | Tools |
|----------|-------|
| **Read** | `get_candidate`, `get_upcoming_interviews`, `get_interview_details`, `get_interview_plan`, `get_job_pipeline`, `get_pending_tasks`, `get_submitted_feedback`, `search_records_by_name`, `filter_records`, `get_record_details`, `describe_object_fields` |
| **Write** | `add_note_to_candidate`, `change_application_stage`, `consider_candidate_for_job`, `create_candidate` |
| **Meta** | `submit_mcp_feedback` |

## What This Server Cannot Do (learned the hard way)

- **There is no write tool for the actual candidate feedback form** (the `Overall Recommendation` + `Feedback` scorecard fields visible in Ashby's UI under a candidate's Feedback tab). `add_note_to_candidate` only posts a plain-text note to the Notes tab, it does not populate the scorecard.
- **`submit_mcp_feedback` is not for candidate feedback.** It's misleadingly named, it files a product bug/feature request about the MCP server itself with Ashby's own team. Never use it to try to submit an interview scorecard.
- **The real feedback form can be submitted "detached from an interview"** in Ashby's own UI (candidate profile → Feedback → Add Feedback → pick your org's form), no scheduled interview event is required. This has to be done manually in Ashby until Ashby ships a write tool for it.
- **`get_pending_tasks` / `scheduledInterviews` may show nothing** for a call that happened outside Ashby's own calendar scheduling (e.g. booked directly via Google Calendar/Granola instead of through an Ashby-scheduled interview event). Don't treat an empty result as "no interview happened."

Given the gap above, a realistic workflow with this MCP server today is: read candidate/pipeline context with it, draft the feedback write-up with Claude, then paste that write-up into Ashby's real feedback form yourself. `add_note_to_candidate` or `change_application_stage` (e.g. moving a candidate to Archived) are fine lightweight substitutes when a full scorecard isn't needed.

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| OAuth step fails or shows nothing to authorize | Org admin hasn't enabled the MCP Server opt-in feature | Have an admin enable it under Admin → Organization Setup → Opt-In Features |
| Server added but tools don't show up | MCP servers load at session start, adding one mid-session doesn't hot-reload | Run `/mcp`, select `ashby`, reconnect. A full restart also works. |
| Can't find an `interviewEventId` for a real call | The interview wasn't scheduled through Ashby's own calendar | Use the candidate's Ashby profile directly, or ask whoever scheduled it whether it's in Ashby at all |

## Resources

- [Ashby MCP Server (Beta) docs](https://docs.ashbyhq.com/ashby-mcp-server-beta)
- [Introducing the Ashby MCP Server](https://www.ashbyhq.com/product-updates/mcp)
