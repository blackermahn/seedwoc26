# Git Problem Diagnosis Guide

## Diagnosing Common Problems

### Repository Health Check

```bash
#!/bin/bash
# diagnose-git.sh - Comprehensive Git health check

echo "=== Git Repository Diagnosis ==="
echo

# Check if in Git repo
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "ERROR: Not in a Git repository!"
  exit 1
fi

echo "✓ Valid Git repository found"
echo

# Check integrity
echo "Checking repository integrity..."
if git fsck --full --strict 2>&1 | grep -q ERROR; then
  echo "✗ Repository has integrity issues!"
  git fsck --full --strict
else
  echo "✓ Repository integrity: OK"
fi

echo

# Check status
echo "Repository status:"
git status --short

echo

# Recent commits
echo "Recent commits:"
git log --oneline -n 5

echo

# Branch status
echo "Local branches:"
git branch -v

echo

# Check for stashes
if [ $(git stash list | wc -l) -gt 0 ]; then
  echo "Stashed changes found:"
  git stash list
fi

echo

echo "=== Diagnosis complete ==="
```

### Finding Problems

```bash
# Find large files
git rev-list --objects --all | sort -k 2 | uniq | \
  sort -rn -k 1 | head -20 | awk '{print $2}' | \
  xargs du -sh

# Find commits by author
git log --all --format='%h %ae %s' | grep 'email@example.com'

# Find commits touching specific file
git log -p -- src/file.js

# Find which commits contain a string
git log -S "search-string" -p

# Find commits between dates
git log --since="2024-01-01" --until="2024-02-01"

# Find commits in one branch but not another
git log main..feature
```

---

## Debugging Merge Issues

### Merge Analysis

```bash
# Before attempting merge
git merge --no-commit --no-ff feature-branch   # Preview merge
# Review changes
git status

# Abort if not satisfied
git merge --abort

# If conflicts exist
git diff --name-only --diff-filter=U             # Unmerged files
git diff --name-only --diff-filter=AA            # Both added
git diff --name-only --diff-filter=DD            # Both deleted

# View conflict details
git diff --staged                                 # Our changes
git diff HEAD                                    # Theirs changes
```

### Debugging Rebases

```bash
# Show rebase status
git status

# See what's being rebased
git log --oneline -n 10

# Abort rebase if stuck
git rebase --abort

# Or continue after fixing
git add .
git rebase --continue

# Check what commits will be rebased
git log --oneline main..HEAD
```

---

## Tracking Down Bugs

### Using Bisect Effectively

```bash
# Setup
git bisect start
git bisect bad HEAD                           # Current is broken
git bisect good v1.0.0                        # Known good version

# Git checks out a commit
# Test it...
if [ test-passes ]; then
  git bisect good
else
  git bisect bad
fi

# Repeat until commit found

# Automated bisect with script
git bisect run bash -c '
  npm install > /dev/null 2>&1 &&
  npm test > /dev/null 2>&1
'

# This skips commits that don't build
git bisect skip
```

### Blame for Investigation

```bash
# See who changed each line
git blame src/file.js

# Blame with dates
git blame -L 10,20 src/file.js              # Specific line range

# Who changed a specific line
git blame -L 15,15 src/file.js

# Ignore whitespace-only changes
git blame -w src/file.js

# Show blame with dates
git blame --date=short src/file.js

# Link to commit
git blame src/file.js | grep "specific line"
# Get commit hash
git show <commit-hash>
```

---

## Cleanup and Recovery

### Finding Lost Commits

```bash
# All recent commits (including deleted branches)
git reflog

# Get commit that was lost
git log --all --oneline | grep "message"

# Or use reflog directly
git reflog | grep "branch -D"
# Find commit before deletion

# Recover to new branch
git checkout -b recovered-branch <commit-hash>
```

### Cleaning Up

```bash
# Remove untracked files (DRY RUN)
git clean -nd
# -n: dry run, -d: directories

# Actually remove
git clean -fd

# Remove ignored files too
git clean -fdx

# Remove stale remote-tracking branches
git remote prune origin

# Show branches deleted locally but still on remote
git branch -vv | grep gone

# Delete those branches
git branch -D<branch>  # Locally
git push origin :<branch>  # Remotely
```

---

## Debugging Specific Scenarios

### "My commits disappeared"

```bash
# Check reflog
git reflog

# Find commit
git log --all --oneline | grep "message"

# Was it reset?
git ref reset --hard

# Or branch deleted?
git reflog
# Get commit before delete
git checkout -b recovered <commit-hash>
```

### "Wrong file committed"

```bash
# If not pushed yet
git reset HEAD~1                              # Keep changes
git rm <file>                                # Remove from Git
git commit -m "remove accidentally added file"

# If pushed
git revert <commit-hash>                     # Create opposite commit
# or
git filter-repo --path <file> --invert-paths # Remove from history
git push origin --force-with-lease           # Force push
```

### "What changed between versions"

```bash
# Specific file between versions
git diff v1.0.0 v2.0.0 -- src/file.js

# Summary of changes
git diff --stat v1.0.0 v2.0.0

# What commits are in v2.0.0 but not v1.0.0
git log v1.0.0..v2.0.0 --oneline

# Show lines added/deleted
git diff --numstat v1.0.0 v2.0.0
```

---

## Performance Debugging

### Slow Operations

```bash
# Measure operation time
time git status

# What's making Git slow?
# Run with trace
GIT_TRACE=1 git status

# Or with perf
git -c trace2.eventTarget=perf gc --aggressive

# Check packed-refs file (should avoid if possible)
wc -l .git/packed-refs

# Check object count
git count-objects -v
# high packs = needs optimization
```

### High Memory Usage

```bash
# Count files
git rev-list --all --objects | wc -l

# Count blobs vs trees
git rev-list --all --objects | cut -d' ' -f2 | sort -u | \
  grep -E '^\/' | wc -l

# Find largest objects
git rev-list --all --objects | \
  sort -k 2 | uniq | sort -rn -k 1 | head -20
```

---

## Git Configuration Issues

### Troubleshooting Config

```bash
# Check all config
git config --list --show-origin | sort

# Check for conflicting settings
git config --list | sort | uniq -d

# Reset to defaults
git config --global --unset core.autocrlf

# View config file directly
cat ~/.gitconfig
cat .git/config

# Check which setting takes precedence
git config --list --show-origin | grep setting-name
```

### Debug Why Commands Behave Different

```bash
# Check git version (might have bugs)
git --version

# Check safe settings
git config --list | grep -E "safe|protected"

# Check any hooks
ls -la .git/hooks/

# Verify remotes
git remote -v

# Check branch tracking
git branch -vv

# Manual tracking
git config branch<.branchname>.remote
git config branch.<branchname>.merge
```

---

## Debugging Scripts

### Test Git Functionality

```bash
#!/bin/bash
# test-git-setup.sh

echo "Testing Git setup..."

# Test SSH
echo -n "SSH key: "
ssh -T git@github.com 2>&1 | head -1

# Test HTTPS
echo -n "HTTPS: "
curl -I https://github.com 2>&1 | head -1

# Test credentials
echo -n "Git user: "
git config user.name

# Test remote
echo -n "Default remote: "
git remote get-url origin

# Test branch
echo -n "Current branch: "
git branch --show-current

# Test ability to push (simulate)
echo -n "Test push: "
cd /tmp && git clone --depth 1 https://github.com/torvalds/linux.git test-clone 2>&1 && echo "OK" || echo "FAILED"
```

