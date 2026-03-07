# Git and Version Control Interview Guide

## Common Interview Questions

### Foundational Questions

**What is Git and why use it?**
```
Answer:
Git is a distributed version control system that:
- Tracks changes to code over time
- Enables collaboration between developers
- Allows branching for parallel development
- Maintains full history of changes
- Enables rollback to previous states
- Works offline locally
- Has powerful merging capabilities

Benefits:
- Decentralized (no single point of failure)
- Fast (most operations local)
- Secure (SHA-1 hashing of commits)
- Flexible workflows
- Industry standard
```

**What's the difference between Git and GitHub?**
```
Git:
- Version control system (software)
- Local or server-based
- Command-line based
- Can work completely offline
- Created by Linus Torvalds

GitHub:
- Hosting service for Git repositories
- Cloud-based platform
- Adds collaboration features (PRs, Issues, Wiki)
- Web interface for interaction
- Founded 2008, acquired by Microsoft 2018
- Alternative: GitLab, Bitbucket
```

**Explain the Git workflow (staging, committing, pushing)**
```
Working Directory
    ↓ git add
Staging Area (Index)
    ↓ git commit
Local Repository
    ↓ git push
Remote Repository

Alternative:
- Working Directory → Staging → Commit → Push
- Or: Commit directly if using -a flag
- Or: Stash instead of commit for temporary storage
```

---

### Technical Deep Dives

**What is a commit hash and why is it important?**
```
Commit Hash (SHA-1):
- 40-character hexadecimal string
- Example: d670460b4b4aece5915caf5c68d12f560a9fe3e4
- Unique identifier for each commit
- Based on commit content (data integrity check)
- Change any part of commit → hash changes
- First 7 characters usually sufficient for reference

Importance:
- Uniquely identify any commit
- Verify commit hasn't been tampered with
- Create references to specific points in history
- Enable blame and bisect operations
```

**What are the three stages of Git?**
```
1. Working Directory
   - Where you edit files
   - Files not tracked by Git yet
   - Run: git status to see untracked files

2. Staging Area (Index)
   - Files staged for commit
   - Run: git add <file> to stage
   - Run: git status to see staged files
   - Run: git reset to unstage

3. Repository
   - Committed changes stored in .git/
   - Permanent record of project history
   - Run: git commit to move from staging
   - Run: git log to view history
```

**Explain merge vs rebase**
```
Merge:
git merge feature-branch
- Creates merge commit
- Preserves both branch histories
- Non-destructive
- If merge commit required, creates it
- Good for main branch
- History shows branching

Rebase:
git rebase main
- Replays commits on top of main
- Linear history (no merge commits)
- Rewrites history (only for local branches)
- Cleaner history
- Good for feature branches
- Risk: if pushed, causes conflicts for others

When to use:
- Merge: Integrating complete features
- Rebase: Updating feature branch with latest main
```

---

### Common Scenarios

**How do you recover a deleted branch?**
```
Using reflog:
git reflog
# Find the commit hash before deletion
git checkout -b recovered-branch <commit-hash>

Example:
git reflog
# Output shows: abc1234 HEAD@{0}: branch -D feature
# Get commit before deletion: def5678
git checkout -b feature def5678
```

**You accidentally committed to master instead of a new branch. How do you fix it?**
```
Solution 1: Move commits to new branch
git branch feature-branch           # Create new branch from current position
git reset --hard HEAD~2             # Move master back 2 commits
git push origin feature-branch       # Push new branch
git push origin master --force-with-lease  # Force master back

Solution 2: Revert if already pushed
git revert <commit-hash>            # Creates opposite commit
git push origin master              # Safe, non-destructive

Solution 3: Cherry-pick approach
git checkout -b feature             # Create feature branch
git checkout master                 # Go back to master
git reset --hard <correct-commit>   # Reset to before mistaken commits
git cherry-pick <feature-commit>    # Apply desired commit if needed
```

**Your local branch is behind the remote. How do you update it?**
```
Option 1: Pull (merge)
git pull origin main
# Equivalent to: git fetch + git merge

Option 2: Pull with rebase (preferred for feature branches)
git pull --rebase origin main
# Equivalent to: git fetch + git rebase

Option 3: Manual (more control)
git fetch origin
git rebase origin/main
# Or: git merge origin/main

Conflict resolution:
git status                 # View conflicts
# Edit conflicted files
git add <resolved-files>
git rebase --continue      # If using rebase
# Or: git commit           # If using merge
```

**How do you handle merge conflicts?**
```
Steps:
1. Identify conflicts
   git status

2. Open files with <<<<< ===== >>>>
   
3. Understand the conflict
   <<<<< HEAD              # Your changes
   ...your code...
   =====
   ...their code...
   >>>>> feature-branch    # Their changes

4. Resolve manually or use tool
   git mergetool

5. Stage resolved files
   git add <resolved-files>

6. Complete merge
   git commit              # Merge will complete
   # Or: git rebase --continue (if rebasing)

Prevention:
- Communicate with team
- Merge frequently
- Keep branches short-lived
- Code review changes before merge
```

---

### Advanced Scenarios

**Explain a complex Git workflow with multiple teams**
```
Scenario: Large company with multiple teams

Branch Strategy:
main → production (protected, requires review)
develop → staging environment
feature/* → individual features
hotfix/* → emergency production fixes
release/* → release preparation

Workflow:
1. Developer creates feature/user-auth from develop
2. Implements feature, creates PR
3. Team reviews and approves
4. Merges to develop with squash
5. CI/CD deploys develop to staging
6. QA tests in staging
7. Create release/1.2.0 from develop
8. Final testing, bump versions
9. Merge to main, create tag v1.2.0
10. Circle back to merge release to develop

Emergency Hotfix:
1. Create hotfix/critical-bug from main
2. Fix and test
3. Merge to main with tag v1.2.1
4. Also merge to develop
5. Deploy to production

Protection Rules:
- main: Require PR review (2 approvals)
- develop: Require 1 PR review
- All: Require CI/CD tests pass
- All: Require up-to-date branches
- main: Restrict who can push
```

**How would you migrate from Subversion to Git?**
```
Preparation:
git svn clone --stdlayout https://svn.example.com/repo local-repo
# or with authors file:
git svn clone --stdlayout -A authors.txt https://svn.example.com/repo

Clean up:
cd local-repo
git for-each-ref refs/remotes/tags | cut -d / -f 4 | while read tag; do
  git tag "$tag" "refs/remotes/tags/$tag"
  git branch -r -d "tags/$tag"
done

Push to GitHub:
git remote add origin https://github.com/user/repo.git
git push origin --all
git push origin --tags

Verify:
- Check all branches are present
- Check all tags are present
- Check commit history is clean
- Verify authors are correct
```

---

## System Design Questions

**Design a Git workflow for a startup**
```
Requirements:
- Fast iteration (deploy multiple times daily)
- Small team (5-10 developers)
- Learning curve (some developers new to Git)

Proposed Solution:
Branch Strategy: GitHub Flow
- main is always deployable
- feature branches for work
- PRs for all changes
- Auto-deploy main to production

Branching Rules:
feature/login -> pr -> review -> merge -> auto-deploy
feature/database -> pr -> review -> merge -> auto-deploy

Protection Rules:
- Require 1 approval (can self-review if urgent)
- CI/CD tests must pass
- No force push allowed
- Dismiss stale reviews

Code Review:
- 24 hour SLA for reviews
- Self-review okay if no blockers
- Focus on logic and testing
- Use comments for learning

Deployment:
- Auto-deploy main to staging
- Manual trigger to production
- Rollback procedures documented
- Monitoring and alerts set up
```

**Design a Git workflow for a large enterprise**
```
Requirements:
- Multiple teams (50+ developers)
- Multiple environments (dev, test, staging, prod)
- Compliance and audit requirements
- Zero-downtime deployments

Proposed Solution:
Branch Strategy: Git Flow
- main = production (tagged releases)
- develop = integration branch
- feature/* = new functionality
- release/* = release preparation
- hotfix/* = emergency fixes

Team Structure:
- Feature teams own feature branches
- Release team manages releases
- DevOps manages deployment
- Security reviews PRs to main

Approval Process:
- Feature → develop: 1 approval + tests pass
- develop → release: 2 approvals + tests + security review
- release → main: 3 approvals + tests + compliance check
- hotfix → main: 2 approvals + emergency override if needed
- hotfix → develop: automatic after main merge

CI/CD Pipeline:
Branch → Unit tests → Integration tests → Deploy to staging → E2E tests
→ Manual approval → Deploy to production → Smoke tests

Monitoring:
- Metrics from each environment
- Alerts for failed deployments
- Rollback automation if high error rate

Disaster Recovery:
- Backup of all branches daily
- Tag based release points
- Documented rollback procedures
- Post-mortem process for incidents
```

---

## Best Practices for Interviews

✅ **DO:**
- Explain your thinking
- Ask clarifying questions
- Provide examples from experience
- Discuss tradeoffs
- Show understanding of when to use what
- Mention tools (Git, GitHub, GitLab, etc.)

❌ **DON'T:**
- Give yes/no answers
- Memorize commands verbatim
- Forget non-technical aspects
- Ignore team impact
- Be dogmatic about approaches

**STAR Method Example:**
```
Situation: Team had frequent merge conflicts
Task: Reduce conflict frequency
Action: Proposed GitHub Flow, smaller PRs, frequent pulls
Result: 80% reduction in conflicts, faster deployment
```

