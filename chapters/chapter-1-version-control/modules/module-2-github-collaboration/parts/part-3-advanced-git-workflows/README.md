# Part 3: Advanced Git Workflows

## 📚 Part Overview

Master advanced Git workflows including rebasing, cherry-picking, squashing, and complex merge strategies. Learn to maintain clean, professional Git histories.

## 🎯 Learning Objectives

By completing this part, you will:
- Understand rebase vs. merge strategies
- Use cherry-pick for selective commits
- Squash commits and rewrite history
- Handle complex merge scenarios
- Use interactive rebase
- Work with multiple remotes efficiently
- Resolve advanced conflicts
- Maintain clean Git history best practices

## 🕐 Estimated Duration
- **Time**: 6-8 hours
- **Difficulty**: ⭐⭐ Advanced
- **Prerequisites**: Parts 1 & 2

## Core Concepts

### Rebase vs. Merge

```
MERGE (keeps history intact):
main: A ──► B ──► C ──► D ──► M (merge commit)
                    ▲         │
feature:           └─► E ──► F ◄─┘


REBASE (linear history):
main: A ──► B ──► C ──► D ──► E' ──► F'
```

### Cherry-Pick

```
Branch A: A ──► B ──► C ──► D
               
Branch B: X ──► Y ──► Z

Pick C from A to B:
Branch B: X ──► Y ──► Z ──► C'
```

## Interactive Rebase

```bash
# Interactive rebase of last 3 commits
git rebase -i HEAD~3

# Options:
pick   = use commit
reword = use commit, but edit message
squash = combine with previous
fixup  = like squash, discard log message
drop   = remove commit
```

## Code Examples

### Rebase Workflow

```bash
# Before rebase
git log --oneline feature
# b3e4d89 feat: Add feature
# a9f2c1e fix: Fix issue
# 5d7c8b2 main commit

# Interactive rebase
git rebase -i main

# In editor:
# pick 5d7c8b2 main commit
# pick a9f2c1e fix: Fix issue
# squash b3e4d89 feat: Add feature

# Result: cleaner history
```

### Cherry-Pick Example

```bash
# Copy specific commit to another branch
git log hotfix --oneline
# 7a2b3c4 Security patch

git checkout main
git cherry-pick 7a2b3c4  # Apply commit to main
```

### Squashing Commits

```bash
# Squash last 3 commits
git rebase -i HEAD~3
# In editor: pick, squash, squash
# Result: one combined commit
```

## 📝 Exercises

### Exercise 1: Basic Rebase

```bash
mkdir rebase-practice
cd rebase-practice
git init

# Create main with commits
for i in {1..3}; do
  echo "main $i" > "main$i.txt"
  git add . && git commit -m "main: Add main$i"
done

# Feature branch with commits
git checkout -b feature/enhancement
for i in {1..3}; do
  echo "feature $i" > "feature$i.txt"
  git add . && git commit -m "feature: Add feature$i"
done

# Before rebase
git log --oneline --all --graph

# Rebase on main
git rebase main

# After rebase
git log --oneline --all --graph
```

### Exercise 2: Interactive Rebase

```bash
git checkout main
git checkout -b feature/cleanup

# Create commits to clean up
git commit --allow-empty -m "feat: Feature 1"
git commit --allow-empty -m "fix: Fix from feature"
git commit --allow-empty -m "feat: Feature 2"
git commit --allow-empty -m "docs: Update docs"  
git commit --allow-empty -m "refactor: Code cleanup"

# Interactive rebase
git rebase -i HEAD~5

# Edit to squash related commits
# pick (Feature 1)
# squash (Fix from feature)
# pick (Feature 2)
# squash (docs)
# squash (refactor)

# Result: cleaner history
```

### Exercise 3: Cherry-Pick Example

```bash
# Setup
git checkout main
git commit --allow-empty -m "main work"

git checkout -b hotfix
git commit --allow-empty -m "Critical security fix"

# Cherry-pick to main
git checkout main
git cherry-pick hotfix

# Verify fix is in main
git log --oneline
```

### Exercise 4: Complex Merge Scenario

```bash
# Create diverged branches
git checkout -b feature/feature1
for i in {1..2}; do
  git commit --allow-empty -m "Feature 1 - $i"
done

git checkout main
git checkout -b feature/feature2
for i in {1..2}; do
  git commit --allow-empty -m "Feature 2 - $i"
done

git checkout main
git checkout -b feature/feature3
for i in {1..2}; do
  git commit --allow-empty -m "Feature 3 - $i"
done

# Merge all features
git checkout main
git merge feature/feature1
git merge feature/feature2
git merge feature/feature3

# View integration
git log --all --graph --oneline
```

### Exercise 5: Rewrite History with Rebase

```bash
git checkout -b feature/cleanup
for i in {1..5}; do
  echo "work" >> file.txt
  git add . && git commit -m "WIP: work $i"
done

# Reword commits for clarity
git rebase -i HEAD~5

# Change all commits from:
# "WIP: work X" to "feat: Implement feature"

git log --oneline
```

## 🎓 Summary

You've learned:
- Rebase vs. merge strategies
- Cherry-picking commits  
- Squashing and combining commits
- Interactive rebase
- Rewriting commit history
- Complex merge scenarios

## ✅ Checklist

- [ ] Understand rebase mechanics
- [ ] Can rebase branches cleanly
- [ ] Use interactive rebase effectively
- [ ] Cherry-pick when appropriate
- [ ] Complete all exercises
