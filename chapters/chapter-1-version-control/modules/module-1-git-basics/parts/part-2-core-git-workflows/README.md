# Part 2: Core Git Workflows

## 📚 Part Overview

Master the essential Git workflows - staging changes, creating meaningful commits, viewing history, and undoing mistakes. These skills form the core of daily development work.

## 🎯 Learning Objectives

By completing this part, you will:
- Understand the three-state model (Working Directory, Staging Area, Repository)
- Stage and commit changes effectively
- View repository history and diffs
- Compare versions and track changes
- Safely undo changes and fix mistakes
- Write meaningful commit messages
- Best practices for commits and history

## 🕐 Estimated Duration
- **Time**: 5-7 hours
- **Difficulty**: ⭐ Easy to Intermediate
- **Prerequisites**: Part 1 - Introduction to Version Control

## 📖 Table of Contents
1. [The Three-State Model](#three-state-model)
2. [Staging Changes](#staging)
3. [Creating Commits](#commits)
4. [Viewing History](#history)
5. [Diffs and Comparisons](#diffs)
6. [Undoing Changes](#undoing)
7. [Code Examples](#examples)
8. [Exercises](#exercises)

---

## The Three-State Model {#three-state-model}

Git operates with three states for your files:

```
┌─────────────────────────────────────────────────────────┐
│                   YOUR PROJECT FOLDER                   │
│              (Working Directory / Workspace)             │
│                     (modified files)                     │
└──────────────────────────┬──────────────────────────────┘
                           │ git add
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    STAGING AREA                          │
│               (Index / Cache / Stage)                    │
│              (files ready to be committed)               │
└──────────────────────────┬──────────────────────────────┘
                           │ git commit
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   GIT REPOSITORY                         │
│                    (.git folder)                         │
│               (permanent history snapshots)              │
└─────────────────────────────────────────────────────────┘
```

### State Explanations

**Working Directory**
- Where you edit files on your computer
- Changes here are untracked until you stage them
- Files can be modified, deleted, or new

**Staging Area (Index)**
- Intermediate holding area before committing
- You choose exactly what goes into the next commit
- Allows you to craft focused, logical commits

**Repository**
- Permanent storage of all commits
- Located in the `.git` folder
- Forms the complete history of your project

---

## Staging Changes {#staging}

### The `git add` Command

Moves files from Working Directory to Staging Area.

```bash
# Stage a single file
git add filename.txt

# Stage multiple files
git add file1.js file2.js file3.js

# Stage all changes in current directory
git add .

# Stage all changes in the entire repository
git add -A

# Interactive staging (choose parts of files)
git add -p
```

### Checking Status

```bash
# View current status
git status

# Short format
git status -s

# Example output:
```
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
    new file:   feature.js
    modified:   index.html

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
    modified:   style.css
```
```

### Unstaging Files

```bash
# Remove file from staging area (keep changes in working directory)
git restore --staged filename.txt

# Or the older syntax
git reset HEAD filename.txt
```

---

## Creating Commits {#commits}

### The `git commit` Command

Records staged changes to the repository with a message.

```bash
# Commit with inline message
git commit -m "Add navbar component"

# Commit and enter a text editor for longer message
git commit

# Skip staging, commit all tracked files
git commit -a -m "Fix bug in login form"

# Amend the last commit
git commit --amend -m "New message"
```

### Writing Good Commit Messages

A good commit message describes **what changed** and **why it changed**.

```
Format: [Type] Subject (max 50 chars)

Empty line

Body (wrap at 72 chars)
- Point 1
- Point 2

Closes #123
```

**Commit Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests

**Examples of Good Commits:**

```
✅ GOOD:
feat: Add user authentication system

Implement JWT-based authentication with refresh tokens.
Includes login, logout, and session management.

Closes #456

fix: Fix memory leak in event listeners

Event listeners were not being properly removed on
component unmount, causing memory leaks over time.

Resolves #789
```

```
❌ BAD:
update files
fixed stuff
changes
asdf
```

---

## Viewing History {#history}

### The `git log` Command

Shows commit history in various formats.

```bash
# Basic log
git log

# One line per commit
git log --oneline

# Show last 5 commits
git log -5

# Show commits affecting a specific file
git log filename.js

# Show commits from a specific author
git log --author="John Doe"

# Show commits since a date
git log --since="2024-01-01"

# Custom format
git log --pretty=format:"%h %an %ar %s"
```

Output example:
```
commit 3a7f2c1e (HEAD -> main)
Author: Alice Smith <alice@example.com>
Date:   Mon Mar 1 10:30:45 2026

    feat: Add user profile page

commit 8b4d9f2e
Author: Bob Jones <bob@example.com>
Date:   Sun Feb 28 15:22:10 2026

    fix: Correct validation logic
```

### Viewing Commit Details

```bash
# Show specific commit
git show commit-hash

# Show changes in a specific commit
git show commit-hash:filename.js

# Show commits in visual format (requires graphviz)
git log --all --graph --decorate --oneline
```

---

## Diffs and Comparisons {#diffs}

### The `git diff` Command

Shows changes between different states.

```
┌──────────────────────────────────────────┐
│         Working Directory                │
│  (your current file changes)             │
│              │                           │
│              └──► git diff               │
│                   (shows changes)        │
│              ▲                           │
│              │                           │
│        HEAD (last commit)                │
└──────────────────────────────────────────┘
```

```bash
# Changes in working directory (not staged)
git diff

# Changes in staging area
git diff --staged

# Differences between commits
git diff HEAD~1 HEAD

# Differences between branches
git diff main feature-branch

# Show files that changed (no content)
git diff --name-only

# Show statistics
git diff --stat
```

### Understanding Diff Output

```diff
diff --git a/greeting.js b/greeting.js
index 1234567..abcdefg 100644
--- a/greeting.js
+++ b/greeting.js
@@ -5,6 +5,7 @@ function greet(name) {
  function greet(name) {
    console.log("Hello, " + name);
+   console.log("Welcome!");
  }
  
- export greet;
+ export default greet;
```

- **-**: Lines removed
- **+**: Lines added
- **@@ -5,6 +5,7 @@**: Shows line numbers (5 lines from position 5, now 6 lines from position 5)

---

## Undoing Changes {#undoing}

### Undoing Uncommitted Changes

```bash
# Discard changes in working directory (⚠️ DESTRUCTIVE)
git checkout -- filename.js
git restore filename.js  # Modern syntax

# Discard all changes
git checkout -- .

# Unstage file (keep changes)
git restore --staged filename.js
```

### Fixing Commits

```bash
# Redo the last commit (before pushing)
git commit --amend -m "New message"

# Add forgotten files to last commit
git add forgotten-file.js
git commit --amend --no-edit

# Undo last commit but keep changes
git reset --soft HEAD~1

# Undo last commit and discard changes
git reset --hard HEAD~1
```

### Reverting Commits (Safe - creates new commit)

```bash
# Create new commit that undoes a specific commit
git revert commit-hash

# Revert without opening editor
git revert -n commit-hash
```

**Visual Comparison:**

```
Original history:
A ──► B ──► C ──► D

After: git reset --hard HEAD~2
A ──► B  (C and D are lost)

After: git revert C (creates E)
A ──► B ──► C ──► D ──► E (E undoes C)
```

---

## Code Examples {#examples}

### Complete Workflow Example

```bash
# 1. Initialize repository
git init my-project
cd my-project

# 2. Create and modify files
echo "# My Project" > README.md
echo "console.log('Hello');" > app.js

# 3. Check status
git status

# 4. Stage files
git add README.md app.js

# 5. Create commit
git commit -m "feat: Initialize project with basic structure"

# 6. Make more changes
echo "## Features" >> README.md

# 7. View what changed
git diff

# 8. Stage changes
git add README.md

# 9. Another commit
git commit -m "docs: Add features section to README"

# 10. View history
git log --oneline

# Output:
# 2a3b4c5 docs: Add features section to README
# 1f2e3d4 feat: Initialize project with basic structure
```

### Working with Multiple Changes

```bash
# Project structure
project/
├── styles.css    (modified)
├── app.js        (modified)
├── test.js       (new file)
└── config.json   (modified)

# Stage only specific files
git add styles.css test.js

# Check what will be committed
git diff --staged

# Commit just these files
git commit -m "style: Update CSS and add test infrastructure"

# Now commit remaining changes
git add config.json app.js
git commit -m "fix: Update configuration and fix app logic"
```

---

## 📝 Exercises {#exercises}

### Exercise 1: The Three States
**Objective:** Understand the three states model through hands-on experience

**Task:**
1. Create a new directory called `git-three-states`
2. Initialize a Git repository
3. Create a file called `notes.txt` with content: "Initial content"
4. Check the status - note what state the file is in
5. Stage the file - check status again
6. Commit it - check status
7. Modify the file - check status

**Expected Output:**
```
Untracked files → modified in working directory → in staging area → committed
```

**Solution:**
```bash
mkdir git-three-states && cd git-three-states
git init
echo "Initial content" > notes.txt
git status  # Shows: Untracked file
git add notes.txt
git status  # Shows: Changes to be committed
git commit -m "docs: Add initial notes"
git status  # Shows: working tree clean
echo "More content" >> notes.txt
git status  # Shows: modified
```

---

### Exercise 2: Meaningful Commit Messages
**Objective:** Practice writing clear, professional commit messages

**Task:**
1. Create a new repository called `commit-messages-practice`
2. Create three files with different purposes
3. Commit each file with a meaningful message following the format:
   - `feat`: for new features
   - `docs`: for documentation
   - `fix`: for bug fixes
4. View the log to verify your messages

**Expected Commits:**
- `feat: Add user input validation function`
- `docs: Create API documentation`
- `fix: Correct date calculation error`

**Solution:**
```bash
mkdir commit-messages-practice && cd commit-messages-practice
git init

# Feature commit
echo "function validateEmail(email) { ... }" > validator.js
git add validator.js
git commit -m "feat: Add email validation function"

# Documentation commit
echo "# API Guide\n\nEndpoints:\n- POST /api/user" > API.md
git add API.md
git commit -m "docs: Create API documentation with endpoint guide"

# Fix commit
echo "const date = new Date(); return date.getTime();" > dateutil.js
git add dateutil.js
git commit -m "fix: Correct timestamp calculation in date utility"

git log --oneline
```

---

### Exercise 3: Staging Selectively
**Objective:** Master selective staging with `git add`

**Task:**
1. Create a project folder
2. Create 3 files: `index.html`, `style.css`, `script.js`
3. Modify all three files
4. Use `git add` to stage only two of them
5. Verify with `git status`
6. Commit just the staged files
7. Commit remaining file separately

**Requirements:**
- First commit should only include CSS and HTML changes
- Second commit should include only JavaScript changes

**Solution:**
```bash
mkdir selective-staging && cd selective-staging
git init

# Create initial files
echo "<html></html>" > index.html
echo "body {}" > style.css
echo "console.log('hello');" > script.js

git add .
git commit -m "refactor: Initialize project files"

# Now modify all three
echo "<html><body>Content</body></html>" > index.html
echo "body { color: blue; }" > style.css
echo "console.log('Updated script');" > script.js

# Stage only HTML and CSS
git add index.html style.css

# Verify
git status

# Commit CSS and HTML
git commit -m "style: Update styles and add content to HTML"

# Commit JavaScript separately
git add script.js
git commit -m "feat: Update JavaScript functionality"
```

---

### Exercise 4: Viewing Diffs
**Objective:** Understand and interpret diff output

**Task:**
1. Create a file `config.json` with initial configuration
2. Make several changes to the file
3. View the diff using `git diff`
4. Stage the file
5. View the staged diff using `git diff --staged`
6. Identify what changed in each section

**Code:**
```bash
mkdir diff-practice && cd diff-practice
git init

# Initial config
cat > config.json << 'EOF'
{
  "port": 3000,
  "host": "localhost",
  "timeout": 30,
  "debug": false
}
EOF

git add config.json
git commit -m "docs: Add initial configuration"

# Modify config
cat > config.json << 'EOF'
{
  "port": 5000,
  "host": "0.0.0.0",
  "timeout": 60,
  "debug": true,
  "ssl": true
}
EOF

# View unstaged changes
git diff

# Stage and view staged changes
git add config.json
git diff --staged
```

---

### Exercise 5: Undoing Changes
**Objective:** Safely undo various types of changes

**Task:**
1. Create a file and commit it
2. Make changes and stage them
3. Undo the staged changes (restore to working directory)
4. Make changes again and commit
5. Undo the commit with `--amend`
6. Create a new commit
7. Use `git revert` to undo a previous commit safely

**Solution:**
```bash
mkdir undo-practice && cd undo-practice
git init

# Initial file
echo "version 1" > version.txt
git add version.txt
git commit -m "docs: Add version file"

# Make and stage changes
echo "version 2" > version.txt
git add version.txt

# Unstage without losing changes
git restore --staged version.txt
git status  # Still modified in working directory

# Make different changes
echo "version 2 updated" > version.txt
git add version.txt
git commit -m "docs: Update version"

# Amend the commit
echo "version 2 final" > version.txt
git add version.txt
git commit --amend -m "docs: Update version to final"

# View history
git log --oneline

# Create commits to revert
echo "version 3" > version.txt
git add version.txt
git commit -m "docs: Bump to version 3"

# Now revert that commit (creates a new commit)
git revert HEAD
```

---

### Exercise 6: Log Navigation
**Objective:** Master viewing and searching Git history

**Task:**
1. Create a repository with at least 5 commits
2. View log in different formats
3. Search for commits by message
4. Use `git log` with various filters
5. View detailed information about specific commits

**Solution:**
```bash
mkdir log-practice && cd log-practice
git init

# Create multiple commits
for i in {1..5}; do
  echo "Feature $i" > feature_$i.txt
  git add feature_$i.txt
  git commit -m "feat: Add feature number $i"
done

# View basic log
git log

# View concise log
git log --oneline

# Show last 3 commits
git log -3 --oneline

# Show commits that modified a specific file
git log feature_1.txt

# Search by commit message
git log --grep="feature 2"

# Show commits in graph format
git log --graph --all --decorate --oneline

# Show with statistics
git log --stat

# Detailed view of a specific commit
git show HEAD
```

---

### Exercise 7: Comparing Versions
**Objective:** Compare different versions of files and commits

**Task:**
1. Create a file with 10 lines
2. Modify it several times and commit
3. Compare different versions using `git diff`
4. Use commits, branches, and HEAD references

**Solution:**
```bash
mkdir compare-practice && cd compare-practice
git init

# Create initial file
cat > poem.txt << 'EOF'
Line 1
Line 2
Line 3
Line 4
Line 5
EOF

git add poem.txt
git commit -m "docs: Add poem part 1"

# Modify first time
cat > poem.txt << 'EOF'
Line 1 - updated
Line 2
Line 3
Line 4 - updated
Line 5
EOF

git commit -am "docs: Update poem"

# Modify second time
cat > poem.txt << 'EOF'
Line 1 - updated
Line 2 - updated
Line 3
Line 4 - updated
Line 5 - new
EOF

git commit -am "docs: Update poem again"

# Compare different versions
git diff HEAD~1 HEAD  # Compare last two commits
git diff HEAD~2 HEAD  # Compare last three commits
git show HEAD~1      # Show specific commit

# Graph view of changes
git log --oneline --graph
```

---

### Exercise 8: Interactive Staging
**Objective:** Use `git add -p` for advanced staging control

**Task:**
1. Create a file with multiple logical changes
2. Use `git add -p` (patch mode) to stage changes interactively
3. Understand the patch mode options
4. Create separate commits for different changes

**Instructions:**
- Use `y` to stage a hunk
- Use `n` to skip a hunk
- Use `s` to split hunks into smaller pieces
- Use `q` to quit

**Solution:**
```bash
mkdir patch-practice && cd patch-practice
git init

# Create initial file
cat > calculator.js << 'EOF'
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}
EOF

git add calculator.js
git commit -m "feat: Add basic calculator functions"

# Now modify multiple parts
cat > calculator.js << 'EOF'
// Updated calculator with better documentation

function add(a, b) {
  // Adds two numbers
  return a + b;
}

function subtract(a, b) {
  // Subtracts two numbers
  return a - b;
}

function multiply(a, b) {
  // Multiplies two numbers
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}
EOF

# Use interactive staging
git add -p

# Follow prompts to stage changes
# Choose y for documentation updates
# Choose y for divide function
# Create separate commits

git commit -m "docs: Add comments to calculator functions"
git commit -m "feat: Add divide function with validation"
```

---

### Exercise 9: Working with Long History
**Objective:** Navigate and understand commits in larger repositories

**Task:**
1. Simulate a project with multiple developers
2. Create at least 10 commits with different messages
3. Use various filters to find specific commits
4. Understand commit references (HEAD, HEAD~1, etc.)

**Solution:**
```bash
mkdir history-practice && cd history-practice
git init

# Create multiple commits
echo "README" > README.md
git add README.md
git commit -m "docs: Create README"

echo "# Setup Guide" >> README.md
git commit -am "docs: Add setup guide to README"

echo "index.js" > index.js
git add index.js
git commit -m "feat: Initialize main application file"

echo "console.log('start');" >> index.js
git commit -am "feat: Add startup logging"

echo "test.js" > test.js
git add test.js
git commit -m "test: Add test skeleton"

for i in {1..6}; do
  echo "Feature $i" >> README.md
  git commit -am "feat: Add feature $i"
done

# Navigate through history
git log --oneline
git log --all --graph --decorate --oneline

# Count commits
git rev-list --count HEAD

# Show all references
git show-ref

# Understand commit pointers
git rev-parse HEAD      # Show current HEAD commit hash
git rev-parse HEAD~1    # Show parent commit hash
git rev-parse HEAD~5    # Show 5 commits back
```

---

### Exercise 10: Practical Multi-Commit Workflow
**Objective:** Complete a realistic development workflow with multiple commits

**Task:**
Develop a simple "To-Do List" application with proper commits for each logical step.

**Steps:**
1. Initialize project
2. Create HTML structure
3. Add CSS styling
4. Implement JavaScript functionality
5. Add documentation
6. Make improvements

**Solution:**
```bash
mkdir todo-app && cd todo-app
git init

# Step 1: Initialize project
echo "# To-Do List Application" > README.md
git add README.md
git commit -m "docs: Initialize project with README"

# Step 2: Create HTML
cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>To-Do List</title></head>
<body>
  <h1>My To-Do List</h1>
  <input id="input" type="text">
  <button id="add">Add</button>
  <ul id="list"></ul>
</body>
</html>
EOF

git add index.html
git commit -m "feat: Create basic HTML structure"

# Step 3: Add CSS
cat > style.css << 'EOF'
* { font-family: Arial; }
h1 { color: #333; }
input { padding: 8px; margin: 10px 0; }
button { padding: 8px 15px; }
EOF

git add style.css
git commit -m "style: Add CSS styling for layout"

# Step 4: Add JavaScript
cat > app.js << 'EOF'
function addTodo() {
  const input = document.getElementById('input');
  const list = document.getElementById('list');
  
  if (input.value.trim() === '') return;
  
  const li = document.createElement('li');
  li.textContent = input.value;
  list.appendChild(li);
  input.value = '';
}

document.getElementById('add').addEventListener('click', addTodo);
EOF

git add app.js
git commit -m "feat: Implement todo add functionality"

# Step 5: Update documentation
echo "" >> README.md
echo "## Features" >> README.md
echo "- Add todos" >> README.md

git commit -am "docs: Add features section"

# Step 6: Improvements
cat > app.js << 'EOF'
function addTodo() {
  const input = document.getElementById('input');
  const list = document.getElementById('list');
  
  if (input.value.trim() === '') {
    alert('Please enter a task!');
    return;
  }
  
  const li = document.createElement('li');
  li.textContent = input.value;
  li.addEventListener('click', () => li.remove());
  list.appendChild(li);
  input.value = '';
  
  input.focus();
}

document.getElementById('add').addEventListener('click', addTodo);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});
EOF

git commit -am "feat: Add click-to-delete and enter-to-submit"

# View final history
git log --oneline
echo ""
echo "✅ 6 commits for a complete feature!"
```

---

## 🎓 Summary

You've now mastered:
- The three-state model (Working, Staging, Repository)
- Staging changes with `git add`
- Creating meaningful commits
- Viewing history with `git log`
- Understanding diffs with `git diff`
- Undoing changes safely
- Advanced navigation and comparisons

## 📚 Resources

- [Git Documentation - Everyday Commands](https://git-scm.com/docs)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)
- [Commit Message Guidelines](https://www.conventional commits.org/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet)

## ✅ Checklist for Success

- [ ] Understand and can explain the three states
- [ ] Can stage and commit changes effectively
- [ ] Can write meaningful commit messages
- [ ] Can view and understand Git history
- [ ] Can use `git diff` to compare versions
- [ ] Can undo changes safely
- [ ] Completed all 10 exercises
- [ ] Can help others with basic Git workflows
