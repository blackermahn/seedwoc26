# Common Git Mistakes and Solutions

## Mistake 1: Committed to Wrong Branch

**Problem**: You committed to `main` instead of a feature branch.

**Solution**:
```bash
# Undo the commit but keep changes
git reset --soft HEAD~1

# Create correct branch
git checkout -b feature/correct-branch

# Commit to correct branch
git commit -m "feat: Your message"

# Push to remote
git push -u origin feature/correct-branch
```

## Mistake 2: Forgot to Stage Files

**Problem**: You committed with `git commit` but forgot `git add`.

**Solution**:
```bash
# Add forgotten files
git add forgotten-file.js

# Amend the previous commit
git commit --amend --no-edit

# Or create a new commit
git commit -m "Add forgotten files"
```

## Mistake 3: Wrong Commit Message

**Problem**: You committed with a typo or unclear message.

**Solution**:
```bash
# Amend the last commit message
git commit --amend -m "New message"

# Don't do this if already pushed!
# If pushed, use git revert instead
```

## Mistake 4: Pushed to Wrong Remote

**Problem**: You pushed to production when you meant to push to staging.

**Solution**:
```bash
# Check what you pushed
git log origin/production --oneline -5

# Revert the bad commits
git revert <bad-commit>

# Push the revert
git push origin production

# Prevention: Use branch protection on main/production
```

## Mistake 5: Merge Conflicts

**Problem**: You tried to merge but got conflicts.

**Solution**:
```bash
# View conflicts
git status

# Edit files to resolve conflicts
# Remove conflict markers (<<<<, ====, >>>>)

# Stage resolved files
git add resolved-file.js

# Complete the merge
git commit -m "Merge: Resolved conflicts"

# If too complicated, abort
git merge --abort
```

## Mistake 6: Accidentally Deleted File

**Problem**: You deleted a file and committed, but need it back.

**Solution**:
```bash
# Find when file was deleted
git log --diff-filter=D --summary | grep delete | head -20

# Restore from specific commit
git checkout <commit>^ -- path/to/file.js

# Or restore from previous version
git restore --source=HEAD~1 file.js
```

## Safety Tips

✅ **DO:**
- Always pull before pushing
- Create feature branches
- Use `git status` frequently
- Test before pushing
- Use meaningful messages

❌ **DON'T:**
- Force push to shared branches
- Commit sensitive data
- Make huge commits
- Ignore warnings
- Skip testing
