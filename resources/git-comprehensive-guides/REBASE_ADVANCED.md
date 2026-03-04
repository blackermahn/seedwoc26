# Rebase: Advanced Techniques

## Rebase Fundamentals

### What is Rebase?
Rebase rewrites history by replaying commits on a new base.

```
BEFORE:
main: A → B → C
           ↓
feature: D → E

REBASE:
git rebase main

AFTER:
main: A → B → C
           ↓
feature: D' → E'
(D' and E' have new hashes)
```

### Basic Rebase

```bash
# Rebase current branch on main
git rebase main

# Rebase feature on main
git rebase main feature

# Interactive rebase (edit/squash/reorder commits)
git rebase -i main
```

## Interactive Rebase

### Common Use Cases

```bash
git rebase -i HEAD~3  # Last 3 commits
git rebase -i main    # All commits since main
```

### Editor Commands

```
pick abc1234 First commit
reword def5678 Second commit
squash 890ghij Third commit
fixup 123klmn Fourth commit
drop 456nopq Fifth commit
```

**Commands:**
- `pick` - Use commit (default)
- `reword` - Use but edit message
- `squash` - Combine with previous + edit message
- `fixup` - Combine with previous, discard message
- `drop` - Delete commit
- `exec` - Run shell command between commits
- `break` - Stop rebasing for testing

### Example 1: Squashing Commits

```bash
# Multiple work-in-progress commits
commit abc: "WIP: add feature"
commit def: "Fix bug"
commit ghi: "Clean up"

# Interactive rebase
git rebase -i main

# Edit:
pick abc add feature
squash def fix bug
squash ghi clean up

# Result: Single commit "add feature" with all changes
```

### Example 2: Reordering Commits

```bash
# Original order:
commit 111: "Add login"
commit 222: "Add logout" 
commit 333: "Add profile"

# Interactive rebase - reorder lines:
pick 222 Add logout
pick 111 Add login
pick 333 Add profile

# New order (maybe logout depended on login being first)
```

### Example 3: Editing Commits

```bash
# Need to modify an old commit
git rebase -i abc1234^  # Start before target commit

# Change 'pick' to 'edit' for the commit
edit abc1234 Commit to modify

# Git pauses at that commit
# You can now:
git add/remove files
git commit --amend

# Continue rebase
git rebase --continue
```

## Advanced Rebase Scenarios

### Rebasing with Merge Commits

```bash
# Preserve merge commits
git rebase -p main feature

# Drop merge commits
git rebase main feature
```

### Rebasing Onto Different Base

```bash
# Rebase feature from develop onto main
git rebase --onto main develop feature

# Result: feature's commits on main
# Instead of on develop
```

### Auto-Squashing

```bash
# Make commits that reference earlier ones
commit abc: "Add feature"
commit def: "fixup! Add feature"  # Auto-squashes into abc
commit ghi: "squash! Add feature" # Auto-squashes into abc

# Run rebase
git rebase -i --autosquash main

# Automatically reorders and squashes
```

### Continuing After Conflicts

```bash
# Rebase starts
git rebase main

# Conflict occurs - edit file
code conflicted.js

# After resolving
git add conflicted.js
git rebase --continue

# Or abort
git rebase --abort
```

## When to Rebase

### ✅ Good Use Cases
- Clean up personal branch before merging
- Sync feature branch with main
- Fix commit messages
- Squash WIP commits
- Reorder commits logically

### ❌ Bad Use Cases
- Rebase public/shared branches
- Rebase after push to main
- Multiple people pushing to same branch
- You want to preserve exact history

## Golden Rule of Rebase

> **Never rebase commits that have been pushed to a shared branch**

### Why?
```bash
# You pushed commits
git push origin feature

# You rebase locally
git rebase main
# Hashes change!

# Try to push
git push origin feature
# Conflict: Remote has abc, Local has abc'
```

**Solution:**
```bash
# Only use for personal branches
# Before creating PR

# Once merged, don't rebase
```

## Rebase vs Merge

| Aspect | Rebase | Merge |
|--------|--------|-------|
| History | Linear, clean | Branched, shows paths |
| Commits | Replayed (new hashes) | Preserved (same hashes) |
| Reversibility | Hard (history rewritten) | Easy (revert commit) |
| Performance | Slightly faster | Negligible difference |
| Shared Branches | ❌ Don't | ✅ Safe |
| Personal Branches | ✅ Good | OK |
| Debugging | Harder (new hashes) | Easier (original commits) |

## Workflow: Rebase Before Merge

```bash
# Start feature branch
git switch -c feature/auth develop

# Make commits
git commit -m "Add login form"
git commit -m "Add authentication"
git commit -m "Add error handling"

# Get latest develop
git fetch origin
git rebase origin/develop

# Resolve any conflicts
git add .
git rebase --continue

# Force-with-lease push (only on personal branch!)
git push origin feature/auth --force-with-lease

# Create PR on GitHub
# After approval, merge
```

## Recovering from Bad Rebase

### Finding Commits After Rebase

```bash
# Rebase went wrong, commits seem lost
git reflog

# Output:
abc1234 HEAD@{0}: rebase finished: returning to feature
def5678 HEAD@{1}: rebase continue
ghi9012 HEAD@{2}: rebase: commit message

# Reset to before rebase
git reset --hard def5678
```

### Undoing a Rebase

```bash
# See what was before rebase
git reflog

# Reset to backup
git reset --hard HEAD@{1}
```

## Best Practices

✅ **DO:**
- Rebase personal branches
- Rebase before creating PR
- Use interactive rebase to clean up
- Test after rebase
- Use `--force-with-lease` not `--force`

❌ **DON'T:**
- Rebase shared branches
- Force-push to main
- Rebase very old commits
- Lose backup references
- Skip `git reflog` before rebase

