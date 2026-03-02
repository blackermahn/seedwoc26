# Git Stash: Advanced Usage

## Basic Stash

### Save Work Without Committing

```bash
# Stash all changes
git stash

# Stash with description
git stash save "auth form WIP"
# or
git stash push -m "auth form WIP"

# Stash specific files
git stash push chapters/file1.md chapters/file2.md

# Stash with untracked files
git stash -u
# or
git stash --include-untracked
```

### List Stashes

```bash
git stash list

# Output:
# stash@{0}: On feature: auth form WIP
# stash@{1}: On develop: api endpoint
# stash@{2}: WIP on main: database schema
```

### Retrieve Stashed Work

```bash
# Apply latest stash (keeps stash)
git stash apply

# Apply specific stash
git stash apply stash@{1}

# Remove stash after applying
git stash pop
git stash drop stash@{0}

# Show stash contents
git stash show
git stash show stash@{1}
git stash show -p  # With full diff
```

## Stash Operations

### Creating Stashes

```bash
# Stash only staged changes
git stash push --keep-index

# Stash only unstaged changes
git stash push -k

# Stash only untracked files
git stash -u

# Stash everything except specific files
git stash push -u -- ":(exclude)important.js"

# Stash with no description
git stash push

# Get a stash reference for scripting
git stash create "my stash"
```

### Manipulating Stashes

```bash
# Show differences
git stash show stash@{0}      # Summary
git stash show -p stash@{0}   # Full diff

# Apply without removing
git stash apply

# Apply and remove
git stash pop

# Delete stash
git stash drop stash@{0}

# Delete all stashes
git stash clear
```

### Advanced Apply

```bash
# Apply to different branch
git stash apply stash@{0}  # Works on any branch

# Partial apply (interactive)
git stash apply -p

# Reindex (reverse --keep-index)
git stash apply --index  # Re-stages what was staged
```

## Real-World Usage

### Scenario: Emergency Branch Switch

```bash
# Working on feature, current state is messy
git status
# Changes to auth.js, login.js, profile.js

# Need to fix prod bug urgently
git stash

# Switch to main
git switch main
git switch -c hotfix/critical

# Fix and commit
git add .
git commit -m "fix: critical bug"
git push origin hotfix/critical

# Back to feature
git switch feature/auth
git stash pop

# Continue working
```

### Scenario: Experiment Then Recover

```bash
# Try experimental approach
git switch -c experiment

# Write code...
git add .
git stash save "experimental approach"

# Try different approach
# ... write different code ...

# Want to see experimental version
git stash show stash@{1} -p

# Apply it temporarily
git stash apply stash@{1}

# Or keep current, discard experimental
git stash drop stash@{1}
```

### Scenario: Selective Stashing

```bash
# Multiple changes, only stash some
git stash push -m "part of feature" auth.js login.js

# Continue with other files
# Commit what's left
git add .
git commit -m "refactor: helper functions"

# Later apply stashed work
git stash apply stash@{0}
```

## Stash in Scripts

### Automation

```bash
# Get latest stash ref
STASH_REF=$(git stash create "backup")

# Use in script
git stash apply $STASH_REF

# Store for later
g stash apply $(git stash list | grep "pattern" | cut -d: -f1)
```

### Conditional Stash

```bash
#!/bin/bash

# Only stash if there are changes
if ! git diff --quiet; then
  STASH_REF=$(git stash create "auto backup")
  echo "Stashed as: $STASH_REF"
fi

# Do work...

# Restore if stashed
if [ ! -z "$STASH_REF" ]; then
  git stash apply $STASH_REF
fi
```

## Limitations & Workarounds

### Limitation: Lost Index Information

```bash
# After stash pop, staged vs unstaged is lost
git stash push --keep-index
git stash pop
# Workaround: Everything is unstaged, use git add to restage

# Better: Use git stash apply --index
git stash apply --index
```

### Limitation: Stash Expires

```bash
# Stashes older than 30 days may be garbage collected
git stash list

# Convert stash to branch for safety
git stash show -p stash@{0} | git apply --allow-empty
git commit -m "from stash"
```

### Limitation: Merge Conflicts

```bash
# Stash pop has conflicts
git stash pop
# CONFLICT: Both modified

# Resolve manually
code conflicted.js
git add .
git stash drop  # Clean up

# Or abort and reapply later
git merge --abort
git stash pop --index 1  # Revert the pop
```

## Stash Alternatives

### Use Branches Instead

```bash
# Better for long-term work
git switch -c stash/auth-feature
git add .
git commit -m "WIP: auth feature"

# Switch back
git switch main

# Many branches are OK, easy to find
git branch -a | grep stash
```

### Use Shelve (Better Stash)

```bash
# Some tools have better shelving
# VS Code: SCM → Shelve changes
# Git Extensions: Stash with better UI
```

### Use Commit & Reset

```bash
# Save dirty state as a commit
git add .
git commit -m "temp: save state"
TAG=$(git rev-parse HEAD)

# Do other work...

# Restore state
git reset --soft $TAG
git reset HEAD~1
```

## Best Practices

✅ **DO:**
- Use descriptive stash messages
- Stash before switching branches
- Apply `--index` for complex stashes
- Convert important stashes to branches
- Use stash for quick saves only

❌ **DON'T:**
- Rely on stash for long-term storage
- Mix many unrelated changes in one stash
- Forget about stashes
- Force-push over stashed commits
- Use stash as substitute for commits

