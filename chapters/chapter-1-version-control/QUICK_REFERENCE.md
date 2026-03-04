# Chapter 1: Git & Version Control - Quick Reference Guide

## Git Commands Cheat Sheet

### Initial Setup
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git init                    # Create new repo
git clone <url>             # Clone existing repo
```

### Daily Workflow
```bash
git status                  # Check status
git add <file>              # Stage file
git add .                   # Stage all files
git commit -m "message"     # Create commit
git push origin main        # Push to remote
git pull origin main        # Pull from remote
```

### Branches
```bash
git branch                  # List branches
git branch <name>           # Create branch
git checkout <branch>       # Switch branch
git checkout -b <branch>    # Create and switch
git merge <branch>          # Merge branch
git branch -d <branch>      # Delete branch
```

### History
```bash
git log                     # View history
git log --oneline          # Concise history
git diff                   # Show changes
git show <commit>          # Show commit details
```

### Undo Changes
```bash
git restore <file>         # Discard changes
git reset HEAD <file>      # Unstage file
git revert <commit>        # Undo commit safely
```

### GitHub
```bash
git remote -v              # View remotes
git push -u origin main    # Push and track
git pull                   # Pull from tracked branch
```

## Common Patterns

### Feature Development
```bash
git checkout main
git pull origin main
git checkout -b feature/name
# ... make changes ...
git add .
git commit -m "feat: description"
git push -u origin feature/name
# Create PR on GitHub
```

### Bug Fix
```bash
git checkout main
git pull
git checkout -b bugfix/issue-name
# ... make fixes ...
git commit -m "fix: description"
git push -u origin bugfix/issue-name
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Wrong branch | `git checkout correct-branch` |
| Uncommitted changes | `git add .` then `git commit` |
| Need to undo commit | `git revert <commit>` unsafe: `git reset --hard HEAD~1` |
| Wrong commit message | `git commit --amend -m "new message"` |
| Conflicts | Edit files, resolve, `git add .`, `git commit` |

## Best Practices

✅ **DO:**
- Use descriptive branch names
- Write clear commit messages
- Commit frequently with logical changes
- Pull before pushing
- Use `git status` regularly
- Create PRs for code review

❌ **DON'T:**
- Commit to main directly
- Use `git force push` unless necessary
- Make massive commits
- Push sensitive information
- Ignore merge conflicts
- Reset/rebase public history

## Key Concepts

**Repository**: Folder with .git directory
**Commit**: Snapshot of changes with message
**Branch**: Independent line of development
**Remote**: Repository on GitHub/GitLab
**Merge**: Combine branches together
**Pull Request**: Request to merge changes with review

## Learning Path

1. ✅ Git Basics (Part 1)
2. ✅ Core Workflows (Part 2)
3. ✅ Branching (Part 3)
4. ✅ GitHub Essentials (Module 2, Part 1)
5. ✅ Pull Requests (Module 2, Part 2)
6. ✅ Advanced Workflows (Module 2, Part 3)

**Next**: Practice with real projects!
