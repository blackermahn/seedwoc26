# Part 3: Branching Fundamentals - Exercises

## Exercise 1: Basic Branch Creation and Switching

Master the fundamentals of creating and switching branches.

### Objective
Learn to create feature branches and switch between them safely.

### Task
```bash
# Start from main branch
git switch main

# Create a new feature branch
git switch -c feature/hello-world

# Verify you're on the new branch
git branch

# Create a simple file
echo "Hello World" > hello.js

# Commit on the feature branch
git add hello.js
git commit -m "feat: add hello world script"

# Switch back to main
git switch main

# Notice: hello.js doesn't exist here!
ls hello.js  # File not found error

# Switch back to feature branch
git switch feature/hello-world

# Now the file exists again!
ls hello.js

# View all branches
git branch -a
```

### Commands Reference
- `git branch NAME` - Create branch
- `git switch BRANCH` - Switch branches
- `git switch -c BRANCH` - Create and switch
- `git branch -d BRANCH` - Delete branch
- `git branch` - List branches

### Success Criteria ✅
- [ ] Can create branches
- [ ] Can switch between branches
- [ ] Understand that branches are independent
- [ ] Can delete branches

---

## Exercise 2: Merging Branches

Learn to integrate changes from one branch to another.

### Objective
Master fast-forward and three-way merges.

### Task
```bash
mkdir merge-practice && cd merge-practice
git init

# Create initial commit on main
echo "# Project" > README.md
git add README.md
git commit -m "docs: initialize project"

# Create feature branch from main
git switch -c feature/add-feature

# Make changes on feature branch
echo "function newFeature() {}" > feature.js
git add feature.js
git commit -m "feat: add new feature"

# At this point: main hasn't changed, so merge will be fast-forward

# Switch back to main
git switch main

# Merge feature into main
git merge feature/add-feature
# Notice: "Fast-forward" merge - no merge commit created

# Verify the file is in main now
ls feature.js

# View merge history
git log --oneline --graph
```

### Success Criteria ✅
- [ ] Can merge branches with `git merge`
- [ ] Understand fast-forward merges
- [ ] File changes appear after merge
- [ ] Merge history is visible in log

---

## Exercise 3: Creating Merge Conflicts

Learn to identify, understand, and resolve merge conflicts.

### Objective
Experience and resolve merge conflicts in a controlled way.

### Task
```bash
mkdir conflict-practice && cd conflict-practice
git init

# Create base file on main
echo "version = 1.0" > version.js
git add version.js
git commit -m "docs: add version file"

# Create a feature branch
git switch -c feature/version-2

# Change version to 2.0 on feature branch
echo "version = 2.0" > version.js
git add version.js
git commit -m "feat: bump version to 2.0"

# Switch back to main
git switch main

# Change version to 1.1 on main
echo "version = 1.1" > version.js
git add version.js
git commit -m "fix: patch version to 1.1"

# Now try to merge - this will conflict!
git merge feature/version-2
# CONFLICT (content): Merge conflict in version.js

# View conflicted file
cat version.js
# Shows both versions:
# <<<<<<< HEAD
# version = 1.1
# =======
# version = 2.0
# >>>>>>> feature/version-2

# Resolve by choosing one
echo "version = 2.0" > version.js

# Mark as resolved
git add version.js

# Complete the merge
git commit -m "merge: resolve version conflict, use 2.0"

# View the merge
git log --graph --oneline
```

### Conflict Resolution Process
1. Identify the conflict (git status shows "both modified")
2. Open the file and review both versions
3. Edit to choose correct version
4. Remove conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
5. Stage the resolved file
6. Commit the merge

### Success Criteria ✅
- [ ] Can create a deliberate conflict
- [ ] Can read conflict markers
- [ ] Can resolve conflicts
- [ ] Can complete merge after resolution

---

## Exercise 4: Understanding Branch Protection

Learn about branch protection rules.

### Objective
Understand why and how to protect important branches.

### Task
1. Read about branch protection on GitHub
2. Set up branch protection on a practice repository (if on GitHub)
3. Understand required checks and code review

### Concept
Branch protection prevents:
- Force pushes to protected branches
- Merging without code review
- Merging with failing CI/CD tests
- Merging from unprotected branches

### Key Settings
- "Require a pull request before merging"
- "Dismiss stale pull request approvals"
- "Require status checks to pass before merging"
- "Require branches to be up to date"
- "Restrict who can push to matching branches"

### Success Criteria ✅
- [ ] Understand why protection is important
- [ ] Know what can be protected
- [ ] Understand enforcement methods

---

## Exercise 5: Branching with Multiple Developers

Simulate a multi-developer workflow.

### Objective
Experience branches as a collaboration tool.

### Task
```bash
mkdir multi-dev && cd multi-dev
git init

# Initialize project
echo "# Team Project" > README.md
git add README.md
git commit -m "docs: initialize"

# Developer A: works on feature-a
git switch -c feature/auth
echo "const login = () => {};" > auth.js
git add auth.js
git commit -m "feat: add authentication"

# Developer B: works on feature-b (from main)
git switch main
git switch -c feature/database
echo "const db = { users: [] };" > database.js
git add database.js
git commit -m "feat: add database module"

# View both branches exist
git branch

# Merge feature-a
git switch main
git merge feature/auth

# Merge feature-b
git merge feature/database

# Both features are now in main!
git log --all --graph --oneline
```

### Workflow
1. Main branch stays stable
2. Each developer works on separate feature branch
3. Branches don't interfere with each other
4. Merge back to main when ready

### Success Criteria ✅
- [ ] Can manage multiple branches
- [ ] Understand how developers work independently
- [ ] Can merge multiple features in sequence
- [ ] No conflicts when changes are to different files

---

## Exercise 6: Fast-Forward vs. Three-Way Merge

Understand the difference between merge types.

### Objective
Learn when each merge type happens and their implications.

### Task A: Fast-Forward Merge
```bash
mkdir fastforward && cd fastforward
git init

echo "main" > file.txt
git add file.txt
git commit -m "main: initial"

# No new commits on main, feature just extends it
git switch -c feature
echo "feature" >> file.txt
git add file.txt
git commit -m "feature: change"

git switch main
git merge feature
# Result: "Fast-forward" - pointer just moves, no merge commit

git log --oneline
# Linear history: no merge commit shown
```

### Task B: Three-Way Merge
```bash
mkdir threeway && cd threeway
git init

echo "main" > file.txt
git add file.txt
git commit -m "main: initial"

# Create feature branch
git switch -c feature
echo "feature" >> file.txt
git add file.txt
git commit -m "feature: change"

# ALSO change main (while feature was being worked on)
git switch main
echo "main update" >> file.txt
git add file.txt
git commit -m "main: update"

# Now merge - both branches have new commits
git merge feature
# Result: "three-way merge" creates a merge commit
# Git is merging 3 versions: common ancestor + main + feature

git log --oneline
# Non-linear history: merge commit is visible
```

### Comparison
| Aspect | Fast-Forward | Three-Way |
|--------|-------------|-----------|
| Precondition | Main unchanged | Both branches changed |
| Result | Linear history | Merge commit created |
| Command | `git merge branch` | `git merge branch` |
| Force Three-Way | `git merge --no-ff` | N/A |

### Success Criteria ✅
- [ ] Understand fast-forward merge conditions
- [ ] Understand three-way merge
- [ ] Know when each occurs naturally
- [ ] Can force three-way with --no-ff

---

## Exercise 7: Rebase vs. Merge

Learn the difference between merging and rebasing.

### Objective
Understand rebase as an alternative to merge.

### Task
```bash
# MERGE approach
mkdir merge-approach && cd merge-approach
git init

echo "A" > file.txt
git add file.txt
git commit -m "A"

git switch -c feature
echo "B" >> file.txt
git add file.txt
git commit -m "B"

git switch main
echo "C" >> file.txt
git add file.txt
git commit -m "C"

git merge feature
# Creates merge commit, both branches visible

git log --oneline --graph
# Shows branching and merge


# REBASE approach
cd ..
mkdir rebase-approach && cd rebase-approach
git init

echo "A" > file.txt
git add file.txt
git commit -m "A"

git switch -c feature
echo "B" >> file.txt
git add file.txt
git commit -m "B"

git switch main
echo "C" >> file.txt
git add file.txt
git commit -m "C"

git switch feature
git rebase main
# Replays feature branch commits on top of main's changes

git switch main
git merge feature
# Now this is a fast-forward!

git log --oneline --graph
# Linear history, no merge commit, cleaner
```

### Comparison
| Aspect | Merge | Rebase |
|--------|-------|--------|
| History | Non-linear | Linear |
| Merge Commit | Yes | No |
| Who Can Use | Anyone | Careful! |
| Best For | Shared branches | Local features |

### Key Rule
> **Never rebase shared/pushed branches**

### Success Criteria ✅
- [ ] Understand rebase rewrites history
- [ ] Know when to rebase (local) vs. merge (shared)
- [ ] Can create linear history with rebase

---

## Exercise 8: Branch Protection Workflow

Implement a protected branch workflow.

### Objective
Experience a realistic protected branch setup.

### Scenario
Main branch is protected:
- Requires PR for merges
- Requires code review
- Requires passing tests

### Task
```bash
mkdir protected-workflow && cd protected-workflow
git init

# Start with a protected "main" (simulate with local rules)
echo "# Main" > README.md
git add README.md
git commit -m "docs: initialize main"

# Developer creates feature branch
git switch -c feature/my-feature

# Make changes
echo "function newFeature() {}" > feature.js
git add feature.js
git commit -m "feat: implement new feature"

# Cannot directly push to main (simulated)
# Instead, create PR (in real GitHub)

# When approved, merge to main locally
git switch main
git merge feature/my-feature

# Clean up feature branch
git branch -d feature/my-feature

git log --oneline
```

### Real GitHub Workflow
1. Create feature branch on your fork
2. Push to fork
3. Create PR on main repository
4. Wait for review
5. Merge when approved
6. Delete feature branch

### Success Criteria ✅
- [ ] Understand protected branch importance
- [ ] Know PR-first workflow
- [ ] Can work within branch protection rules

---

## Exercise 9: Complex Merge Scenario

Handle a realistic complex scenario with multiple branches.

### Objective
Navigate a complicated branching situation.

### Scenario
Multiple features, conflict, and coordination needed.

### Task
```bash
mkdir complex-scenario && cd complex-scenario
git init

# Main project start
echo "app.js" > app.js
git add app.js
git commit -m "feat: initialize app"

# Feature A: User feature
git switch -c feature/users
echo "class User {}" >> app.js
git add app.js
git commit -m "feat: add user class"

# Back to main for Feature B
git switch main

# Feature B: Database feature
git switch -c feature/database
echo "class Database {}" >> app.js
git add app.js
git commit -m "feat: add database class"

# Main continues development
git switch main
echo "console.log('starting');" >> app.js
git add app.js
git commit -m "feat: add startup log"

# Merge user feature
git merge feature/users

# Try to merge database - potential conflict!
git merge feature/database
# Might have conflicts if both changed app.js

# Resolve conflicts
cat app.js  # See both changes
# Edit to keep both

git add app.js
git commit -m "merge: combine user and database features"

# Visualize everything
git log --all --graph --oneline --decorate
```

### Success Criteria ✅
- [ ] Can manage multiple concurrent branches
- [ ] Can resolve conflicts from multiple sources
- [ ] Can visualize complex branch history
- [ ] Understand merge coordination

---

## Exercise 10: Branch Strategy Planning

Design a branching strategy for a project.

### Objective
Understand and design appropriate branching strategies.

### Strategies

#### Git Flow
```
- main branch (production)
- develop branch (staging)
- feature/* branches from develop
- release/* branches for releases
- hotfix/* branches for urgent fixes
```

#### GitHub Flow
```
- main branch (always deployable)
- feature/* branches from main
- PR for every feature
- Merge PR, then delete branch
```

#### Trunk-Based
```
- main branch (always ready)
- Very short-lived feature branches
- Frequent merges to main
- Feature flags for incomplete work
```

### Task

Choose a strategy for your project:
```bash
mkdir my-project && cd my-project
git init

# Document chosen strategy
cat > BRANCHING_STRATEGY.md << 'EOF'
# Branching Strategy

## Strategy: GitHub Flow

### Rules
- `main` is always production-ready
- Create feature branch from `main`
- Commit with meaningful messages
- Open PR for review
- Merge when approved
- Delete feature branch after merge

### Branch Naming
- feature/description
- fix/description
- docs/description

### Merge Strategy
- Squash and merge for single commits
- Rebase and merge for clean history
- Create merge commit for major features
EOF

git add BRANCHING_STRATEGY.md
git commit -m "docs: document branching strategy"
```

### Success Criteria ✅
- [ ] Chose appropriate strategy
- [ ] Understand when each strategy applies
- [ ] Can explain branching rules
- [ ] Can implement chosen strategy

---

## 🎓 Summary

You've learned:
- ✅ Creating and switching branches
- ✅ Merging branches
- ✅ Resolving merge conflicts
- ✅ Understanding branch protection
- ✅ Multi-developer workflows
- ✅ Merge vs. rebase
- ✅ Complex scenarios
- ✅ Branching strategies

---

## 📚 Resources

- [Git Branching - Pro Git Book](https://git-scm.com/book/en/v2/Git-Branching-Branch-Management)
- [Comparing Workflows](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [Understanding Merge Conflicts](https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging)

---

## ✅ Next Steps

Ready for **Module 2: GitHub Collaboration** ➡️
