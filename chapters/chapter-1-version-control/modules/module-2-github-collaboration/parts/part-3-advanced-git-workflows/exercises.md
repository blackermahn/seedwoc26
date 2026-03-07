# Part 3: Advanced Git Workflows - Exercises

## Exercise 1: Basic Rebase

Practice rebasing a feature branch onto main.

```bash
mkdir rebase-exercise && cd rebase-exercise
git init

# Create initial commit
echo "main" > file.txt
git add file.txt
git commit -m "main: initial"

# Create feature branch
git switch -c feature
echo "feature change" >> file.txt
git add file.txt
git commit -m "feature: make change"

# Add commit to main
git switch main
echo "main update" >> file.txt
git add file.txt
git commit -m "main: update"

# Rebase feature onto main's latest
git switch feature
git rebase main
# Feature commits are replayed on top of main

# View result
git log --oneline --graph
# Linear history!

# Merge is now fast-forward
git switch main
git merge feature
```

### Before/After
- **Before**: feature and main branches diverged
- **After**: feature linearly on top of main

---

## Exercise 2: Interactive Rebase

Squash and reorganize commits.

```bash
mkdir interactive-rebase && cd interactive-rebase
git init

# Create 3 commits
echo "A" > file.txt && git add . && git commit -m "A"
echo "B" >> file.txt && git add . && git commit -m "B"
echo "C" >> file.txt && git add . && git commit -m "C"

# Interactive rebase last 3 commits
git rebase -i HEAD~3
# Opens editor with:
# pick A
# pick B
# pick C

# Change to:
# pick A
# squash B
# squash C

# Save, then provide combined message

# Result: 1 commit instead of 3
git log --oneline
```

---

## Exercise 3: Cherry-Pick Example

Apply specific commit to another branch.

```bash
mkdir cherry-pick-example && cd cherry-pick-example
git init

# Create commits on main
echo "feature1" > file.txt && git add . && git commit -m "feat: feature 1"
echo "bugfix" >> file.txt && git add . && git commit -m "fix: critical bug"

# Get the bugfix commit hash
git log --oneline
# Pick the bugfix hash

# Create hotfix branch from older point
git switch -b hotfix HEAD~1

# Apply only the bugfix commit
git cherry-pick <bugfix-hash>

# Now hotfix has the bugfix without feature1
```

---

## Exercise 4: Complex Merge Scenario

Handle tangled branches and merges.

```bash
mkdir complex-merge && cd complex-merge
git init

# Main development
echo "main" > file.txt && git add . && git commit -m "main: init"

# Feature A
git switch -c feat-a
echo "feat-a" >> file.txt && git add . && git commit -m "feat: feature a"

# Feature B (from main)
git switch main
git switch -c feat-b
echo "feat-b" >> file.txt && git add . && git commit -m "feat: feature b"

# Main continues
git switch main
echo "main update" >> file.txt && git add . && git commit -m "main: update"

# Merge feat-a (clean)
git merge feat-a

# Merge feat-b (might conflict)
git merge feat-b
# Resolve any conflicts

git log --all --graph --oneline
```

---

## Exercise 5: Rewrite History with Rebase

Clean up messy commit history.

```bash
mkdir history-rewrite && cd history-rewrite
git init

# Create messy history
echo "v1" > file.txt && git add . && git commit -m "WIP"
echo "v2" >> file.txt && git add . && git commit -m "fixes"
echo "v3" >> file.txt && git add . && git commit -m "typo fix"
echo "v4" >> file.txt && git add . && git commit -m "update"

# Interactive rebase to clean up
git rebase -i HEAD~4
# pick first
# squash second (combine with first)
# squash third
# squash fourth

# Result: 1 clean commit with good message
# feat: Add complete feature with all fixes
```

---

## Exercises 6-10: Scenario Practice

### Exercise 6: Stash and Pop
```bash
git stash              # Save work temporarily
git switch other-branch
# Do other work
git switch back
git stash pop          # Restore work
```

### Exercise 7: Reflog Recovery
```bash
git reflog            # Show HEAD history
git reset --hard <sha> # Go back to any point
```

### Exercise 8: Tag Releases
```bash
git tag v1.0.0        # Create version tag
git push origin v1.0.0
git tag -l            # List all tags
```

### Exercise 9: Bisect to Find Bug
```bash
git bisect start
git bisect bad HEAD
git bisect good HEAD~10
# Git helps find the commit that introduced bug
```

### Exercise 10: Worktree for Parallel Work
```bash
git worktree add ../hotfix HEAD~2
# Work in separate directory without switching branches
git worktree prune
```

---

## 🎓 Summary

Advanced techniques ready!

✅ Next: Ready for Chapter 2!
