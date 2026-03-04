# Common Git Problems & Solutions

## Problem Categories

- [Authentication Issues](#authentication-issues)
- [Merge Conflicts](#merge-conflicts)
- [Undoing Changes](#undoing-changes)
- [Branch Management](#branch-management)
- [History Rewriting](#history-rewriting)
- [Performance Issues](#performance-issues)
- [Collaboration Issues](#collaboration-issues)

---

## Authentication Issues

### Problem 1: "Permission Denied (publickey)"

**Symptoms:**
- `git clone` fails with permission error
- SSH authentication not working
- Can't push to remote repository

**Solutions:**

**Solution 1A: SSH Not Configured**
```bash
# Check if SSH key exists
ls ~/.ssh/id_rsa

# Generate SSH key if missing
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Add to SSH agent
ssh-add ~/.ssh/id_rsa

# Test connection
ssh -T git@github.com
```

**Solution 1B: Wrong SSH Key Permissions**
```bash
# Fix permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

# Verify
ls -la ~/.ssh/
```

**Solution 1C: SSH Key Not Added to GitHub/GitLab**
1. Get public key: `cat ~/.ssh/id_rsa.pub`
2. Copy entire contents
3. Go to GitHub Settings → SSH and GPG Keys
4. Click "New SSH key" and paste
5. Test: `ssh -T git@github.com`

**Solution 1D: Using HTTPS Instead of SSH**
```bash
# Check current remote
git remote -v

# Change to HTTPS if needed
git remote set-url origin https://github.com/user/repo.git

# Using SSH (recommended)
git remote set-url origin git@github.com:user/repo.git
```

**Prevention:**
- Use SSH keys (more secure)
- Store keys securely
- Keep permissions restrictive
- Regenerate keys annually

---

### Problem 2: "fatal: could not read Username"

**Symptoms:**
- Can't push/pull with HTTPS
- Username/password prompt not working
- Authentication failures

**Solutions:**

**Solution 2A: Configure Git Credentials**
```bash
# Use credential helper (caches credentials)
git config --global credential.helper store

# Or use OS keychain
# macOS
git config --global credential.helper osxkeychain

# Windows
git config --global credential.helper wincred

# Linux
git config --global credential.helper cache
```

**Solution 2B: Generate Personal Access Token (GitHub)**
1. Go to Settings → Developer settings → Personal access tokens
2. Generate new token with `repo` permission
3. Use token as password when prompted

**Solution 2C: Cache Credentials Temporarily**
```bash
# Cache for 15 minutes
git config --global credential.helper cache --timeout=900

# Remove cached credentials
git credential reject
```

**Prevention:**
- Use tokens instead of passwords
- Regenerate tokens periodically
- Never commit credentials
- Use `.gitignore` for secrets

---

## Merge Conflicts

### Problem 3: Merge Conflict After Pull

**Symptoms:**
```
CONFLICT (content): Merge conflict in file.js
Automatic merge failed
```

**Solutions:**

**Solution 3A: View Conflict Markers**
```bash
# See conflict in file
cat file.js

# Output shows:
# <<<<<<< HEAD
# your changes
# =======
# their changes
# >>>>>>> branch-name
```

**Solution 3B: Resolve Conflict**
```bash
# Option 1: Keep your changes
git checkout --ours file.js

# Option 2: Keep their changes
git checkout --theirs file.js

# Option 3: Manual resolution
# Edit file, remove conflict markers:
# Keep both, pick one, or combine

# Mark as resolved
git add file.js

# Complete merge
git commit -m "Merge: resolve conflicts in file.js"
```

**Solution 3C: Use Mergetool**
```bash
# Configure mergetool
git config --global merge.tool meld
# or: vimdiff, difftool, VS Code, etc.

# Launch mergetool
git mergetool

# Accept current/incoming/both at prompts
```

**Solution 3D: Abort Merge**
```bash
# If conflicts too complex
git merge --abort

# Start over with different strategy
git merge -X theirs <branch>  # Accept their changes
git merge -X ours <branch>    # Accept your changes
```

**Prevention:**
- Pull frequently
- Keep branches short-lived
- Communicate with team
- Review before merging
- Use branch protection rules

---

### Problem 4: Merge Conflict After Rebase

**Symptoms:**
- Conflict during `git rebase`
- Rebase paused with conflict marker
- Can't continue rebase

**Solutions:**

**Solution 4A: Resolve and Continue**
```bash
# 1. Fix conflict markers in files
# 2. Stage resolved files
git add resolved-file.js

# 3. Continue rebase
git rebase --continue

# 4. Repeat until all commits rebased
```

**Solution 4B: Skip Conflicting Commit** 
```bash
# If conflict is in commit you want to skip
git rebase --skip

# Continue if more commits
git rebase --continue
```

**Solution 4C: Abort Rebase**
```bash
# Back to state before rebase started
git rebase --abort

# Try different approach (merge instead)
git merge origin/main
```

**Prevention:**
- Rebase only on local commits
- Never rebase pushed commits
- Communicate rebases with team
- Use merge for shared code

---

## Undoing Changes

### Problem 5: "How Do I Undo My Last Commit?"

**Symptoms:**
- Committed accidentally
- Wrong commit message
- Wrong files in commit

**Solutions:**

**Solution 5A: Undo Local Commit (Keep Changes)**
```bash
# Soft reset - keeps changed files staged
git reset --soft HEAD~1

# Files still staged, can modify and recommit
git status  # Shows staged changes
```

**Solution 5B: Undo Local Commit (Discard Changes)**
```bash
# Hard reset - discards all changes
git reset --hard HEAD~1

# WARNING: Data loss! Use reflog to recover
```

**Solution 5C: Undo Pushed Commit (Don't Rewrite History)**
```bash
# Create opposite commit (preferred for shared code)
git revert HEAD

# This creates new commit that undoes changes
# Keeps history intact for other developers
```

**Solution 5D: Fix Commit Message**
```bash
# Ammend commit (local only)
git commit --amend -m "Corrected message"

# Keep changes, just fix message
git commit --amend --no-edit
```

**Solution 5E: Get Commit Back After Hard Reset**
```bash
# Find lost commit
git reflog

# Output shows:
# abc123 HEAD@{0}: reset: moving to HEAD~1
# def456 HEAD@{1}: commit: lost commit message

# Restore
git reset --hard def456
```

**Prevention:**
- Review before committing: `git diff --staged`
- Use `git status` frequently
- Commit often (smaller commits safer)
- Never force-push to shared branches

---

### Problem 6: "I Committed to Wrong Branch"

**Symptoms:**
- Realized commits on `main` instead of feature branch
- Need to move commits

**Solutions:**

**Solution 6A: Move Commits to New Branch**
```bash
# 1. Create new branch from current position
git branch feature-branch

# 2. Reset main to before commits
git reset --hard origin/main

# 3. Switch to feature branch
git checkout feature-branch

# Commits are now on feature branch!
```

**Solution 6B: Cherry-pick to Correct Branch**
```bash
# 1. Note commit hashes
git log --oneline -3

# 2. Switch to correct branch
git checkout feature-branch

# 3. Cherry-pick the commits
git cherry-pick abc123 def456

# 4. Reset wrong branch
git checkout main
git reset --hard origin/main
```

**Prevention:**
- Check current branch: `git status`
- Use branch templates in IDE
- Configure git prompt to show branch
- Create feature branch first

---

## Branch Management

### Problem 7: "Can't Delete Branch"

**Symptoms:**
```
error: The branch 'branch-name' is not fully merged
```

**Solutions:**

**Solution 7A: Safe Delete (Branch Merged)**
```bash
# Normal delete
git branch -d branch-name

# Works only if fully merged into checked-out branch
```

**Solution 7B: Force Delete (Branch not Merged)**
```bash
# Force delete unmerged branch
git branch -D branch-name

# WARNING: May lose commits!
# Try cherry-pick first to save commits
```

**Solution 7C: Delete Remote Branch**
```bash
# Delete on origin
git push origin --delete branch-name

# Or older syntax
git push origin :branch-name

# Verify deletion
git branch -r
```

**Solution 7D: Clean Up Stale Branches**
```bash
# Remove tracking branches for deleted remotes
git remote prune origin

# Short method
git fetch --prune

# Or with pull
git pull --prune
```

**Prevention:**
- Merge branches before deleting
- List branches before deleting: `git branch -a`
- Use `--merged` flag to see merged branches
- Configure branch protection

---

### Problem 8: "Too Many Local Branches"

**Symptoms:**
- `git branch` shows 50+ branches
- Hard to find branches
- Confusion on what's active

**Solutions:**

**Solution 8A: List and Filter Branches**
```bash
# Show all branches
git branch -a

# Show merged branches (safe to delete)
git branch --merged

# Show unmerged branches
git branch --no-merged

# Show branches by date
git for-each-ref --sort=-committerdate refs/heads/
```

**Solution 8B: Delete Multiple Branches**
```bash
# Delete all merged local branches
git branch -d $(git branch --merged | grep -v "\*")

# Delete matching pattern
git branch -d feature/*  # All feature/* branches

# Delete except main
git branch | grep -v "main" | xargs git branch -d
```

**Solution 8C: Archive Branches**
```bash
# Instead of deleting, create archive tag
git tag archive/old-branch-name
git branch -d old-branch-name

# Later, can restore
git checkout -b restored archive/old-branch-name
```

**Prevention:**
- Don't create temporary branches
- Delete merged branches regularly
- Use branch naming conventions
- Use `git branch -vv` to see tracking branches

---

## History Rewriting

### Problem 9: "How Do I Remove Large Files from History?"

**Symptoms:**
- Accidentally committed large file
- File is now in history
- Can't just delete - history still has it

**Solutions:**

**Solution 9A: Using git filter-repo (Recommended)**
```bash
# Install git-filter-repo
pip install git-filter-repo

# Remove file from all history
git filter-repo --path file-to-remove --invert-paths

# After filtering:
# - History is rewritten
# - File is gone from all commits
# - Force push required
```

**Solution 9B: Using git filter-branch**
```bash
# Older method (slower)
git filter-branch --tree-filter \
  'rm -f large-file.zip' HEAD

# Caution: Slower, less reliable than filter-repo
```

**Solution 9C: Find Large Files First**
```bash
# Find largest files in repo
git rev-list --all --objects |
  sed -n $(git rev-list --objects --all | cut -f1 -d' ' | \
  git cat-file --batch-check | \
  grep blob | sort -k3 -n | tail -10 | while read hash type size; do \
  echo -n "-e s/$hash/$hash/p "; done) | \
  sort -k3 -n -r | head -10

# Simpler method
git log --all --pretty=format: --name-only | \
  sort | uniq -c | sort -rn | head | awk '{print $3}'
```

**Solution 9D: Prevent Future Large Files**
```bash
# Add to .gitignore
*.iso
*.exe
*.dmg
node_modules/
.env

# Add pre-commit hook
# .git/hooks/pre-commit
#!/bin/bash
git diff --cached --name-only | while read file; do
  size=$(git diff-index --cached HEAD -- "$file" | awk '{print $4}' | tail -1)
  if [ "$size" -gt 100000000 ]; then  # 100MB
    echo "File $file is too large"
    exit 1
  fi
done
```

**Prevention:**
- Use `.gitignore` properly
- Use `.gitattributes` for large files
- Use Git LFS for binary files
- Hook to prevent commits of large files

---

### Problem 10: "Need to Change Author of Old Commits"

**Symptoms:**
- Commits show wrong author
- Wrong email in history
- Need to fix for consistency

**Solutions:**

**Solution 10A: Quick Fix (Last Commit)**
```bash
# Fix author of most recent commit
git commit --amend --author="Name <email@example.com>"
```

**Solution 10B: Fix Multiple Commits**
```bash
# Interactive rebase to last N commits
git rebase -i HEAD~3

# Mark commits as 'e' for edit
# git will stop at each commit
# Then:
git commit --amend --author="Name <email@example.com>"
git rebase --continue
```

**Solution 10C: Fix All Commits (filter-repo)**
```bash
# Use mailmap to remap authors
echo "Correct Name <correct@example.com> Wrong Name <wrong@example.com>" \
  > .mailmap
git filter-repo --use-mailmap
```

**Solution 10D: Search and Replace Author**
```bash
# Using git filter-repo
git filter-repo --mailmap <(cat <<EOF
Correct Name <correct@example.com> <wrong@example.com>
EOF
)
```

**Prevention:**
- Configure Git properly: `git config user.name/email`
- Use `git config --global` for system-wide
- Verify config: `git config --list`
- Add `.mailmap` to map emails

---

## Performance Issues

### Problem 11: "Clone is Very Slow"

**Symptoms:**
- `git clone` takes hours
- Network constantly maxed
- Large repository

**Solutions:**

**Solution 11A: Shallow Clone**
```bash
# Clone only recent history
git clone --depth 1 <url>

# Reduces download by 90%+
# Depth 50 is usually sufficient
git clone --depth 50 <url>
```

**Solution 11B: Sparse Checkout**
```bash
# Clone only specific directories
git clone --sparse <url>
git sparse-checkout init --cone
git sparse-checkout set src/  # Only src/ directory
```

**Solution 11C: Single Branch Clone**
```bash
# Clone only specific branch
git clone --single-branch --branch main <url>

# Much faster than cloning all branches
```

**Solution 11D: Reduce Git Object Size**
```bash
# On server side (periodic maintenance)
git gc --aggressive

# On client side
git gc

# Repack with high compression
git repack -Ad
```

**Prevention:**
- Use `.gitignore` to exclude binaries
- Use Git LFS for large files
- Clean up merged branches
- Regular server-side maintenance

---

### Problem 12: "Push/Pull is Slow"

**Symptoms:**
- Network operations hang
- Pushing a few commits takes minutes
- Repository is slow overall

**Solutions:**

**Solution 12A: Check Repository Size**
```bash
# Total repo size
du -sh .git

# Show pack files
ls -lh .git/objects/pack/

# Find large objects
git rev-list --all --objects | \
  cut -f2 -d' ' | \
  sort | uniq | grep -o '[^/]*$' | \
  sort | uniq -c | sort -rn | head
```

**Solution 12B: Optimize Repository**
```bash
# Remove unreachable objects
git gc --aggressive

# Prune old data
git prune --expire=now

# Verify repository
git fsck --full
```

**Solution 12C: Check Network**
```bash
# Test connection speed
git fetch --dry-run -v

# Use SSH instead of HTTPS
git remote set-url origin git@github.com:user/repo.git

# Check for large files in push
git diff origin/main --stat | sort -k3 -rn
```

**Prevention:**
- Use shallow clones for large repos
- Split monorepo if possible
- Use LFS for binaries
- Regular garbage collection

---

## Collaboration Issues

### Problem 13: "Teammate Force-Pushed, Lost Work"

**Symptoms:**
- Remote branch history changed
- `git pull` fails
- Commits disappeared

**Solutions:**

**Solution 13A: Recover from Reflog**
```bash
# Your local reflog may have commits
git reflog

# Find lost commit hash
git checkout -b recovery <hash>

# Or cherry-pick it back
git cherry-pick <hash>
```

**Solution 13B: When Cloning After Force-Push**
```bash
# Remove local tracking
git fetch --prune

# Re-fetch clean copy
git fetch origin

# Reset to remote
git reset --hard origin/main
```

**Solution 13C: Protect from Force-Push**
```bash
# Prevent force-push in Git
git config receive.denyForcePushes true

# Use GitHub Branch Protection
# Settings → Branches → Add Rule
# Check "Restrict who can push to matching branches"
```

**Prevention:**
- Forbid force-push on main
- Use pull requests for merges
- Code review before merge
- No force-pushing to shared branches

---

### Problem 14: "Multiple People Editing Same File"

**Symptoms:**
- Merge conflicts constantly
- Both people changing same lines
- Difficult to coordinate

**Solutions:**

**Solution 14A: Coordinate with Team**
```bash
# Discuss before editing shared files
# Use comments: // EDITING: file.js - John

# Create separate feature branches
# Merge frequently
git pull origin main

# Small, focused commits
git commit -m "feature: Add login form validation (don't touch header)"
```

**Solution 14B: Use Code Ownership**
```bash
# Create CODEOWNERS file at repo root
# src/auth/* @john
# src/ui/* @jane
# * @manager

# GitHub enforces review from code owner
```

**Solution 14C: Split Files**
```bash
# Instead of shared file.js
# Create: auth.js, ui.js, utils.js
# Owned by different people

# Easier to manage, fewer conflicts
```

**Solution 14D: Merge Strategy**
```bash
# Use "ours" to prefer your version
git merge -X ours <branch>

# Use "theirs" to prefer their version
git merge -X theirs <branch>

# This is for configuration conflicts mainly
```

**Prevention:**
- Clarify code ownership
- Use PR review process
- Communicate about changes
- Keep commits small
- Use feature flags for concurrent work

---

## Quick Reference

| Problem | Quick Solution |
|---------|---|
| SSH auth fails | `ssh-keygen` + add key to GitHub |
| Can't push | `git remote set-url origin git@...` |
| Merge conflict | Edit file, remove markers, `git add`, `git commit` |
| Undo commit | `git reset --soft HEAD~1` (keep changes) |
| Wrong branch | `git branch feature` + `git reset --hard origin/main` |
| Delete branch | `git branch -d branch-name` (just merged) |
| Slow clone | `git clone --depth 1 <url>` |
| Lost commit | `git reflog` → find hash → `git checkout -b recover <hash>` |
| Large file | `git filter-repo --path file --invert-paths` |
| Slow push/pull | `git gc --aggressive` + check file sizes |

---

## When Testing Solutions

1. **Create Backup**
   ```bash
   git branch backup-$(date +%s)
   ```

2. **Try Solution**
   - Follow steps
   - Monitor output for errors

3. **Verify Success**
   ```bash
   git status
   git log --oneline -5
   ```

4. **If Failed**
   - Don't panic
   - Check git reflog
   - Switch to backup branch
   - Try different approach

---

## Getting Help

- [Troubleshooting Guide](./git-comprehensive-guides/TROUBLESHOOTING.md) - 20+ scenarios
- [Diagnosis Guide](./git-comprehensive-guides/DIAGNOSIS_GUIDE.md) - How to diagnose Git problems
- [Commands Cheatsheet](./git-comprehensive-guides/COMMANDS_CHEATSHEET.md) - All commands reference
- [Advanced Git Guide](./git-comprehensive-guides/ADVANCED_GIT.md) - Deep dives

