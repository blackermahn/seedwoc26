# Week 1: Git, GitHub & Open Source Fundamentals

**Duration:** Full Weekend Program | **Difficulty:** Beginner | **Key Skills:** Version Control, Open Source Collaboration, Git Basics

---

## 🎯 Learning Objectives

By the end of this week, you will:
- ✅ Understand what open source is and why it matters
- ✅ Know the difference between centralized and distributed version control
- ✅ Master basic operating system and bash commands
- ✅ Understand Git fundamentals and workflows
- ✅ Track a project using Git
- ✅ Push your code to GitHub
- ✅ Make your first open source contribution

---

## 📚 Module 1: Understanding Open Source

### What is Open Source?

Open source software is code that is **publicly available** for anyone to:
- **View** - See exactly how it works
- **Use** - Download and use freely
- **Modify** - Change and improve it
- **Share** - Distribute your improvements

### Why Open Source Matters?

✅ **Learning** - Learn from real production code
✅ **Collaboration** - Work with developers worldwide
✅ **Innovation** - Build on existing solutions
✅ **Career** - Build your portfolio and reputation
✅ **Community** - Join passionate communities
✅ **Freedom** - No licensing restrictions

### Real-World Examples

```
Firefox - Web Browser
Linux - Operating System
Python - Programming Language
React - JavaScript Framework
VS Code - Code Editor
TensorFlow - Machine Learning
WordPress - Content Management
```

### Open Source Licenses

The most common licenses:
- **MIT License** - Very permissive, do almost anything
- **Apache 2.0** - Permissive with patent protection
- **GPL** - Share improvements with community
- **BSD** - Permissive, similar to MIT

**Key Point:** Always check the license before using!

---

## 🔄 Module 2: Version Control Systems

### What is Version Control?

Version Control is a system that:
- **Tracks changes** to files over time
- **Maintains history** of every modification
- **Allows collaboration** without conflicts
- **Enables recovery** to previous states

Think of it as **"Google Docs for code"** - but more powerful!

### Why Version Control?

✅ **Track changes** - Know what changed and when
✅ **Collaborate safely** - Multiple people on same project
✅ **Revert mistakes** - Go back to working code instantly
✅ **Experiment safely** - Try new features in branches
✅ **Professional standard** - Required in all companies
✅ **Code history** - See evolution of your project

---

## 📊 Module 3: Centralized vs Distributed Version Control

### Centralized Version Control

```
                    SERVER
                  (Central)
                      |
        ______________|______________
       /              |              \
     Dev 1          Dev 2           Dev 3
   (local)         (local)          (local)

- All code stored on ONE central server
- Developers check out files
- Changes go back to server
- No offline capability
- Single point of failure

Examples: SVN, Perforce
```

**Pros:**
- Simple to understand
- Easier to enforce permissions
- Centralized backup

**Cons:**
- No offline work
- Slow (always talking to server)
- If server down, no one can work
- If server fails, all history lost

### Distributed Version Control

```
        Dev 1            Dev 2            Dev 3
   (full copy)      (full copy)      (full copy)
        |                 |                |
        |_________________|________________|
                          |
                      SERVER
                    (GitHub, etc)

- Every developer has FULL copy
- Can work offline
- Each copy is a complete backup
- Changes shared between copies
- Server is just one copy

Examples: Git, Mercurial
```

**Pros:**
- Work offline
- Faster (local operations)
- Multiple backups automatically
- No single point of failure
- More flexible workflows

**Cons:**
- Slightly more complex
- Larger disk usage
- Need to learn merge concepts

### Git is Distributed! 🎉

When you clone a repository:
```
You get:
✅ All source code
✅ Complete history
✅ All branches
✅ Full functionality (offline)

You have:
- Local backup
- Full version control
- Ability to experiment freely
```

---

## 💻 Module 4: Operating Systems & Bash Basics

### Understanding Operating Systems

An **Operating System (OS)** is software that:
- Manages computer hardware
- Allows programs to run
- Handles files and folders
- Manages memory and processes

**Common Operating Systems:**
```
Windows - Microsoft (graphical)
macOS - Apple (graphical)
Linux - Open Source (text/graphical)
```

### What is Bash?

**Bash** = "Bourne Again Shell"
- A **command-line interface** where you type commands
- Instead of clicking, you type text
- Available on Linux, Mac, and Windows (via Git Bash)

### Why Learn Bash?

✅ **Faster** - Type commands instead of clicking
✅ **Powerful** - Do complex tasks easily
✅ **Professional** - Every programmer learns this
✅ **Automation** - Automate repetitive tasks
✅ **Remote work** - Work on servers remotely
✅ **Git friendly** - Git works best from command line

### Essential Bash Commands

#### Navigation Commands

```bash
# Print working directory (see where you are)
pwd
# Output: /Users/john/projects

# List files in current directory
ls
# Output: file1.txt  file2.js  folder1/

# List with more details
ls -la
# Shows permissions, size, date, name

# Change directory
cd folder-name        # Go into folder
cd ..                 # Go up one level
cd ~                  # Go to home directory
cd /                  # Go to root
```

#### File and Folder Commands

```bash
# Create new folder
mkdir my-project
mkdir project1 project2 project3    # Create multiple

# Create new file
touch filename.txt     # Empty file
echo "content" > file.txt    # File with content

# Copy file
cp source.txt destination.txt
cp -r folder1 folder2   # Copy entire folder (-r = recursive)

# Move or rename
mv old-name.txt new-name.txt
mv file.txt /path/to/folder/

# Remove file
rm filename.txt
rm file1.txt file2.txt file3.txt    # Remove multiple

# Remove folder
rm -r folder-name      # -r = recursive (includes contents)

# View file contents
cat filename.txt       # Show entire file

# View file (paginated)
less filename.txt      # Press q to exit

# First 10 lines
head filename.txt

# Last 10 lines
tail filename.txt
```

#### Useful Commands

```bash
# Clear terminal screen
clear

# Print text
echo "Hello World"

# Print to file
echo "Hello" > filename.txt    # Create/overwrite
echo "Hello" >> filename.txt   # Append

# Show manual/help
man command-name
command-name --help

# Search text in files
grep "search-term" filename.txt

# Current date/time
date

# Who are you?
whoami

# See current path
echo $PATH

# Change permissions
chmod 755 filename.txt
```

### File System Structure

```
/                          Root directory
├── Users/                 User folders (macOS)
│   ├── john/
│   │   ├── Desktop/
│   │   ├── Documents/
│   │   └── projects/
├── home/                  User folders (Linux)
├── Applications/          Installed programs
└── System/               Operating system files

Your Home: ~
Current Folder: .
Parent Folder: ..
```

### Bash Practice

```bash
# Create a project folder
mkdir my-project
cd my-project

# Create some files
touch README.md
touch app.js
echo "# My Project" > README.md

# List what we created
ls -la

# View the README
cat README.md

# Go back
cd ..

# Remove the project folder
rm -r my-project
```

---

## 🔧 Git Basics

### What is Git?

**Git** is a **Distributed Version Control System** that:
- Tracks changes to files
- Stores complete history
- Enables collaboration
- Works offline
- Made by Linus Torvalds (also made Linux)

### How Git Works

```
Your Computer (Local)
     ↓
   Working Directory (files you edit)
     ↓
   Staging Area (select what to save)
     ↓
   Local Repository (saved versions)
     ↓↑
GitHub (server backup)
```

### Git vs GitHub

**Git** = Version control tool (on your computer)
**GitHub** = Online hosting service for Git repositories

```
Git ↔ GitHub
Code ← → Cloud Storage
Local ← → Remote
```

---

## 📋 Module 5: Git Installation & Setup

### Installation

#### Windows
```bash
# Download from: https://git-scm.com/download/win
# Run installer
# Choose "Git Bash"
# Use default settings
# Finish
```

#### Mac
```bash
# Using Homebrew
brew install git

# Or download from: https://git-scm.com/download/mac
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt-get install git

# Fedora/CentOS
sudo yum install git
```

### Verify Installation

```bash
# Check version
git --version
# Output: git version 2.39.2 (or higher)
```

### Configure Git (IMPORTANT!)

```bash
# Set your name (appears in all commits)
git config --global user.name "Your Full Name"

# Set your email (must match GitHub email)
git config --global user.email "your.email@example.com"

# Verify settings
git config --global --list

# Output should include:
# user.name=Your Full Name
# user.email=your.email@example.com
```

### Git Bash on Windows

**Git Bash** is a terminal that gives Windows users bash commands

```
Windows Command Prompt → Limited bash commands
PowerShell → Some bash commands
Git Bash → Full bash environment ✅
```

**Always use Git Bash for this course!**

---

## 🚀 Module 6: Tracking a Project with Git

### Initialize a Repository

```bash
# Create project folder
mkdir my-first-project
cd my-first-project

# Initialize git (creates .git folder)
git init

# You now have version control!
```

### Basic Workflow

```
1. Create/Edit Files
        ↓
2. Stage Changes (git add)
        ↓
3. Create Commit (git commit)
        ↓
4. Push to GitHub (git push)
```

### Step-by-Step Example

```bash
# 1. Create a project file
echo "console.log('Hello World')" > app.js

# 2. Check status
git status
# Output: Untracked files: app.js

# 3. Stage the file
git add app.js

# 4. Check status again
git status
# Output: Changes to be committed: app.js

# 5. Create a commit (snapshot)
git commit -m "Add hello world app"

# 6. View your history
git log --oneline
# Output: abc1234 Add hello world app
```

### Important Commands

```bash
# See what changed
git status

# Stage file(s)
git add filename.txt    # Single file
git add .               # All changes

# Create commit
git commit -m "Description of changes"

# View history
git log --oneline

# View changes
git diff                # Unstaged changes
git show commit-hash    # Changes in commit
```

### What NOT to Commit

```bash
# Never commit:
❌ node_modules/ folder (too large)
❌ .env files (contains secrets)
❌ Password files
❌ API keys
❌ Personal data
❌ Large binary files

# Solution: Use .gitignore file
```

### .gitignore Example

Create a file named `.gitignore`:

```
# Dependencies
node_modules/

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Compiled
dist/
build/
```

---

## 🌐 Module 7: GitHub - Sharing Your Code

### What is GitHub?

GitHub is:
- **Cloud storage** for Git repositories
- **Collaboration platform** for developers
- **Social network** for code
- **Portfolio** to show your work

### Creating a GitHub Account

1. Go to https://github.com
2. Click "Sign up"
3. Enter email, password, username
4. Verify your email
5. Choose free plan ✅

### Create Your First Repository

1. Click "New" (green button)
2. Enter repository name: `my-first-project`
3. Add description (optional): "My first coding project"
4. Choose "Public" (visible to everyone)
5. Skip "Add README" (we'll do this locally)
6. Click "Create repository"

### Connecting Local Git to GitHub

```bash
# You should now have these commands from GitHub:
git remote add origin https://github.com/YOUR-USERNAME/my-first-project.git
git branch -M main
git push -u origin main

# Explanation:
# remote add → Connect to GitHub
# origin → Name of the connection
# branch -M main → Rename branch to main
# push -u origin main → Upload to GitHub
```

### First Push

```bash
# 1. Add and commit locally
git add .
git commit -m "Initial commit"

# 2. View remotes
git remote -v

# 3. Push to GitHub
git push origin main

# 4. Go to GitHub.com to see your code!
```

### Important Commands

```bash
# View connections
git remote -v

# Push to GitHub
git push origin main

# Pull from GitHub
git pull origin main

# Create new branch
git checkout -b feature-name
git switch -c feature-name    # Newer syntax

# Switch branches
git checkout branch-name
git switch branch-name

# Merge branch to main
git checkout main
git merge feature-name
```

---

## 🔐 Module 8: Authentication with GitHub

### Personal Access Token (Recommended)

**Why?** Password less secure, token can be revoked per device

**Steps:**

1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Click "Generate new token"
3. Give it a name: "Git Local Access"
4. Select scopes:
   - ✅ `repo` (full control)
   - ✅ `gist` (if you use gists)
5. Generate token
6. **Copy and save somewhere safe** (won't show again)

**Use when prompting for password:**
```
Username: your-username
Password: paste-your-token
```

### SSH Keys (Advanced)

Alternative more secure method (optional):

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Copy the public key
cat ~/.ssh/id_ed25519.pub

# Paste into GitHub Settings → SSH Keys
# Then clone using SSH URL
```

---

## 📢 Module 9: Best Practices

### ✅ DO:

```
✅ Write clear commit messages
✅ Commit related changes together
✅ Commit frequently (multiple times per day)
✅ Pull before pushing
✅ Create branches for features
✅ Review code before merging
✅ Use descriptive names for branches
✅ Add README to explain project
✅ Add .gitignore from start
✅ Delete merged branches
```

### ❌ DON'T:

```
❌ Commit secrets (passwords, API keys)
❌ Commit large files (>100MB)
❌ Write "update" or "fix" as commit message
❌ Force push to main branch
❌ Commit all at once (one huge commit)
❌ Have branches open for weeks
❌ Ignore merge conflicts
❌ Mix unrelated changes in one commit
❌ Rewrite history of shared branches
❌ Leave uncommitted work
```

### Good Commit Messages

```bash
# ✅ Good commit messages:
git commit -m "Add user authentication"
git commit -m "Fix navbar responsive bug"
git commit -m "Update dependencies"
git commit -m "Refactor login component"

# ❌ Bad commit messages:
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
git commit -m "asdf"
git commit -m "..."
```

### Commit Message Format

```
[type] - Brief description (50 chars max)

Types:
feat    - New feature
fix     - Bug fix
docs    - Documentation
style   - Code style (formatting, semicolons)
refactor - Code reorganization
test    - Tests
chore   - Maintenance

Examples:
feat - Add login page
fix - Fix button onclick handler
docs - Update README with setup instructions
```

---

## 🎯 Module 10: Common Git Workflows

### Basic Feature Workflow

```bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/navbar

# 3. Work and commit multiple times
echo "<!-- navbar -->" > navbar.html
git add navbar.html
git commit -m "Add navbar structure"

echo "/* navbar styles */" > navbar.css
git add navbar.css
git commit -m "Add navbar styles"

# 4. Push to GitHub
git push origin feature/navbar

# 5. (On GitHub) Create Pull Request
# (or merge locally for learning)

# 6. After merge, cleanup
git checkout main
git pull origin main
git branch -d feature/navbar
```

### Daily Workflow

```bash
# Morning: Get latest changes
git pull origin main

# During day: Work on feature
# (make multiple commits)

# Evening: Push your work
git push origin feature/my-feature

# Before leaving: Commit everything
git status  # Should be clean
git log     # See your work
```

### Emergency Hotfix

```bash
# Critical bug in production
git checkout main
git pull origin main

# Fix immediately
git checkout -b hotfix/critical-bug
echo "// fix" >> app.js
git add app.js
git commit -m "Fix critical bug"

# Push and merge ASAP
git push origin hotfix/critical-bug
# (create PR or merge locally)

# Back to normal work
git checkout main
git pull origin main
```

---

## 🛠 Troubleshooting Common Issues

### Changed Wrong Branch

```bash
# Oops, made changes on main instead of feature
git status

# Solution 1: Stash and move
git stash                    # Save changes
git checkout -b feature/fix  # Create feature branch
git stash pop               # Get changes back

# Solution 2: Reset and move
git log --oneline           # Find last good commit
git reset --soft abc1234    # Keep changes
git checkout -b feature/fix # Create new branch
git commit -m "Feature"
```

### Forgot to Add File

```bash
# Created commit but forgot a file
git add forgotten-file.txt
git commit --amend          # Add to last commit
```

### Wrong Commit Message

```bash
# Typo in commit message
git commit --amend -m "Corrected message"
```

### Need to Undo Last Commit

```bash
# Keep changes
git reset --soft HEAD~1

# Discard changes (careful!)
git reset --hard HEAD~1
```

### Accidentally Deleted File

```bash
# Restore file from last commit
git restore filename.txt
# Or
git checkout filename.txt
```

---

## 📚 Resources

### Official Docs
- Git Documentation: https://git-scm.com/doc
- GitHub Docs: https://docs.github.com
- GitHub Learning: https://github.com/skills

### Practice Tools
- Git Visualizer: https://git-school.github.io/visualizing-git/
- Learn Git Branching: https://learngitbranching.js.org/
- GitHub Sandbox: https://github.com/skills/introduction-to-github

### Cheat Sheets
- Git Cheat Sheet: https://education.github.com/git-cheat-sheet-education.pdf
- GitHub Cheat Sheet: https://docs.github.com/en/get-started

---

## ✅ Week 1 Checklist

By end of week, you should have:

- [ ] Git installed and configured
- [ ] GitHub account created
- [ ] Understand centralized vs distributed version control
- [ ] Know basic bash commands
- [ ] Know basic git commands
- [ ] Initialized a local repository
- [ ] Made at least 10 commits
- [ ] Pushed code to GitHub
- [ ] Connected local repo to GitHub
- [ ] Can create branches
- [ ] Understand staging area
- [ ] Know good commit practices
- [ ] Can view commit history
- [ ] Understand .gitignore

---

## 🚀 Next Steps

1. **Complete** all exercises (see Week-1-Exercises.md)
2. **Make 10 commits** as per exercise guide
3. **Push to GitHub** and verify visible
4. **Share link** with your mentor
5. **Help others** who are struggling
6. **Experiment** with branches and merges

---

**You're on your way to becoming a version control expert! Keep coding! 🎉**
