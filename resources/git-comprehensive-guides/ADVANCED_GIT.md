# Advanced Git Workflows and Techniques

## Deep Dive: Advanced Git Operations

### Stash: Temporary Workspace Storage

```bash
# Save work without committing
git stash

# List all stashes
git stash list

# Apply most recent stash
git stash pop

# Apply specific stash
git stash apply stash@{2}

# Keep stash after applying
git stash apply

# Drop stash
git stash drop stash@{0}

# Create named stash
git stash save "feature-in-progress"

# Stash only staged changes
git stash push -S

# Stash only unstaged changes
git stash push -u
```

### Reflog: The Safety Net

```bash
# View all HEAD movements
git reflog

# Recover deleted branch
git reflog
# Find the commit hash
git switch -c recovered HEAD@{5}

# Undo a rebase that went wrong
git reflog
git reset --hard HEAD@{3}

# View specific file history
git reflog path/to/file.js
```

### Bisect: Find the Bug

```bash
# Start bisect session
git bisect start

# Mark current as bad
git bisect bad

# Mark known good commit
git bisect good v1.0.0

# Git automatically checks out middle commit
# Test it...

# Mark result
git bisect good  # or git bisect bad

# Continue until found
# Git narrows down automatically

# End bisect
git bisect reset
```

### Worktree: Parallel Work

```bash
# Create separate working directory
git worktree add ../hotfix main

# Work in hotfix directory
cd ../hotfix
# Make changes, commit, push

# Back to main repo
cd ../main

# List worktrees
git worktree list

# Remove worktree
git worktree remove ../hotfix
git worktree prune
```

### Submodules: Include Other Repos

```bash
# Add submodule
git submodule add https://github.com/author/repo.git path/to/submodule

# Clone with submodules
git clone --recurse-submodules https://github.com/user/project.git

# Update submodules
git submodule update --remote

# Initialize submodules in cloned repo
git submodule init
git submodule update
```

### Tags: Release Management

```bash
# Create lightweight tag
git tag v1.0.0

# Create annotated tag (recommended)
git tag -a v1.0.0 -m "Release version 1.0.0"

# List tags
git tag -l
git tag -l "v1.*"

# Push tags
git push origin v1.0.0
git push origin --tags

# Delete tag
git tag -d v1.0.0
git push origin --delete v1.0.0

# Show tag info
git show v1.0.0

# Checkout tag
git switch -c release-1.0 v1.0.0
```

### Hooks: Automation

```bash
# Hook locations: .git/hooks/

# Pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
npm run lint
if [ $? -ne 0 ]; then
  echo "Lint failed!"
  exit 1
fi
EOF
chmod +x .git/hooks/pre-commit

# Post-commit hook
cat > .git/hooks/post-commit << 'EOF'
#!/bin/bash
echo "Commit successful!"
EOF

# Pre-push hook
cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash
npm test
if [ $? -ne 0 ]; then
  echo "Tests failed!"
  exit 1
fi
EOF
```

### Search and Analysis

```bash
# Find commits by author
git log --author="Alice"

# Find commits by message
git log --grep="fix:"

# Show commits with keyword
git log -S "functionName"

# Show commits affecting specific line
git blame path/to/file.js

# Get statistics
git shortlog --summary --numbered

# Who made changes to file
git log -p path/to/file.js

# When was this line last modified
git log -L 10,20:path/to/file.js
```

---

## Performance Optimization

### Large Repository Handling

```bash
# Shallow clone for large repos
git clone --depth 1 https://github.com/user/large-repo.git

# Fetch more history later
git fetch --unshallow

# Partial clone (objects as needed)
git clone --filter=blob:none https://github.com/user/repo.git

# Only checkout sparse directories
git sparse-checkout init --cone
git sparse-checkout set src/
```

### Cleanup and Optimization

```bash
# Remove untracked files
git clean -fd

# Remove only files (not directories)
git clean -f

# Show what would be deleted
git clean -fdDry-run

# Garbage collection
git gc

# Aggressive garbage collection
git gc --aggressive

# Check repository integrity
git fsck --full

# Repack objects
git repack -ad
```

### Server Operations

```bash
# Create bare repository
git init --bare project.git

# Mirror repository
git clone --mirror https://github.com/user/repo.git

# Push to mirror
git push --mirror

# Set up Git server with SSH
# Add to ~/.ssh/config
Host git.example.com
  HostName git.example.com
  User git
  IdentityFile ~/.ssh/github_rsa
```

---

## Security and Safety

### Signed Commits

```bash
# Generate GPG key
gpg --gen-key

# List keys
gpg --list-keys

# Configure Git to sign commits
git config --global user.signingkey YOUR_KEY_ID

# Sign commits by default
git config --global commit.gpgsign true

# Sign a specific commit
git commit -S -m "Signed commit"

# Verify signatures
git log --show-signature

# Check a signed tag
git tag --verify v1.0.0
```

### Access Control

```bash
# SSH keys instead of HTTPS
ssh-keygen -t ed25519 -C "your.email@example.com"

# Restrict branch access (on server)
# In update hook: prevent force pushes, require reviews

# Require code review before merge
# GitHub: Settings → Branches → Protection

# Require signed commits to merge
# GitHub: Settings → Branches → Require signed commits
```

### Data Protection

```bash
# Never commit secrets!
# Use .gitignore for:
.env
.env.local
*.key
*.pem
secrets/
credentials.json

# Remove accidentally committed secret
git filter-repo --path secret.txt --invert-paths

# Or if not shared yet:
git reset HEAD~1
git checkout path/to/sensitive-file
git commit -m "Remove sensitive file"
```

---

## Troubleshooting Complex Scenarios

### Undo Pushed Commits

```bash
# Option 1: Revert (safe, creates new commit)
git revert HEAD

# Option 2: Reset locally, force push (dangerous!)
git reset --hard HEAD~1
git push --force-with-lease

# Better: Use --force-with-lease instead of --force
# It only works if no one else pushed
```

### Recover Lost Commits

```bash
# Find in reflog
git reflog
# Look for lost commit

# Restore
git switch -c recovery <commit-hash>

# Or reset directly
git reset --hard <commit-hash>
```

### Fix Wrong Branch Merge

```bash
# If you merged wrong branch into main:

# Option 1: Revert the merge
git revert -m 1 <merge-commit>

# Option 2: Reset and re-merge correct branch
git reset --hard HEAD~1
git merge correct-branch
```

### Resolve Complicated Merge Conflicts

```bash
# Use theirs (from branch being merged)
git checkout --theirs path/to/file

# Use ours (current branch)
git checkout --ours path/to/file

# Manual resolution
git mergetool

#After resolving all
git add .
git commit -m "resolve: merge conflicts"
```

---

## Team Coordination

### Multi-Site Development

```bash
# Clone from multiple places
git remote add origin https://github.com/org/repo.git
git remote add backup https://git-backup.example.com/repo.git

# Fetch from both
git fetch origin
git fetch backup

# Sync between remotes
git push backup main
```

### Code Review Workflow

```bash
# 1. Developer creates PR
git push origin feature/my-feature
# GitHub workflow: Create PR → Get reviews → Merge

# 2. Reviewer suggests changes
# In GitHub: Review → Request changes with comments

# 3. Developer updates
git commit -am "review: address feedback"
git push origin feature/my-feature
# PR auto-updates

# 4. Merge when approved
git switch main
git pull origin main
git merge feature/my-feature
git push origin main

# 5. Cleanup
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

### Large Feature Development

```bash
# Long-running feature branch
git switch -c epic/big-feature

# Regular syncs with main
git fetch origin
git rebase origin/main
# or
git merge origin/main

# Multiple PRs from same branch
# Split into smaller PRs if possible
git push origin epic/big-feature

# Keep PR up-to-date before merge
git rebase origin/main
git push origin epic/big-feature --force-with-lease
```

---

## GitOps and Automation

### Continuous Integration

```bash
# GitHub Actions example
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: npm test
```

### Automated Deployments

```bash
# Deploy on tagged releases
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
# Trigger: GitHub Actions builds and deploys automatically

# Deploy on main branch
git push origin main
# Automatic deployment to production
```

### Commit-based Triggers

```bash
# Deploy when specific files change
git diff HEAD~1 HEAD --name-only | grep "src/"
if [ $? -eq 0 ]; then
  # Deploy
fi
```

---

## Best Practices Summary

✅ **DO:**
- Use semantic versioning and tags
- Sign important commits
- Review code before merging
- Keep commits small and focused
- Use branches for everything
- Document branching strategy
- Regular backups and mirrors
- Protect main branch

❌ **DON'T:**
- Force push to shared branches
- Commit secrets or large files
- Rewrite history after pushing
- Skip tests before pushing
- Mix multiple issues in one commit
- Use unclear commit messages
- Ignore merge conflicts
- Leave work uncommitted long-term
