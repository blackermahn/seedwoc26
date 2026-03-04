# Part 2: Pull Requests and Code Review

## 📚 Part Overview

Master pull requests - the primary mechanism for code review and collaboration on GitHub. Learn to create, review, discuss, and merge pull requests effectively.

## 🎯 Learning Objectives

By completing this part, you will:
- Create effective pull requests
- Write clear PR descriptions
- Review code thoughtfully
- Approve or request changes
- Resolve conflicts in PRs
- Understand draft PRs
- Work with CI/CD checks
- Best practices for collaborative reviews

## 🕐 Estimated Duration
- **Time**: 5-6 hours
- **Difficulty**: ⭐ Intermediate
- **Prerequisites**: Part 1 - GitHub Essentials

## 📖 Core Concepts

### What is a Pull Request?

A pull request (PR) is a request to merge changes from one branch to another with built-in code review.

```
feature branch              main branch
    ├─ commit 1                 │
    ├─ commit 2       PR        ├─ existing code
    └─ commit 3 ──────────────► │
                   (Requires    │
                    review &    │
                    approval)   │
                    
After merge:
main branch
├─ existing code
├─ commit 1 (from feature)
├─ commit 2 (from feature)
└─ commit 3 (from feature)
```

### PR Workflow

```
1. Create branch     2. Push changes      3. Open PR
4. Discussion        5. Address feedback  6. Approval
7. Merge            8. Delete branch      9. Deploy
```

## Creating Effective Pull Requests

### PR Title and Description

**Good PR Title:**
- Descriptive and concise
- Follows naming convention
- Can be understood without reading description

```
✅ GOOD:
feat: Add user authentication system
fix: Resolve login form validation bug
docs: Update API documentation

❌ BAD:
Update stuff
Fix bug
WIP: changes
```

**PR Body Template:**

```markdown
## Description
Brief description of changes

## Related Issues
Closes #123
Fixes #456

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Breaking change

## Testing Done
Description of tests performed:
- Test 1
- Test 2

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows style guide
- [ ] Added/updated tests
- [ ] Updated documentation
- [ ] No new warnings generated
- [ ] My changes break no existing tests
```

### Creating a PR on GitHub

```bash
# 1. Push your feature branch
git push -u origin feature/my-feature

# 2. On GitHub.com
# - Go to your fork
# - Click "Pull Request" button
# - Select base-repo:main ← your-fork:feature/my-feature
# - Fill title and description
# - Click "Create Pull Request"

# Example PR
Title: feat: Add email verification on signup
Description:
- Implement email verification flow
- Send verification email
- Validate token before activation
Closes #45
```

## Code Review Process

### As a Reviewer

```markdown
## Review Checklist

### Functionality
- [ ] Does the code do what it claims?
- [ ] Are edge cases handled?
- [ ] Error handling sufficient?
- [ ] Performance acceptable?

### Code Quality
- [ ] Code is readable and maintainable
- [ ] Follows project style guide
- [ ] No code duplication
- [ ] Proper naming conventions

### Testing
- [ ] New code has tests
- [ ] Tests cover happy path
- [ ] Tests cover edge cases
- [ ] Existing tests still pass

### Documentation
- [ ] Changes documented
- [ ] Updated README if needed
- [ ] Comments clear and helpful
```

### Review Comments

**Constructive feedback:**

```javascript
// In PR review

❌ BAD COMMENT:
"This is wrong"

✅ GOOD COMMENT:
"This code could fail if user is null. 
Consider adding a null check:

if (!user) {
  throw new Error('User not found');
}"

❌ BAD COMMENT:
"Why did you do it this way?"

✅ GOOD COMMENT:
"This approach might have performance issues 
with large datasets. Have you considered 
using a Set instead of an Array for O(1) lookup?"
```

### Review Options

1. **Comment** - Leave feedback without approving/rejecting
2. **Approve** - Approve changes
3. **Request Changes** - Block PR until changes made
4. **Re-Request Review** - Ask author to re-review after changes

## Resolving PR Feedback

### Updating PR with Changes

```bash
# Make changes locally
git checkout feature/my-feature
echo "fixed code" > file.js

# Commit changes
git commit -am "Address PR feedback: improve error handling"

# Push to update PR
git push origin feature/my-feature
# PR automatically updates with new commits
```

### Handling Conflicts

```bash
# PR has conflicts with main branch
git fetch origin
git rebase origin/main

# Resolve conflicts
# ... edit conflicted files ...

# Complete rebase
git add resolved-files
git rebase --continue

# Force push (only your feature branch!)
git push -f origin feature/my-feature
```

## Advanced PR Features

### Draft Pull Requests

Mark PR as "Draft" when still in progress:

```bash
# When creating PR, select "Draft"
# Or convert existing PR to draft

# Benefits:
# - Won't accidentally merge
# - CI/CD still runs
# - Shows it's work in progress
# - Good for getting early feedback
```

### PR Templates

Create `.github/pull_request_template.md`:

```markdown
## 📝 Description
<!-- Describe your changes -->

## 🔗 Related Issues
<!-- Link to related issues: fixes #123 -->

## ✅ Type of Change
- [ ] Feature
- [ ] Bug Fix
- [ ] Documentation
- [ ] Breaking Change

## 🧪 Testing
<!-- Describe testing done -->

## 📸 Screenshots (if UI change)
<!-- Add relevant screenshots -->

## ☑️ Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
```

### Merge Strategies

```bash
# In GitHub PR: "Merge pull request" dropdown

# 1. Create a merge commit (default)
# Keeps all history, creates merge commit

# 2. Squash and merge
# Combines all PR commits into one
# Good for: clean history, bug fixes

# 3. Rebase and merge
# Replays commits on top
# Good for: linear history, feature branches
```

## Code Examples

### Complete PR Workflow

```bash
# 1. Create feature from main
git checkout main
git pull origin main
git checkout -b feature/user-roles

# 2. Make changes
cat > roles.js << 'EOF'
const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
};

function hasRole(user, role) {
  return user.role === role;
}

module.exports = { ROLES, hasRole };
EOF

git add roles.js
git commit -m "feat: Add user roles module"

# 3. Make more commits
cat > roles.test.js << 'EOF'
const { ROLES, hasRole } = require('./roles');

describe('Roles', () => {
  it('should check user role', () => {
    const user = { role: ROLES.ADMIN };
    expect(hasRole(user, ROLES.ADMIN)).toBe(true);
  });
});
EOF

git add roles.test.js
git commit -m "test: Add role checking tests"

# 4. Push to create PR
git push -u origin feature/user-roles

# 5. On GitHub: Create Pull Request
# Title: feat: Add user roles system
# Description: Implement role-based access control...
# Closes #789

# 6. Reviewer's feedback: "Add documentation"
echo "/** User roles module */" >> roles.js
git commit -am "docs: Add JSDoc comments to roles"
git push origin feature/user-roles

# 7. Reviewer approves

# 8. Merge on GitHub (or command line)
git checkout main
git pull origin main
git merge feature/user-roles
git push origin main

# 9. Cleanup
git branch -d feature/user-roles
git push origin --delete feature/user-roles
```

## 📝 Exercises

### Exercise 1: Create Your First Pull Request

```bash
mkdir pr-practice && cd pr-practice
git init

# Initial commit
echo "# Project" > README.md
git add . && git commit -m "Initial"

# Remote simulation (create two directories)
cd ..
mkdir pr-practice.git
cd pr-practice.git
git init --bare

# Back to practice
cd ../pr-practice
git remote add origin ../pr-practice.git
git push -u origin main

# Create feature branch
git checkout -b feature/add-license
echo "MIT License" > LICENSE
git add . && git commit -m "Add MIT license"
git push -u origin feature/add-license

# Simulate PR merge
git checkout main
git merge feature/add-license
git push origin main
```

### Exercise 2: Code Review Simulation

```bash
# Create a project with reviewable code
mkdir review-practice && cd review-practice
git init

# Initial code (has issues)
cat > calculator.js << 'EOF'
function add(a, b) {
  return a + b;
}

function divide(a, b) {
  return a / b;  // No error checking!
}

module.exports = { add, divide };
EOF

git add . && git commit -m "Initial: Add calculator"

# Create feature with improvements
git checkout -b feature/improve-calculator

# Fixed version
cat > calculator.js << 'EOF'
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Arguments must be numbers');
  }
  return a + b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Arguments must be numbers');
  }
  return a / b;
}

module.exports = { add, divide };
EOF

git commit -am "feat: Add validation to calculator functions"
git push -u origin feature/improve-calculator
```

### Exercise 3: Resolving PR Feedback

```bash
# Original PR with comments
git checkout -b feature/new-feature
echo "new code" > feature.js
git add . && git commit -m "feat: Add new feature"
git push -u origin feature/new-feature

# Simulate feedback: "Add tests"
cat > feature.test.js << 'EOF'
describe('Feature', () => {
  it('should work correctly', () => {
    expect(true).toBe(true);
  });
});
EOF

git add . && git commit -m "test: Add tests for new feature"
git push origin feature/new-feature

# Simulate second feedback: "Update docs"
echo "## New Feature\nDoes amazing things" >> README.md
git commit -am "docs: Document new feature"
git push origin feature/new-feature
```

### Exercise 4: Handling PR Conflicts

```bash
# Main branch has changes
git checkout main
echo "main change" > file.js
git commit -am "Update main"

# Feature branch also modified file
git checkout feature/conflict-test
echo "feature change" > file.js
git commit -am "Feature change"

# Try to push (would have conflict when merging)
git push -u origin feature/conflict-test

# Resolve conflict
git fetch origin
git rebase origin/main

# Resolve: edit file.js with both changes
echo "main change + feature change" > file.js

git add file.js
git rebase --continue
git push -f origin feature/conflict-test
```

### Exercise 5: PR Best Practices

Implement all best practices:

```bash
# 1. Good branch naming
git checkout -b feature/implement-auth-system

# 2. Logical commits
git commit -m "feat: Create authentication module"
git commit -m "feat: Add login endpoint"
git commit -m "test: Add authentication tests"
git commit -m "docs: Document auth API"

# 3. Clear PR description
# Title: feat: Implement authentication system
# Description:
# - JWT-based authentication
# - Login endpoint
# - Password hashing with bcrypt
# - Full test coverage
# Closes #123

# 4. Keep PR focused
# (This PR only does authentication, not authorization)

# 5. Well-formatted code
# (Already formatted and linted)

# 6. Tests included
# (All changes tested)

# 7. Documentation
# (README and comments updated)
```

## 🎓 Summary

You've learned:
- Creating effective pull requests
- Writing clear descriptions
- Code review best practices
- Handling feedback and conflicts
- PR merge strategies
- Draft PRs and templates
- Collaborative development workflow

## ✅ Checklist

- [ ] Created pull request
- [ ] Written clear description
- [ ] Handled reviewer feedback
- [ ] Resolved conflicts
- [ ] Merged PR successfully
- [ ] Reviewed others' code
- [ ] Completed all exercises
