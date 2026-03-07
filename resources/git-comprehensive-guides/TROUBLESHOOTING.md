# Git Troubleshooting Guide

## Common Problems and Solutions

### Problem: "detached HEAD" State

**Symptom:**
```
HEAD detached at abc1234
```

**What It Means:**
- You're on a specific commit, not a branch
- Usually happens when you `git checkout <commit-hash>`

**Solution:**
```bash
# Option 1: Create a branch from current position
git switch -c new-branch

# Option 2: Go back to main
git switch main

# Option 3: Check what you want to keep
git log --oneline
git switch -c save-changes HEAD
```

---

### Problem: "Your Local Changes Would Be Overwritten"

**Symptom:**
```
error: Your local changes to the following files would be overwritten by merge
```

**Causes:**
- Unstaged changes exist
- Uncommitted modifications

**Solution:**
```bash
# Option 1: Stash changes, pull, re-apply
git stash
git pull
git stash pop

# Option 2: Commit changes first
git add .
git commit -m "WIP: work in progress"
git pull

# Option 3: Discard changes (be careful!)
git restore .
git pull
```

---

### Problem: "Everything Up to Date" But Changes Aren't Synced

**Symptom:**
- Pull says "Already up to date"
- But remote has new commits

**Causes:**
- Different branch
- Remote branch not fetched yet

**Solution:**
```bash
# Fetch latest
git fetch origin

# Check current branch
git branch

# Switch to correct branch if needed
git switch main

# Merge remote into local
git pull origin main

# Or force sync
git reset --hard origin/main
```

---

### Problem: Pushed to Wrong Branch

**Symptom:**
- Made commits to main instead of feature branch
- Or pushed feature code to wrong remote

**Solution:**
```bash
# Undo commits locally
git reset --soft HEAD~3  # Keep changes
git reset --hard origin/main  # Or discard

# Push correct branch
git switch -c feature/my-feature
git add .
git commit -m "feat: proper feature"
git push origin feature/my-feature
```

---

### Problem: Merge Conflict Won't Resolve

**Symptom:**
```
CONFLICT (content): Merge conflict in file.js
```

**Complex Resolution:**
```bash
# View conflict
cat file.js
# See <<<<<<, ======, >>>>>>

# Use merge tool
git mergetool

# Or resolve manually
vim file.js
# Edit to combine changes
# Remove conflict markers

# Mark resolved
git add file.js
git commit -m "merge: resolve conflicts"
```

---

### Problem: Lost Commits Due to Reset

**Symptom:**
- Did `git reset --hard`
- Commits disappeared!

**Solution:**
```bash
# Check reflog
git reflog

# Find your lost commits
# They're likely there!

# Recover
git switch -c recovered <commit-hash>

# Or just reset back
git reset --hard <commit-hash>
```

---

### Problem: Branch Won't Delete

**Symptom:**
```
error: The branch 'feature/xyz' is not fully merged into 'main'
```

**Solution:**
```bash
# Force delete (loses any unmerged commits)
git branch -D feature/xyz

# Or merge first
git switch main
git merge feature/xyz
git branch -d feature/xyz
```

---

### Problem: Large File Accidentally Committed

**Symptom:**
- Git repo suddenly huge
- Slow operations
- Large file shouldn't be there

**Solution:**
```bash
# If not pushed yet
git reset HEAD~1
git restore path/to/large-file

# If already pushed
git filter-repo --path large-file.zip --invert-paths
git push --force-with-lease

# Add to .gitignore
echo "large-file.zip" >> .gitignore
git commit -am "gitignore: exclude large files"
```

---

### Problem: Can't Remember Commit Hash

**Symptom:**
- Need to reference a commit but can't remember hash

**Solution:**
```bash
# Search by message
git log --grep="user authentication"

# Search by file changes
git log -- path/to/file.js

# Search by date
git log --since="2 weeks ago"

# Get recent commits
git log --oneline | head -20

# Search for deleted code
git log -S "specific line of code"
```

---

### Problem: Accidentally Removed Important Branch

**Symptom:**
- Deleted a branch but needed it
- `git branch -d` removed it

**Solution:**
```bash
# Find in reflog
git reflog

# Restore
git switch -c restored-branch <commit-hash>
```

---

### Problem: Two Developers Made Same Changes

**Symptom:**
- Merge conflict on every file
- Both developers edited everything

**Solution:**
```bash
# Communicate first!
# Coordinate merge strategy

# Option 1: One person rebases entirely on other
git rebase origin/main  # Take all remote changes

# Option 2: Careful manual merge
# Resolve conflicts systematically

# Option 3: Start over (last resort)
git reset --hard origin/main
# Manually apply your unique changes only
```

---

### Problem: Repository Corrupted

**Symptom:**
```
fatal: bad object
fatal: Not a valid object name
```

**Solution:**
```bash
# Check integrity
git fsck --full

# Repair
git reflog expire --expire=now --all
git gc --prune=now

# Worst case: clone fresh, compare files
git clone...

# Contact team lead - may need to recover from backup
```

---

### Problem: `.gitignore` Not Working

**Symptom:**
- File in `.gitignore` still tracked
- Still appears in commits

**Causes:**
- File already tracked before adding to `.gitignore`

**Solution:**
```bash
# Remove from tracking
git rm --cached path/to/file
# or for directory
git rm --cached -r path/to/directory/

# Update `.gitignore`
echo "*.log" >> .gitignore

# Commit
git commit -m "gitignore: exclude log files"

# All new .log files ignored, old ones removed
```

---

### Problem: Wrong User Configuration

**Symptom:**
- Commits show wrong author name/email
- Commits from colleague show on your profile

**Solution:**
```bash
# Check current configuration
git config user.name
git config user.email

# Update for this repo only
git config user.name "Your Name"
git config user.email "you@example.com"

# Amend last commit
git commit --amend --reset-author

# Fix many commits
git filter-repo --name-only --replace-refs update_refs \
  --commit-callback '
    commit.author_email = b"correct@email.com"
    commit.author_name = b"Correct Name"
  '
```

---

### Problem: Line Endings Causing Issues

**Symptom:**
- Commits show whole file as changed
- Only line endings different (CRLF vs LF)

**Solution:**
```bash
# Configure Git to handle line endings
git config --global core.autocrlf true  # Windows
git config --global core.autocrlf input # Mac/Linux

# Normalize existing repo
git add --renormalize .
git commit -m "fix: normalize line endings"
```

---

### Problem: SSH Key Not Working

**Symptom:**
```
permission denied (publickey)
```

**Solution:**
```bash
# Generate new key
ssh-keygen -t ed25519 -C "you@example.com"

# Add to GitHub
cat ~/.ssh/id_ed25519.pub
# Copy to GitHub Settings → SSH Keys

# Test connection
ssh -T git@github.com

# For specific hosts
# Add to ~/.ssh/config
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
```

---

### Problem: GitHub Authentication Failed

**Symptom:**
```
fatal: Authentication failed
```

**Causes:**
- Wrong password
- HTTPS instead of SSH
- Token expired or revoked

**Solution:**
```bash
# Switch to SSH
git remote set-url origin git@github.com:user/repo.git

# Or regenerate token
# GitHub → Settings → Developer settings → Personal access tokens
# Create new token
# Use as password when prompted

# Or use credential helper
git config --global credential.helper store
# Next push, enter password - it's cached
```

---

## Quick Reference Table

| Problem | Command | Notes |
|---------|---------|-------|
| Stash work | `git stash` | Temporary save |
| Unstage file | `git restore --staged FILE` | Keep changes |
| Discard changes | `git restore FILE` | Lose changes |
| Undo last commit | `git reset --soft HEAD~1` | Keep changes |
| Undo pushed commit | `git revert COMMIT` | Safe method |
| Find commit | `git log --grep="text"` | Search |
| Recover lost commits | `git reflog` | Find & restore |
| Fix wrong branch | `git reset --hard origin/main` | Reset to remote |
| Check status | `git status` | Always first! |
