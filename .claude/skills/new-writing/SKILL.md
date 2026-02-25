# /new-writing Skill

Start a new writing piece from an idea or topic.

## Usage

```
/new-writing The AI Native Company
/new-writing Why founders resist clarity - newsletter
/new-writing 10x engineer setup guide - blog
```

---

## Syntax

```
/new-writing <topic> [- target]
```

**Parameters:**
- `topic`: The working title or idea for the piece
- `target` (optional): Platform target (newsletter, blog, substack, x thread). Defaults to draft.

---

## Flow

### Phase 1: Parse Input

Extract from user input:
- **Topic/Title**: The working title for the piece
- **Target**: Platform if specified (newsletter, blog, substack, x thread)

**Parsing logic:**
- If ends with `- newsletter` → target: Newsletter
- If ends with `- blog` → target: Blog
- If ends with `- substack` → target: Substack
- If ends with `- x thread` or `- twitter` → target: X thread
- Otherwise → target: draft (generic)

### Phase 2: Check Prerequisites

1. **Read vault path** from `config/vault.json`
2. **Check if Drafts folder exists**: `{{vault}}/05_WRITING/Drafts/`
   - IF MISSING: Create it

### Phase 3: Generate Filename

Convert topic to filename:
- Lowercase
- Replace spaces with hyphens
- Remove special characters
- Prefix with date: `YYYY-MM-DD-`
- Suffix: `-DRAFT.md`

**Example:** "The AI Native Company" → `2026-02-20-the-ai-native-company-DRAFT.md`

### Phase 4: Check for Existing File

Check if file already exists at `{{vault}}/05_WRITING/Drafts/{{filename}}`

- IF EXISTS: Inform user and ask if they want to open it or create a new version
- IF NOT EXISTS: Continue to creation

### Phase 5: Create Draft File

Create file at `{{vault}}/05_WRITING/Drafts/{{filename}}` with template:

```markdown
---
created: {{YYYY-MM-DD}}
status: draft
target: {{target}}
---

# {{Topic Title}}

## Hook


## Body


## Takeaway


---

#writing #draft
```

### Phase 6: Check IDEAS.md

Check if the topic exists in `{{vault}}/05_WRITING/Ideas/IDEAS.md`:
- If found in "Ready to Draft" section → offer to mark as started
- If found in "Seeds" or "Developing" → note the connection

### Phase 7: Confirm

Output:
```
Created: {{filename}}
→ 05_WRITING/Drafts/
Target: {{target}}
```

Open the file path so user can start writing.

---

## Decision Tree

```
Parse topic and target
├── Check Drafts/ folder exists
│   └── Create if missing
│
├── Generate filename from topic
│
├── File already exists?
│   ├── YES: Ask user (open existing / create v2)
│   └── NO: Create new file
│
├── Check IDEAS.md for matching idea
│   └── Offer to mark as started if in Ready to Draft
│
└── Confirm creation with path
```

---

## Examples

### Example 1: Simple draft
```
/new-writing The AI Native Company
```

Result:
- Creates `2026-02-20-the-ai-native-company-DRAFT.md`
- Target: draft
- Confirms: `Created: 2026-02-20-the-ai-native-company-DRAFT.md → 05_WRITING/Drafts/`

### Example 2: Newsletter piece
```
/new-writing Why founders resist clarity - newsletter
```

Result:
- Creates `2026-02-20-why-founders-resist-clarity-DRAFT.md`
- Target: Newsletter
- Confirms with target info

### Example 3: Blog post
```
/new-writing 10x engineer setup guide - blog
```

Result:
- Creates `2026-02-20-10x-engineer-setup-guide-DRAFT.md`
- Target: Blog

### Example 4: From an existing idea
```
/new-writing Full AI Native essay
```

If "Full AI Native essay" exists in IDEAS.md Ready to Draft section:
- Creates the draft
- Offers: "Found in IDEAS.md Ready to Draft. Mark as started?"

---

## Integration

### With /idea
Ideas captured via `/idea X - ready` can be promoted to drafts:
1. User runs `/new-writing X`
2. Skill detects X in IDEAS.md
3. Creates draft and offers to update IDEAS.md

### With Daily Writing
After daily writing practice, start a real piece:
```
/new-writing "Spark from today"
```

### Workflow
```
/idea X           → Capture to Seeds
/idea X - ready   → Move to Ready to Draft
/new-writing X    → Create actual draft file
```

---

## Anti-Entropy Guarantee

This skill prevents:
1. **Scattered drafts** - All go to 05_WRITING/Drafts/
2. **Naming chaos** - Consistent YYYY-MM-DD-slug-DRAFT.md format
3. **Lost connections** - Links back to IDEAS.md when relevant
4. **Missing metadata** - Frontmatter always includes status and target

---

## Quick Reference

| Command | Result |
|---------|--------|
| `/new-writing X` | Create draft, target: draft |
| `/new-writing X - newsletter` | Create draft, target: Newsletter |
| `/new-writing X - blog` | Create draft, target: Blog |
| `/new-writing X - substack` | Create draft, target: Substack |
| `/new-writing X - x thread` | Create draft, target: X thread |

---

#skill #writing #creation
