# Chapter 1: Git Workflow Examples

## Basic Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes
echo "new code" > file.js
git add .
git commit -m "feat: Add new feature"

# 3. Stay updated with main
git fetch origin
git rebase origin/main

# 4. Push to remote
git push -u origin feature/new-feature

# 5. Create PR on GitHub and wait for review

# 6. After approval, merge on GitHub

# 7. Clean up locally
git checkout main
git pull origin main
git branch -d feature/new-feature
```

## Multi-Feature Development

```bash
# Store work in progress temporarily
git stash   # Save uncommitted changes
git stash pop  # Restore changes

# Useful for switching branches without committing
```

## Collaboration Workflow

```bash
# Team Member 1: Create and push new feature
git checkout -b feature/auth
echo "auth code" > auth.js
git add .
git commit -m "feat: Add authentication"
git push -u origin feature/auth
# Create PR

# Team Member 2: Work on different feature
git checkout main
git pull  # Get latest
git checkout -b feature/api
echo "api code" > api.js
git add .
git commit -m "feat: Add API endpoints"
git push -u origin feature/api
# Create PR

# Both features can merge independently!
```

## Resolving Merge Conflicts

```bash
# Local changes conflict with remote
git pull origin main
# CONFLICT! Some files marked with conflicts

# Edit conflicted files manually
# Remove conflict markers

git add .
git commit -m "merge: Resolve conflicts with main"
git push origin feature/branch
```

## Best Branch Patterns

### Feature Branch
```
main ──────────────────────────
           ├─ feature/auth ──┤
                    └─ Create PR, review, merge
```

### Release Branch
```
main ──────┬─────────────
           │
        ├─ release/1.0 ─┤
        │  (bug fixes only)
        └─ merge back to main, tag version
```

### Hotfix Branch
```
main (v1.0) ──────┬──────────
                  │
               ├─ hotfix/bug ─┤
               │ (critical fix)
               └─ merge to main, tag urgent patch
```

## Useful Config Aliases

```bash
# Create shortcuts for common commands
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg 'log --oneline --graph --all --decorate'

# Now you can use:
git co feature/name   # Instead of git checkout feature/name
git lg               # Instead of full log command
```

## Git Hooks for Quality

```bash
# Create pre-commit hook to run tests
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
npm test
if [ $? -ne 0 ]; then
  echo "Tests failed, commit aborted"
  exit 1
fi
EOF

chmod +x .git/hooks/pre-commit
```

## Recovering from Mistakes

```bash
# Undo last commit, keep changes
git reset --soft HEAD~1

# Undo last commit, discard changes
git reset --hard HEAD~1

# Find and restore deleted commits
git reflog
git checkout <commit-hash>

# See what would happen before doing it
git log --all --graph --oneline
```
