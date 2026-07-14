# OPS Guide

System operations and rituals, mostly written to by Claude, not by you directly.

## Subfolders

| Folder | Purpose | Written by |
|--------|---------|------------|
| `activity-logs/` | Weekly session activity logs, one file per ISO week (`YYYY-Wxx.md`) | Claude, after each session with file changes |
| `scans/` | Pulse logs and deep scan reports from `/scan` | Claude, during `/scan` |
| `granola-inbox/` | Raw meeting transcripts, synced flat with `title` + `attendees` in frontmatter | External Obsidian plugin (e.g. "Granola Sync"), not Claude |

## granola-inbox/ notes

- No LLM step in the sync; the plugin writes transcripts directly from Granola
- `/daily` reads this folder to surface meeting context (who was in yesterday's/last working day's calls) for reflection. It does not move, classify, or save files here
- Skim directly in Obsidian (search or Dataview on `attendees`/`title`) rather than opening each file
- If you want transcripts routed into project folders, that's a manual step or a workflow you build yourself, not part of the core skills
