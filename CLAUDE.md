# Personal Agent OS - Claude Instructions

This file contains instructions for Claude Code to guide users through setting up their Personal Agent OS.

## Trigger Phrases

When a user says any of the following, begin the onboarding flow:
- "let's do it"
- "set up my system"
- "get started"
- "initialize my vault"
- "onboard me"

## Onboarding Flow

### Step 1: Welcome

Welcome the user to Personal Agent OS. Explain what we're about to build together:

> "Welcome to Personal Agent OS! I'm going to help you set up your personal life operating system.
>
> Together, we'll create a structured vault that helps you:
> - Define your life vision and identity
> - Organize around meaningful pillars (not chaotic to-do lists)
> - Track projects with rich context
> - Maintain important relationships
> - Reflect at daily, weekly, and monthly cadences
>
> I'll ask you some questions, then create your personalized vault as a sibling folder to this repo.
>
> This takes about 10-15 minutes. Ready?"

Wait for confirmation before proceeding.

### Step 2: Gather Information

Ask questions in this order. Use the AskUserQuestion tool for structured choices, and conversational questions for open-ended responses. Gather all information before creating any files.

#### 2.1 Identity & Vision (Core)

Ask these questions conversationally:

1. "What does your ideal life look like 5 years from now? Paint me a picture - where are you, what are you doing, who are you with, how do you feel?"

2. "What's your current energy level on a scale of 1-10? And what's your primary focus right now - is it building, recovering, exploring, or maintaining?"

3. "If you could describe the person you want to become in one word, what would it be?"

#### 2.2 Pillars (Customize Defaults)

Present the default pillars and ask for customization:

"Personal Agent OS organizes life around 10 pillars. Here are the defaults:

1. **Body & Energy** - Physical health, strength, sleep, nutrition
2. **Spirit & Meaning** - Stillness, awe, gratitude, inner honesty
3. **Mind & Clarity** - Thinking, learning, mental hygiene
4. **Love & Relationships** - Deep connections, family, friendships
5. **Self-Time & Joy** - Play, solitude, pleasure without productivity
6. **Creation & Craft** - Building, writing, mastery
7. **Wealth & Leverage** - Income, ownership, optionality
8. **Impact & Service** - Who you help, what you enable
9. **Media & Personal Brand** - How your mind scales publicly
10. **Exploration & Adventure** - Travel, novelty, perspective shifts

Which of these resonate with you? Any you'd rename, remove, or add?"

#### 2.3 Active Projects

"What are your 1-3 most important active projects right now? For each one, tell me:
- The project name
- What phase it's in (starting, building, scaling, maintaining, wrapping up)
- Who's involved (if anyone)
- What's the biggest blocker or focus area?"

#### 2.4 Key Relationships

"Who are the 3-5 people most important to your current focus? This could be collaborators, mentors, partners, or family. Just first names and a brief context for each."

#### 2.5 Optional Context Import

"Do you have any existing documents, notes, or transcripts you'd like to import? (We can skip this for now and add them later)"

### Step 3: Confirm Before Creating

Summarize what you've gathered and confirm before creating the vault:

"Here's what I'm going to create for you:

**Your Vision:** [summary]
**Your Word:** [their word]
**Your Pillars:** [list, noting any customizations]
**Your Projects:** [list with phases]
**Your Key People:** [list]

I'll create your vault at `../my-vault/` as a separate Git repository.

Ready to create?"

### Step 4: Create the Vault

Create a sibling folder `../my-vault/` with this structure. Initialize it as a Git repo.

```
my-vault/
├── .gitignore
├── 00_SYSTEM/
│   ├── _GUIDE.md
│   ├── GLOBAL_STATE.md         ← Populated with current focus/energy
│   ├── LIFE_VISION.md          ← Populated with their vision answers
│   ├── PILLARS.md              ← Customized or defaults
│   └── PRINCIPLES.md           ← Template with their word integrated
├── 01_GOALS/
│   ├── _GUIDE.md
│   └── {{year}}.md             ← Seeded from vision
├── 02_JOURNAL/
│   ├── _GUIDE.md
│   ├── Weekly/
│   │   └── {{year}}-W{{week}}.md  ← Current week ready
│   └── Monthly/
├── 03_PROJECTS/
│   ├── _GUIDE.md
│   └── {{project-name}}/       ← One for each project mentioned
│       ├── _STATE.md           ← Populated with their answers
│       ├── _BACKLOG.md
│       ├── Calls/
│       ├── Decisions/
│       └── Notes/
├── 04_PEOPLE/
│   ├── _GUIDE.md
│   └── {{name}}.md             ← One for each person mentioned
├── 05_WRITING/
│   ├── _GUIDE.md
│   ├── Reflections/
│   ├── Drafts/
│   ├── Published/
│   └── Ideas/
└── 06_ARCHIVE/
    └── _GUIDE.md
```

#### File Population Guidelines

**GLOBAL_STATE.md** - Include:
- Current energy level and focus mode
- What's most active right now
- Today's date as "Last updated"

**LIFE_VISION.md** - Include:
- Their 5-year vision answer (formatted nicely)
- Their one word
- A "Future Self" section describing who they're becoming

**PILLARS.md** - Include:
- All 10 pillars (customized if they made changes)
- Same format as the template with the monthly lens questions

**{{year}}.md** in Goals - Include:
- Goals derived from their vision
- Organized by pillar where relevant
- Their active projects as focus areas

**Project _STATE.md files** - Include:
- Phase they mentioned
- Team/people involved
- Current blockers/focus
- Connected to relevant people notes

**People {{name}}.md files** - Include:
- Context they provided
- Links to relevant projects
- "Last contact" placeholder

### Step 5: Initialize Git

```bash
cd ../my-vault
git init
git add .
git commit -m "Initial vault setup via Personal Agent OS onboarding"
```

### Step 6: Explain the Cadences

After creating the vault, explain how to use it:

"Your vault is ready at `../my-vault/`! Here's how to use it:

**Daily (5-10 min)**
- Morning: Review your Top 3 priorities, set intention
- Evening: Log energy (1-10), gratitude, and notes in your weekly doc

**Weekly (30-45 min, Sunday or Monday)**
- Create a new week doc (copy template from personal-agent-os/templates/weekly.md)
- Set your keystone focus for the week
- Review pillar coverage
- Plan one brave act + one joy anchor

**Monthly (60-90 min, first of month)**
- Deep reflection using the 8 monthly questions
- Score each pillar 1-10
- Calibrate your identity - who are you becoming?

**Quarterly (2-3 hours)**
- Review quarter goals
- Adjust year targets based on reality
- Assess project portfolio

**Yearly (half day)**
- Full vision refresh
- Archive completed projects
- Set new year intentions

See `personal-agent-os/docs/CADENCES.md` for the full breakdown."

### Step 7: Point to Resources

"Here are your next steps:

1. **Open your vault** - Open `../my-vault/` in Obsidian
2. **Read the guides** - Check `_GUIDE.md` in each folder
3. **Start your week** - Your first weekly doc is ready at `02_JOURNAL/Weekly/`
4. **Explore templates** - `personal-agent-os/templates/` has all the formats

For deeper learning:
- [Getting Started Guide](docs/GETTING_STARTED.md) - Your first week, day by day
- [Cadences](docs/CADENCES.md) - Complete ritual breakdowns
- [Philosophy](docs/PHILOSOPHY.md) - Why this structure works
- [FAQ](docs/FAQ.md) - Common questions

You're all set! The structure is here. Now the work is living in it."

---

## Ongoing Usage

After onboarding, Claude should:

1. **Know the vault location** - `../my-vault/` relative to this repo
2. **Read GLOBAL_STATE.md first** - Understand current focus before helping
3. **Check project _STATE.md** - For project-specific context
4. **Reference _GUIDE.md files** - For how to use each section
5. **Suggest template usage** - When creating new entries
6. **Support reflection rituals** - Help with weekly/monthly reviews

## What's In Scope Now (V1)

- Folder structure + templates
- Manual updates via Claude
- Obsidian-compatible markdown
- Git-versioned history

## Coming Later (V2+)

- MCP server integration for automated tools
- Daily reminder system
- External tool imports (Granola, Calendar, etc.)
- Mobile/WhatsApp channel
