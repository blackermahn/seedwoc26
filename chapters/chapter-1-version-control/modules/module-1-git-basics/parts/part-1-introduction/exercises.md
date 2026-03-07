# Part 1: Introduction to Version Control - Exercises

## Exercise 1.1: Repository Setup

Create a new Git repository on your machine.

### Task
```bash
mkdir intro-to-git
cd intro-to-git
git init
```

### Verification
- You should see a `.git` folder in your directory
- Run `ls -la` to confirm

### Success Criteria ✅
- [ ] `.git` directory exists
- [ ] `git status` shows "On branch master" or "On branch main"
- [ ] `git log` is accessible (shows empty repository)

---

## Exercise 1.2: Your First Commit

Create a README file and make your first commit.

### Task
```bash
echo "# My First Repository" > README.md
git add README.md
git commit -m "docs: initialize repository with readme"
git log
```

### What to Observe
- The file appears in `git status` before adding
- After `git add`, it appears in "Changes to be committed"
- After `git commit`, it's in the repository history
- `git log` shows your commit with timestamp and message

### Success Criteria ✅
- [ ] README.md exists in working directory
- [ ] File is tracked by git
- [ ] `git log` shows one commit
- [ ] Commit message follows the format: `docs: initialize repository with readme`

---

## Exercise 1.3: Multiple Changes

Create multiple files and practice committing different changes.

### Task
```bash
# Create more files
echo "JavaScript is awesome" > languages.txt
echo "Python is fun" >> languages.txt

# Create Python file
cat > script.py << 'EOF'
print("Hello from Python!")
EOF

# Stage and commit everything
git add .
git commit -m "feat: add language notes and python script"
```

### What to Observe
- `git status` shows multiple untracked files initially
- After `git add .`, all files are staged together
- One commit groups related changes
- `git log --oneline` shows both commits

### Success Criteria ✅
- [ ] Three files created (README.md, languages.txt, script.py)
- [ ] Two commits in `git log`
- [ ] Second commit includes all three files
- [ ] Can see commit hashes and messages

---

## Exercise 1.4: View History in Different Ways

Learn to view commit history using various `git log` options.

### Tasks

**Task A: Detailed history**
```bash
git log
```
Shows full commit details: hash, author, date, message

**Task B: One-line summary**
```bash
git log --oneline
```
Shows abbreviated commit info for quick scanning

**Task C: Show statistics**
```bash
git log --stat
```
Shows which files changed and how many lines were added/removed

**Task D: Limit results**
```bash
git log -5
```
Shows only the last 5 commits

**Task E: Formatted output**
```bash
git log --format="%h %an %s"
```
Shows: commit hash, author name, subject

### Success Criteria ✅
- [ ] Can run `git log` without errors
- [ ] Understand the difference between `git log` and `git log --oneline`
- [ ] Can see file statistics with `--stat`
- [ ] Can limit output with `-N` option
- [ ] Can format output with custom format string

---

## Exercise 1.5: Understanding Git Status

Check your repository status at different stages.

### Tasks

**Before making changes:**
```bash
git status
```
Should show: "nothing to commit, working tree clean"

**After modifying a file:**
```bash
echo "console.log('test');" > test.js
git status
```
Should show: untracked file or modified section

**After staging:**
```bash
git add test.js
git status
```
Should show: "Changes to be committed"

**After committing:**
```bash
git commit -m "feat: add test file"
git status
```
Should show: "nothing to commit, working tree clean" again

### Success Criteria ✅
- [ ] Understand what "untracked" means
- [ ] Know the difference between "modified" and "staged"
- [ ] Can interpret `git status` output

---

## Exercise 1.6: Configuring Your Identity

Verify and update your Git configuration.

### Task
```bash
# View your current configuration
git config --list

# Check specific values
git config user.name
git config user.email

# Update if needed (local to this repo)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Or globally (all repos on this machine)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### What to Observe
- Your name and email appear in commit logs
- Global config is in `~/.gitconfig`
- Local config overrides global config

### Success Criteria ✅
- [ ] `git config user.name` returns your name
- [ ] `git config user.email` returns your email
- [ ] Commits show your identity correctly

---

## Exercise 1.7: Writing Good Commit Messages

Practice writing clear, descriptive commit messages.

### Bad Examples ❌
```bash
git commit -m "update"
git commit -m "fix stuff"
git commit -m "changes"
git commit -m "WIP"
```

### Good Examples ✅
```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login button styling issue"
git commit -m "docs: update installation instructions"
git commit -m "refactor: simplify user service logic"
```

### Task
Create a commit with a good message:
```bash
echo "function validateEmail(email) { return email.includes('@'); }" > validate.js
git add validate.js
git commit -m "feat: add email validation function"
```

### Success Criteria ✅
- [ ] Commit message has clear type (feat, fix, docs, etc.)
- [ ] Subject line is present and descriptive
- [ ] Messages follow consistent format

---

## Exercise 1.8: Viewing File Changes

Understand what changed in your commits.

### Task
```bash
# Make a change to an existing file
echo "console.log('Added test');" >> test.js

# See the changes before staging
git diff

# Stage the changes
git add test.js

# See changes that are staged
git diff --staged

# See changes in a specific file across commits
git log -p test.js

# See statistics about changes
git diff --stat
```

### What to Observe
- Additions show as green lines starting with `+`
- Removals show as red lines starting with `-`
- The header shows file changes and line counts
- `git diff` shows unstaged changes
- `git diff --staged` shows staged changes

### Success Criteria ✅
- [ ] Can use `git diff` to see unstaged changes
- [ ] Can use `git diff --staged` to see staged changes
- [ ] Understand the visual representation (+ and -)

---

## Exercise 1.9: Recovering from Mistakes (Safe)

Practice recovering from common mistakes.

### Task A: Discard changes in working directory
```bash
# Make a change you want to undo
echo "oops" >> README.md

# Discard the change
git restore README.md

# Verify it's back to committed state
cat README.md
```

### Task B: Unstage a file
```bash
# Stage a file by mistake
git add test.js

# Unstage it
git restore --staged test.js

# Verify status
git status
```

### Task C: View an old version
```bash
# See what the file looked like one commit ago
git show HEAD~1:README.md

# Or
git show 8de66f7:README.md  # Replace with actual commit hash
```

### Success Criteria ✅
- [ ] Can recover modified files with `git restore`
- [ ] Can unstage files with `git restore --staged`
- [ ] Can view historical file contents with `git show`

---

## Exercise 1.10: Understanding the Three States

Demonstrate the three states of Git (Working Directory, Staging Area, Repository).

### Visual Workflow
```
┌─────────────────┐
│ Working Dir     │ ← Create/modify files
└────────┬────────┘ (git status: "Changes not staged")
         │
      git add filename
         │
         ▼
┌─────────────────┐
│ Staging Area    │ ← Select what goes in commit
└────────┬────────┘ (git status: "Changes to be committed")
         │
    git commit -m "..."
         │
         ▼
┌─────────────────┐
│ Repository      │ ← Permanent history
└─────────────────┘ (git log, git show)
```

### Task
Follow this sequence and note the status changes:

```bash
# 1. Create file (working directory)
echo "test" > newfile.txt
git status  # Note: "Untracked files"

# 2. Stage file (staging area)
git add newfile.txt
git status  # Note: "Changes to be committed"

# 3. Commit file (repository)
git commit -m "feat: add newfile"
git status  # Note: "nothing to commit, working tree clean"

# 4. Modify existing file
echo "more content" >> newfile.txt
git status  # Note: "Changes not staged"

# 5. Stage the modification
git add newfile.txt
git status  # Note: "Changes to be committed"

# 6. Commit the modification
git commit -m "feat: update newfile with more content"
git status  # Note: "nothing to commit, working tree clean"
```

### Success Criteria ✅
- [ ] Understand "working directory" state
- [ ] Understand "staging area" state
- [ ] Understand "repository" state
- [ ] Know commands to move between stages:
  - `git add` (working → staging)
  - `git commit` (staging → repository)
  - `git restore` (discard changes)
  - `git restore --staged` (unstage changes)

---

## 🎯 Checkpoint

Before moving to Part 2, verify you can:

- [ ] Initialize a Git repository
- [ ] Create commits with clear messages
- [ ] View commit history in multiple ways
- [ ] Understand the three-state model
- [ ] Check repository status
- [ ] Make changes and recover from mistakes
- [ ] Write and review diffs

**Great job!** You're ready for Part 2: Core Git Workflows ➡️
