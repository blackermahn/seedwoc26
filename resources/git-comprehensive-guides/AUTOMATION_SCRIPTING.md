# Git Automation and Scripting

## Git Hooks

### Pre-Commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Prevent commits with console.log (JavaScript)
if git diff --cached | grep -q "console.log"; then
  echo "ERROR: console.log() found in staged changes"
  echo "Remove debugging code before committing"
  exit 1
fi

# Prevent commits with debugger statements
if git diff --cached | grep -q "debugger"; then
  echo "ERROR: debugger statement found"
  exit 1
fi

# Run linting on staged files
npm run lint -- --staged || exit 1

# Run tests
npm test || exit 1

exit 0
```

### Pre-Push Hook

```bash
#!/bin/bash
# .git/hooks/pre-push

# Prevent pushing to main directly
while IFS= read -r local_ref local_sha remote_ref remote_sha; do
  if [ "$remote_ref" = "refs/heads/main" ]; then
    echo "Direct push to main is blocked!"
    echo "Please create a pull request instead"
    exit 1
  fi
done

exit 0
```

### Commit Message Hook

```bash
#!/bin/bash
# .git/hooks/commit-msg

MSG=$(cat "$1")

# Check commit message length
if [ ${#MSG} -lt 10 ]; then
  echo "ERROR: Commit message too short (min 10 chars)"
  exit 1
fi

# Check format: prefix: message
if ! echo "$MSG" | grep -q "^[a-z]*:"; then
  echo "ERROR: Commit should start with type: feat, fix, docs, etc."
  echo "Example: feat: add new feature"
  exit 1
fi

exit 0
```

### Post-Merge Hook

```bash
#!/bin/bash
# .git/hooks/post-merge

# Reinstall dependencies if package.json merged
if git diff HEAD@{1} HEAD -- package.json > /dev/null; then
  echo "package.json changed, running npm install..."
  npm install
fi

exit 0
```

---

## Useful Git Scripts

### Batch Operations

```bash
#!/bin/bash
# bulk-rename-branches.sh

# Rename all branches matching pattern
OLD_PATTERN=$1
NEW_PATTERN=$2

for branch in $(git branch | grep "$OLD_PATTERN"); do
  new_name=$(echo "$branch" | sed "s/$OLD_PATTERN/$NEW_PATTERN/")
  git branch -m "$branch" "$new_name"
  git push origin -u "$new_name"
  git push origin --delete "$branch"
done
```

### Cleanup Script

```bash
#!/bin/bash
# cleanup-branches.sh

# Delete all merged branches except main
git branch --merged main | grep -v "main" | xargs git branch -d

# Prune deleted remote branches
git remote prune origin

# Remove stale branches that don't exist on remote
git branch -vv | grep 'gone' | awk '{print $1}' | xargs git branch -D

echo "Cleanup complete!"
```

### Backup Script

```bash
#!/bin/bash
# backup-repos.sh

BACKUP_DIR="$HOME/git-backups"
mkdir -p "$BACKUP_DIR"

for repo in /path/to/repos/*.git; do
  repo_name=$(basename "$repo" .git)
  echo "Backing up $repo_name..."
  
  git clone --bare "$repo" "$BACKUP_DIR/$repo_name.git"
  
  # Or full backup with objects
  cp -r "$repo" "$BACKUP_DIR/$repo_name-$(date +%Y%m%d).git"
done

echo "Backup complete"
```

---

## GitHub Actions

### Basic Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run linting
        run: npm run lint
      
      - name: Run tests
        run: npm test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### Deploy Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Build
        run: |
          npm install
          npm run build
      
      - name: Upload to S3
        uses: shallwefootball/s3-upload-action@master
        with:
          aws_key_id: ${{ secrets.AWS_KEY_ID }}
          aws_secret_access_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws_bucket: my-bucket
          source_dir: dist
      
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id $DIST_ID \
            --paths "/*"
```

---

## Git Aliases

### Useful Aliases

```bash
# Setup
git config --global alias.st 'status'
git config --global alias.co 'checkout'
git config --global alias.br 'branch'
git config --global alias.ci 'commit'
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --graph --oneline --all'
git config --global alias.undo 'reset --soft HEAD~1'
git config --global alias.amend 'commit --amend --no-edit'

# Complex aliases
git config --global alias.contrib 'shortlog -s -n'          # Contributors
git config --global alias.wdiff 'diff --word-diff'          # Word diff
git config --global alias.staged 'diff --cached'            # Staged changes
git config --global alias.ahead 'log @{u}..HEAD --oneline'  # Unpushed commits
git config --global alias.behind 'log HEAD..@{u} --oneline' # Unpulled commits
```

### Custom Functions

```bash
# Add to ~/.bashrc or ~/.zshrc

# Clone and cd into repo
function gcd() {
  git clone "$1" && cd "$(basename "$1" .git)"
}

# Quick commit and push
function gap() {
  git add . && git commit -m "$1" && git push
}

# Sync fork with upstream
function gsynk() {
  git fetch upstream
  git rebase upstream/main main
  git push origin main
}

# Delete local branch and remote
function gdelete() {
  git branch -D "$1"
  git push origin --delete "$1"
}

# Show log of current branch
function glog() {
  git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
}
```

---

## CI/CD Integration

### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: 16

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm install
    - npm test
  coverage: '/Coverage: \d+\.\d+%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

deploy:
  stage: deploy
  image: alpine
  script:
    - apk add --no-cache curl
    - curl -X POST $DEPLOY_WEBHOOK
  only:
    - main
```

---

## Commit Message Best Practices

### Conventional Commits

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code change without feature/fix
- `perf`: Performance improvement
- `test`: Test addition/modification
- `chore`: Dependency update, build tools, etc.

**Examples:**
```
feat(auth): add two-factor authentication

This allows users to enable 2FA for their account

Closes #456
Fixes #789

fix(api): handle null response from endpoint

The API can return null in some cases. Add
null check before processing.

docs(readme): update installation instructions

style(button): fix indentation

refactor(config): simplify environment variable loading
```

---

## Best Practices

✅ **DO:**
- Use hooks for validation
- Automate repetitive tasks
- Update documentation when changing code
- Test before pushing
- Use conventional commits
- Tag releases consistently
- Backup repositories

❌ **DON'T:**
- Bypass hooks with --no-verify
- Push to main without review
- Ignore CI failures
- Use generic commit messages
- Forget to update dependencies
- Leave large branches unmerged
- Commit credentials or secrets

