# Git Commands Cheat Sheet

## Essential Commands

### Repository Setup
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git init                                 # Initialize new repo
git clone <url>                         # Clone existing repo
```

### Daily Workflow
```bash
git status                              # Check status
git add <file>                          # Stage specific file
git add .                               # Stage all changes
git commit -m "message"                 # Commit changes
git push origin <branch>                # Push to remote
git pull origin <branch>                # Pull from remote
```

### Branching
```bash
git branch                              # List branches
git branch <name>                       # Create branch
git switch <branch>                     # Switch branch
git switch -c <branch>                  # Create and switch
git branch -d <branch>                  # Delete branch
git branch -m <old> <new>              # Rename branch
```

### History
```bash
git log                                 # View commit history
git log --oneline                       # Compact history
git log --graph --all --oneline        # Visual branch graph
git show <commit>                       # Show commit details
git diff                                # Show unstaged changes
git diff --staged                       # Show staged changes
```

### Undoing Changes
```bash
git restore <file>                      # Discard local changes
git restore --staged <file>             # Unstage file
git reset HEAD~1                        # Undo last commit
git revert <commit>                     # Create opposite commit
```

### Merging
```bash
git merge <branch>                      # Merge branch
git merge --abort                       # Cancel merge
git rebase <branch>                     # Rebase commits
git rebase --continue                   # Continue after resolving
```

### Stashing
```bash
git stash                               # Save work temporarily
git stash list                          # List stashes
git stash pop                           # Apply and remove stash
git stash apply stash@{n}              # Apply specific stash
```

---

## Advanced Commands

### Tags
```bash
git tag v1.0.0                          # Create lightweight tag
git tag -a v1.0.0 -m "Release v1.0.0"  # Create annotated tag
git show v1.0.0                         # Show tag details
git push origin v1.0.0                  # Push specific tag
git push origin --tags                  # Push all tags
```

### Remotes
```bash
git remote -v                           # List remotes
git remote add <name> <url>             # Add remote
git remote remove <name>                # Remove remote
git fetch <remote>                      # Fetch from remote
git push <remote> <branch>              # Push to remote
```

### Cherry-pick
```bash
git cherry-pick <commit>                # Apply specific commit
git cherry-pick <start>..<end>          # Apply range of commits
git cherry-pick --continue              # Continue after conflict
git cherry-pick --abort                 # Cancel cherry-pick
```

### Bisect
```bash
git bisect start                        # Start binary search
git bisect bad HEAD                     # Mark current as bad
git bisect good <commit>                # Mark old commit as good
git bisect run <script>                 # Automate search
git bisect reset                        # End bisect
```

### Rebase
```bash
git rebase -i HEAD~3                    # Interactive rebase last 3
git rebase -i --root                    # Rebase all commits
git rebase --continue                   # Continue after editing
git rebase --abort                      # Cancel rebase
```

### Search
```bash
git log -S "text"                       # Search commit content
git log --grep="pattern"                # Search commit messages
git blame <file>                        # Show who changed each line
git log -p <file>                       # Show changes to file
```

---

## Configuration Tips

### Aliases (Shortcuts)
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --graph --oneline --all'
```

### Ignoring Files
```bash
# Create .gitignore file
*.log
node_modules/
.env
.DS_Store
dist/
build/

# Global gitignore
git config --global core.excludesfile ~/.gitignore_global
```

### Useful Settings
```bash
# Prevent auto-CRLF conversion
git config --global core.autocrlf false

# Set default branch
git config --global init.defaultBranch main

# Colorize output
git config --global color.ui true

# Rebase by default on pull
git config --global pull.rebase true
```

---

## Common Scenarios

### Undo Last Commit (Not Pushed)
```bash
git reset --soft HEAD~1          # Keep changes in staging
git reset --mixed HEAD~1         # Keep changes in working directory
git reset --hard HEAD~1          # Discard changes
```

### Recover Deleted Branch
```bash
git reflog
git checkout -b <branch> <commit-hash>
```

### Squash Last N Commits
```bash
git rebase -i HEAD~3             # Interactive rebase
# Change 'pick' to 'squash' for commits to squash
# Save and editor will consolidate
```

### Switch Between Branches Quickly
```bash
git switch -                     # Go to previous branch
```

### View Differences Between Branches
```bash
git diff main..feature           # Changes in feature not in main
git diff --stat main..feature    # Summary of differences
```

### Clean Up Local Branches
```bash
git branch -v                    # List with last commit
git branch --merged              # List merged branches
git branch -d <branch>           # Delete merged branch
git branch --no-merged           # List unmerged branches
```

---

## Emergency Commands

### Lost Commits Recovery
```bash
git reflog                       # Find commit hash
git checkout <commit-hash>       # Go to commit
git switch -c recovered          # Create new branch
```

### Oops! Pushed to Wrong Branch
```bash
git reset --soft HEAD~1          # Undo commit
git stash                        # Stash changes
git switch correct-branch
git stash pop                    # Apply changes
git commit -m "message"
```

### Fix Wrong Author
```bash
git commit --amend --author="Name <email@example.com>"
git push origin <branch> --force-with-lease
```

### Remove Large File from History
```bash
git filter-repo --path <file> --invert-paths
git push origin <branch> --force-with-lease
```

