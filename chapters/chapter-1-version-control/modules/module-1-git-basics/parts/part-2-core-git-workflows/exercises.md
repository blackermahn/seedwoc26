# Part 2: Core Git Workflows - Exercises

## Exercise 1: The Three States

Master the fundamental concept of Git's three-state model.

### Objective
Understand and demonstrate the three states: Working Directory, Staging Area, Repository

### Task
1. Create a new directory called `git-three-states`
2. Initialize a Git repository
3. Create a file called `notes.txt` with content: "Initial content"
4. Check the status - note what state the file is in
5. Stage the file - check status again
6. Commit it - check status
7. Modify the file - check status

### Solution
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

### Expected Output
```
Untracked files → modified in working directory → in staging area → committed
```

### Success Criteria ✅
- [ ] File starts as untracked
- [ ] After `git add`, shows as "Changes to be committed"
- [ ] After `git commit`, working tree is clean
- [ ] After modifying, shows as modified again

---

## Exercise 2: Meaningful Commit Messages

Practice writing clear, professional commit messages.

### Objective
Master the art of writing commits that clearly communicate intent

### Task
1. Create a new repository called `commit-messages-practice`
2. Create three files with different purposes
3. Commit each file with a meaningful message following conventional commits format
4. View the log to verify your messages

### Good Message Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

### Solution
```bash
mkdir commit-messages-practice && cd commit-messages-practice
git init

# Feature commit
echo "function validateEmail(email) { return email.includes('@'); }" > validator.js
git add validator.js
git commit -m "feat: Add email validation function"

# Documentation commit
echo "# API Guide

Endpoints:
- POST /api/user
- GET /api/user/:id" > API.md
git add API.md
git commit -m "docs: Create API documentation with endpoints"

# Fix commit
echo "const date = new Date(); return date.getTime();" > dateutil.js
git add dateutil.js
git commit -m "fix: Correct timestamp calculation in date utility"

git log --oneline
```

### Expected Commits
- `feat: Add email validation function`
- `docs: Create API documentation with endpoints`
- `fix: Correct timestamp calculation in date utility`

### Success Criteria ✅
- [ ] Each commit has a type prefix
- [ ] Each message is concise but descriptive
- [ ] Messages follow consistent format
- [ ] `git log --oneline` is readable and informative

---

## Exercise 3: Staging Selectively

Master selective staging with `git add`.

### Objective
Learn to stage only specific changes, not everything at once

### Task
1. Create a project folder
2. Create 3 files: `index.html`, `style.css`, `script.js`
3. Modify all three files
4. Use `git add` to stage only two of them
5. Verify with `git status`
6. Commit just the staged files
7. Commit remaining file separately

### Solution
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

# Verify final state
git log --oneline
```

### Success Criteria ✅
- [ ] First commit contains only HTML and CSS changes
- [ ] Second commit contains only JavaScript changes
- [ ] `git status` shows correct staged/unstaged state at each step
- [ ] Can see separation of concerns in git log

---

## Exercise 4: Viewing Diffs

Understand and interpret diff output.

### Objective
Learn to read and understand what changed in your code

### Task
1. Create a file `config.json` with initial configuration
2. Make several changes to the file
3. View the diff using `git diff`
4. Stage the file
5. View the staged diff using `git diff --staged`
6. Identify what changed in each section

### Diff Format Help
- Lines with `+` = additions
- Lines with `-` = removals
- `@@` shows line numbers and context
- Red = removed, Green = added

### Solution
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

# View by sections
git diff --color-words  # Highlight changed words
git diff --stat         # Show statistics

# Stage and view staged changes
git add config.json
git diff --staged
```

### Success Criteria ✅
- [ ] Can read diff output with + and - lines
- [ ] Understand which lines were added vs. removed
- [ ] Can use `git diff` for unstaged changes
- [ ] Can use `git diff --staged` for staged changes

---

## Exercise 5: Undoing Changes

Safely undo various types of changes.

### Objective
Learn different ways to undo changes at each stage

### Task
1. Create a file and commit it
2. Make changes and stage them
3. Undo the staged changes (restore to working directory)
4. Make changes again and commit
5. Undo the commit with `--amend`
6. Create a new commit
7. Use `git revert` to undo a previous commit safely

### Solution
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

# Amend the last commit (add more changes)
echo "version 2 final" > version.txt
git add version.txt
git commit --amend --no-edit

# View history
git log --oneline

# Create commits to revert
echo "version 3" > version.txt
git add version.txt
git commit -m "docs: Bump to version 3"

# Now revert that commit (creates new commit instead of deleting)
git revert HEAD
```

### Key Commands
- `git restore FILE` - Discard unstaged changes
- `git restore --staged FILE` - Unstage changes
- `git commit --amend` - Modify last commit
- `git revert COMMIT` - Safely undo a commit (creates new commit)

### Success Criteria ✅
- [ ] Can undo unstaged changes with `git restore`
- [ ] Can unstage files with `git restore --staged`
- [ ] Can amend last commit
- [ ] Understand difference between `git revert` and `git reset`

---

## Exercise 6: Log Navigation

Master viewing and searching Git history.

### Objective
Learn various ways to view and search commits

### Task
1. Create a repository with at least 5 commits
2. View log in different formats
3. Search for commits by message
4. Use `git log` with various filters
5. View detailed information about specific commits

### Solution
```bash
mkdir log-practice && cd log-practice
git init

# Create multiple commits
for i in {1..5}; do
  echo "Feature $i content" > feature_$i.txt
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

# Show with statistics (files changed, lines added/removed)
git log --stat

# Custom format
git log --format="%h %an %s"

# Detailed view of a specific commit
git show HEAD
```

### Log Options Reference
- `--oneline` - Condensed format
- `-N` - Show last N commits
- `--stat` - Show file statistics
- `--graph` - Show branch diagram
- `--grep="text"` - Search in messages
- `--author="name"` - Filter by author
- `--format="%h %s"` - Custom format

### Success Criteria ✅
- [ ] Can use `git log` with various options
- [ ] Can search commits by message
- [ ] Can view detailed commit information
- [ ] Understand abbreviated vs. full commit hashes

---

## Exercise 7: Comparing Versions

Compare different versions of files and commits.

### Objective
Learn to compare code across different commits and states

### Task
1. Create a file with multiple lines
2. Modify it several times and commit
3. Compare different versions using `git diff`
4. Use commits, branches, and HEAD references

### Solution
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
git diff HEAD~1 HEAD      # Compare last two commits
git diff HEAD~2 HEAD      # Compare last three commits
git diff HEAD~2 HEAD~1    # Compare commits 2 and 3
git show HEAD~1           # Show specific commit
git log --oneline --graph
```

### Comparison Syntax
- `git diff COMMIT1 COMMIT2` - Compare two commits
- `git diff HEAD~N HEAD` - Compare N commits back to current
- `git show COMMIT` - Show specific commit details
- `git diff FILE` - Compare specific file

### Success Criteria ✅
- [ ] Can compare different commits
- [ ] Can use HEAD references (HEAD, HEAD~1, HEAD~2, etc.)
- [ ] Can show specific commit details
- [ ] Understand the difference between comparing commits

---

## Exercise 8: Interactive Staging

Use `git add -p` for advanced staging control.

### Objective
Master patch mode for granular control over what gets committed

### Task
1. Create a file with multiple logical changes
2. Use `git add -p` (patch mode) to stage changes interactively
3. Stage different changes separately
4. Create separate commits for each logical change

### Patch Mode Options
- `y` - Stage this hunk
- `n` - Skip this hunk
- `s` - Split hunk into smaller ones
- `e` - Edit hunk manually
- `q` - Quit patch mode

### Solution
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
  // Divides two numbers with validation
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}
EOF

# Use interactive staging
git add -p

# Follow prompts to stage changes
# Create separate commits
git commit -m "docs: Add comments to calculator functions"
git commit -m "feat: Add divide function with validation"

git log --oneline
```

### Success Criteria ✅
- [ ] Can invoke patch mode with `git add -p`
- [ ] Understand hunk-based staging
- [ ] Can stage logical changes separately
- [ ] Can review changes before staging

---

## Exercise 9: Working with Long History

Navigate and understand commits in larger repositories.

### Objective
Learn techniques for working with projects that have many commits

### Task
1. Simulate a project with multiple developers
2. Create at least 10 commits with different messages
3. Use various filters to find specific commits
4. Understand commit references (HEAD, HEAD~1, etc.)

### Solution
```bash
mkdir history-practice && cd history-practice
git init

# Create multiple commits simulating real project
echo "# Project" > README.md
git add README.md
git commit -m "docs: Create README"

echo "## Setup" >> README.md
git commit -am "docs: Add setup guide"

echo "module.exports = {};" > index.js
git add index.js
git commit -m "feat: Initialize main file"

echo "console.log('Started');" >> index.js
git commit -am "feat: Add startup log"

for i in {1..8}; do
  echo "#### Feature $i" >> README.md
  git commit -am "feat: Add feature $i documentation"
done

# Navigate through history
git log --oneline          # List all commits
git log --all --graph --decorate --oneline  # Visual tree

# Count commits
git rev-list --count HEAD  # Total commits

# Show all references
git show-ref                # All branches and tags

# Understand commit pointers
git rev-parse HEAD          # Current HEAD commit hash
git rev-parse HEAD~1        # Parent commit
git rev-parse HEAD~5        # 5 commits back

# Find commits by date
git log --since="2 weeks ago"
git log --until="1 week ago"
```

### Commit Reference Syntax
- `HEAD` - Current commit
- `HEAD~1` - One commit back
- `HEAD~5` - Five commits back
- `HEAD^` - Parent commit (same as HEAD~1)
- `COMMIT_HASH` - Specific commit

### Success Criteria ✅
- [ ] Can view commits in multiple formats
- [ ] Understand commit reference syntax
- [ ] Can navigate through history
- [ ] Can count and track commits

---

## Exercise 10: Practical Multi-Commit Workflow

Complete a realistic development workflow with multiple commits.

### Objective
Apply all learned concepts in a realistic project scenario

### Task
Develop a simple "To-Do List" application with proper commits for each logical step.

### Solution
```bash
mkdir todo-app && cd todo-app
git init

# Step 1: Initialize project
echo "# To-Do List Application

A simple todo tracking application." > README.md
git add README.md
git commit -m "docs: Initialize project with README"

# Step 2: Create HTML structure
cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <title>To-Do List</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>My To-Do List</h1>
  <input id="input" type="text" placeholder="Add a task...">
  <button id="add">Add Task</button>
  <ul id="list"></ul>
  <script src="app.js"></script>
</body>
</html>
EOF

git add index.html
git commit -m "feat: Create basic HTML structure"

# Step 3: Add CSS styling
cat > style.css << 'EOF'
* {
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  text-align: center;
}

input, button {
  padding: 8px 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

li {
  list-style: none;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

li:hover {
  background-color: #f0f0f0;
}
EOF

git add style.css
git commit -m "style: Add CSS styling for layout and interactivity"

# Step 4: Add JavaScript functionality
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
git commit -m "feat: Implement basic todo add functionality"

# Step 5: Update documentation
echo "" >> README.md
echo "## Features" >> README.md
echo "- Add todos to your list" >> README.md
echo "- Clean and simple interface" >> README.md

git commit -am "docs: Add features section to README"

# Step 6: Enhance with better features
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
  
  // Click to delete functionality
  li.addEventListener('click', () => {
    li.remove();
  });
  
  list.appendChild(li);
  input.value = '';
  
  // Return focus to input for next entry
  input.focus();
}

// Allow Enter key to add todo
const input = document.getElementById('input');
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

document.getElementById('add').addEventListener('click', addTodo);
EOF

git commit -am "feat: Add click-to-delete and enter-to-submit features"

# View final workflow
git log --oneline --graph
echo ""
echo "✅ Complete workflow with 6 focused commits!"
```

### Commit Sequence
1. `docs: Initialize project with README`
2. `feat: Create basic HTML structure`
3. `style: Add CSS styling for layout`
4. `feat: Implement basic todo add functionality`
5. `docs: Add features section to README`
6. `feat: Add click-to-delete and enter features`

### Success Criteria ✅
- [ ] Each commit is logical and focused
- [ ] Commit messages clearly describe changes
- [ ] Can trace project development through history
- [ ] All features working and properly committed

---

## 🎓 Summary

You've mastered:
- ✅ Three-state model in depth
- ✅ Writing meaningful commits
- ✅ Selective staging with `git add`
- ✅ Understanding diffs
- ✅ Undoing changes safely
- ✅ Navigating history
- ✅ Comparing versions
- ✅ Interactive staging
- ✅ Working with large histories
- ✅ Complete realistic workflows

---

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)
- [Git Tips and Tricks](https://git-scm.com/book/en/v2)

---

## ✅ Next Steps

You're ready for **Part 3: Branching Fundamentals** ➡️
