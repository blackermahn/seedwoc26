# Chapter 1: Git and Version Control - Solutions and Scenarios

## Module 1, Part 2: Core Git Workflows - Exercise Solutions

### Exercise 1: The Three-State Model Workflow
```bash
# Create a new file
echo "function hello() { alert('hi'); }" > app.js

# Stage the file (Working → Staging)
git add app.js

# Check status
git status
# On branch main
# Changes to be committed:
#   new file:   app.js

# Commit (Staging → Repository)
git commit -m "feat: Add hello function"

# Check log
git log --oneline
# a1b2c3d feat: Add hello function
```

### Exercise 2: Staging Different Changes Separately
```bash
# Create file with multiple changes
cat > config.js << 'EOF'
const PORT = 3000;
const HOST = 'localhost';
const DEBUG = true;
EOF

git add config.js
git commit -m "feat: Add basic config"

# Now make multiple changes
cat > config.js << 'EOF'
const PORT = 3000;      // Updated to 8080 in production
const HOST = 'localhost'; // Updated to 0.0.0.0 in production
const DEBUG = true;
const API_KEY = "secret123";
const TIMEOUT = 5000;
EOF

# Stage only config changes (not API changes)
git add -p  # Opens interactive patch mode
# This allows you to choose which hunks to stage

# Stage just the config
git commit -m "config: Update port documentation"

# Then stage the API changes
git add config.js
git commit -m "feat: Add timeout and API key config"
```

### Exercise 3: Viewing Commit History
```bash
# See commits that changed app.js
git log --oneline app.js
# Shows only commits affecting this file

# See commits with diffs
git log -p  # Opens pager with full diffs
git log -p -2  # Last 2 commits with diffs

# See commit statistics
git log --stat
# Showing files changed, insertions, deletions per commit

# Find who changed a specific line
git blame app.js
# Shows each line with author and commit hash
```

### Exercise 4: Undoing Mistakes - Restore Working Directory
```bash
# Made changes you want to discard
echo "console.log('oops');" >> app.js

# See what changed
git diff app.js

# Discard all changes to this file
git restore app.js
# File reverts to last committed version

# Or restore specific version from commit
git restore --source=HEAD~1 app.js
# Restores file to version from 1 commit ago
```

### Exercise 5: Undoing Mistakes - Reset Staging Area
```bash
# Accidentally staged wrong file
git add wrong.js app.js

# Check what's staged
git status

# Unstage the wrong file
git restore --staged wrong.js

# Check again
git status
# wrong.js is now untracked/modified
# app.js is still staged
```

### Exercise 6: Undoing Mistakes - Modify Last Commit
```bash
# Commit but forgot to include a file
git commit -m "Add authentication"

# Add the forgotten file
git add auth-test.js

# Amend the last commit
git commit --amend --no-edit
# Adds the file to last commit without changing message

# Or if you want to change the message
git commit --amend -m "feat: Add authentication and tests"

# See the result
git log --oneline -2
```

## Module 1, Part 3: Branching Fundamentals - Exercise Solutions

### Exercise 1: Feature Branch Workflow
```bash
# Start from main branch
git checkout main
git pull origin main

# Create new feature branch
git checkout -b feat/user-authentication
# Or modern syntax:
git switch -c feat/user-authentication

# Make changes
echo "const login = (user, pass) => { /* ... */ }" > auth.js
git add auth.js
git commit -m "feat: Add login function"

# Push to remote
git push origin feat/user-authentication

# Switch back to main
git switch main

# Check that main is unchanged
git log --oneline -1
# You see the commit before your feature branch work
```

### Exercise 2: Three-Way Merge
```bash
# Create feature branch from main
git switch main
git switch -c feature/dashboard

# Make changes on feature branch
echo "const dashboard = () => { /* ... */ }" > dashboard.js
git add dashboard.js
git commit -m "feat: Add dashboard component"

# Meanwhile, someone else committed to main
git switch main
echo "const utils = () => { /* ... */ }" > utils.js
git add utils.js
git commit -m "feat: Add utility functions"

# Now merge feature into main
git merge feature/dashboard
# Git performs three-way merge:
# - Base: last common ancestor
# - Ours: main
# - Theirs: feature/dashboard
# Auto-creates merge commit because branches diverged

git log --graph --oneline --all
# Shows branching history and merge commit
```

### Exercise 3: Conflict Resolution
```bash
# Create conflicting branches
git switch -c branch-a
echo "const version = '1.0'" > version.js
git add version.js
git commit -m "versions: Set version to 1.0"

git switch main
echo "const version = '2.0'" > version.js
git add version.js
git commit -m "versions: Set version to 2.0"

# Try to merge
git merge branch-a
# CONFLICT (content): Merge conflict in version.js
# You have both versions in file:
# <<<<<<< HEAD
# const version = '2.0'
# =======
# const version = '1.0'
# >>>>>>> branch-a

# Manually resolve (keep 2.0)
echo "const version = '2.0'" > version.js
git add version.js
git commit -m "merge: Resolve version conflict"
```

### Exercise 4: Fast-Forward Merge vs Merge Commit
```bash
# Fast-forward scenario (no divergence)
git switch main
git switch -c hotfix/critical-bug

echo "// Bug fix" > bug.js
git add bug.js
git commit -m "fix: Critical security bug"

# main hasn't changed, so merge is just moving the pointer
git switch main
git merge hotfix/critical-bug
# Fast-forward merge - no merge commit created

git log --oneline
# Shows linear history, no branching


# Non-fast-forward scenario (with --no-ff)
git switch -c feature/large-feature
echo "// Feature" > feature.js
git add feature.js
git commit -m "feat: Large feature part 1"

git switch main
echo "// Other work" > other.js
git add other.js
git commit -m "docs: Update README"

# Merge with merge commit
git merge --no-ff feature/large-feature -m "Merge feature/large-feature"

git log --graph --oneline
# Shows explicit merge commit even if fast-forward possible
```

## Module 2, Part 1: GitHub Essentials - Exercise Solutions

### Exercise 1: Clone a Repository
```bash
# Clone someone's public repository
git clone https://github.com/username/project.git
cd project

# See remote configuration
git remote -v
# origin  https://github.com/username/project.git (fetch)
# origin  https://github.com/username/project.git (push)

# Clone specific branch
git clone -b main https://github.com/username/project.git
```

### Exercise 2: Set Up SSH Key
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"
# Prompts for location and passphrase
# Creates ~/.ssh/id_ed25519 and ~/.ssh/id_ed25519.pub

# Copy public key
cat ~/.ssh/id_ed25519.pub
# Output starts with "ssh-ed25519"

# Add to GitHub:
# Settings → SSH and GPG keys → New SSH key → Paste

# Test connection
ssh -T git@github.com
# Hi username! You've successfully authenticated...

# Now use SSH URLs
git clone git@github.com:username/project.git
```

### Exercise 3: Create and Manage Remotes
```bash
# View remotes
git remote -v

# Add new remote (for fork)
git remote add upstream https://github.com/original/project.git

# Now you have two remotes
git remote -v
# origin (your fork)
# upstream (original)

# Fetch from upstream
git fetch upstream

# Merge upstream into your main
git switch main
git merge upstream/main

# Remove remote you don't need
git remote remove old-remote
```

### Exercise 4: Fork and Contribute
```bash
# Fork on GitHub (web interface)

# Clone YOUR fork
git clone git@github.com:YOUR-USERNAME/project.git

# Add upstream
git remote add upstream git@github.com:ORIGINAL/project.git

# Create feature branch
git switch -c fix/typo-in-readme

# Make changes
echo "Fixed typo" >> README.md
git add README.md
git commit -m "fix: Correct typo in README"

# Push to YOUR fork
git push origin fix/typo-in-readme

# Create Pull Request on GitHub
# Then wait for maintainer to review and merge
```

## Module 2, Part 2: Pull Requests - Exercise Solutions

### Exercise 1: Create Professional PR
```bash
# On feature branch after committing
git push origin feature/search

# PR Title: "feat: Add full-text search to product listings"

# PR Description:
"""
## Description
Adds a full-text search feature for product listings to improve user experience.

## Changes Made
- Added SearchInput component with debouncing
- Implemented search filtering logic
- Added unit tests for search functionality
- Updated user documentation

## Testing
- Tested with 100+ products
- Verified search performance with slow networks
- Cross-browser tested (Chrome, Firefox, Safari)

## Checklist
- [x] Code follows project style guide
- [x] Added tests for new functionality
- [x] Updated documentation
- [x] Ready for review
"""
```

### Exercise 2: Handle Review Feedback
```bash
# Reviewer asks for changes
# You make updates on same branch

echo "// Improved search" > search.js
git add search.js
git commit -m "review: Improve search performance"

# Push to same branch
git push origin feature/search

# PR automatically updates with new commits
# Conversation continues in PR comments

# Mark conversation as resolved when done
# Then click "Request review" when ready for another look
```

### Exercise 3: Merge Strategies
```bash
# Squash merge - combine all commits into one
git merge --squash feature/branch
git commit -m "feat: Add new feature"
# Result: Single commit on main

# Rebase and fast-forward - clean linear history
git merge --ff-only feature/branch
# Fails if can't fast-forward
# Forces clean linear history

# Regular merge - preserves full history
git merge feature/branch
# Creates merge commit if necessary
```

## Module 2, Part 3: Advanced Workflows - Exercise Solutions

### Exercise 1: Interactive Rebase
```bash
# See last 3 commits
git log --oneline -3
# abc1234 Fix typo
# def5678 Add feature
# ghi9012 Start feature

# Start interactive rebase
git rebase -i HEAD~3
# Opens editor with:
# pick ghi9012 Start feature
# pick def5678 Add feature
# pick abc1234 Fix typo

# Squash the typo fix into feature commit
# pick ghi9012 Start feature
# pick def5678 Add feature
# squash abc1234 Fix typo

# Save file, then provide final commit message

# Result: 2 commits instead of 3
git log --oneline -2
```

### Exercise 2: Cherry-Pick Specific Commit
```bash
# In hotfix branch, you fixed a bug
git switch hotfix/critical
git log --oneline
# a1b2c3d Fix critical memory leak

# You also need this fix in main
git switch main
git cherry-pick a1b2c3d

# Commit is now applied to main
# without pulling the hotfix branch merge
git log --oneline -1
# a1b2c3d Fix critical memory leak (same message, different hash)
```

### Exercise 3: Handle Complex Merges
```bash
# You have long-running feature branches
git switch feature/large-redesign
git log --oneline | head -5

# Main has 20 new commits you need
git fetch origin
git rebase origin/main

# Conflicts in 3 files
# Resolve them:
# 1. Open conflicted files
# 2. Choose correct versions
# 3. Test thoroughly

git add resolved-files
git rebase --continue

# Continue until rebase completes
# Now push (force) to your feature branch
git push origin feature/large-redesign --force-with-lease
```

## Practical Workflow Example: Team Collaboration

```bash
# Day 1: Start new feature
git switch main
git pull origin main
git switch -c feature/user-profile

# Make changes, commit regularly
git commit -m "feat: Add profile page structure"
git commit -m "feat: Add profile form component"
git commit -m "feat: Add profile API integration"

# Push for backup and visibility
git push origin feature/user-profile

# Day 2: Continue work
git pull origin main  # Get any new changes
git rebase origin/main  # Update branch with latest main

# Solve merge conflicts if needed
# Continue development...
git commit -m "fix: Handle null profile data"

# Day 3: Ready for review
git push origin feature/user-profile
# Create Pull Request on GitHub

# Day 4: Address review feedback
git commit -m "review: Add loading state to profile"
git push origin feature/user-profile

# Day 5: Approval and merge
# Click "Squash and merge" or "Rebase and merge"
# Delete feature branch

# Back on main
git switch main
git pull origin main
git branch -d feature/user-profile  # Local cleanup
git branch -D feature/user-profile  # Force delete if needed
```

## Mistake Recovery Scenarios

### Scenario 1: Pushed to Wrong Branch
```bash
# Oh no, pushed to main instead of feature branch!
git log origin/main -1           # See what you pushed
git revert HEAD                  # Create reverting commit
git push origin main

# Or if not pushed yet, just reset
git reset HEAD~1                 # Undo locally
```

### Scenario 2: Lost Commits in Rebase
```bash
# Don't panic! Git saves everything
git reflog
# Shows all HEAD movements

# Find your lost commits
# abc1234 HEAD@{5}: rebase -i (finish)
# your-commit-hash HEAD@{6}: rebase -i (start)

# Create branch from lost commit
git switch -c recovery-branch abc1234

# Or reset if things went very wrong
git reset --hard your-commit-hash
```

### Scenario 3: Deleted Branch by Mistake
```bash
# Your feature branch is gone?
git reflog
# Shows deleted branch reference

# Recover it
git switch -c recovered-branch recovered-commit-hash
```
