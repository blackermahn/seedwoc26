# Part 1: Introduction to Version Control

## 📚 Part Overview

Understand what version control is, why it matters, and get Git installed and configured on your system.

## 🎯 Learning Objectives

By completing this part, you will:
- Understand the purpose and benefits of version control
- Know Git's core concepts
- Have Git installed and configured
- Create your first Git repository
- Make your first commit

## 🔑 Key Concepts

### What is Version Control?
Version control systems (VCS) track changes to files over time. They allow you to:
- **See history**: Every change is recorded with who made it and when
- **Revert changes**: Go back to previous versions if something breaks
- **Collaborate**: Multiple people can work on the same project
- **Branching**: Work on features independently without affecting main code

### Why Git?
- **Distributed**: Every developer has a full copy of the repository
- **Branching**: Creating branches is fast and easy
- **Staging**: Control exactly what goes into each commit
- **Industry standard**: Used by virtually all modern projects

## 📖 Lecture Notes

### Installation

**macOS:**
```bash
# Using Homebrew (recommended)
brew install git

# Or download from https://git-scm.com/download/mac
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install git
```

**Windows:**
Download from https://git-scm.com/download/win and run the installer.

**Verify Installation:**
```bash
git --version
```

### Initial Configuration

After installation, configure Git with your identity:

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

### Creating Your First Repository

```bash
# Create a project directory
mkdir my-first-repo
cd my-first-repo

# Initialize Git repository
git init

# Verify .git folder was created
ls -la
```

### Making Your First Commit

```bash
# Create a file
echo "Hello, Git!" > hello.txt

# Check repository status
git status

# Stage the file
git add hello.txt

# Create a commit
git commit -m "feat: add hello.txt"

# View commit history
git log
```

### Understanding the Commit Message

A good commit message format:
```
<type>: <subject>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

**Example messages:**
```bash
feat: add user authentication
fix: resolve login button styling issue
docs: update readme with installation steps
refactor: simplify user service
```

## 🔄 Git Workflow Overview

```
┌─────────────────┐
│ Working Dir     │ ← You edit files here
└────────┬────────┘
         │
      git add
         │
         ▼
┌─────────────────┐
│ Staging Area    │ ← Files ready to commit
└────────┬────────┘
         │
    git commit
         │
         ▼
┌─────────────────┐
│ Git Repository  │ ← Committed history
└─────────────────┘
```

## 💻 Practice Exercises

### Exercise 1.1: Repository Setup
Create a new Git repository:
```bash
mkdir intro-to-git
cd intro-to-git
git init
```
✅ **Done when**: You see `.git` folder in your directory

### Exercise 1.2: Your First Commit
```bash
echo "# My First Repository" > README.md
git add README.md
git commit -m "docs: initialize repository with readme"
git log
```
✅ **Done when**: `git log` shows your commit

### Exercise 1.3: Multiple Changes
```bash
# Create more files
echo "JavaScript is awesome" > languages.txt
echo "Python is fun" >> languages.txt

# Create Python file
cat > script.py << 'EOF'
print("Hello from Python!")
EOF

# Stage and commit
git add .
git commit -m "feat: add language notes and python script"
```
✅ **Done when**: Two commits appear in `git log`

### Exercise 1.4: View History
```bash
# Show detailed history
git log

# Show short summary
git log --oneline

# Show statistics
git log --stat

# Show specific number of commits
git log -5
```
✅ **Done when**: You can see all commits and changes

## 🔍 Important Commands Reference

```bash
# Check current status
git status

# See what changed in files
git diff

# Stage specific file
git add filename.txt

# Stage all changes
git add .

# Commit with message
git commit -m "message"

# View commit history
git log

# Show one-line summary
git log --oneline

# Show last N commits
git log -N

# Configure settings
git config --global user.name "Name"
git config --list
```

## 💡 Pro Tips

1. **Commit often**: Small commits are easier to understand and revert
2. **Write clear messages**: Future you will appreciate it
3. **Check status before committing**: Know what you're committing
4. **Don't commit large files**: Use .gitignore for build files, dependencies
5. **Review before commit**: Use `git diff` to see exact changes

## ⚠️ Common Mistakes

**❌ Large commits with mixed changes**
```bash
# Don't do this - multiple unrelated changes
git add .
git commit -m "update stuff"
```

**✅ Focused, well-described commits**
```bash
# Do this - one change, clear message
git add user-auth.js
git commit -m "feat: implement jwt authentication"
```

## 🎯 Summary

In this part, you learned:
- What version control does and why it matters
- How to install and configure Git
- How to create a repository and make commits
- Basic Git workflow from working directory to history

These skills are foundation for everything else in this chapter!

## 📚 Additional Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [Git Basics - Pro Git Book (Free)](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [Visualizing Git](https://git-school.github.io/visualizing-git/)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)

## ✅ Checklist

Before moving to Part 2, ensure you can:
- [ ] Install and configure Git
- [ ] Initialize a repository
- [ ] Create and view commits
- [ ] Write clear commit messages
- [ ] Check repository status
- [ ] View commit history

---

**Next: [Part 2: Core Git Workflows](../part-2-core-git-workflows)** ➡️

