# Advanced Branching Strategies

## Git Flow (nvie Model)

### Overview
Formal branching model designed for scheduled releases.

### Branches
```
main (v1.0.0) ←── release/1.0 ←── develop ←── feature/login
           ↑           ↑
        hotfix/     merge PR →
        critical
```

### Main Branches
1. **main**: Production-ready code only
   - Tagged with version numbers
   - Every commit is a release
   
2. **develop**: Integration branch
   - Where features come together
   - Source for release branches

### Supporting Branches

#### Feature Branches
```bash
git switch -c feature/user-auth develop

# Work on feature...
git add .
git commit -m "feat: implement OAuth2"

# Create PR to develop
git push origin feature/user-auth

# After merge, delete
git branch -d feature/user-auth
```

#### Release Branches
```bash
git switch -c release/1.5 develop

# Bump version
echo "1.5.0" > VERSION
git commit -m "chore: bump version"

# Only bug fixes here, no new features
git commit -m "fix: critical security patch"

# Merge to main with tag
git switch main
git merge --no-ff release/1.5
git tag -a v1.5.0 -m "Release 1.5.0"

# Merge back to develop
git switch develop
git merge --no-ff release/1.5
```

#### Hotfix Branches
```bash
git switch -c hotfix/critical-bug main

# Fix production issue
git commit -m "fix: critical security vulnerability"

# Merge to main with tag
git switch main
git merge --no-ff hotfix/critical-bug
git tag -a v1.4.1 -m "Hotfix 1.4.1"

# Merge back to develop
git switch develop
git merge --no-ff hotfix/critical-bug
```

### Workflow Diagram
```
Create feature → Work locally → Create PR
     ↓            ↓              ↓
From develop ← Push commits ← Code review
     ↓                           ↓
Merge to develop ← Approved ← Request changes
     ↓
Delete branch
```

## GitHub Flow

### Principles
1. Anything can be deployed
2. Simple process
3. Frequent deployments
4. One branch per feature

### Branches
```
main (always deployable)
  ↑
  └─← feature-1 → PR → Review → Merge → Delete
  ↑
  └─← feature-2 → PR → Code review → Deploy
```

### Workflow
```bash
# 1. Create feature branch
git switch -c feature/add-search

# 2. Work on feature
git add .
git commit -m "feat: add search functionality"
git push origin feature/add-search

# 3. Create Pull Request on GitHub
# (Team reviews)

# 4. Deploy to staging
# (CI/CD runs tests)

# 5. Merge to main
git switch main
git pull
git merge feature/add-search
git push origin main

# 6. Delete branch
git branch -d feature/add-search
```

### CI/CD Integration
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm test
      - run: npm run lint
```

## Trunk-Based Development

### Core Idea
Everyone commits to main (trunk) frequently. No long-lived branches.

### Branches
```
main (updated every few hours)
  ↑
  └─ short-lived branch (hours/day, max)
     ↑
     └─ deleted immediately after merge
```

### Workflow
```bash
# 1. Create short-lived feature branch
git switch -c feature/small-change

# 2. Work quickly
git add .
git commit -m "feat: small change"
git push origin feature/small-change

# 3. PR → Code review (fast)
# 4. Merge to main (no waiting)
git merge feature/small-change
git push origin main

# 5. Delete immediately
git branch -d feature/small-change
```

### Strategy: Feature Flags
```javascript
if (flags.newSearchEnabled) {
  renderNewSearch();
} else {
  renderOldSearch();
}
```

Toggle features without branching:
- Deploy unfinished features with flag OFF
- Enable flag in production gradually
- Monitor metrics
- Keep or remove based on feedback

### Advantages
- ✅ No merge conflicts
- ✅ Faster deployment
- ✅ Distributed work easier
- ✅ Small commits
- ✅ Quick feedback

### Disadvantages
- ❌ Requires feature flags
- ❌ CI/CD must be reliable
- ❌ Code discipline needed
- ❌ Not for every team

## GitLab Flow

### Concept
Simplified Git Flow for continuous delivery.

### Branches
```
production ← merge tag ← main ← feature branches
  ↑                         ↑
merge auto (with CI) ← review/QA
```

### Workflow
```bash
# 1. Create feature branch
git switch -c feature/dashboard develop

# 2. Work and commit
git add .
git commit -m "feat: add dashboard"
git push origin feature/dashboard

# 3. Create Merge Request
# 4. Developers / QA review
# 5. Merge to main

# 6. Deploy to production (automated)
git tag v1.2.0
git push origin v1.2.0
```

### Environment Branches
```
production (live users)
  ↓
staging (QA testing)
  ↓
develop (integration)
  ↓
main (development)
```

## Comparing Strategies

| Aspect | Git Flow | GitHub Flow | Trunk-Based | GitLab Flow |
|--------|----------|-------------|-------------|------------|
| Complexity | High | Low | Low | Medium |
| Release Cycle | Scheduled | Continuous | Continuous | Scheduled/Continuous |
| Long-lived Branches | Yes (develop) | No | No | No |
| Release Branches | Yes | No | No | Tagged |
| Hotfixes | Yes | No | Via feature flags | Yes |
| Team Size | Large | Any | Experienced | Any |
| Tools | Any | GitHub | Any | GitLab |

## Choosing Your Strategy

### Use Git Flow If:
- Scheduled releases (quarterly/monthly)
- Multiple versions in production
- Dedicated QA team
- Large team

### Use GitHub Flow If:
- Continuous deployment
- Simple release process
- Small-medium team
- Agile/fast iteration

### Use Trunk-Based If:
- Very frequent deployments
- Feature flags implemented
- Excellent CI/CD
- Experienced team

### Use GitLab Flow If:
- Using GitLab platform
- Continuous delivery
- Multiple environments
- Audit requirements

## Switching Strategies

### Git Flow → Trunk-Based
1. Stop creating release branches
2. Merge develop to main frequently
3. Implement feature flags
4. Delete old long-lived branches
5. Update CI/CD

### GitHub Flow → Git Flow
1. Create develop branch from main
2. Make new features from develop
3. Create release branches
4. Create hotfix process
5. Update documentation

