# Git Team Workflows and Collaboration Patterns

## Common Team Patterns

### GitHub Flow (Recommended for Most Teams)

**When to use:** Continuous deployment, small teams, frequent releases

**Workflow:**
1. Main branch always deployable
2. Create feature branch from main
3. Push to feature branch
4. Open PR for review
5. Get approval
6. Merge via PR
7. Delete feature branch
8. Deploy main

**Branch Naming:**
```
feature/user-authentication
fix/login-button-bug
docs/update-readme
refactor/simplify-api
test/add-unit-tests
chore/update-dependencies
```

**Team Best Practices:**
- Use descriptive branch names
- Keep PRs small (< 400 lines)
- Require minimum 1 review
- Require tests to pass
- Auto-deploy after merge

---

### Git Flow (Larger Teams, Scheduled Releases)

**When to use:** Large teams, scheduled releases, multiple versions

**Branches:**
```
main          → Production releases (tagged)
develop       → Integration branch (always working)
feature/*     → New features (from develop)
release/*     → Release prep (from develop)
hotfix/*      → Urgent fixes (from main)
```

**Workflow:**

```
Feature Development:
develop → feature/invoice → develop

Release Preparation:
develop → release/1.2.0 → main (tag v1.2.0)
                       → develop

Hotfix:
main → hotfix/critical-bug → main (tag v1.2.1)
                           → develop
```

**Commands:**
```bash
# Initialize Git Flow
git flow init

# Create feature
git flow feature start user-profile

# Finish feature (merges to develop)
git flow feature finish user-profile

# Create release
git flow release start 1.2.0

# Finish release (tags main, merges to develop)
git flow release finish 1.2.0

# Create hotfix
git flow hotfix start critical-fix

# Finish hotfix (tags main, merges to develop)
git flow hotfix finish critical-fix
```

---

### Trunk-Based Development (Fast-Moving Teams)

**When to use:** Very fast iteration, small, experienced teams

**Characteristics:**
- Main branch is always deployable
- Very short-lived branches (< 1 day)
- Feature flags for incomplete features
- Frequent integrations

**Workflow:**
```bash
git switch -c feature/my-work
# Make small, focused change
git push origin feature/my-work
# Create PR
# Merge immediately after review
```

**With Feature Flags:**
```javascript
// Code with feature flag
if (flags.isEnabled("newDashboard")) {
  return <NewDashboard />;
} else {
  return <OldDashboard />;
}
```

---

## Team Coordination

### Code Review Best Practices

**For Reviewers:**
```
✅ Ask clarifying questions
✅ Suggest improvements respectfully
✅ Approve when satisfied
✅ Request changes if needed
✅ Provide context for suggestions
❌ Demand changes without explanation
❌ Approve without reading
❌ Block indefinitely
```

**For PR Authors:**
```
✅ Respond to all comments
✅ Update PR with new commits
✅ Ask for help if stuck
✅ Keep PRs focused
✅ Run tests locally first
❌ Rewrite entire PR to address one comment
❌ Push unnecessary commits
❌ Merge without approval
❌ Cherry-pick approvals to merge
```

### Handling Conflicting PRs

**Scenario:** Two developers work on same area

**Solution:**
```bash
# Developer A: Merge first
git switch main
git pull origin main

# Developer B: Sync and resolve
git fetch origin
git rebase origin/main
# Resolve conflicts
git push origin feature/dev-b --force-with-lease

# Update PR to reflect changes
```

### Onboarding a New Developer

**Checklist:**
```markdown
- [ ] SSH keys configured
- [ ] Local environment set up
- [ ] Can clone repository
- [ ] Can create feature branch
- [ ] Can run tests locally
- [ ] Can create PR
- [ ] Can build/deploy locally
- [ ] Pair with senior dev on first feature
- [ ] Understand branching strategy
- [ ] Know who to ask for help
```

### Remote Work Considerations

**Time Zone Handling:**
```bash
# Document PR expectations
# "PR reviews within 24 hours"
# "Async updates, sync reviews Tuesdays"

# Use automation for critical checks
# CI/CD runs tests automatically
# All static analysis automated

# Clear communication in PR
# Explain trade-offs
# Link to issues/design docs
```

---

## Integration Strategies

### Continuous Integration Setup

**GitHub Actions Example:**
```yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

### Merge Strategies

**1. Merge Commit (Default)**
```
main: A—B—C—M (merge commit)
      \     /
feature: D—E
```
Preserves history, shows branching

**2. Squash and Merge**
```
main: A—B—C—D (squashed commits D+E)
feature: D—E
```
Clean history, loses intermediate commits

**3. Rebase and Merge**
```
main: A—B—C—D—E (rebased, no merge commit)
feature: D—E
```
Linear history, rewrites history

**Decision:**
- **Preserve history:** Merge commit
- **Clean history:** Squash for features
- **Linear history:** Rebase

### Protected Branch Rules

```
✅ Require pull request review
✅ Dismiss stale PR approvals when new commits pushed
✅ Require status checks (tests must pass)
✅ Require branches up to date before merging
✅ Restrict who can push (maintainers only)
✅ Require signed commits (for teams using GPG)
✅ Prevent force push
```

---

## Scaling Git Practices

### As Team Grows

**Small Team (2-5):**
- GitHub Flow is fine
- Minimal process
- Direct communication

**Growing Team (6-15):**
- Consider Git Flow
- Defined roles (reviewer, maintainer)
- Release coordinator
- Better documentation

**Large Team (15+):**
- Multiple maintainers
- Detailed branching strategy
- Multiple review required
- Release process documented
- Automated deployments

### Managing Dependencies

**Monorepo:**
```bash
# Single repo, multiple projects
monorepo/
├── apps/
│   ├── web/
│   └── mobile/
└── packages/
    ├── ui/
    └── utils/

# Changes to core package affect all
# Requires coordination
```

**Multi-repo:**
```bash
monorepo-ui/    → npm @org/ui
monorepo-api/   → npm @org/api
monorepo-web/   → uses both

# More independence
# More coordination needed
```

**Submodules:**
```bash
main-repo/
└── external-repo/ (submodule pinned to commit)

# Use when external repo rarely changes
# Difficult to maintain
```

---

## Troubleshooting Team Conflicts

### "Everyone Is Waiting on Merge"

**Problem:** Long-running feature branches cause bottlenecks

**Solution:**
- Split feature into smaller PRs
- Merge smaller changes earlier
- Use feature flags for incomplete work
- Integrate frequently

### "Merge Conflicts Keep Happening"

**Problem:** Two developers editing same files

**Solution:**
- Better task division
- Code ownership (who maintains which part)
- Regular syncs
- Atomic commits (related changes together)

### "Tests Keep Failing on Main"

**Problem:** Broken main branch affects everyone

**Solution:**
- Better PR reviews
- Require tests to pass before merge
- Run tests locally before push
- Add CI/CD checks
- Fix immediately if main breaks

---

## Documentation

### Team Playbook

Create `DEVELOPMENT.md`:
```markdown
# Development Guide

## Branching Strategy
We use GitHub Flow...

## Review Process
- Minimum 1 approval
- Must pass all checks
- Review within 24 hours

## Merging
- Squash and merge for features
- Merge commits for releases

## Deployment
- Auto-deploy main to staging
- Manual release to production

## Help
- Ask in #dev-help Slack channel
- Review existing PRs for examples
- Pair with onboarding buddy
```

### Code Review Rubric

```markdown
## Code Review Checklist

### Functionality
- [ ] Does it do what the PR says?
- [ ] Are edge cases handled?
- [ ] Is error handling present?

### Code Quality  
- [ ] Follows project style guide
- [ ] Functions are focused
- [ ] Variables are well-named
- [ ] Complex logic is commented

### Testing
- [ ] Tests pass locally
- [ ] Includes new tests for new code
- [ ] Tests are meaningful
- [ ] Coverage doesn't decrease

### Performance
- [ ] No obvious performance issues
- [ ] N+1 query problems avoided
- [ ] Large data structures justified

### Security
- [ ] No hardcoded secrets
- [ ] User input validated
- [ ] Authorization checked
- [ ] Dependencies up to date
```

