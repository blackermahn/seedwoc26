# Git Merge Strategies & Conflict Resolution

## Types of Merges

### Fast-Forward Merge
When the target branch is directly ahead, just move the pointer.

```
Before:
main (A)
         └─── feature (B, C)

git merge feature

After:
main / feature (A → B → C)
```

```bash
git merge feature --ff      # Allow FF (default)
git merge feature --no-ff   # Create merge commit always
git merge feature --ff-only # Fail if can't FF
```

**When to use:**
- ✅ Clean history preferred
- ✅ Not squashing commits
- ✅ Simple integrations

### Merge Commit (3-way)

```
Before:
main (A → C)
         └─── feature (B → D)

git merge feature

After:
main (A → C → M ← merges in D)
     └─── B → D
```

**Creates merge commit** when branches diverge.

```bash
git merge feature        # Default 3-way merge
```

**When to use:**
- ✅ Complex integrations
- ✅ Feature branches converging
- ✅ Want to preserve history
- ✅ Multiple parents important

### Squash Merge

```
Before:
main (A, B)
           └─── feature (C, D, E)

git merge --squash feature
git commit

After:
main (A, B, Squashed C+D+E)
```

**Combines all commits into one.**

```bash
git merge --squash feature
git commit -m "feature: add user authentication"
```

**When to use:**
- ✅ Cleanup messy branches
- ✅ Hide work-in-progress
- ✅ Keep main clean
- ✅ Small features

### Rebase Merge

```
Before:
main (A, B)
           └─── feature (C, D, E)

git rebase main
git merge feature --ff

After:
main (A, B, C, D, E)
```

**Replay commits on top of main.**

```bash
git rebase main          # Rebase current branch
git rebase main feature  # Rebase feature on main
```

**When to use:**
- ✅ Want linear history
- ✅ Clean commit line
- ✅ No merge commits
- ✅ Small team

## Merge Conflicts

### Understanding Conflicts

```
main: A → B → C
              ↓
feature:    ↓ → D

// Conflict: Both changed the same line
```

### Conflict Markers

```javascript
function greet(name) {
<<<<<<< HEAD
  console.log("Hello, " + name + "!");  // main version
=======
  console.log(`Hi ${name}`);             // feature version
>>>>>>> feature
}
```

### Markers Explained
- `<<<<<<<` - Start conflict (current branch)
- `=======` - Separator
- `>>>>>>>` - End conflict (incoming branch)

### Basic Resolution

```bash
# 1. See conflict status
git status

# 2. Edit file, keep desired version
# Remove conflict markers
code index.js

# 3. Stage resolved file
git add index.js

# 4. Complete merge
git commit -m "Merge feature: resolved conflicts"
```

### Advanced Resolution

#### Using Merge Tool
```bash
git mergetool                    # GUI merge tool
git mergetool --tool=vimdiff    # Specific tool
```

#### Aborting Merge
```bash
git merge --abort               # Cancel in-progress merge
git rebase --abort              # Cancel in-progress rebase
```

#### Viewing All Conflicts
```bash
git diff --ours                 # Our changes
git diff --theirs               # Their changes
git diff --base                 # Original version
```

#### Choosing a Version
```bash
# Keep our version entirely
git checkout --ours file.js
git add file.js

# Keep their version entirely
git checkout --theirs file.js
git add file.js
```

## Merge Strategies

### Recursive Strategy (Default)
```bash
git merge -X ours feature       # Prefer our changes
git merge -X theirs feature     # Prefer their changes
```

### Resolve Strategy
Three-way merge. Good for simple cases.

```bash
git merge -s resolve feature
```

### Octopus Strategy
Merge multiple branches at once.

```bash
git merge feature1 feature2 feature3
```

### Ours Strategy
Always takes current version.

```bash
git merge -s ours feature       # Ignores feature entirely
```

Use for:
- Abandoning a branch
- Keeping unrelated histories separate

### Subtree Strategy
Merge unrelated histories.

```bash
git merge -X subtree feature
```

## Conflict Prevention

### 1. Keep Branches Short
```bash
# Bad: 2-week branch
git branch -c "add-auth" develop
# ... 2 weeks later ...
git merge develop  # Massive conflicts

# Good: 2-day branch
git branch -c "add-login-form" develop
# ... 2 days later ...
git merge develop  # Few/no conflicts
```

### 2. Rebase Before Merge
```bash
git fetch origin
git rebase origin/develop
# Resolve conflicts in feature branch
git push origin feature --force-with-lease
```

### 3. Communicate Changes
```bash
# Indicate what you're working on
git switch -c feat/api-client develop

# Update frequently
git pull --rebase origin develop
```

### 4. Code Review Before Merge
```
Create PR → Review code → Request changes → Rebase → Merge
```

## Handling Submodules (Conflicts)

```bash
# Submodule commit conflict
git merge feature

# Resolve: choose main version
git checkout --ours path/to/submodule
git add path/to/submodule

# OR: Update submodule first
git submodule update --init
git add path/to/submodule
git commit
```

## Merge Commit Best Practices

### Template
```bash
Merge branch 'feature-branch' into main

Description of what this feature does.

- List capability 1
- List capability 2
- List capability 3

Closes #123
```

### Example
```bash
Merge branch 'feature/oauth-login' into main

Adds OAuth2 authentication support using Google and GitHub.

- Google OAuth integration
- GitHub OAuth integration
- Automatic account creation
- Email verification flow

Closes #456
```

### Creating Good Merge Commits
```bash
# Interactive rebase before merging
git rebase -i origin/main

# Or squash and merge
git merge --squash feature
git commit

# Or use specific merge strategy
git merge --no-ff feature
```

## Recovering from Bad Merges

### Find the Bad Merge
```bash
git log --all --graph --oneline

# Or use bisect
git bisect start
git bisect bad HEAD
git bisect good <good-commit>
```

### Revert a Merge
```bash
# Option 1: Revert the merge commit
git revert -m 1 <merge-commit>

# Option 2: Redo the merge
git reset --hard <before-merge>
git merge correct-branch
```

### Continue from Bad Merge
```bash
# Go back before the bad merge
git log --oneline

# Reset to good state
git reset --hard abc1234

# Merge correctly
git merge feature --no-ff
```

