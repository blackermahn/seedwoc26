# Part 3: Branching Fundamentals

## 📚 Part Overview

Learn how to work with Git branches - create, switch, merge, and manage parallel development streams. Branching is central to modern collaborative development.

## 🎯 Learning Objectives

By completing this part, you will:
- Understand what branches are and why they matter
- Create and delete branches
- Switch between branches safely
- Merge branches together
- Resolve merge conflicts
- Follow branch naming conventions
- Work with branch strategies
- Understand branch protection and reviews

## 🕐 Estimated Duration
- **Time**: 6-8 hours
- **Difficulty**: ⭐ Intermediate
- **Prerequisites**: Part 1 & 2

## 📖 Table of Contents
1. [What are Branches?](#concept)
2. [Branch Operations](#operations)
3. [Merging Branches](#merging)
4. [Handling Conflicts](#conflicts)
5. [Branch Strategies](#strategies)
6. [Code Examples](#examples)
7. [Exercises](#exercises)

---

## What are Branches? {#concept}

### The Concept

A branch is an independent line of development. Think of it like a bookmark that points to a specific commit.

```
Commit History Visualization:

main branch:
A ──► B ──► C ──► D ──► E

                    │
                    └─► feature branch
                        F ──► G ──► H
```

### Why Branches?

```
WITHOUT BRANCHING:
- Everyone works on same code
- Broken changes affect everyone
- Hard to isolate features
- Merging is complex

WITH BRANCHING:
- Feature → Work in isolation
- Bugfix → Fix bug without interrupting development
- Release → Prepare release without blocking features
- Experiment → Try ideas safely
```

### Branch Diagram

```
Repository with Multiple Branches:

origin/main (production)
   │
   A ──► B ──► C ──► D ──► E
                       ▲
                       │ (merge)
                       │
        Feature branch (feature/login)
        F ──► G ──► H ──┘

        Bugfix branch (bugfix/navbar)
        I ──► J ──┘
```

---

## Branch Operations {#operations}

### Creating Branches

```bash
# Create a new branch (stays on current branch)
git branch feature/user-auth

# Create and switch to new branch (recommended)
git checkout -b feature/user-auth
git switch -c feature/user-auth  # Modern syntax

# Create branch from specific commit
git branch feature/auth 3a7f2c1e

# Create branch from another branch
git branch feature/auth develop
```

### Listing Branches

```bash
# List local branches
git branch

# List all branches (including remote)
git branch -a

# List with more info
git branch -v
git branch -vv  # Shows tracking info

# Delete specific branch
git branch -d feature/old-feature
git branch -D feature/old-feature  # Force delete

# Alternative: using git switch
git branch --delete feature/old-feature
```

### Switching Branches

```bash
# Switch to existing branch
git checkout feature/user-auth
git switch feature/user-auth  # Modern

# Switch to previous branch
git checkout -
git switch -

# Create and switch
git checkout -b feature/payment
git switch -c feature/payment  # Modern

# Check current branch
git status
git branch --show-current
```

### Branch Naming Conventions

Good branch names are descriptive and follow patterns:

```
Format: <type>/<feature-name>

Types:
- feature/   → New features
- bugfix/    → Bug fixes
- hotfix/    → Urgent production fixes
- release/   → Release preparation
- docs/      → Documentation
- refactor/  → Code refactoring
- test/      → Testing

Examples:
✅ feature/user-authentication
✅ bugfix/login-form-validation
✅ hotfix/critical-security-patch
✅ docs/api-documentation-update
❌ new-stuff
❌ test123
❌ fix-bug
```

---

## Merging Branches {#merging}

### Merge Strategies

```bash
# Fast-forward merge (when possible)
# Moves branch pointer forward without creating merge commit
git merge feature/simple-feature

# Three-way merge
# Creates a merge commit combining both branches
git merge --no-ff feature/complex-feature

# Squash merge
# Combines all commits into one single commit
git merge --squash feature/experimental

# Rebase merge
# Replays commits on top (cleaner history)
git rebase main
```

### Visual Explanation of Merge

```
BEFORE MERGE:
main: A ──► B ──► C ──► D
                    │
feature:           │─► E ──► F

FAST-FORWARD MERGE (if main hasn't changed):
main: A ──► B ──► C ──► D ──► E ──► F


THREE-WAY MERGE (main changed):
                           ┌─── E ──► F
main: A ──► B ──► C ──► D ──┤
                    ▲       │
                    └──────► M (merge commit)

SQUASH MERGE:
main: A ──► B ──► C ──► D ──► S (squashed E+F)
                    │
feature:           │─► E ──► F (unchanged)
```

### Performing a Merge

```bash
# 1. Start on the branch that receives the merge
git checkout main

# 2. Merge the other branch
git merge feature/user-auth

# 3. Verify the merge
git log --oneline --graph

# 4. Delete the feature branch (optional, after testing)
git branch -d feature/user-auth

# 5. Push to remote
git push origin main
git push origin --delete feature/user-auth
```

---

## Handling Conflicts {#conflicts}

### Understanding Merge Conflicts

Conflicts occur when Git can't automatically determine which version of a change to keep.

```
BASIC SCENARIO:

main branch:
    A ──► B (user = "Alice")

feature branch:
         ├──► C (user = "Bob")

MERGE CONFLICT:
Which value is correct? "Alice" or "Bob"?
```

### Conflict Markers

When a conflict occurs, Git marks the conflicting sections:

```javascript
// calculator.js
function add(a, b) {
<<<<<<< HEAD (main)
  return a + b; // Version from main
=======
  return Math.round(a + b); // Version from feature
>>>>>>> feature/improve-math
}
```

### Resolving Conflicts

**Step 1: Identify conflicted files**
```bash
git status  # Shows "both modified" files
git diff    # Shows conflict markers
```

**Step 2: Edit files to resolve**
```javascript
// Option 1: Keep main version
function add(a, b) {
  return a + b;
}

// Option 2: Keep feature version
function add(a, b) {
  return Math.round(a + b);
}

// Option 3: Combine both
function add(a, b) {
  return Math.round(a + b);
}

// Explanation: Added rounding for financial calculations
```

**Step 3: Complete the merge**
```bash
# Stage resolved files
git add calculator.js

# Complete the merge
git commit -m "Merge feature/improve-math - conflict resolved"

# Or abort if needed
git merge --abort
```

### Conflict Prevention Strategies

```bash
# 1. Merge frequently to avoid large divergence
git merge main  # From feature branch, regularly

# 2. Rebase before merging
git rebase main
git checkout main
git merge feature/clean-merge

# 3. Use squash for small features
git merge --squash feature/tiny-fix

# 4. Communicate with team about changes
# Before making major refactors that affect many files
```

---

## Branch Strategies {#strategies}

### Git Flow Strategy

For complex, release-based projects:

```
release/1.0
    │
    ├──────────────────┐
    │                  │
    v                  v
main (production)    develop
    ▲                  ▲
    │       merge      │
    │     ┌────────────┤
    │     │            │
    └─────┤  feature/* │
          │  bugfix/*  │
          └────────────┘
```

**Branches:**
- `main`: Production releases only
- `develop`: Integration branch for features
- `feature/*`: Individual features
- `bugfix/*`: Bug fixes
- `release/*`: Release preparation
- `hotfix/*`: Production emergency fixes

**Workflow:**
```bash
# Create feature from develop
git checkout develop
git pull
git checkout -b feature/new-feature

# Work and commit
# ...

# Merge back to develop
git checkout develop
git pull
git merge feature/new-feature
git branch -d feature/new-feature

# Create release when ready
git checkout -b release/1.0 develop

# Final testing and fixes...

# Merge to main and tag
git checkout main
git merge release/1.0 --no-ff
git tag v1.0.0
```

### GitHub Flow Strategy

For continuous deployment:

```
main
 │
 ├─► feature/feature-1 ──► PR ──► Review ──► Merge ──► Deploy
 │
 ├─► feature/feature-2 ──► PR ──► Review ──► Merge ──► Deploy
 │
 └─► bugfix/bug-fix ────► PR ──► Review ──► Merge ──► Deploy
```

**Simple flow:**
1. Create feature branch from `main`
2. Make commits
3. Create Pull Request for review
4. Merge when approved
5. Deploy from `main` automatically

### Trunk-Based Development

Minimal branching, frequent integrations:

```
main ─A─B─C─D─E─F─G─H─
    ├─┤ short-lived branches (1-2 days)
```

---

## Code Examples {#examples}

### Complete Branching Workflow

```bash
# 1. Start on main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/payment-system

# 3. Make changes
echo "Payment code" > payment.js
git add payment.js
git commit -m "feat: Add payment processing module"

# 4. More work
echo "Payment tests" > payment.test.js
git add payment.test.js
git commit -m "test: Add payment system tests"

# 5. Check history
git log --oneline

# 6. Merge back (handled by PR usually, but here we do it)
git checkout main
git pull

# 7. Merge feature
git merge feature/payment-system

# 8. Delete feature branch
git branch -d feature/payment-system

# 9. Push to remote
git push origin main
git push origin --delete feature/payment-system
```

### Handling a Merge Conflict

```bash
# Setup: Create conflicting branches
git init conflict-demo
cd conflict-demo

# Create initial file
echo "Line 1
Line 2
Line 3" > file.txt

git add file.txt
git commit -m "initial: Add file"

# Create feature branch
git checkout -b feature/modify-line2

# Modify line 2
echo "Line 1
Line 2 - FEATURE VERSION
Line 3" > file.txt

git commit -am "feat: Modify line 2 in feature"

# Switch back to main and modify
git checkout main
echo "Line 1
Line 2 - MAIN VERSION
Line 3" > file.txt

git commit -am "feat: Modify line 2 in main"

# Now merge - will cause conflict
git merge feature/modify-line2

# View the conflict
cat file.txt
# Shows:
# Line 1
# <<<<<<< HEAD
# Line 2 - MAIN VERSION
# =======
# Line 2 - FEATURE VERSION
# >>>>>>> feature/modify-line2
# Line 3

# Resolve: Keep feature version
echo "Line 1
Line 2 - FEATURE VERSION
Line 3" > file.txt

# Complete merge
git add file.txt
git commit -m "Merge: Resolve conflict in favor of feature"
```

---

## 📝 Exercises {#exercises}

### Exercise 1: Basic Branch Creation and Switching
**Objective:** Master branch creation and navigation

**Task:**
1. Create a repository with initial commits
2. Create three feature branches: `feature/login`, `feature/logout`, `feature/profile`
3. Switch between them
4. View which branch you're on
5. Understand branch independence

**Solution:**
```bash
mkdir branch-basics && cd branch-basics
git init

# Initial commit
echo "initial" > main.js
git add main.js
git commit -m "Initial commit"

# Create multiple branches
git branch feature/login
git branch feature/logout
git branch feature/profile

# View all branches
git branch
# Output:
# feature/login
# feature/logout
# feature/profile
# * main

# Switch to feature/login
git switch feature/login

# Make some changes on this branch
echo "login logic" >> main.js
git commit -am "feat: Add login"

# Switch to feature/logout
git switch feature/logout
echo "logout logic" >> main.js
git commit -am "feat: Add logout"

# Switch to feature/profile
git switch feature/profile
echo "profile logic" >> main.js
git commit -am "feat: Add profile"

# View all branches with last commits
git branch -v

# Return to main
git switch main

# View that feature branches still have their commits
git log feature/login --oneline
git log feature/logout --oneline
```

---

### Exercise 2: Merging Branches
**Objective:** Understand merge process and branch cleanup

**Task:**
1. Create feature branches with independent work
2. Merge branches individually
3. Verify code is combined
4. Clean up merged branches
5. View merged history

**Solution:**
```bash
mkdir merge-practice && cd merge-practice
git init

# Create initial file
echo "# Project" > README.md
git add README.md
git commit -m "docs: Initialize README"

# Feature 1: Authentication
git checkout -b feature/auth
echo "- User login" >> README.md
git commit -am "docs: Add auth feature"

git switch main
echo "✅ main: before merging auth"
git log --oneline

# Merge auth feature
git merge feature/auth
echo "✅ main: after merging auth"
git log --oneline

# Feature 2: Database
git checkout -b feature/database
echo "- MongoDB integration" >> README.md
git commit -am "docs: Add database feature"

git switch main
git merge feature/database

# Feature 3: API
git checkout -b feature/api
echo "- REST API endpoints" >> README.md
git commit -am "docs: Add API feature"

git switch main
git merge feature/api

# View merged history
git log --oneline

# Delete merged branches
git branch -d feature/auth feature/database feature/api

# Verify they're gone
git branch
```

---

### Exercise 3: Creating Merge Conflicts
**Objective:** Learn to identify and resolve merge conflicts

**Task:**
1. Create a scenario that causes conflicts
2. Attempt to merge
3. Identify conflict markers
4. Resolve conflicts manually
5. Complete the merge

**Solution:**
```bash
mkdir conflict-practice && cd conflict-practice
git init

# Create file with multiple lines
cat > config.json << 'EOF'
{
  "version": "1.0.0",
  "port": 3000,
  "database": "mongodb",
  "debug": false
}
EOF

git add config.json
git commit -m "docs: Add initial config"

# Create feature branch and modify
git checkout -b feature/update-config
cat > config.json << 'EOF'
{
  "version": "2.0.0",
  "port": 5000,
  "database": "mongodb",
  "debug": true
}
EOF

git commit -am "feat: Update config for feature"

# Go back to main and modify differently
git checkout main
cat > config.json << 'EOF'
{
  "version": "1.1.0",
  "port": 3000,
  "database": "postgresql",
  "debug": false,
  "ssl": true
}
EOF

git commit -am "feat: Update config for main"

# Try to merge - will conflict
git merge feature/update-config

# Check status
git status

# View conflict markers
cat config.json

# Resolve: Take the best of both
cat > config.json << 'EOF'
{
  "version": "2.0.0",
  "port": 5000,
  "database": "postgresql",
  "debug": true,
  "ssl": true
}
EOF

# Complete merge
git add config.json
git commit -m "merge: Resolve config conflict"

# View result
git log --oneline --graph
```

---

### Exercise 4: Understanding Branch Protection
**Objective:** Learn about protect-main-branch practices

**Task:**
1. Create a setup where main is "protected"
2. Try to commit to feature branches first
3. Never commit directly to main
4. Create a workflow where features are integrated via merge
5. Simulate code review process

**Solution:**
```bash
mkdir protected-main && cd protected-main
git init

# Start with main
echo "# Project" > README.md
git add README.md
git commit -m "docs: Initialize project"

# Simulate protected main by using branches for everything
# Rule: Never commit directly to main after this point

# Feature 1
git checkout -b feature/feature1
echo "Feature 1 code" > feature1.js
git add feature1.js
git commit -m "feat: Add feature 1"

# Feature 2
git checkout main
git checkout -b feature/feature2
echo "Feature 2 code" > feature2.js
git add feature2.js
git commit -m "feat: Add feature 2"

# Merge features to main
git checkout main

# "Code review" - check feature1
git log feature/feature1 --oneline
git diff main feature/feature1

# Approve and merge
git merge feature/feature1 -m "Merge: Approved feature/feature1"

# Check feature2
git diff main feature/feature2

# Merge feature2
git merge feature/feature2

# Clean up branches
git branch -d feature/feature1 feature/feature2

# View final history
git log --oneline --graph
```

---

### Exercise 5: Branching with Multiple Developers
**Objective:** Simulate real multi-developer workflow

**Task:**
1. Create branches for different developers
2. Each developer makes changes on their branch
3. Identify which changes can merge without conflicts
4. Merge changes in sequence
5. Simulate communication issues and solutions

**Solution:**
```bash
mkdir multi-dev && cd multi-dev
git init

# Initial setup
cat > app.js << 'EOF'
// Main application
const config = require('./config');
const server = require('./server');

server.start(config.port);
EOF

git add app.js
git commit -m "Initial: Set up main application structure"

# Developer 1: Works on authentication
git checkout -b dev/alice-auth
cat > auth.js << 'EOF'
// Authentication module
function login(username, password) {
  // Implementation
}

module.exports = { login };
EOF

git add auth.js
git commit -m "feat(dev/alice): Add authentication module"

# Developer 2: Works on database
git checkout main
git checkout -b dev/bob-database
cat > db.js << 'EOF'
// Database module
function connect(connectionString) {
  // Implementation
}

module.exports = { connect };
EOF

git add db.js
git commit -m "feat(dev/bob): Add database connection"

# Developer 3: Works on API routes
git checkout main
git checkout -b dev/carol-api
cat > routes.js << 'EOF'
// API routes
function setupRoutes(app) {
  // Implementation
}

module.exports = { setupRoutes };
EOF

git add routes.js
git commit -m "feat(dev/carol): Add API route setup"

# Merge all features (no conflicts since different files)
git checkout main
git merge dev/alice-auth -m "Merge: Alice's authentication"
git merge dev/bob-database -m "Merge: Bob's database"
git merge dev/carol-api -m "Merge: Carol's API routes"

# Clean up
git branch -d dev/alice-auth dev/bob-database dev/carol-api

# View integrated code
git log --oneline --graph
```

---

### Exercise 6: Fast-Forward vs. Three-Way Merge
**Objective:** Understand different merge behaviors

**Task:**
1. Create scenario for fast-forward merge
2. Create scenario for three-way merge
3. Compare the resulting histories
4. Understand when each is appropriate

**Solution:**
```bash
mkdir merge-types && cd merge-types
git init

# Setup: Create initial commits on main
echo "A" > file.txt && git add . && git commit -m "A"
echo "B" >> file.txt && git commit -am "B"

# Scenario 1: Fast-Forward Merge
# (feature branch hasn't diverged from main)
git checkout -b feature/ff
echo "C" >> file.txt && git commit -am "C"

git checkout main
# View history before merge
echo "Before FF merge:"
git log --oneline --graph

# Merge (should be fast-forward)
git merge feature/ff

echo "After FF merge:"
git log --oneline --graph
# Notice: branch pointer just moved forward

# Scenario 2: Three-Way Merge
# (both branches have new commits)
echo "D" >> file.txt && git commit -am "D"
git checkout -b feature/3way
echo "E" >> file.txt && git commit -am "E"

git checkout main
echo "F" >> file.txt && git commit -am "F"

# View before merge
echo "Before 3-way merge:"
git log --oneline --graph --all

# Merge (should create merge commit)
git merge feature/3way

echo "After 3-way merge:"
git log --oneline --graph
# Notice: merge commit was created combining both branches
```

---

### Exercise 7: Rebase vs. Merge
**Objective:** Compare rebase and merge strategies

**Task:**
1. Create branches with rebase-able changes
2. Perform merge on one
3. Perform rebase on another
4. Compare resulting histories
5. Understand pros and cons

**Solution:**
```bash
mkdir rebase-vs-merge && cd rebase-vs-merge
git init

# Create main with commits
echo "1" > file.txt && git add . && git commit -m "commit 1"
echo "2" >> file.txt && git commit -am "commit 2"
echo "3" >> file.txt && git commit -am "commit 3"

# Create feature branch from earlier commit
git checkout -b feature/rebase HEAD~2
echo "feature" > feature.txt && git add . && git commit -m "feature work"

# Option 1: Regular Merge
git checkout -b merge-branch feature
git checkout main
git merge merge-branch

echo "MERGE result:"
git log --oneline --graph --all main

# Option 2: Rebase
git checkout feature
git rebase main

git checkout main
git merge feature

echo "REBASE result:"
git log --oneline --graph
# Notice: cleaner linear history with feature commits
```

---

### Exercise 8: Branch Protection Workflow
**Objective:** Implement best practices for stable main branch

**Task:**
1. Set up a workflow preventing direct commits to main
2. Enforce feature branch work
3. Create pull requests (simulate with commit messages)
4. Review and merge
5. Document the process

**Solution:**
```bash
mkdir protected-workflow && cd protected-workflow
git init

# Initial setup
echo "# Project" > README.md
git add . && git commit -m "Initial: Set up project"

# Establish "protected main" rule
echo "Never commit directly to main!"
echo "Always use feature branches"

# Feature 1: User login
git checkout -b feature/user-login
echo "User login implementation" > auth.js
git add . && git commit -m "feat: Implement user login"

# Feature 2: User registration  
git checkout main
git checkout -b feature/user-register
echo "User registration implementation" > register.js
git add . && git commit -m "feat: Implement user registration"

# Feature 3: Password reset
git checkout main
git checkout -b feature/password-reset
echo "Password reset implementation" > reset.js
git add . && git commit -m "feat: Implement password reset"

# CODE REVIEW PROCESS
echo "
REVIEW PROCESS:
1. Check feature branch quality
2. Review code changes
3. Test functionality
4. Approve or request changes
5. Merge when ready
"

# Review and merge features
git checkout main

# Review feature/user-login
git diff main feature/user-login
echo "✅ Approved: feature/user-login"
git merge feature/user-login -m "Merge: User login feature (reviewed)"

# Review feature/user-register  
git diff main feature/user-register
echo "✅ Approved: feature/user-register"
git merge feature/user-register

# Review feature/password-reset
git diff main feature/password-reset
echo "✅ Approved: feature/password-reset"
git merge feature/password-reset

# Clean up feature branches
git branch -d feature/user-login feature/user-register feature/password-reset

# View protected main with only merged commits
git log --oneline
```

---

### Exercise 9: Complex Merge Scenario
**Objective:** Handle real-world multi-branch merging

**Task:**
1. Create multiple feature branches
2. Some have direct dependencies
3. Merge in correct order
4. Resolve any emerging conflicts
5. Maintain clean history

**Solution:**
```bash
mkdir complex-merge && cd complex-merge
git init

# Setup: Create base structure
cat > package.json << 'EOF'
{
  "name": "app",
  "version": "1.0.0",
  "dependencies": {}
}
EOF

git add . && git commit -m "Initial: Add package.json"

# Branch 1: Database module
git checkout -b feature/database
cat > database.js << 'EOF'
module.exports = {
  connect: function() { }
};
EOF
git add . && git commit -m "feat: Add database module"

# Branch 2: Authentication (depends on database)
git checkout main
git checkout -b feature/auth

# First prepare main for auth (includes database)
git merge feature/database
cat > auth.js << 'EOF'
const db = require('./database');
module.exports = {
  login: function(user, pass) { }
};
EOF
git add . && git commit -m "feat: Add auth module with DB dependency"

# Branch 3: User service (depends on auth)
git checkout main
git merge feature/database
git merge feature/auth --no-edit
git checkout -b feature/users
cat > users.js << 'EOF'
const auth = require('./auth');
module.exports = {
  getUser: function(id) { }
};
EOF
git add . && git commit -m "feat: Add user service"

# Merge all to main
git checkout main
git merge feature/users

# View complete integrated system
git log --oneline --graph
```

---

### Exercise 10: Branch Strategy Planning
**Objective:** Design a branching strategy for a hypothetical project

**Task:**
1. Assume you're building a web application
2. Design a complete branching strategy
3. Document branch types and purposes
4. Create example branches
5. Show the workflow visually

**Solution:**
```bash
mkdir branch-strategy && cd branch-strategy
git init

# Initialize main
echo "# Web Application v1.0" > README.md
git add . && git commit -m "Initial: Create project"

# BRANCHING STRATEGY DOCUMENT
cat > BRANCHING_STRATEGY.md << 'EOF'
# Our Branching Strategy

## main (production)
- Contains only production-ready code
- Protected branch - requires code review
- Only merges from release branches
- Tagged with version numbers

## develop (integration)
- Integration point for features
- Contains latest development changes
- Derived from: feature branches, bugfix branches

## Feature Branches (develop → features)
- format: feature/feature-name
- Short-lived (few days max)
- One feature per branch
- Examples:
  - feature/user-authentication
  - feature/payment-system
  - feature/dashboard

## Bugfix Branches (develop → bugfix)
- format: bugfix/bug-name
- For non-critical bugs
- Examples:
  - bugfix/form-validation
  - bugfix/mobile-responsive

## Release Branches
- format: release/version
- Created from develop when ready
- No new features, only bug fixes
- Merged to both main and develop

## Hotfix Branches
- format: hotfix/description
- From main for critical production bugs
- Merged to both main and develop
- Examples:
  - hotfix/critical-security-patch
  - hotfix/payment-failure
EOF

git add . && git commit -m "docs: Add branching strategy"

# Create develop branch
git checkout -b develop

# Create sample feature branches from develop
git checkout -b feature/authentication
echo "Auth code" > auth.js
git add . && git commit -m "feat: Add authentication"

git checkout develop
git checkout -b feature/payments
echo "Payment code" > payments.js
git add . && git commit -m "feat: Add payment processing"

# Create bugfix branches
git checkout develop
git checkout -b bugfix/email-validation
echo "Email validation fix" > email.js
git add . && git commit -m "fix: Improve email validation"

# Merge features back to develop
git checkout develop
git merge feature/authentication
git merge feature/payments
git merge bugfix/email-validation

# Create release branch
git checkout -b release/1.1.0

# Merge release to main
git checkout main
git merge release/1.1.0 -m "Merge: Release v1.1.0"
git tag "v1.1.0"

# Merge release back to develop
git checkout develop
git merge release/1.1.0

# View the strategy in action
echo "
STRATEGY VISUALIZATION:
"
git log --all --graph --oneline --decorate
```

---

## 🎓 Summary

You've now mastered:
- Git branches and their purpose
- Creating, listing, and deleting branches
- Switching between branches
- Merging strategies (fast-forward, three-way, squash)
- Handling and resolving merge conflicts
- Branch naming conventions
- Git Flow and GitHub Flow strategies
- Branch protection and code review workflows

## 📚 Resources

- [Git Branching Documentation](https://git-scm.com/doc)
- [Branching Models](https://git-flow.readthedocs.io/)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [GitKraken Branching Tutorial](https://www.youtube.com/watch?v=ecK3EnyGD8o)

## ✅ Checklist for Success

- [ ] Understand what branches are and why they matter
- [ ] Can create, switch, and delete branches
- [ ] Can merge branches with different strategies
- [ ] Can identify and resolve merge conflicts
- [ ] Know branch naming conventions
- [ ] Understand Git Flow and GitHub Flow
- [ ] Can implement branch protection practices
- [ ] Completed all 10 exercises
- [ ] Ready to work with branches in real projects
