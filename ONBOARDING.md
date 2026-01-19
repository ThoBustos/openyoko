# Welcome to Personal Agent OS

You're about to set up your personal life operating system.

## Quick Start (2 minutes to begin)

### 1. Make sure you have Claude Code installed

```bash
# Install Claude Code if you haven't
npm install -g @anthropic-ai/claude-code
```

### 2. Open this directory in your terminal

```bash
cd personal-agent-os
```

### 3. Run Claude Code

```bash
claude
```

### 4. Say the magic words

Type:

> **"Let's do it"**

Claude will guide you through a 10-15 minute onboarding that:
- Asks about your vision, pillars, projects, and people
- Creates your personalized vault in a sibling folder (`../my-vault/`)
- Sets up your first week's template
- Explains the daily/weekly/monthly cadences

That's it. You'll have a working life operating system in 15 minutes.

---

## What You'll Create

```
your-projects/
├── personal-agent-os/    ← This repo (templates, docs, philosophy)
└── my-vault/             ← Your private vault (your data, your life)
```

Your vault will include:
- **Life vision** based on your answers
- **Customized pillars** (or the defaults if they fit)
- **Project folders** for each project you mention
- **People notes** for key relationships
- **This week's template** ready to use

---

## What to Expect

**Questions Claude will ask:**
1. What's your 5-year vision?
2. What's your current energy and focus?
3. One word for who you're becoming?
4. Which pillars resonate? Any to customize?
5. What are your active projects?
6. Who are your key people?

**What Claude will create:**
- A full vault structure
- Populated files based on your answers
- A Git repo to track changes
- Your first weekly journal doc

**What you'll learn:**
- How to use the daily/weekly/monthly cadences
- Where everything lives
- How to keep it going

---

## After Onboarding

Once your vault is created:

1. **Open it in Obsidian** (or your markdown editor of choice)
2. **Start with your weekly doc** - It's already there
3. **Read the `_GUIDE.md`** in each folder for instructions
4. **Come back to Claude** anytime for help with reviews or updates

---

## Already Have a Vault?

If you've already been through onboarding or created your vault manually:

- Your vault should be at `../my-vault/`
- Run `claude` and ask for help with your weekly review, project updates, or monthly reflection
- Claude will read your vault's `GLOBAL_STATE.md` to understand your current context

---

## Questions?

- Check [docs/FAQ.md](docs/FAQ.md) for common questions
- Check [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) for a day-by-day first week guide
- Check [docs/CADENCES.md](docs/CADENCES.md) for the full ritual breakdown

---

Ready? Run `claude` and say **"Let's do it"**.
