# Version Control Fundamentals Review

## Core Concepts

### What is Version Control?
- Tracks changes over time
- Allows collaboration
- Enables rollback
- Maintains history
- Supports branching

### Types of Version Control
- **Centralized** (SVN, Perforce)
  - Single central repository
  - Developers check out files
  - Network required
  
- **Distributed** (Git, Mercurial)
  - Each dev has full copy
  - Works offline
  - Better for collaboration

### Key Advantages
1. **History**: Track all changes
2. **Collaboration**: Multiple developers
3. **Branching**: Parallel development
4. **Merging**: Combine changes
5. **Backup**: Redundant copies
6. **Audit Trail**: Who changed what
7. **Rollback**: Return to previous state
8. **Tags**: Mark release points

## Git Basics Review

### Configuration
```bash
git config --global user.name "Name"
git config --global user.email "email@example.com"
```

### Initialization
```bash
git init                           # New repo
git clone <url>                   # Copy existing
```

### Daily Commands
```bash
git status                        # Check changes
git add <file>                    # Stage
git commit -m "message"           # Save
git push origin <branch>          # Send to remote
git pull origin <branch>          # Get from remote
```

### Branching
```bash
git branch                        # List branches
git branch <name>                 # Create
git switch <name>                 # Change
git switch -c <name>              # Create & change
git branch -d <name>              # Delete
```

### Merging
```bash
git merge <branch>                # Merge into current
git rebase <branch>               # Rebase current
git merge --abort                 # Cancel merge
git rebase --abort                # Cancel rebase
```

### History
```bash
git log                           # View commits
git show <commit>                 # View details
git diff                          # Show changes
git blame <file>                  # Who changed what line
```

## Workflow Comparison

### Personal Project
```
main → Feature → Commit → Push
```
Simple, direct flow

### Team Project
```
main ← develop ← feature ← commit
       ↑        
    Pull Request Review
    Approval
    Merge
```
Review gate enforced

### Large Organization
```
main (production)
  ↑
release branches
  ↑
develop (staging)
  ↑
feature branches
```
Formal release process

## Commit Message Best Practices

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructure
- perf: Performance
- test: Tests
- chore: Dependencies, tools

### Examples
```
feat(auth): add login form
fix(api): handle null response
docs(readme): update instructions
refactor(utils): simplify code
```

## Common Mistakes & Solutions

| Problem | Solution |
|---------|----------|
| Committed to main | `git reset` + recreate branch |
| Large file committed | `git filter-repo` to remove |
| Wrong commit message | `git commit --amend` |
| Accidentally deleted branch | `git reflog` to recover |
| Merge conflicts | Edit files + `git add` + `git commit` |
| Unpushed commits "lost" | `git reflog` shows them |
| Very large repo | Use shallow clone or partial clone |

## Best Practices Template

✅ **Always:**
- Write clear commit messages
- Pull before pushing
- Review code before merging
- Keep branches up to date
- Delete merged branches
- Tag releases

❌ **Never:**
- Force push to main
- Commit large files
- Commit secrets
- Put all work in one branch
- Skip code review
- Leave branches stale

