# Git Migration and Efficiency Guide

## Migrating from Subversion (SVN)

### Basic Migration Process

```bash
# Create authors mapping file
cat > authors.txt << EOF
user1 = User One <user1@example.com>
user2 = User Two <user2@example.com>
EOF

# Clone SVN repo to Git
git svn clone --stdlayout \
  -A authors.txt \
  https://svn.example.com/repo \
  repo-git

# This imports:
# - trunk -> main
# - tags/* -> tags
# - branches/* -> branches
```

### Cleanup After Migration

```bash
cd repo-git

# Convert SVN tags to Git tags
git for-each-ref refs/remotes/tags | \
  cut -d / -f 4 | while read tag; do
    git tag "$tag" "refs/remotes/tags/$tag"
    git branch -r -d "tags/$tag"
  done

# Remove SVN remote references
git config --remove-section svn
git config --remove-section svn-remote.svn
git reflog expire --expire=now --all
git gc --aggressive
```

### Push to GitHub

```bash
# Initialize GitHub repo first
git remote add origin https://github.com/user/repo.git

# Push all branches and tags
git push -u origin main
git push -u origin --all
git push -u origin --tags

# Verify
git branch -a    # Should show all branches
git tag          # Should show all tags
git log --oneline | head -10  # Check history
```

---

## Large Repository Optimization

### Reduce Clone Size

```bash
# Shallow clone (recent history only)
git clone --depth 1 https://github.com/user/repo.git

# Get more history later
git fetch --unshallow

# Partial clone (get blobs on demand)
git clone --filter=blob:none https://github.com/user/repo.git

# Very fast for initial clone, blobs fetch as needed
```

### Repository Cleanup

```bash
# Remove large files that aren't needed
git rm --cached large-file.bin
git commit -m "Remove large file from tracking"

# Or if already in history
git filter-repo --path large-file.bin --invert-paths
git push origin main --force-with-lease

# Force all developers to reclone
```

### Object Repack Optimization

```bash
# Regular garbage collection
git gc

# Aggressive cleanup (slower but better compression)
git gc --aggressive --prune=now

# Schedule regular maintenance
# Git automatically runs gc in background
```

---

## Performance Tips

### Speed Up Clone

```bash
# Use --single-branch for faster clone of specific branch
git clone --single-branch --branch main https://github.com/user/repo.git

# Create shallow clone then convert to full
git clone --depth 1 https://github.com/user/repo.git
cd repo
git fetch --unshallow
```

### Fast Git Operations

```bash
# Use shallow cloning for CI/CD
git clone --depth 1 --single-branch https://github.com/user/repo.git

# Parallel fetch (faster for large repos)
git config --global fetch.parallel 10

# Increase network timeout
git config --global http.connectTimeout 120

# Use compression
git config --global core.compression 9
```

### Monorepo Optimization

```bash
# If using monorepo, consider:
git clone --filter=sparse:oclc --sparse https://github.com/user/monorepo.git

# Then add only needed paths
git sparse-checkout set packages/web packages/api

# Only fetches those subdirectories
```

---

## Repository Maintenance

### Regular Maintenance Tasks

```bash
# Weekly
git gc                           # Optimize objects
git prune                        # Remove unreachable objects

# Monthly
git fsck --full                 # Check integrity
git reflog expire --expire=3.months.ago
git gc --aggressive             # Deep optimization

# Yearly
git repack -A -d -l             # Repack everything
git prune-packed                # Cleanup old packs
```

### Health Check Script

```bash
#!/bin/bash
# check-repo-health.sh

echo "Checking repository health..."

# Check object corruption
if ! git fsck --full --strict; then
  echo "ERROR: Repository has corruption!"
  exit 1
fi

# Check size
SIZE=$(du -sh .git | cut -f1)
echo "Repository size: $SIZE"

# Count objects
OBJECTS=$(git count-objects -v | grep 'count:')
echo "Object count: $OBJECTS"

# Find large objects
echo "Top 10 largest objects:"
git rev-list --all --objects | \
  sed -n 's/^[a-f0-9]*  //p' | \
  du -chS | sort -rh | head -20

echo "Health check complete!"
```

---

## Git Workflows for Different Scenarios

### CI/CD Integration

```bash
# Optimized checkout for CI
git clone --depth 1 \
  --single-branch \
  --branch "$BRANCH_NAME" \
  https://github.com/user/repo.git

# Only fetch what's needed
git fetch origin "$COMMIT_SHA" --depth=1

# Sparse checkout for monorepo CI
git clone --filter=sparse:oclc --sparse https://github.com/user/monorepo.git
git sparse-checkout set path/to/module
```

### Release Branching

```bash
# Release branch management
git switch -c release/1.2.0            # Create release branch
# Freeze feature commits, only bug fixes
# Run full test suite
git tag -a v1.2.0 -m "Release 1.2.0"   # Tag release
git push origin release/1.2.0 v1.2.0

# Backport critical fixes
git cherry-pick <commit>                 # Pick from main
git push origin release/1.2.0

# Later merge tag back to main if needed
```

### Feature Branch Management

```bash
# Squash before merging
git switch main
git merge --squash feature/new-feature
git commit -m "feat: Add new feature"

# Or interactive rebase
git rebase -i main
# Mark commits as squash
# Single commit to main

# Very clean history
git log --oneline
# feat: Add new feature
# feat: Fix something  
# feat: Previous work
```

---

## Cost Optimization

### GitHub Storage

```
Factors affecting costs:
- Repository size
- LFS (Large File Storage) usage
- Network bandwidth
- Actions/CI usage
- Collaborators

Optimization:
- Use .gitignore for build artifacts
- Store large files in LFS or external storage
- Use sparse-checkout for monorepos
- Regular cleanup of old files
- Archive old repositories
```

### Git LFS (Large File Storage)

```bash
# Install
git lfs install

# Track large files
git lfs track "*.psd"
git lfs track "*.zip"

# Git stores reference, LFS stores actual file
# Reduces clone time for large files

# Usage
git add large-file.psd    # Stored in LFS
git add code.js           # Regular Git
git commit -m "Add files"
git push origin main
```

---

## Best Practices Summary

✅ **DO:**
- Use shallow clones for CI/CD
- Regular garbage collection
- Archive old branches
- Implement .gitignore properly
- Use LFS for large files
- Monitor repository size
- Document maintenance procedures
- Automate health checks

❌ **DON'T:**
- Let repositories grow unbounded
- Commit large files without need
- Ignore corruption warnings
- Skip regular maintenance
- Force push to shared branches
- Store secrets in Git
- Assume "deleted" files are gone
- Ignore .gitignore warnings

