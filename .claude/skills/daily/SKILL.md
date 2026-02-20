# /daily Skill

Morning planning or evening reflection ritual. Run daily to stay aligned with your weekly intentions.

## Usage

```
/daily [morning|evening|quick]
```

**Examples:**
- `/daily` - Full daily reflection + planning
- `/daily morning` - Full flow, morning greeting
- `/daily evening` - Full flow, evening greeting
- `/daily quick` - Fast 3-min version: calendar → Top 3 → energy → done

**Modes:**
- `morning/evening` - Changes greeting tone, full flow
- `quick` - Streamlined flow for low-energy days (skips grounding questions, open exploration, detailed backlog review)

---

## Architecture: Skill vs Extension

**This skill file (generic orchestrator):**
- Flow steps and logic
- What sources to check (TODO.md, backlogs, journal, scans)
- How to display information (table formats, categories)
- Processing rules (priority indicators, deduplication)
- No personal data, account names, or vault-specific config

**Extension file in vault (personal config):**
- Which calendar IDs to check
- Which accounts to use
- Custom flow modifications (skip steps, add steps)
- Personal rules (e.g., "GYM days are Tue + Thu")
- Post-skill actions (git push, notifications)

**Location:** `{{vault}}/00_SYSTEM/extensions/daily.md`

This separation allows the skill to be shared/open-sourced while keeping personal config private in the vault.

---

## Quick Mode Flow

When `/daily quick` is invoked, run this streamlined 3-minute flow:

```
Step 0   → Git commit/push (silent)
Step 0.5 → Load extension (silent)
Step 0.75→ Check date (silent)
Step 1   → Read context (silent) - still scan ALL task sources
Step 2   → Gather (abbreviated):
           0. Important dates (if any)
           1. Calendar + auto-build Day Plan
           3. Today planning (#1 focus, fill [TBD])
           4. Energy level only (skip pillars)
           7. Task count + urgent only (from ALL sources)
Step 3-6 → Categorize, confirm, write, verify (same)
Step 7-8 → Complete + extension (same)
```

**What quick mode SKIPS:**
- Yesterday reflection (step 2.2)
- Grounding question (step 2.5)
- Open exploration (step 2.6)
- Full backlog table (step 2.7 - just shows count from all sources)
- Radar section (step 2.8)
- Pillar check-in (just energy)

**What quick mode KEEPS:**
- Scanning ALL task sources (TODO.md + backlogs + journal + scans)
- Surfacing urgent items from any source

**Use when:** Low energy, busy day, just need calendar + Top 3 locked in.

---

## Prerequisites

Before running this skill, check:

1. **Current week journal exists** - Look for `{{vault}}/02_JOURNAL/Weekly/{{YYYY}}-W{{WW}}.md`
   - Vault path: `../my-vault/` relative to this repo (see CLAUDE.md)
   - Week number: Use ISO week format (Bash: `date +%V`)
   - Example: For Jan 28, 2026 → `2026-W05.md`
   - IF MISSING: "You don't have a week journal yet. Would you like to run /weekly first to set up your week?"

2. **GLOBAL_STATE.md is fresh** - Check `last_updated` in `00_SYSTEM/GLOBAL_STATE.md`
   - IF STALE (>3 days): Ask "Your state is {N} days old. Is it still accurate?"

3. **Google Calendar MCP** - Check ALL accounts from GLOBAL_STATE.md
   - Read GLOBAL_STATE.md "Default Integrations" table
   - For EACH Google account listed:
     - Call `get_events` with that email
     - Check both primary AND account-specific calendar IDs (some use email as calendar ID)
   - Also search emails for calendar invites (newer_than:2d)
   - Combine all events into single chronological view
   - IF NOT AVAILABLE: Skip calendar step silently, continue with other steps

---

## Information Flow Pattern

The `/daily` skill processes information and distributes it across the vault using this systematic approach:

### Categories to Check (Every Session)

For every daily entry, scan for information that belongs in these categories:

**1. Journal Cascade**
- Today's entry → Current week journal
- Weekly themes → Monthly when week closes
- Monthly patterns → Year goals when month closes

**2. Project Updates**
For ANY project mentioned:
- Phase changes → `03_PROJECTS/{project}/_STATE.md`
- Decisions made → `03_PROJECTS/{project}/Decisions/{date}-{topic}.md`
- Insights/learnings → `03_PROJECTS/{project}/Notes/`
- Calls → `03_PROJECTS/{project}/Calls/`

**3. People Network**
For ANY person mentioned:
- Create `04_PEOPLE/{person}.md` if doesn't exist
- Update with new context (interactions, insights, relationship notes)

**4. Task System**
- New tasks → `00_SYSTEM/TODO.md`
- Project tasks → `03_PROJECTS/{project}/_BACKLOG.md`

**5. System State**
- Energy/focus shifts → `00_SYSTEM/GLOBAL_STATE.md`
- Important dates → `00_SYSTEM/IMPORTANT_DATES.md`

**6. Ideas/Content**
- Ideas generated → `05_WRITING/Ideas/`
- Writing happened → `05_WRITING/Drafts/`

**7. Goals**
- Priority shifts → `01_GOALS/{year}.md`
- Milestone changes → Monthly/Quarterly plans

### Processing Flow

**Phase 1: READ** - Collect daily information (morning/evening Q&A)
**Phase 2: COLLECT** - Categorize information across 7 categories
**Phase 3: VALIDATE** - Show user FULL recap (what goes where)
**Phase 4: WRITE** - Write all files atomically
**Phase 5: VERIFY** - Verify all writes succeeded

**Example:**

User says: "Had call with ClientCo about proposal, decided to go with standalone contract. Spent evening with Partner watching shows."

**Categorization:**
- Journal: ✓ Evening entry
- Project: ✓ Acme/Decisions/ (contract decision)
- People: ✓ Partner note (QT time)
- Tasks: ✓ TODO.md (send contract)
- Other: No state/goals/content/ideas

**Recap shown to user:**
"I'll update:
- Weekly journal (Thu evening entry)
- Acme/Decisions/2026-01-23-clientco-standalone-contract.md (why standalone)
- Partner.md (evening QT)
- TODO.md (send ClientCo contract)

Is this accurate?"

---

## Error Handling

**If user says "No" or "Edit" during confirmation:**
- Ask: "What needs to be corrected?"
- Loop back to the specific question
- Re-confirm before writing

**If file write fails:**
- Show error: "⚠️ Failed to write to {{file}}: {{error}}"
- Ask: "Should I try again? (Yes/No)"
- If Yes: Retry write
- If No: Save inputs to temporary file and alert user

**If only some files succeed:**
- Show which succeeded: "✓ file1.md"
- Show which failed: "⚠️ file2.md failed"
- Ask user how to proceed

---

## Daily Flow (Unified)

### Step 0: Commit & Push Vault (Silent)

**FIRST:** Save any uncommitted vault changes before starting the daily ritual.

1. Navigate to vault directory (from `config/vault.json`)
2. Check if there are any uncommitted changes: `git status --porcelain`
3. IF changes exist:
   - Stage all changes: `git add -A`
   - Commit with message: `git commit -m "vault: auto-save before daily $(date +%Y-%m-%d)"`
   - Push to remote: `git push`
4. IF no changes: Skip silently

**Why:** Ensures vault is saved before starting fresh daily reflection. Prevents data loss.

### Step 0.5: Load Extension (Silent)

**Check for vault-specific extension and load it early:**

1. Look for `{{vault}}/00_SYSTEM/extensions/daily.md`
2. IF EXISTS:
   - Read the entire extension file
   - Note any "Pre-Skill" sections (e.g., "Pre-Skill Calendar Check")
   - These instructions will be used in later steps (especially Step 2 for calendars)
   - Store the extension context for use throughout the skill
3. IF NOT EXISTS:
   - Continue with default behavior from this skill file

**Why:** Extensions may contain vault-specific configuration (e.g., which calendar IDs to check, custom accounts). Loading early ensures this context is available when needed.

### Step 0.75: Check Current Date (Silent)

**NEXT:** Check the system date to understand what day it is:
- Use Bash: `date +"%A %B %d, %Y"` (e.g., "Tuesday January 27, 2026")
- Use Bash: `date +"%Y-W%V"` to get the ISO week file name (e.g., "2026-W05")
- This determines which journal file to read/update
- Use this to identify which day in the weekly journal to update
- Use this to properly greet the user (morning vs evening context)
- This prevents confusion about which day's entry to update

### Step 1: Read Context (Silent)

Read these files without outputting:
- `{{vault}}/00_SYSTEM/GLOBAL_STATE.md` - Current focus, energy, active projects, **ALL Google accounts**
- `{{vault}}/02_JOURNAL/Weekly/{{YYYY}}-W{{WW}}.md` (where WW = ISO week from Step 0.75)
- `{{vault}}/00_SYSTEM/TODO.md` - Discrete tasks (note open vs completed)
- `{{vault}}/00_SYSTEM/IMPORTANT_DATES.md` - Check for TODAY's items (birthdays, anniversaries, deadlines)
- Active project `_STATE.md` files (from GLOBAL_STATE.md)
- Active project `_BACKLOG.md` files (for task backlog review)

**CRITICAL: Read Yesterday's Entry**
- Find yesterday's section in weekly journal
- Note: What was planned? What Top 3? What calls?
- This enables plan-vs-reality reflection in Step 2

**CRITICAL: Check IMPORTANT_DATES.md**
- Scan for any dates matching TODAY
- Note birthdays, anniversaries, deadlines, recurring events
- These will be surfaced prominently in Step 2

**CRITICAL: Collect ALL Task Sources**
Tasks can live in multiple places. Scan ALL of these:

| Source | Location | What to Extract |
|--------|----------|-----------------|
| Central TODO | `00_SYSTEM/TODO.md` | All `- [ ]` items |
| Project Backlogs | `03_PROJECTS/*/_BACKLOG.md` | All `- [ ]` items per project |
| Journal Embedded | Weekly journal "Also Today" sections | Unchecked `- [ ]` from previous days |
| Scan Action Items | `00_SYSTEM/OPS/scans/*.md` | "Actions for Follow-Up" sections from recent scans |

**Why this matters:** Tasks get created in different contexts (during dailies, scans, project work). Without scanning all sources, tasks rot and get forgotten.

### Step 2: Gather Information (Conversational)

**Greeting:** Adapt based on arg (morning/evening/quick) or time
- Morning: "Good morning! Let's set your day."
- Evening: "Good evening! Let's capture your day."
- Quick: "Quick check-in. Here's your day:"
- Neutral: "Let's check in on your day."

---

**0. IMPORTANT DATES (Show First If Any)**
If IMPORTANT_DATES.md had items for TODAY, surface them prominently:
```
📅 **Today's Important Dates:**
- 🎂 Sarah's birthday
- ⏰ Q1 tax deadline
- 💍 Anniversary (5 years)
```
Don't ask questions, just surface them so user is aware.

---

**1. CALENDAR + AUTO-BUILD DAY PLAN**

**Fetch calendars:**
- IF extension loaded (from Step 0.5) with "Pre-Skill Calendar Check" section:
  - Use the calendar configuration from the extension
  - Follow the exact `user_google_email` and `calendar_id` values specified
  - Call `get_events` for each calendar_id listed in the extension
- OTHERWISE (fallback):
  - Read ALL Google accounts from GLOBAL_STATE.md "Default Integrations" table
  - For EACH account: call `get_events` for today

**Auto-build draft Day Plan table:**
Using calendar events, generate a DRAFT Day Plan table automatically:

```
📋 **Draft Day Plan** (from your calendars)

| Est | Block | What | Working On |
|-----|-------|------|------------|
| AM | Personal | Morning routine | |
| 09:30-10:00 | Call | Team standup (#work) | |
| 10:00-12:00 | Deep Work | [TBD - your focus] | |
| 12:00-12:30 | Break | Lunch | |
| 12:30-14:30 | Deep Work | [TBD] | |
| 14:30-15:00 | Call | Client sync (#project) | |
| 15:00-17:00 | Deep Work | [TBD] | |
| 18:00-19:00 | Call | External call | |

What Deep Work blocks should you fill in?
```

**Rules for auto-draft:**
- Calls from calendar → exact times, mark as `Call`
- Gaps between calls → mark as `Deep Work` with [TBD]
- Add morning `Personal` block and `Lunch` break
- User fills in the [TBD] slots with their priorities

---

**2. YESTERDAY REFLECTION (Plan vs Reality)** *(Skip in quick mode)*
Based on yesterday's journal entry:
- "Yesterday you planned: [Top 3 from journal]. What actually happened?"
- "Any tasks that rolled over?"
- "What got accomplished that wasn't planned?"
- "Any reflections or learnings?"

---

**3. TODAY PLANNING**
- "What's your #1 focus for today?"
- "What would make today successful?"
- Fill in [TBD] slots in Day Plan table

**Show Context:**
- Surface Top 3s (Personal + Professional from week journal)
- Surface key tasks from TODO.md (urgent, related to Top 3)
- Note pillar commitments for the week

---

**4. ENERGY & PILLARS**
- "Energy level? (1-10)"
- "Pillar check-in - which will you hit today?"

---

**5. GROUNDING QUESTION (Rotating)** *(Skip in quick mode)*
Pick ONE based on day of week:
- Monday: "What are you grateful for right now?"
- Tuesday: "What truth are you avoiding?"
- Wednesday: "Who do you want to connect with today?"
- Thursday: "What would make your future self proud?"
- Friday: "What beauty or awe have you noticed recently?"
- Weekend: "What does rest look like for you today?"

---

**6. OPEN EXPLORATION** *(Skip in quick mode)*
- "Anything else on your mind? (decisions, people, projects, ideas)"

---

**7. TASK BACKLOG REVIEW (Comprehensive)** *(Abbreviated in quick mode)*

Before finalizing the day, show a consolidated view of ALL open tasks from ALL sources.

**Full mode display:**
```
📋 **Open Tasks Overview** (from all sources)

**TODO.md** ({{count}} open)
| Priority | Task | Project |
|----------|------|---------|
| 🔴 | Task description | #project |
| 🟡 | Task description | #personal |

**Project Backlogs**
| Project | Open Items | Key Items |
|---------|------------|-----------|
| #project1 | 5 | Item A, Item B |
| #project2 | 2 | Item C |

**Journal Embedded** (from previous days' "Also Today")
| Day | Task | Status |
|-----|------|--------|
| Thu | Task from yesterday | Still open |
| Wed | Task from 2 days ago | Still open |

**Scan Action Items** (from recent scans)
| Scan Date | Action | Status |
|-----------|--------|--------|
| 2026-02-19 | Action from deep scan | Not done |

Anything here you want to tackle today or flag?
```

**Quick mode display:**
```
📋 **Tasks** ({{count}} total across all sources, {{urgent}} urgent)
Any 🔴 urgent items you need to handle today?
```

**Sources to scan (ALL of these):**
1. `00_SYSTEM/TODO.md` - Central task list
2. `03_PROJECTS/*/_BACKLOG.md` - Each active project's backlog
3. Weekly journal "Also Today" sections - Tasks embedded in previous days that weren't completed
4. `00_SYSTEM/OPS/scans/*.md` - "Actions for Follow-Up" from recent scans (last 7 days)

**Priority indicators:**
- 🔴 = urgent/overdue (flagged as urgent, or >7 days old)
- 🟡 = this week (mentioned in week plan or <7 days old)
- ⚪ = backlog (older or lower priority)

**Rules:**
- Scan ALL sources listed above - don't miss embedded tasks
- Deduplicate if same task appears in multiple places
- Surface tasks that have been sitting for multiple days
- Ask: "Anything here you want to tackle today or flag?"
- If user picks something → add to today's Top 3 or Day Plan

**Purpose:** Zero tasks forgotten. Every source checked. Nothing rots.

---

**8. RADAR (Keep Visible)** *(Show in full mode, skip in quick mode)*

After tasks, show items that aren't for today but should stay visible:

```
🔭 **On Your Radar** (not today, but keep visible)

**This Week (from week plan)**
- [ ] Item due later this week
- [ ] Commitment not yet scheduled

**Upcoming (next 7-14 days)**
- [ ] Conference prep (March 18)
- [ ] Quarterly review approaching

**Stale Items (needs attention)**
- [ ] Task sitting >2 weeks
- [ ] Backlog item getting old

**Blocked/Waiting**
- [ ] Waiting on X from Person
- [ ] Blocked by dependency

Want to prioritize any of these for today or this week?
```

**Sources for Radar:**
- Week journal "Project Buckets" - items not yet done
- IMPORTANT_DATES.md - upcoming dates (7-14 days out)
- TODO.md "Backlog" and "Waiting On" sections
- Project _BACKLOG.md items marked as blocked
- Any task >14 days old that hasn't been addressed

**Rules:**
- Don't overwhelm - show max 3-4 items per category
- Focus on items that might slip through cracks
- Ask if user wants to promote any to today's plan
- If user says "add X to today" → include in Day Plan

**Purpose:** Surface what's coming before it becomes urgent. Give user choice to prioritize.

### Day Plan Table Format (MANDATORY)

**CRITICAL: Every daily entry MUST include a Day Plan table. This is not optional.**

The table has 4 columns: `Est | Block | What | Working On`

| Est | Block | What | Working On |
|-----|-------|------|------------|
| AM | Personal | Morning routine | |
| 09:30-10:00 | Call | Team standup (#project) | |
| 2h | Deep Work | Build feature X | |
| 12:00-12:30 | Break | Lunch | |
| 1.5h | Deep Work | Review + iterate | |
| 14:30-15:00 | Call | Client sync (#project) | |
| 1h | Deep Work | Ship task | |
| 18:00-19:00 | Call | External call | |

**Columns:**
- **Est**: Specific time (`12:30-13:00`) OR duration (`1h`, `1.5h`) OR period (`AM`)
- **Block**: `Personal` | `Call` | `Deep Work` | `Break`
- **What**: Activity name (include #project tag if relevant)
- **Working On**: Empty initially → `✅` when done, or notes while in progress

**Rules:**
- Calls from calendar → exact times with hyphen
- Deep Work blocks → duration estimate
- Include ALL calls from ALL calendars
- Order chronologically
- Morning: Leave "Working On" empty
- Evening: Update with ✅ for completed items

---

### Step 3: Categorize Information Across Vault (FIGHT ENTROPY)

**CRITICAL: Scan EVERYTHING mentioned and categorize aggressively.**

For EVERY entity mentioned in conversation:
- Person name → Check/create/update `04_PEOPLE/{person}.md`
- Project name → Update `03_PROJECTS/{project}/_STATE.md`
- Task mentioned → Add to TODO.md or mark complete
- Idea sparked → Add to `05_WRITING/Ideas/IDEAS.md`
- Date mentioned → Check `00_SYSTEM/IMPORTANT_DATES.md`
- Decision made → Create decision file

**Don't wait for user to remind you. Proactively capture everything.**

**Scan everything user said and categorize:**

For each category, identify what needs to be updated:

**1. Journal**
- Add day's entry to weekly journal (Yesterday + Today sections)
- Update pillar tracking grid

**2. Projects** (Scan for any project names from GLOBAL_STATE active_projects)
- IF project mentioned → Check if `03_PROJECTS/{project}/_STATE.md` needs update
  - Milestones reached
  - Phase changes
  - Status updates
- IF decisions made → Create `03_PROJECTS/{project}/Decisions/{date}-{topic}.md`
- IF calls happened → Note in `03_PROJECTS/{project}/Calls/`

**3. People** (Scan for person names from 04_PEOPLE/ or mentioned in conversation)
- IF person mentioned → Check if `04_PEOPLE/{person}.md` exists
  - If doesn't exist, create it
  - If exists, check if context needs update
- Log interactions, relationship notes, context

**4. Tasks**
- Mark completed tasks in TODO.md (add [x])
- Add new tasks mentioned
- Update `last_reviewed` timestamp

**5. System State** (GLOBAL_STATE.md)
- Strategic decisions or priority shifts
- Energy patterns worth noting
- Focus changes

**6. Ideas/Content** (if mentioned)
- Ideas → `05_WRITING/Ideas/`
- Writing → `05_WRITING/Drafts/`

**7. Goals** (if shifts mentioned)
- Priority changes → `01_GOALS/{year}.md`
- Milestone updates → Monthly/Quarterly plans

### Step 4: Show FULL Recap

**Before writing anything, show user complete picture:**

```
Let me confirm what I'll update:

**Journal:**
- Weekly journal ({{Day}} entry - Yesterday + Today sections)
- Pillar tracking grid ({{which pillars hit}})

**Tasks:**
- TODO.md: Mark {{N}} complete, add {{N}} new tasks
- Updated last_reviewed timestamp

{{IF any projects mentioned:}}
**Projects:**
- {{Project}}/_STATE.md: {{what changed - be specific}}
- {{Project}}/Decisions/{{date}}-{{topic}}.md: {{decision logged}}

{{IF any people mentioned:}}
**People:**
- {{Person}}.md: {{what interaction/context to log}}

{{IF system state changed:}}
**System:**
- GLOBAL_STATE.md: {{what changed}}

{{IF ideas/content:}}
**Writing:**
- 05_WRITING/Ideas/{{idea-file}}.md: {{idea captured}}

{{IF goals changed:}}
**Goals:**
- 01_GOALS/{{year}}.md: {{what changed}}

Is this accurate? (Yes/No/Edit)
```

**If user says "No" or "Edit":**
- Ask: "What needs to be corrected?"
- Loop back to specific section
- Re-show full recap after edits

### Step 5: Write ALL Files Atomically

Write all categorized updates:

**1. Weekly Journal (MUST include Day Plan table):**
```markdown
### {{Day}} {{Date}}

**Morning**
- Energy: {{level}}/10
- #1 Focus: {{focus}}

**Top 3**
- [ ] {{priority 1}}
- [ ] {{priority 2}}
- [ ] {{priority 3}}

**Day Plan**

| Est | Block | What | Working On |
|-----|-------|------|------------|
| ... | ... | ... | |

**Notes**
{{context or adjustments}}

**Evening**
- Energy: {{level}}/10
- Win: {{accomplishment}}
- Gratitude: {{gratitude}} #gratitude
```

**When building Day Plan table:**
- Pull ALL calls from calendar (exact times)
- Add Deep Work blocks for Top 3 items (duration estimates)
- Include Personal/Break blocks
- Morning: "Working On" column empty
- Evening: Update with ✅ for completed, notes for in-progress

**2. Pillar Tracking Grid:** Update today's column

**3. TODO.md:**
- Mark [x] for completed tasks
- Add new tasks
- Update `last_reviewed` timestamp

**4. Project _STATE.md files** (for each project mentioned):
- Update relevant sections (Current Focus, Blockers, Active Clients, etc.)
- Update `last_updated` timestamp

**5. Project Decision Files** (if decisions made):
```markdown
# {{Decision Title}}

Date: {{YYYY-MM-DD}}

## Context
{{why this came up}}

## Decision
{{what was decided}}

## Rationale
{{reasoning}}

## Impact
{{what this affects}}
```

**6. People Notes** (for each person mentioned):
- Update `last_reviewed` timestamp
- Add interaction notes under "Notes from Recent Reflections" or similar section
- Update context as needed

**7. GLOBAL_STATE.md** (if system state changed):
- Update project descriptions if needed
- Update energy/focus if significant shift
- Update `last_updated` timestamp

**8. Writing/Ideas** (if applicable):
- Create idea files with user's input

**9. Goals** (if shifts mentioned):
- Update relevant goal files

### Step 6: Verify All Writes

**After writing, show complete verification:**

```
✓ Wrote to: 02_JOURNAL/Weekly/{{YYYY}}-W{{WW}}.md
  - Added {{Day}} entry (Yesterday + Today)
  - Updated pillar tracking grid

✓ Updated: 00_SYSTEM/TODO.md
  - Marked {{N}} tasks complete
  - Added {{N}} new tasks
  - Updated last_reviewed: {{timestamp}}

{{For each project:}}
✓ Updated: 03_PROJECTS/{{Project}}/_STATE.md
  - {{what changed}}
  - Updated last_updated: {{timestamp}}

{{For each decision:}}
✓ Created: 03_PROJECTS/{{Project}}/Decisions/{{file}}.md
  - {{decision logged}}

{{For each person:}}
✓ Updated: 04_PEOPLE/{{Person}}.md
  - {{what was added}}
  - Updated last_reviewed: {{timestamp}}

{{If GLOBAL_STATE updated:}}
✓ Updated: 00_SYSTEM/GLOBAL_STATE.md
  - {{what changed}}
  - Updated last_updated: {{timestamp}}

{{If writing/ideas:}}
✓ Created: 05_WRITING/Ideas/{{file}}.md

{{If goals updated:}}
✓ Updated: 01_GOALS/{{file}}.md
```

### Step 7: Session Complete

```
✓ Daily reflection complete. All vault files updated.

{{If morning:}} Have a great day!
{{If evening:}} Sleep well! Tomorrow's focus: {{preview}}
```

### Step 8: Execute Post-Skill Extension Actions (Final)

**After all core steps complete**, execute the extension's post-skill actions:

1. IF extension was loaded in Step 0.5:
   - Execute the "Instructions" section (post-skill actions like git commit/push)
   - Report what was done
2. IF no extension exists:
   - Skip silently, skill is complete

**Note:** The extension was already loaded in Step 0.5 for pre-skill config (calendars, etc.). This step executes the "Instructions" section which contains post-skill actions like git commits, notifications, or syncing to external services.

---

## Daily Compass Questions

Use these sparingly to deepen reflection:

- Did I move my body?
- Did I create something?
- Did I tell the truth?
- Did I connect with someone?
- Did I feel awe or gratitude?

---

## Tips

- The session can be quick (5-10 min) or deep (15-20 min) - follow the user's energy
- Focus on comprehensive capture - projects, people, decisions, not just journal
- Don't overthink categorization - scan for obvious matches (project names, person names)
- The goal is zero context leaks - everything mentioned should land somewhere
- If they miss a day, don't guilt - just pick up where they are
- **Critical:** Always show the FULL recap before writing - user must see all files being updated
