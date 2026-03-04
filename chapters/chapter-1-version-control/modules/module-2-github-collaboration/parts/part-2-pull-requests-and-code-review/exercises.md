# Part 2: Pull Requests and Code Review - Exercises

## Exercise 1: Create Your First Pull Request

Submit a PR to a real repository.

### Task
```bash
# Fork a repository you want to contribute to

# Clone your fork
git clone git@github.com:YOUR-USERNAME/repo.git
cd repo

# Create feature branch
git switch -c fix/improve-docs

# Make improvements
# Edit README.md or similar

# Commit
git add .
git commit -m "docs: improve documentation clarity"

# Push to your fork
git push origin fix/improve-docs

# On GitHub:
# 1. Go to your fork
# 2. You'll see "Compare & pull request" button
# 3. Click it
# 4. Fill in PR title and description
# 5. Click "Create pull request"
```

### PR Description Template
```markdown
## Description
What does this PR do?

## Changes Made
- Change 1
- Change 2

## Testing
How did you test this?

## Checklist
- [ ] Code follows style guide
- [ ] Self-reviewed own code
- [ ] Comments added for complexity
- [ ] Documentation updated
- [ ] No new warnings generated
```

### Success Criteria ✅
- [ ] PR created successfully
- [ ] Clear title and description
- [ ] Focuses on one thing
- [ ] Ready for review

---

## Exercise 2: Code Review Simulation

Review another person's code changes.

### Task: Reviewer Role
```bash
# In the PR:
# 1. Go to "Files changed" tab
# 2. Review each file
# 3. Click + button on line to comment:
```

### Good Review Comments
✅ "Could this be simplified using destructuring?"
✅ "Great improvement! Have you considered adding a test for this edge case?"
✅ "This function seems to do two things - could we split it?"

### Bad Review Comments
❌ "This is wrong."
❌ "Doesn't look good."
❌ "Just change it."

### Process
1. Read all changes
2. Ask clarifying questions
3. Suggest improvements
4. Approve when satisfied
5. Or "Request changes" if needed

### Success Criteria ✅
- [ ] Can leave review comments
- [ ] Comments are constructive
- [ ] Suggests improvements respectfully
- [ ] Can approve or request changes

---

## Exercise 3: Resolving PR Feedback

Fix code based on reviewer feedback.

### Task
```bash
# You received feedback on your PR
# Feedback: "Add error handling to this function"

# Make the change
git edit app.js  # Add error handling

# Commit the fix
git add app.js
git commit -m "review: add error handling to function"

# Push to same branch
git push origin fix/improve-docs

# PR automatically updates with new commit!

# In PR comment:
# "Done! Added try-catch error handling. Let me know if you'd like anything else."

# After approval:
# Click "Merge pull request"
```

### Conversation Flow
1. Submit PR
2. Receive feedback
3. Make changes
4. Push to same branch
5. PR updates automatically
6. Repeat until approved
7. Merge when ready

### Success Criteria ✅
- [ ] Can make requested changes
- [ ] Can push updates to same PR
- [ ] Understand PR auto-updates
- [ ] Can merge when approved

---

## Exercise 4: Handling PR Conflicts

Resolve conflicts when merging PR.

### Task
```bash
# Your PR has conflicts with main

# Option 1: Resolve locally
git switch fix/my-feature
git fetch origin
git rebase origin/main
# Fix conflicts
git add .
git rebase --continue
git push origin fix/my-feature --force-with-lease

# Option 2: Use GitHub interface
# GitHub shows "Resolve conflicts" button
# Click it and resolve in browser
# Click "Mark as resolved"
# Click "Commit merge"
```

### Conflict Markers
```javascript
<<<<<<< HEAD
// Your version (from main)
console.log("main version");
=======
// Their version (from feature branch)
console.log("feature version");
>>>>>>> branch-name
```

### Resolution
Keep the version that makes sense, remove markers:
```javascript
console.log("final version");
```

### Success Criteria ✅
- [ ] Can identify merge conflicts
- [ ] Can resolve conflicts
- [ ] Can complete PR merge
- [ ] Understand both resolution methods

---

## Exercise 5: PR Best Practices

Follow professional PR standards.

### DO ✅
```
✅ Small focused PRs (one feature/fix)
✅ Clear, descriptive title
✅ Detailed description
✅ Reference related issues (#123)
✅ Link to documentation changes
✅ Include tests
✅ Update CHANGELOG if applicable
✅ Keep commits organized
```

### DON'T ❌
```
❌ Large PRs with multiple features
❌ Vague titles like "fixes stuff"
❌ No description
❌ Unrelated changes mixed together
❌ Poor commit messages
❌ No tests
❌ Outdated documentation
❌ Messy commit history
```

### Example Good PR

Title: "feat: Add two-factor authentication to login"

Body:
```markdown
## Description
Implements TOTP-based two-factor authentication for user accounts.

## Changes
- Add `totp.js` module for TOTP generation
- Add `user.twoFactorEnabled` database property
- Add 2FA step to login flow
- Add 2FA setup page

## Tests
- Added tests for TOTP generation
- Added tests for login with 2FA
- Manual testing on staging environment

## Related
Closes #234
```

### Success Criteria ✅
- [ ] Follow PR best practices
- [ ] Write clear descriptions
- [ ] Keep PRs focused
- [ ] Include tests
- [ ] Reference related issues

---

## Exercises 6-10: Advanced Scenarios

These exercises are scenarios to practice with real PRs.

### Exercise 6: Multi-File PR
Create PR changing 3 related files with clear narrative.

### Exercise 7: Documentation PR
Submit PR that's purely documentation updates.

### Exercise 8: Performance PR  
Submit PR showing performance improvements with before/after metrics.

### Exercise 9: Refactoring PR
Submit PR refactoring code while keeping functionality same.

### Exercise 10: Dependency Update PR
Update a dependency and test for compatibility.

### Success Criteria for All ✅
- [ ] PR properly scoped
- [ ] Clear description
- [ ] Meets project standards
- [ ] Ready to merge

---

## 🎓 Summary

You've learned:
- ✅ Creating pull requests
- ✅ Code review process
- ✅ Responding to feedback
- ✅ Resolving conflicts
- ✅ PR best practices

---

✅ Next: **Part 3: Advanced Git Workflows**
