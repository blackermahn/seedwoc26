# Part 1: GitHub Essentials - Exercises

## Exercise 1: Create Your First Repository

Create and set up a repository on GitHub.

### Task
1. Go to github.com and sign in
2. Click "New repository"
3. Name it `first-github-repo`
4. Add description: "My first GitHub repository"
5. Choose Public or Private
6. Click "Create repository"
7. Clone it locally:
```bash
git clone https://github.com/YOUR-USERNAME/first-github-repo.git
cd first-github-repo
```

### Success Criteria ✅
- [ ] Repository created on GitHub
- [ ] Repository cloned locally
- [ ] `git remote -v` shows origin URL
- [ ] Can see `.git` folder locally

---

## Exercise 2: Cloning and Exploring

Clone and explore an existing repository.

### Task
```bash
# Clone a public repository
git clone https://github.com/nodejs/node.git
cd node

# Explore
git remote -v       # See remotes
git branch -a       # See all branches
git log --oneline | head -20  # See history

# See what commit you're on
git status

# View repository info
cat README.md
```

### Success Criteria ✅
- [ ] Successfully cloned repository
- [ ] Understand remote URL
- [ ] Can see all branches
- [ ] Can explore commit history

---

## Exercise 3: SSH Key Setup and Secure Access

Set up SSH authentication for secure GitHub access.

### Task
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Press Enter for default location
# Enter passphrase (optional)

# Copy public key
cat ~/.ssh/id_ed25519.pub

# On GitHub:
# 1. Go to Settings → SSH and GPG keys
# 2. Click "New SSH key"
# 3. Paste your public key
# 4. Name it (e.g., "My Computer")
# 5. Click "Add SSH key"

# Test connection
ssh -T git@github.com
# Should show: "Hi YOUR-USERNAME! You've successfully authenticated..."

# Clone using SSH (instead of HTTPS)
git clone git@github.com:YOUR-USERNAME/your-repo.git
```

### Why SSH?
- More secure than HTTPS for repeated operations
- No password needed each time (with agent)
- Better for automation
- Recommended by GitHub

### Success Criteria ✅
- [ ] SSH key generated
- [ ] Public key added to GitHub
- [ ] SSH authentication works
- [ ] Can clone with SSH URL

---

## Exercise 4: Working with Remotes

Manage repository remotes for collaboration.

### Task
```bash
# View current remotes
git remote -v

# Add a new remote (for fork contributions)
git remote add upstream https://github.com/ORIGINAL/repo.git

# View all remotes
git remote -v
# Now shows: origin (your fork) and upstream (original)

# Fetch from upstream
git fetch upstream

# See remote branches
git branch -r

# Create local branch from upstream
git switch -c sync-with-upstream upstream/main

# Switch back to your local main
git switch main

# Pull updates from upstream without branching
git fetch upstream
git merge upstream/main

# Push to your remote (origin)
git push origin main

# Remove a remote you don't need
git remote remove old-remote
```

### Common Workflow
```
upstream (original repo)
    ↓
fetch → merge/rebase → push to origin
        ↓
      your fork (origin)
```

### Success Criteria ✅
- [ ] Can add and remove remotes
- [ ] Understand origin vs. upstream
- [ ] Can fetch from multiple remotes
- [ ] Can sync local with upstream

---

## Exercise 5: Fork and Contribute Workflow

Learn the complete fork → contribute → PR workflow.

### Task
1. Fork a repository on GitHub (click "Fork" button)
2. Clone YOUR fork locally
3. Create a feature branch
4. Make improvements
5. Push to your fork
6. Create Pull Request to original

```bash
# Clone YOUR fork
git clone git@github.com:YOUR-USERNAME/repo.git
cd repo

# Add upstream
git remote add upstream https://github.com/ORIGINAL/repo.git

# Create feature branch
git switch -c fix/typo-in-readme

# Make changes
echo "Fixed typo" >> README.md

# Commit
git add README.md
git commit -m "fix: correct typo in README"

# Push to your fork
git push origin fix/typo-in-readme

# On GitHub: click "Compare & pull request"
# Fill in PR details and submit
```

### Success Criteria ✅
- [ ] Forked repository successfully
- [ ] Cloned fork locally
- [ ] Created feature branch
- [ ] Made and committed changes
- [ ] Pushed to fork
- [ ] PR created on original repo

---

## Exercise 6: Synchronizing Your Fork

Keep your fork updated with the original repository.

### Task
```bash
# You're in your forked repository
git remote -v
# Should show origin (your fork) and upstream (original)

# Fetch latest changes from original
git fetch upstream

# Switch to main
git switch main

# Merge upstream into your main
git merge upstream/main

# Push the merged changes to your fork
git push origin main

# Now your main is in sync with the original!

# Optional: delete old feature branches
git branch -d old-feature
git push origin --delete old-feature
```

### Workflow for Contributing
1. Sync with upstream regularly
2. Keep main clean
3. Work on feature branches
4. Make PR from feature → original repo
5. Keep fork synchronized

### Success Criteria ✅
- [ ] Fork stays up-to-date with original
- [ ] Can sync main branch
- [ ] Understand fetch vs. merge
- [ ] Can push synced changes

---

## Exercise 7: Collaborative Team Workflow

Work within a team environment on a shared repository.

### Scenario
Multiple developers on same repository (not fork)

### Task
```bash
# Team member clones shared repo
git clone https://github.com/team/project.git
cd project

# See what team members are working on
git branch -a

# Create your feature branch
git switch -c feature/my-task

# Work on your feature
# ...commits...

# Before pushing, sync with latest
git fetch origin
git rebase origin/main

# Resolve any conflicts if needed

# Push your branch
git push origin feature/my-task

# On GitHub, create PR and request review from teammates

# After approval and merge:
# Switch to main
git switch main

# Pull latest from team
git pull origin main

# Delete local feature branch
git branch -d feature/my-task
git push origin --delete feature/my-task
```

### Best Practices
- Pull regularly to stay updated
- Rebase before pushing
- Clear commit messages
- Communicate with team
- Review before merge

### Success Criteria ✅
- [ ] Can push/pull with team
- [ ] Understand synchronization
- [ ] Can resolve conflicts with team changes
- [ ] Clean up branches after merge

---

## Exercise 8: GitHub Issues and Discussions

Use GitHub's collaboration features.

### Task

**Create an Issue:**
1. Go to "Issues" tab
2. Click "New issue"
3. Title: "Add user authentication documentation"
4. Body: Describe what documentation is needed
5. Assign to yourself
6. Click "Create issue"

**Link Issue in Commit:**
```bash
# When working on the issue
git commit -m "docs: add authentication guide

Closes #42"  # #42 is the issue number

# When merged, GitHub auto-closes the issue!
```

**Discuss in PR:**
1. When reviewing PR, comment on specific lines
2. Suggest changes with code blocks
3. Approve or request changes
4. Conversation continues until resolved

### Success Criteria ✅
- [ ] Can create issues
- [ ] Can assign issues
- [ ] Can link commits to issues
- [ ] Can participate in discussions

---

## Exercise 9: Protected Branches and Reviews

Set up branch protection on GitHub.

### Task
1. Go to repository Settings
2. Click "Branches"
3. Click "Add rule"
4. Match branch: `main`
5. Check these options:
   - "Require a pull request before merging"
   - "Require approvals" (set to 1)
   - "Require status checks to pass"
   - "Require branches to be up to date"
6. Save

### Effect
- Cannot push directly to main
- PR required for all changes
- Code review required
- CI/CD tests must pass
- Must be up-to-date with main

### Workflow Under Protection
```bash
# Feature branch work
git push origin feature/my-feature

# Create PR (on GitHub)
# Wait for CI checks
# Wait for review
# Get approval
# Click "Merge pull request"
# Branch automatically deletes (optional)
```

### Success Criteria ✅
- [ ] Branch rules configured
- [ ] Cannot push directly to protected branch
- [ ] PR required for merges
- [ ] Review required

---

## Exercise 10: GitHub Pages and Repo Documentation

Create documentation for your repository.

### Task A: Create README
```bash
# In your repository root
cat > README.md << 'EOF'
# Project Name

Brief description of what this project does.

## Features
- Feature 1
- Feature 2

## Installation
```bash
git clone ...
```

## Usage
```

## Contributing
See CONTRIBUTING.md

## License
MIT
EOF

git add README.md
git commit -m "docs: add comprehensive README"
git push origin main
```

### Task B: Create CONTRIBUTING.md
```bash
cat > CONTRIBUTING.md << 'EOF'
# Contributing

1. Fork the repository
2. Create feature branch: `git switch -c feature/my-feature`
3. Commit changes with clear messages
4. Push to fork: `git push origin feature/my-feature`
5. Create Pull Request
6. Wait for review and approval

## Code Style
- Use 2 spaces for indentation
- Include tests with changes
- Update documentation
EOF

git add CONTRIBUTING.md
git commit -m "docs: add contribution guide"
git push origin main
```

### Task C: Enable GitHub Pages (Optional)
1. Go to Settings
2. Scroll to "GitHub Pages"
3. Choose branch (main or docs folder)
4. Save
5. Access at: `https://username.github.io/repo-name`

### Success Criteria ✅
- [ ] README is comprehensive
- [ ] CONTRIBUTING.md explains process
- [ ] Documentation is clear
- [ ] New contributors can follow guide

---

## 🎓 Summary

You've mastered:
- ✅ Creating repositories on GitHub
- ✅ SSH authentication
- ✅ Managing remotes
- ✅ Forking and contributing
- ✅ Syncing forks
- ✅ Team collaboration
- ✅ Issues and discussions
- ✅ Branch protection
- ✅ Repository documentation

---

## 📚 Resources

- [GitHub Documentation](https://docs.github.com)
- [SSH Keys Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Fork Repo and Contribute](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
- [Protected Branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)

---

## ✅ Next Steps

Ready for **Part 2: Pull Requests and Code Review** ➡️
