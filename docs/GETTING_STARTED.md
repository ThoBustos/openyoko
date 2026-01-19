# Getting Started: Your First Week

You've just created your vault. Here's how to make the most of your first week.

---

## Day 1: Orientation

**Time: 20-30 minutes**

### Open Your Vault

1. Open `my-vault/` in Obsidian (or your markdown editor)
2. Explore the folder structure - click around, get familiar
3. Read the `_GUIDE.md` in each folder

### Review What Was Created

Check these files from your onboarding:

- `00_SYSTEM/LIFE_VISION.md` - Does this capture your vision?
- `00_SYSTEM/PILLARS.md` - Are these the right pillars?
- `00_SYSTEM/GLOBAL_STATE.md` - Is your current state accurate?

Edit anything that doesn't feel right. This is your system.

### Start Your Weekly Doc

Open `02_JOURNAL/Weekly/{{year}}-W{{week}}.md`:

1. Fill in your **Keystone Focus** for the week
2. Set **Pillar Intentions** for 2-3 pillars
3. Choose your **One Brave Act**
4. Schedule your **One Joy Anchor**

### Commit Your Changes

```bash
cd my-vault
git add .
git commit -m "Day 1: Personalized vault setup"
```

---

## Day 2: Daily Practice Begins

**Time: 10 minutes**

### Morning (3 min)

1. Open your weekly doc
2. Look at today's section
3. Set your **Top 3** priorities
4. Read your keystone focus

### Do Your Day

Live it. Work on your priorities.

### Evening (5 min)

1. Rate your **Energy** (1-10)
2. Capture **Notes** - What happened? What did you learn?
3. Write one **Gratitude**
4. Check off completed items

### The Five-Check

Did you:
- [ ] Move your body?
- [ ] Create something?
- [ ] Tell the truth?
- [ ] Connect with someone?
- [ ] Feel awe or gratitude?

Don't stress about hitting all five. Just notice.

---

## Day 3: Add Project Context

**Time: 15-20 minutes**

### Update Project States

Open each project folder in `03_PROJECTS/`:

1. Review the `_STATE.md` - Is it accurate?
2. Add current blockers and focus areas
3. Add relevant links (repos, docs, designs)

### Create a Backlog Entry

Pick one project and open its `_BACKLOG.md`:

1. Brain-dump tasks and ideas
2. Prioritize the top 3-5 items
3. Add any notes about next actions

### Link People to Projects

Open relevant people notes in `04_PEOPLE/`:

1. Add project links (`[[Project Name]]`)
2. Note their role and involvement
3. Add "Last contact" dates

---

## Day 4: Deepen Your Vision

**Time: 15 minutes**

### Expand Your Vision

Open `00_SYSTEM/LIFE_VISION.md`:

1. Add more detail to your 5-year picture
2. What does a typical day look like?
3. What does a typical week look like?
4. What are you known for?

### Connect Vision to Goals

Open `01_GOALS/{{year}}.md`:

1. What must happen this year to move toward that vision?
2. Add 3-5 concrete goals
3. Connect each goal to a pillar

### Update Global State

Open `00_SYSTEM/GLOBAL_STATE.md`:

1. What's your focus this week?
2. What's your energy level?
3. What changed since onboarding?

---

## Day 5: Practice with Claude

**Time: 15 minutes**

### Ask for Help

Run `claude` in your vault directory and try:

- "Help me with my weekly reflection"
- "What should I focus on based on my global state?"
- "Review my project states and suggest priorities"

### Let Claude Read Your Context

Claude can help best when it understands your situation:

1. It reads `GLOBAL_STATE.md` for current focus
2. It checks project `_STATE.md` for context
3. It references `PILLARS.md` for life balance

Try: "Given my current state, what's one thing I should prioritize?"

---

## Day 6: Add Your First Memory

**Time: 10 minutes**

### Create a Reflection

Open `05_WRITING/Reflections/`:

1. Create a new file for today
2. Write about something you learned this week
3. Tag it appropriately (#reflection, #pillar/mind)

### Capture an Idea

Open `05_WRITING/Ideas/`:

1. Create a note for an idea you've had
2. Just capture it - don't develop it yet
3. Tag with relevant pillar or project

### Add a Person Note

Think of someone important you haven't added:

1. Create their note in `04_PEOPLE/`
2. Use the template from `templates/person.md`
3. Add context, projects, last interaction

---

## Day 7: Weekly Review

**Time: 30-45 minutes**

### Your First Weekly Review

This is where the magic happens. Set aside focused time.

1. **Review the Week**
   - Look at each day's notes
   - What went well?
   - What didn't?
   - What patterns do you notice?

2. **Score Your Pillars**
   - Rate each pillar 1-10 for the week
   - Any below 5? Note why.

3. **Plan Next Week**
   - Create new weekly doc
   - Set new keystone focus
   - Choose pillar intentions
   - Plan brave act and joy anchor

4. **Update State**
   - Refresh `GLOBAL_STATE.md`
   - Update any project states
   - Commit everything

### Celebrate

You've completed your first week in the system. That matters.

---

## Week 1 Checklist

By end of week, you should have:

- [ ] Explored all folders and read guides
- [ ] Personalized your vision and pillars
- [ ] Done daily check-ins (at least 5 days)
- [ ] Updated at least one project state
- [ ] Added at least one person note
- [ ] Created at least one reflection or idea
- [ ] Completed your first weekly review
- [ ] Committed your changes to git

---

## Common First-Week Questions

### "This feels like a lot"

Start with just the daily check-in. Add other pieces gradually. The system adapts to you.

### "I missed a day"

That's fine. Pick up where you left off. No guilt, no catch-up needed.

### "My answers feel wrong"

Edit them. Your vault is living documentation, not a permanent record. Change anything anytime.

### "I don't know what to put"

Start with what's obvious. Depth comes with time. Something is better than nothing.

### "How detailed should entries be?"

As detailed as is useful to your future self. Usually that's less than you think.

---

## What's Next

After Week 1:

- **Week 2-4**: Settle into daily and weekly rhythms
- **End of Month**: Do your first monthly reflection
- **Month 2**: The system starts feeling natural
- **Month 3**: Patterns emerge, adjustments happen

See [CADENCES.md](CADENCES.md) for the complete ritual breakdown.

---

## Getting Help

- Run `claude` anytime for AI assistance
- Check [FAQ.md](FAQ.md) for common questions
- Return to templates in `personal-agent-os/templates/`
- Read playbooks in `personal-agent-os/playbooks/`

You've got this. The structure is here. Now live in it.
