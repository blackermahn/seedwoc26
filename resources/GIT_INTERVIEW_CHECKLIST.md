# Git Interview Preparation Checklist

## Pre-Interview Preparation (1 Week)

### Understanding Core Concepts
- [ ] Read [Fundamentals Review](./git-comprehensive-guides/FUNDAMENTALS_REVIEW.md)
- [ ] Review [Quick Reference](./git-comprehensive-guides/QUICK_REFERENCE.md)
- [ ] Understand Git's distributed nature (local + remote)
- [ ] Know the 3 staging areas (working, staging, repository)
- [ ] Understand commit, branch, and merge concepts
- [ ] Know difference between fetch and pull
- [ ] Understand rebase vs merge workflows

### Learning Commands
- [ ] Master [Commands Cheatsheet](./git-comprehensive-guides/COMMANDS_CHEATSHEET.md)
- [ ] Practice `git status` output interpretation
- [ ] Know all basic commands cold:
  - [ ] init, clone, add, commit, push, pull
  - [ ] branch, switch, merge, rebase
  - [ ] log, diff, show, status
  - [ ] reset, revert, restore
  - [ ] stash, tag, remote
- [ ] Know advanced commands for interview:
  - [ ] bisect for debugging
  - [ ] cherry-pick for selective commits
  - [ ] reflog for recovery
  - [ ] filter-repo for history rewriting

### Advanced Concepts
- [ ] Read [Advanced Git](./git-comprehensive-guides/ADVANCED_GIT.md)
- [ ] Study [Branching Strategies](./git-comprehensive-guides/BRANCHING_STRATEGIES.md)
- [ ] Understand Git hooks and automation
- [ ] Know submodules and worktree
- [ ] Understand shallow cloning and optimization

### Problem Solving
- [ ] Read [Troubleshooting](./git-comprehensive-guides/TROUBLESHOOTING.md)
- [ ] Study [Case Studies](./git-comprehensive-guides/CASE_STUDIES.md)
- [ ] Know how to:
  - [ ] Undo commits (soft, mixed, hard reset)
  - [ ] Fix merge conflicts
  - [ ] Recover deleted branches
  - [ ] Rewrite commit history safely
  - [ ] Handle authentication issues

### Interview Guide
- [ ] Complete [Interview Guide](./git-comprehensive-guides/INTERVIEW_GUIDE.md)
- [ ] Practice answering all questions verbally
- [ ] Prepare system design examples
- [ ] Have 3-5 real-world scenarios ready
- [ ] Know edge cases and gotchas

### Practice

**Basic Commands (Day 1)**
```bash
mkdir test-repo && cd test-repo
git init
git config user.name "Test User"
git config user.email "test@example.com"
# Create files, add, commit, branch, merge
# Practice: Create 10 commits, 3 branches, merge them
```

**Merge Conflicts (Day 2)**
- Create intentional conflicts
- Practice resolution manually
- Understand their change vs your change
- Know when to keep what

**Advanced Commands (Day 3)**
- git bisect on a sample repo
- git cherry-pick multiple commits
- git reflog to recover
- git rebase -i to squash commits
- git stash and pop

**Real Scenarios (Day 4)**
- Undo pushed commits (force-with-lease)
- Recover deleted branch
- Fix wrong branch merge
- Rewrite commit author

---

## Interview Day Checklist

### Before Meeting
- [ ] Good internet connection (test it)
- [ ] Quiet environment
- [ ] Have IDE or editor ready
- [ ] Git installed and configured
- [ ] Sample repo accessible (local or GitHub)
- [ ] Example code ready if allowed
- [ ] Pen and paper for notes/diagrams
- [ ] Water nearby

### Mental Preparation
- [ ] Review key terms and definitions
- [ ] Run through 5 common scenarios
- [ ] Practice explaining Git concepts simply
- [ ] Prepare questions for interviewer
- [ ] Know the position requirements
- [ ] Understand the company's tech stack

### Getting Started
- [ ] Introduce yourself briefly
- [ ] Ask interviewer to clarify expectations
- [ ] Ask if you can ask clarifying questions
- [ ] Take notes during interview
- [ ] Speak clearly and think aloud

---

## Common Interview Questions Checklist

### Fundamental Questions

**Git Basics**
- [ ] "Explain what Git is and why we use it"
  - Answer: Git is DVCS, enables version control, branching, collaboration, history
- [ ] "What are the differences between Git and GitHub?"
  - Answer: Git is tool, GitHub is service; Git decentralized, GitHub centralized; etc.
- [ ] "What is a Git commit?"
  - Answer: Snapshot of code, has hash, author, message, parent commit
- [ ] "Explain the staging area"
  - Answer: Intermediate between working directory and repository, allows selective commits

**Workflow Questions**
- [ ] "Walk me through a typical Git workflow"
  - Answer: Clone → Create branch → Make changes → Stage → Commit → Push → PR → Review → Merge
- [ ] "What's the difference between `git pull` and `git fetch`?"
  - Answer: Fetch gets changes, pull fetches and merges
- [ ] "When would you use `git reset` vs `git revert`?"
  - Answer: Reset for local, revert for pushed; reset rewrites history, revert creates new commit

### Intermediate Questions

**Branching Strategies**
- [ ] "What Git workflow would you recommend for a team of 5?"
  - Answer: GitHub Flow (main + feature branches) or Git Flow depending on release cycle
- [ ] "How do you handle long-lived feature branches?"
  - Answer: Regular rebases from main, frequent merges, feature flags
- [ ] "Describe a merge conflict and how you'd resolve it"
  - Answer: When both sides change same lines, manual resolution, mark as resolved, commit

**Advanced Operations**
- [ ] "How would you remove a large file that was accidentally committed?"
  - Answer: filter-repo with --path, force-push, communicate to team
- [ ] "When would you use `git stash`?"
  - Answer: Save work without committing, switch branches, come back later
- [ ] "Explain `git bisect` and when to use it"
  - Answer: Binary search for bad commit, useful for finding regressions
- [ ] "What are Git hooks and how are they useful?"
  - Answer: Scripts before/after Git events, enforce rules, run tests, linting

### System Design Questions

- [ ] "Design Git workflow for a startup (5 engineers, code constantly)"
  - Answer: GitHub Flow → fast, simple, continuous deployment
- [ ] "Design Git workflow for large enterprise (100+ engineers, scheduled releases)"
  - Answer: Git Flow → more structure, release branches, hotfixes
- [ ] "How would you migrate a 10-year-old Subversion repo to Git?"
  - Answer: git svn clone, author mapping, tags, branches, cleanup, git filter-repo if needed
- [ ] "You have a monorepo with 30 services. How do Git strategies change?"
  - Answer: Sparse checkout, LFS for large files, code ownership, branch per service/feature

### Situational Questions

- [ ] "You accidentally pushed to main. What do you do?"
  - Answer: If recent: reset, force-with-lease, alert team. If old: git revert.
- [ ] "A developer rebased main onto their branch and force-pushed. What now?"
  - Answer: Create new PR from correct point, revert the force-push, communicate with team
- [ ] "You need to cherry-pick 3 specific commits into a release branch. How?"
  - Answer: git cherry-pick <hash1> <hash2> <hash3>, or git cherry-pick <start>..<end>
- [ ] "Your team has conflicting Git knowledge. How do you standardize?"
  - Answer: Document workflow, create templates, code review, team meetings, wiki/runbook

### Behavioral Questions with Git Context

- [ ] "Tell me about a time you helped a teammate with a Git issue"
  - Answer: Use STAR method, show empathy and knowledge
- [ ] "Describe your most complex Git situation and how you handled it"
  - Answer: Real scenario, step-by-step thinking, what you learned
- [ ] "How do you stay current with Git best practices?"
  - Answer: Reading, practicing, learning from peers, experimenting

---

## Technical Skills Checklist

### Must Know Commands
- [ ] git init / clone
- [ ] git add / commit / push / pull
- [ ] git branch / switch / merge
- [ ] git log / diff / show / status
- [ ] git reset / revert / restore
- [ ] git tag
- [ ] git stash
- [ ] git rebase (basic)
- [ ] git rebase -i (interactive)
- [ ] git remote

### Should Know Commands
- [ ] git cherry-pick
- [ ] git bisect
- [ ] git reflog
- [ ] git filter-repo
- [ ] git worktree
- [ ] git submodule
- [ ] git blame / log -p
- [ ] git fsck

### Configuration Knowledge
- [ ] user.name / user.email
- [ ] core.editor
- [ ] pull.rebase
- [ ] core.autocrlf
- [ ] .gitignore files
- [ ] .gitattributes
- [ ] Git aliases

---

## Problem-Solving Scenarios Checklist

### Scenario 1: Wrong Commits on Main
**Situation**: Developer committed 3 commits directly to main when creating feature branch
**Your Response**: 
- [ ] Create feature branch at current main
- [ ] Reset main to before bad commits
- [ ] Cherry-pick good commits if any
- [ ] Push feature branch with bad commits
- [ ] Force-with-lease push fixed main

### Scenario 2: Lost Work
**Situation**: Developer deleted branch but realizes they need the code
**Your Response**:
- [ ] Check git reflog
- [ ] Find commit hash before delete
- [ ] git checkout -b <branch> <hash>
- [ ] Restore the work

### Scenario 3: Huge Merge Conflict
**Situation**: 50 files with conflicts after rebase
**Your Response**:
- [ ] Abort rebase (--(abort)
- [ ] Communicate with team
- [ ] Smaller rebases or merge instead
- [ ] Use mergetool for complex conflicts

### Scenario 4: Performance Issues
**Situation**: Repository is slow (100+ GB)
**Your Response**:
- [ ] Identify large files: git rev-list --all --objects | sort -k 2 -u | sort -rn
- [ ] Use shallow clone: git clone --depth 1
- [ ] Run gc: git gc --aggressive
- [ ] Or rewrite history: git filter-repo

### Scenario 5: Distributed Team Issues
**Situation**: Different timezones, team member pushes incomplete work, blocks others
**Your Response**:
- [ ] Establish coding standards
- [ ] Feature branches mandatory
- [ ] PR review process
- [ ] CI/CD for validation
- [ ] Team communication on blockers

---

## After Interview

- [ ] Send thank you email within 24 hours
- [ ] Highlight relevant Git/DevOps experience
- [ ] Ask about their Git workflows
- [ ] Show enthusiasm for version control
- [ ] Prepare to code if next round

---

## Score Tracker

| Topic | Confidence | Notes |
|-------|-----------|-------|
| Basic Commands | | |
| Workflows | | |
| Branching | | |
| Troubleshooting | | |
| Advanced Operations | | |
| System Design | | |
| Real-World Scenarios | | |

**Goal**: All topics at ✅ Confident before interview

---

## Resources at Hand

- [Commands Cheatsheet](./git-comprehensive-guides/COMMANDS_CHEATSHEET.md) - Quick reference
- [Troubleshooting](./git-comprehensive-guides/TROUBLESHOOTING.md) - Problem solutions
- [Interview Guide](./git-comprehensive-guides/INTERVIEW_GUIDE.md) - Detailed answers
- [Case Studies](./git-comprehensive-guides/CASE_STUDIES.md) - Real scenarios

