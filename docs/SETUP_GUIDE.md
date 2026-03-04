# Setup Guide - Getting Started with SeedWOC

## 🎯 Your First Steps

### 1. Fork and Clone the Repository

**If you're a learner submitting assignments:**
```bash
# Fork the repository on GitHub
# Then clone YOUR fork
git clone https://github.com/YOUR_USERNAME/seedwoc.git
cd seedwoc
```

**If you just want to learn:**
```bash
# Clone the main repository
git clone https://github.com/seedwoc/seedwoc.git
cd seedwoc
```

### 2. Choose Your Learning Path

Read [LEARNING_PATHS.md](./LEARNING_PATHS.md) to pick your specialization:

- 🌐 Full-Stack Web Developer
- 🐍 Python Backend Developer
- 🤖 Machine Learning & AI Engineer
- 🔒 Cybersecurity Specialist
- 🔌 Embedded Systems & IoT Developer
- 📱 Mobile Developer (Dart/Flutter)
- 🏛️ Enterprise Systems Developer

### 3. Start with Chapter 1 (Version Control)

Everyone should complete Chapter 1 - it's the foundation for all other work.

```bash
# Read the introduction
# Navigate to: chapters/chapter-1-version-control/README.md

# Then start Module 1
# Navigate to: chapters/chapter-1-version-control/modules/module-1-git-basics/README.md
```

---

## 📥 System Requirements

### Hardware
- **Processor**: Any modern processor (Intel i3, AMD Ryzen 3+, or equivalent)
- **RAM**: 4 GB minimum, 8 GB recommended
- **Storage**: 10 GB free space
- **Internet**: Stable connection for downloading tools

### Operating System
- macOS (Intel or Apple Silicon)
- Windows 10/11
- Linux (Ubuntu, Debian, Fedora, etc.)

### Browser (for web development chapters)
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

---

## 🛠️ Installing Required Tools

Choose your learning path and install the necessary tools:

### Essential for Everyone

#### 1. Git
**macOS:**
```bash
brew install git
# or download from https://git-scm.com/download/mac
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install git
```

**Windows:**
Download and install from https://git-scm.com/download/win

**Verify:**
```bash
git --version
```

#### 2. Text Editor (VS Code Recommended)
Download from https://code.visualstudio.com

**Recommended Extensions:**
- GitLens (Git integration)
- Prettier (Code formatter)
- ESLint (JavaScript linter)
- Pylance (Python language)

#### 3. GitHub Account
Create a free account at https://github.com

Set up SSH key (optional but recommended):
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to SSH agent (macOS/Linux)
ssh-add ~/.ssh/id_ed25519

# Copy public key and add to GitHub Settings > SSH Keys
cat ~/.ssh/id_ed25519.pub
```

---

### For JavaScript/Web Development (Chapters 2, 3, 6, 7, 8)

#### Node.js & npm
**macOS:**
```bash
brew install node
```

**Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Windows:**
Download from https://nodejs.org

**Verify:**
```bash
node --version
npm --version
```

---

### For Python Development (Chapters 4, 9, 10, 11, 12, 13, 14)

#### Python 3
**macOS:**
```bash
brew install python@3.10
```

**Ubuntu/Debian:**
```bash
sudo apt-get install python3 python3-venv python3-pip
```

**Windows:**
Download from https://www.python.org/downloads

**Verify:**
```bash
python3 --version
pip3 --version
```

#### Virtual Environment Setup
```bash
# Create virtual environment
python3 -m venv venv

# Activate (macOS/Linux)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Install common packages
pip install numpy pandas matplotlib jupyter scikit-learn
```

---

### For Dart Development (Chapter 5)

#### Dart SDK
**macOS:**
```bash
brew install dart
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install dart
```

**Windows:**
Download from https://dart.dev/get-dart

**Verify:**
```bash
dart --version
```

---

### For Embedded Systems (Chapter 15)

#### Arduino IDE
Download from https://www.arduino.cc/en/software

#### Hardware
- Arduino Uno board
- USB cable
- Jumper wires
- Breadboard
- LEDs, resistors, sensors

---

### For C/C++ Development (Chapters 16, 17)

#### GCC Compiler

**macOS:**
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Or use Homebrew
brew install gcc
```

**Ubuntu/Debian:**
```bash
sudo apt-get install build-essential
```

**Windows:**
Install MinGW from https://www.mingw-w64.org

**Verify:**
```bash
gcc --version
g++ --version
```

---

## 🚀 Your First Assignment

### Step 1: Create Assignment Directory
```bash
# Navigate to assignments folder
cd assignments

# Create your directory structure
# Replace 'your-github-username' with your actual GitHub username
mkdir -p your-github-username/chapter-1-version-control/module-1-git-basics/part-1-introduction
cd your-github-username
```

### Step 2: Initialize Git in Your Workspace
```bash
# Go back to repo root
cd ../..

# Initialize git (if not already done)
git init

# Configure git
git config user.name "Your Full Name"
git config user.email "your.email@example.com"

# Create feature branch for your work
git checkout -b feat/chapter-1-exercises
```

### Step 3: Start Learning
1. Navigate to your chapter README
2. Read the module overview
3. Complete the exercises in your assignment folder
4. Create meaningful commits for each exercise

Example:
```bash
# After completing first exercise
cd assignments/your-github-username/chapter-1-version-control/module-1-git-basics/part-1-introduction
echo "# Exercise 1: Repository Setup
Completed on $(date)" > exercise-1.md

# Stage and commit
cd ../../../../.. # Back to repo root
git add assignments/your-github-username/chapter-1-version-control/
git commit -m "feat(chapter-1): complete git basics introduction exercises"
```

### Step 4: Submit Your Work
```bash
# Push your branch
git push origin feat/chapter-1-exercises

# Create a Pull Request on GitHub
# Go to https://github.com/YOUR_USERNAME/seedwoc
# Click "Compare & Pull Request"
# Fill in the description
# Submit!
```

---

## 📁 Directory Structure You'll Use

```
seedwoc/
├── chapters/                           # Read the content
│   ├── chapter-1-version-control/
│   ├── chapter-2-javascript-fundamentals/
│   ├── chapter-3-javascript-advanced/
│   └── ... (more chapters)
│
├── assignments/                        # Your work goes here!
│   └── your-github-username/
│       └── chapter-1-version-control/
│           └── module-1-git-basics/
│               └── part-1-introduction/
│                   ├── exercise-1.md
│                   ├── solution.md
│                   └── notes.md
│
├── docs/                               # Guides and references
│   ├── FAQ.md
│   ├── BEST_PRACTICES.md
│   ├── LEARNING_PATHS.md
│   └── CONTRIBUTING.md
│
└── resources/                          # Shared utilities
```

---

## 🔄 Daily Workflow

### Morning: Start Work
```bash
# Update local repository
git pull origin main

# Create/switch to your feature branch
git checkout feat/your-feature-name
```

### Throughout Day: Regular Commits
```bash
# After completing an exercise
git add assignments/your-username/chapter-X/...
git commit -m "feat(chapter-X): complete exercise description"

# Check what you've done
git log --oneline
```

### Evening: Push Progress
```bash
# Push your work
git push origin feat/your-feature-name
```

### When Ready to Submit
```bash
# Ensure everything is committed
git status  # Should show "working tree clean"

# Push final changes
git push origin feat/your-feature-name

# Create Pull Request on GitHub website
```

---

## 🆘 Troubleshooting

### Git Issues

**Problem**: `fatal: not a git repository`
```bash
# Solution: Navigate to repo root
cd /path/to/seedwoc
git status  # Should work now
```

**Problem**: `Permission denied (publickey)`
```bash
# Solution: Setup SSH key (see above) or use HTTPS clone
git remote set-url origin https://github.com/YOUR_USERNAME/seedwoc.git
```

### Python Issues

**Problem**: `python: command not found`
```bash
# Use python3 instead
python3 --version
python3 -m venv venv
```

**Problem**: Virtual environment not activating
```bash
# Make sure you're in repo root
cd /path/to/seedwoc

# Try absolute path
source /full/path/to/seedwoc/venv/bin/activate
```

### Node.js Issues

**Problem**: `npm: command not found`
```bash
# Reinstall Node.js from https://nodejs.org
# Or use Homebrew: brew install node

# Verify
node --version
npm --version
```

---

## 📚 Learning Resources

### Built-in Documentation
- [FAQ.md](./FAQ.md) - Common questions
- [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Code quality guidelines
- [LEARNING_PATHS.md](./LEARNING_PATHS.md) - Choose your specialization
- [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute

### External Resources
Each chapter README includes external links to:
- Official documentation
- Tutorials and courses
- Reference materials
- Community resources

---

## ✅ Checklist: Ready to Start?

- [ ] Cloned repository
- [ ] Installed Git
- [ ] Created GitHub account
- [ ] Installed text editor (VS Code)
- [ ] Created assignment directory
- [ ] Read Chapter 1 README

---

## 🎯 Next Steps

1. **Read**: [LEARNING_PATHS.md](./LEARNING_PATHS.md)
2. **Choose**: Your specialization path
3. **Start**: Chapter 1: Version Control
4. **Complete**: First module exercises
5. **Submit**: Your first pull request
6. **Learn**: More chapters following your path

---

## 💬 Need Help?

- Check  [FAQ.md](./FAQ.md)
- Search [GitHub Issues](https://github.com/seedwoc/seedwoc/issues)
- Create new issue with clear question
- Ask in GitHub Discussions
- Reach out to community

---

**Welcome to SeedWOC! Let's grow together!** 🌱

