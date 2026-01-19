# Frequently Asked Questions

## Getting Started

### How do I begin?

1. Fork this repo
2. Clone it locally
3. Run `claude` in the directory
4. Say "let's do it"

Claude will guide you through setup in about 15 minutes.

### Do I need Obsidian?

No, but it's recommended. Any markdown editor works. Obsidian provides the best experience for:
- Wiki-style linking (`[[Note Name]]`)
- Tag browsing
- Graph visualization
- Quick search

### Where does my vault go?

Your vault is created at `../my-vault/` - a sibling folder to this repo. This keeps:
- The public templates separate from your private data
- Your vault as its own Git repository
- Updates to personal-agent-os independent of your data

### Can I use a different folder name?

Yes. After onboarding, you can rename `my-vault` to anything you want. Just update your Obsidian vault path accordingly.

---

## Daily Use

### How long should daily check-ins take?

5-10 minutes total:
- Morning: 2-3 minutes (review Top 3, set intention)
- Evening: 3-5 minutes (log energy, notes, gratitude)

If it's taking longer, you're over-engineering. Simpler is better.

### What if I miss a day?

Nothing bad happens. Just pick up the next day. Don't try to "catch up" on missed entries - that creates guilt and friction.

### Do I need to hit all five compass points daily?

No. The daily compass (Body, Create, Truth, Connect, Awe) is a check-in, not a requirement. If you consistently miss one pillar, that's useful signal - but you don't need to force it every day.

### Should I use the daily section or a separate daily file?

The system uses daily sections within weekly files. This provides:
- Better context (you can see the whole week)
- Simpler file management
- Easier weekly reflection

If you prefer separate daily files, that's fine - just create a `Daily/` folder in `02_JOURNAL/`.

---

## Weekly Practice

### When should I do weekly review?

Most people prefer Sunday evening or Monday morning. Pick what works for you and stay consistent.

### What's a "keystone focus"?

The one thing that, if it worked, would make the week successful. It focuses your energy and helps you say no to distractions.

### Do I need to set all pillar intentions?

No. Pick 2-3 pillars that need attention. Trying to hit all 10 every week leads to burnout and shallow effort.

### What's a "brave act"?

Something uncomfortable that moves you toward growth. Examples:
- Having a difficult conversation
- Sharing your work publicly
- Asking for help
- Setting a boundary

### What's a "joy anchor"?

Something you do purely for aliveness - not productivity, not obligation. Schedule it or it won't happen.

---

## Structure & Organization

### Why are there 10 pillars?

The pillars cover the major domains of a well-lived life. They're based on extensive research and real-world testing. That said, you can customize them during onboarding.

### Can I add more pillars?

You can, but consider whether a new pillar is really distinct or just a subset of an existing one. More pillars = more cognitive load.

### Should I create a note for everyone I know?

No. Start with the 3-5 people most relevant to your current focus. Add others as they become important. This isn't a CRM.

### How do I handle sensitive information?

Your vault is local and private by default. For extra security:
- Don't commit to public Git repos
- Use `.gitignore` for ultra-sensitive files
- Consider encryption for specific files

### Where do meeting notes go?

In the relevant project folder under `Calls/`. If it's not project-specific, create a note in `05_WRITING/Reflections/`.

---

## Projects

### How do I start a new project?

1. Create a folder in `03_PROJECTS/{{Project-Name}}/`
2. Add `_STATE.md` (current status)
3. Add `_BACKLOG.md` (tasks and ideas)
4. Create subfolders: `Calls/`, `Decisions/`, `Notes/`

Or use the template from `templates/project-state.md`.

### When should I archive a project?

When it's complete, paused indefinitely, or no longer relevant. Move the entire folder to `06_ARCHIVE/`.

### How many active projects should I have?

Typically 1-3 active projects at any time. More than that usually means scattered focus. It's fine to have more in different phases (maintaining vs actively building).

---

## Using with Claude

### How does Claude know my context?

Claude reads your vault files, starting with:
1. `00_SYSTEM/GLOBAL_STATE.md` - Current focus
2. `00_SYSTEM/PILLARS.md` - Life balance
3. Project `_STATE.md` files - Project context

### What can I ask Claude to help with?

- Weekly and monthly reflections
- Project prioritization
- Identifying patterns in your notes
- Drafting entries from voice notes or transcripts
- Suggesting focus areas based on your state

### Can Claude modify my vault directly?

Yes, if you ask. Claude can create entries, update states, and maintain your vault. Always review changes before committing.

---

## Customization

### Can I change the folder structure?

Yes. The structure is a starting point. If something doesn't work, change it. Just update the `_GUIDE.md` files so Claude understands the changes.

### Can I use different templates?

Yes. Edit templates in `personal-agent-os/templates/` or create your own in your vault.

### What about integrating other tools?

V1 is manual markdown. Future versions will support:
- MCP server integration
- Imports from Granola, calendars, etc.
- Automated reminders

For now, manually add relevant context from other tools.

### Can I use this with other AI assistants?

Yes. The markdown structure works with any AI that can read files. The `_GUIDE.md` files and clear naming help any assistant understand the system.

---

## Troubleshooting

### "Claude didn't create my vault properly"

Run through onboarding again with `claude` and say "let's do it". Make sure you're in the `personal-agent-os` directory.

### "My vault folder is in the wrong place"

Move it where you want and update any absolute paths in your setup.

### "Obsidian isn't finding my files"

Make sure you opened the vault folder itself (e.g., `my-vault/`), not a parent folder.

### "Git isn't tracking my changes"

Check if your vault was initialized:
```bash
cd my-vault
git status
```

If not initialized:
```bash
git init
git add .
git commit -m "Initialize vault"
```

### "I'm feeling overwhelmed"

Strip back to just the daily check-in. Do only that for a week. Add one new element each week. The system should reduce stress, not create it.

---

## Philosophy

### Why "structure before automation"?

Most productivity systems fail because they add tools before clarity. If you don't know what matters, no app will help. Personal Agent OS establishes the foundation first.

### Why reflection cadences?

Without regular reflection, you drift. Daily keeps you aligned. Weekly lets you adjust. Monthly reveals patterns. Quarterly ensures strategy. Yearly refreshes vision.

### Why markdown files?

- Plain text is forever (no vendor lock-in)
- Works with any editor
- Git-friendly for history
- AI-readable for assistance
- Human-readable first

### What's the "end game"?

A clear mind, intentional life, and compounding growth. The system fades into the background. You just... live well.

---

## Still Stuck?

- Read [GETTING_STARTED.md](GETTING_STARTED.md) for your first week
- Read [CADENCES.md](CADENCES.md) for ritual details
- Read [PHILOSOPHY.md](PHILOSOPHY.md) for the why
- Run `claude` and ask your question directly
