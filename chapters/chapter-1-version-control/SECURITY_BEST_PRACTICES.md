# Git Security Best Practices

## Secret Management

### Prevent Secret Leaks

```bash
# Before pushing, scan for secrets
# Install git-secrets
brew install git-secrets

# Install hooks in repo
git secrets --install

# Scan all history
git secrets --scan-history

# Prevent patterns (add to .gitconfig or per-repo)
git secrets --add 'password ='
git secrets --add 'api_key ='
git secrets --add 'secret.*='

# Support AWS keys protection
git secrets --register-aws
git secrets --scan
```

### Using .gitignore Properly

```
# Secrets and keys
.env
.env.local
.env.*.local
*.key
*.pem
*.p8
id_rsa
id_ed25519

# Credentials
.credentials
.aws/
~/.ssh/

# Build artifacts
node_modules/
dist/
build/
*.pyc
__pycache__/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/
```

---

## Signing Commits

### GPG Key Setup

```bash
# Generate GPG key
gpg --full-generate-key
# Select RSA, 4096 bits

# List keys
gpg --list-secret-keys --keyid-format long
# sec   rsa4096/A1B2C3D4E5F6G7H8 2024-01-15

# Configure Git
git config --global gpg.program gpg
git config --global user.signingkey A1B2C3D4E5F6G7H8

# Sign future commits
git config --global commit.gpgsign true

# Create signed commit
git commit -S -m "Signed commit"

# Verify signature
git verify-commit <commit-hash>
```

### SSH Key Signing (Newer, Simpler)

```bash
# Generate SSH key (if not already)
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519

# Tell Git to use SSH for signing
git config --global gpg.format ssh
git config --global user.signingkey /home/user/.ssh/id_ed25519.pub

# Create signed commit
git commit -S -m "Signed with SSH"

# Verify
git verify-commit <commit-hash>
```

---

## Access Control

### SSH vs HTTPS

**SSH:**
- Pros: More secure, no password prompts, faster
- Cons: Requires key setup

**HTTPS:**
- Pros: Works anywhere, simple setup
- Cons: Less secure, prompts for credentials

```bash
# Check current method
git remote -v

# Switch from HTTPS to SSH
git remote set-url origin git@github.com:user/repo.git

# Switch from SSH to HTTPS
git remote set-url origin https://github.com/user/repo.git

# Create account-specific SSH keys
ssh-keygen -t ed25519 -f ~/.ssh/github_work -C "work@example.com"

# Configure in ~/.ssh/config
Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/github_work
  IdentitiesOnly yes

# Use in clone
git clone git@github-work:company/repo.git
```

---

## Branch Protection

### GitHub Branch Protection Rules

**Essential Rules:**
```
Branches to protect: main

✓ Require a pull request before merging
  ✓ Require approvals: 2
  ✓ Dismiss stale pull request approvals

✓ Require status checks to pass before merging
  ✓ Require branches to be up to date before merging

✓ Require signed commits

✓ Include administrators
```

**Command Line Setup (via GitHub API):**
```bash
curl -X PUT https://api.github.com/repos/OWNER/REPO/branches/main/protection \
  -H "Authorization: token TOKEN" \
  -d '{
    "enforce_admins": true,
    "required_status_checks": {
      "strict": true,
      "contexts": ["ci/build", "ci/test"]
    },
    "required_pull_request_reviews": {
      "dismiss_stale_reviews": true,
      "require_code_owner_reviews": false,
      "required_approving_review_count": 1
    },
    "require_signed_commits": true,
    "required_linear_history": true,
    "allow_force_pushes": false,
    "allow_deletions": false
  }'
```

---

## Secure Development Practices

### Pre-commit Checks

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Prevent secrets
if git diff --cached | grep -E '(password|api_key|secret|token)'; then
  echo "ERROR: Possible secret detected in staged changes"
  exit 1
fi

# Prevent large files
MAX_SIZE=10485760  # 10MB
for file in $(git diff --cached --name-only); do
  size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
  if [ "$size" -gt "$MAX_SIZE" ]; then
    echo "ERROR: $file too large ($(($size / 1024 / 1024))MB)"
    exit 1
  fi
done

exit 0
```

### Secure History Cleanup

```bash
# Remove file from all commits (careful!)
git filter-repo --path <filename> --invert-paths

# Remove large file from history
git filter-repo --path-glob '*.zip' --invert-paths

# Remove commits by author
git filter-repo --mailmap <mapping-file>

# Force push after filter
git push origin --force-with-lease --all --tags

# Notify team to reclone
```

---

## Audit and Monitoring

### Audit Trail

```bash
# View who changed what
git log --follow -p <filename>

# See all commits by author
git log --author="name" --oneline

# Find commits in main not in branch
git log <branch>..main

# Show what was removed
git log --diff-filter=D --summary | grep delete

# Get commit timeline
git log --reverse --oneline --since="2024-01-01"
```

### Monitor Large Pushes

```bash
# Hook to limit push size
#!/bin/bash
# .git/hooks/pre-push

MAX_SIZE=104857600  # 100MB

remote=$1
url=$2

while read local_ref local_sha remote_ref remote_sha; do
  if [ "$remote_sha" = "$( printf '%s' | tr '0123456789ABCDEF' '0')" ]; then
    # New branch, check against emptiness
    range="$local_sha"
  else
    # Existing branch, check against remote
    range="$remote_sha..$local_sha"
  fi
  
  size=$(git diff-tree --no-commit-id --name-status -r $range | \
         xargs git cat-file -s | \
         paste -sd + | bc)
  
  if [ "$size" -gt "$MAX_SIZE" ]; then
    echo "Refusing to push (size: $size > $MAX_SIZE)"
    exit 1
  fi
done

exit 0
```

---

## Supply Chain Security

### Dependency Verification

```bash
# Verify package integrity
npm install
npm audit                          # Check for vulnerabilities
npm ci --legacy-peer-deps          # Use lock file

# Sign package.lock
git add package-lock.json
git commit -S -m "Update dependencies"

# Verify dependencies are from trusted sources
npm list | grep vulnerable

# Check outdated packages
npm outdated
```

### Git Submodule Security

```bash
# Use HTTPS for submodules (signed)
git config --file .gitmodules submodule.module.url https://github.com/user/module.git

# Verify submodule origins are trusted
git config --file .gitmodules --list

# Update submodules safely
git submodule update --init --recursive
git submodule foreach git verify-commit HEAD
```

---

## Best Practices Summary

✅ **DO:**
- Use SSH keys instead of passwords
- Enable branch protection
- Sign important commits
- Scan for secrets before pushing
- Use .gitignore for secrets
- Audit repository history regularly
- Monitor who has access
- Use strong credentials
- Keep git updated
- Setup 2FA on GitHub/GitLab

❌ **DON'T:**
- Commit secrets (ever!)
- Use weak passwords
- Share credentials
- Disable branch protection
- Force push to main
- Trust unverified commits
- Ignore security warnings
- Leave long-lived credentials
- Hardcode API keys
- Ignore audit logs

