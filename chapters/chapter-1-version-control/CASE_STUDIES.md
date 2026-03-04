# Git Real-World Case Studies

## Case Study 1: Multi-Team Migration to GitHub

### Background
- Company: SaaS startup with 30 engineers
- Previous System: Subversion (SVN) with monolithic repo
- Problem: Slow performance, difficult branching, no PR workflow
- Solution: Migrate to GitHub with Git Flow

### Migration Strategy

**Phase 1: Preparation (Week 1)**
```bash
# Convert SVN to Git with history
git svn clone --stdlayout --authors-file=authors.txt https://svn.company.com/repo

# Verify all commits came over
git log --oneline | wc -l
# Expected: 4,567 commits

# Verify all branches
git branch -a
# Should show all SVN branches
```

**Phase 2: Team Training (Week 2)**
```
Workshops (4 sessions):
1. Git Basics (Init, Clone, Commit, Push/Pull)
2. Branching and Merging
3. GitHub Collaboration (PRs, Issues)
4. Troubleshooting and Git Flow

Resources:
- Documented processes
- Video tutorials
- Pair programming sessions
```

**Phase 3: Pilot Practice (Week 3)**
```bash
# Pilot team: 5 developers
# Duration: 1 week
# Work on feature/pilot-migration branch
# Practice GitHub Flow
# Identify pain points before full rollout
```

**Phase 4: Full Migration (Week 4)**
```
Timeline:
- Monday: Main branch locked for migration
- Tuesday: Repository cut over to GitHub
- Wednesday: All developers sync and start work
- Thursday: CI/CD pipeline verified
- Friday: Full production access restored
```

### Challenges & Solutions

**Challenge 1: History Too Large**
```bash
# Problem: 4GB repo, 500K objects
# Slow clones and operations

# Solution: Shallow clone first
git clone --depth 1 https://github.com/company/repo.git

# Later access full history if needed
git fetch --unshallow
```

**Challenge 2: Conflicting Team Workflows**
```
Teams had different practices:
- Backend: Long-lived dev branch (6 months)
- Frontend: Daily feature branches
- DevOps: Direct main pushes

Solution: Standardize on Git Flow
- All teams use same branching pattern
- Clear release process
- Everyone deploys the same way
```

**Challenge 3: GitHub Permission Model**
```
Old SVN Model:
- Directory-level permissions
- Complex access control

GitHub Model:
- Repo-level access
- Branch protection rules

Solution:
- 3 repos instead of 1
- repo-api (for backend team)
- repo-web (for frontend team)
- repo-infra (for DevOps team)
- Easier to manage permissions
- More focused collaboration
```

### Results

**Metrics After 6 Months:**
```
Metrics          Before    After
Deployment time  3-4 hours 15 minutes (12x faster)
Time to merge    2-3 days  4 hours
Branch churn     2-3 open  50+ parallel
PR review time   1 week    1-2 days
Engineer setup   3-4 hours 10 minutes
```

**Key Success Factors:**
- Executive sponsorship (CTO promoted it)
- Dedicated migration lead
- Hands-on team training
- Pilot period before full rollout
- Clear documentation
- Patience with growing pains

---

## Case Study 2: Debugging Production Issue with Bisect

### Background
- Application: Node.js real-time API
- Problem: Memory leak appeared in production (25% mem increase per day)
- Tools: Git bisect + heap dumps
- Repo Size: 8,987 commits over 3 years

### Investigation Process

**Step 1: Reproduce Issue**
```bash
# Monitor memory in staging environment
# Run under load for 24 hours
# Confirmed: Memory grows 25% per day
# Starting point (good commit): v2.15.0 (2 weeks old)
# Ending point (bad commit): HEAD (today)
```

**Step 2: Start Bisect**
```bash
git bisect start
git bisect bad HEAD                 # Current is broken
git bisect good v2.15.0             # Known good version

# Bisect calculates range and checks out middle commit
# Remaining: 4,494 commits possible
# Checked out commit 2 of ~11 (binary search)
```

**Step 3: Automated Testing**
```bash
# Instead of manual testing, use automated script
git bisect run ./test_memory.sh

# test_memory.sh:
#!/bin/bash
npm install
npm start &
SERVER_PID=$!
sleep 60
# Take heap dump
kill $SERVER_PID
node -e "const h = require('module')(...); process.exit(h.size > THRESHOLD ? 1 : 0)"
```

**Step 4: Bisect Completes**
```bash
# Found first bad commit: abc123def456
git show abc123def456

# Commit message: "Add user cache for performance"
# diff shows:
# + const userCache = {}   // Never cleaned!
# + userCache[userId] = userData
```

**Step 5: Review and Fix**
```javascript
// Bad code found:
const userCache = {};
function getUserData(userId) {
  if (userCache[userId]) return userCache[userId];
  const data = fetchFromDB(userId);
  userCache[userId] = data;
  return data;
}

// Fixed version:
const userCache = new Map();
const CACHE_SIZE = 10000;

function getUserData(userId) {
  if (userCache.has(userId)) return userCache.get(userId);
  const data = fetchFromDB(userId);
  
  // LRU cache with size limit
  if (userCache.size > CACHE_SIZE) {
    const firstKey = userCache.keys().next().value;
    userCache.delete(firstKey);
  }
  
  userCache.set(userId, data);
  return data;
}
```

### Lessons Learned

1. **Automated Testing Wins**: Manual testing would've taken hours
2. **Regular Profiling**: Would've caught leak earlier
3. **Code Review Patterns**: Cache/state management should be flagged
4. **Rollback Strategy**: Fast way to revert before bisecting

---

## Case Study 3: Handling Large Refactoring

### Background
- Task: Refactor 15,000 lines of procedural code to object-oriented
- Team: 3 developers
- Duration: 3 weeks
- Challenge: Must deploy other features during refactor

### Strategy: Feature Branch with Frequent Syncs

**Phase 1: Setup (Day 1)**
```bash
# Create tracking branch
git switch -c refactor/oo-architecture

# Peer code review immediately
# Create checklist of 20-30 small modules to refactor
```

**Phase 2: Parallel Work (Days 2-14)**
```
Team split:
- Dev A: Refactor modules 1-10 (utils, helpers)
- Dev B: Refactor modules 11-20 (core features)
- Dev C: Create new tests + review PRs

Daily:
- 30 min standup on progress
- Code review within 2 hours
- Frequent pulls from main* to stay synced
```

**Phase 3: Integration (Days 15-19)**
```bash
# Daily syncs from main
git fetch origin
git rebase origin/main

# Resolve conflicts (will be many)
# Each team tests their part
# Integration tests run 5x daily

# Wednesday: Full integration test
# Thursday: Deploy to staging
# Friday: Production deployment
```

**Phase 4: Monitoring (Week 4+)**
```
Post-dep metrics:
✓ Test coverage increased 15%
✓ Code complexity reduced 30%
✓ Bug report rate down 20%
✓ New feature velocity up 10%

Lessons:
- Breaking into smaller chunks = key success
- Testing from day 1 = easier merges
- Code review = catches issues early
```

### Technical Details

**Merge Conflict Management:**
```bash
# Instead of complicated 3-way merges, use:
git rerere                # Record resolution once, replay later

# Enable in config
git config --global rerere.enabled true

# First conflict: Resolve manually
# Next identical conflict: Auto-resolve
```

**Commit Pattern:**
```
Good refactor commits:
- One class per commit
- Tests + implementation together
- Clear commit messages

Example:
commit a1b2c3d4
Author: Dev A
Date:   Mon Jan 15

    refactor: Convert User service to class-based

    - Changed User from object to class
    - Added constructor and methods
    - Updated all 24 call sites
    - Existing tests all pass
    - New tests cover new methods
    
    Closes #456
```

---

## Case Study 4: Emergency Hotfix Process

### Scenario
- Time: 2am Friday morning
- Issue: Authentication broken in production
- Impact: Users cannot log in
- Status: 500 error on login endpoint

### Emergency Response

**Step 1: Quick Assessment (2:05am)**
```bash
# Check current production
git log origin/main -1 --oneline
# d4e5f6a7 "Add OAuth SSO integration"

# Check deploy logs
# Deployment was 3 hours ago

# Find previous working version
git log --oneline | head -5
# d4e5f6a7 (bad) Add OAuth SSO integration
# c3d4e5f6 (good) Fix user validation
# b2c3d4e5 Fix email sending
```

**Step 2: Create Hotfix Branch (2:10am)**
```bash
git switch -c hotfix/auth-broken
# Branch from main

# Investigate issue
git diff c3d4e5f6..d4e5f6a7

# Found: OAuth token missing error handler
# If token invalid, crashes instead of redirecting login
```

**Step 3: Fix (2:15am)**
```javascript
// In auth.js
async function verifyToken(token) {
  try {
    // Previous: Missing error handling
    return await oauth.verify(token);
    
    // Now: Handle errors gracefully
  } catch (error) {
    if (error.code === 'INVALID_TOKEN') {
      return { valid: false, redirect: '/login' };
    }
    logger.error('Auth verification failed', error);
    throw error;
  }
}
```

**Step 4: Deploy Hotfix (2:25am)**
```bash
# Commit
git commit -m "hotfix: Handle invalid OAuth tokens gracefully"

# Push hotfix
git push origin hotfix/auth-broken

# Create PR with 'URGENT' label
# Ping on-call team lead in Slack

# Create branch deploy
# Run tests: ${CI shows: All tests pass}

# Merge with 1 approval (can self-approve in emergencies)
# Deploy to production
# Monitor logs: Login working

# Time to fix: 20 minutes from alert to production
```

**Step 5: Post-Incident (2:45am)**
```bash
# Merge back to main
git switch main
git merge hotfix/auth-broken

# Delete hotfix branch
git push origin --delete hotfix/auth-broken

# Later: Post-mortem
" - Change went through without testing in staging
  - Should test OAuth integration more thoroughly
  - Need monitoring for auth errors
  - Action: Add error-specific alerts"
```

---

## Key Takeaways

1. **Automated Testing**: Find bugs faster, bisect effectively
2. **Branch Strategy**: Choose based on team and release cycle
3. **Communication**: Clear commit messages and PR descriptions
4. **Monitoring**: Know when things break before users feel it
5. **Preparation**: Practice emergency procedures before emergency
6. **Documentation**: Team can execute without central figure

