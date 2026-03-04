# Git Installation and Environment Setup

## Operating System Specific Guides

### Windows Installation

**Using Git for Windows (Recommended):**

1. Download from https://git-scm.com/download/win
2. Run installer
3. Choose defaults:
   - Install location (program files)
   - Components (all selected)
   - Start Menu folder
   - Default editor (choose your preferred editor)
   - Adjusting PATH: "Git from the command line and also from 3rd-party software"
   - HTTPS backend: "Use the native Windows Secure Channel library"
   - Line endings: "Checkout Windows-style, commit Unix-style" (CRLF/LF)
   - Terminal emulator: "Use MinTTY"
   - Default pull behavior: "Default (fast-forward or merge)"
   - Credential helper: "Git Credential Manager Core"

**Verify Installation:**
```bash
git --version
# Output: git version 2.40.0.windows.1
```

**Configure Git Bash:**
- Right-click desktop → Git Bash Here
- Or Open Command Prompt/PowerShell and type `git bash`

**Windows Terminal Setup (Better Experience):**
```
1. Install Windows Terminal from Microsoft Store
2. Add Git Bash profile:
   - Settings → Add a new profile
   - Name: Git Bash
   - Command line: C:\Program Files\Git\bin\bash.exe
   - Icon: C:\Program Files\Git\mingw64\share\git\git-for-windows.ico
   - Default profile: Set to Git Bash
```

---

### macOS Installation

**Using Homebrew (Recommended):**
```bash
# Install Homebrew if needed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Git
brew install git

# Verify
git --version
```

**Using Official Installer:**
```bash
# Download from https://git-scm.com/download/mac
# Run installer and follow prompts
# Xcode Command Line Tools also included
```

**Using Xcode:**
```bash
xcode-select --install
# Git included with Xcode Command Line Tools
```

---

### Linux Installation

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install git

# Verify
git --version
```

**Fedora/RHEL/CentOS:**
```bash
sudo dnf install git
# or
sudo yum install git

git --version
```

**Arch:**
```bash
sudo pacman -S git

git --version
```

---

## First-Time Configuration

### Global Configuration

**Set User Identity (REQUIRED):**
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Verify
git config --global --list
```

**Set Default Branch Name:**
```bash
# New repos use 'main' instead of 'master'
git config --global init.defaultBranch main
```

**Set Default Editor:**
```bash
# For Nano
git config --global core.editor "nano"

# For Vim
git config --global core.editor "vim"

# For Visual Studio Code
git config --global core.editor "code --wait"

# For VS Code Insider
git config --global core.editor "code-insiders --wait"

# For Sublime Text
git config --global core.editor "subl -w"
```

**Line Ending Configuration:**
```bash
# Windows: Convert to CRLF on checkout, LF on commit
git config --global core.autocrlf true

# macOS/Linux: Leave as-is
git config --global core.autocrlf input

# With .gitattributes file: normalize
git config --global core.autocrlf false
```

### View All Configuration

```bash
# All settings
git config --list

# Global only
git config --global --list

# Local (current repo)
git config --local --list

# Show file locations
git config --list --show-origin
```

### Configuration Files

**Global Config Location:**
```
Windows:   C:\Users\<username>\.gitconfig
macOS/Linux: ~/.gitconfig
```

**Edit Config File Directly:**
```bash
# Open in editor
git config --global --edit

# Manual edit
nano ~/.gitconfig
```

**Example .gitconfig:**
```ini
[user]
    name = Your Name
    email = you@example.com

[core]
    editor = code --wait
    autocrlf = input

[init]
    defaultBranch = main

[pull]
    rebase = false

[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = log --graph --oneline --all
```

---

## SSH Key Setup for GitHub

### Generate SSH Key

```bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "you@example.com"
# or for older systems
ssh-keygen -t rsa -b 4096 -C "you@example.com"

# When prompted:
# Enter file in which to save key: [Press Enter]
# Enter passphrase (optional): [Your secure passphrase]
# Confirm passphrase: [Repeat passphrase]

# Output shows:
# Generating public/private ed25519 key pair.
# Your identification has been saved in /home/user/.ssh/id_ed25519
# Your public key has been saved in /home/user/.ssh/id_ed25519.pub
```

### Add SSH Key to SSH Agent

**macOS/Linux:**
```bash
# Start SSH agent
eval "$(ssh-agent -s)"
# Output: Agent pid 12345

# Add key to agent (macOS)
ssh-add ~/.ssh/id_ed25519

# Add key to agent (Linux)
ssh-add ~/.ssh/id_ed25519

# List loaded keys
ssh-add -l
```

**Windows (Git Bash):**
```bash
# Start SSH agent
eval $(ssh-agent -s)

# Add key
ssh-add ~/.ssh/id_ed25519
```

**Windows (PowerShell as Admin):**
```powershell
# Enable SSH Agent service
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent

# Add key
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

### Add Public Key to GitHub

**Step 1: Copy Public Key**
```bash
# macOS
pbcopy < ~/.ssh/id_ed25519.pub

# Linux
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard

# Windows PowerShell
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard
```

**Step 2: Add to GitHub**
1. GitHub Settings → SSH and GPG keys
2. Click "New SSH key"
3. Title: "My MacBook" (or whatever device)
4. Key type: Authentication Key
5. Paste public key
6. Click "Add SSH key"

**Step 3: Verify Connection**
```bash
ssh -T git@github.com
# Output: Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## Git Credential Management

### Store Credentials Safely

**Using Git Credential Manager (Recommended):**
```bash
# Already included in Git for Windows
# For macOS/Linux:
brew tap microsoft/git
brew cask install git-credential-manager-core

# Configure Git to use it
git config --global credential.helper manager-core
```

**Using System Keychain (macOS):**
```bash
git config --global credential.helper osxkeychain
```

**Using Pass (Linux):**
```bash
# Install pass
sudo apt install pass

# Initialize
pass init your-gpg-key

# Configure Git
git config --global credential.helper pass
```

**NOT RECOMMENDED - Plain Text Storage:**
```bash
# Stores in: ~/.git-credentials
# Use only for testing
git config --global credential.helper store
```

---

## Proxy Configuration

**If Behind Corporate Proxy:**

```bash
# HTTP proxy
git config --global http.proxy http://proxy.example.com:8080

# HTTPS proxy
git config --global https.proxy https://proxy.example.com:8443

# With authentication
git config --global http.proxy http://user:pass@proxy.example.com:8080

# No proxy for certain domains
git config --global http.noProxy "github.com,gitlab.com"

# Test connection
git clone https://github.com/torvalds/linux.git test-repo
```

---

## IDE Integration

### Visual Studio Code

**Extensions:**
1. Install "Git Graph" (mhutchie.git-graph)
2. Install "GitLens" (eamodio.gitlens)

**Built-in Git Features:**
- Source Control view (Ctrl+Shift+G)
- View changes side-by-side
- Stage individual lines
- Commit with message
- Push/Pull from UI

### JetBrains IDEs (IntelliJ, WebStorm, etc.)

**Built-in Git Support:**
- Built-in Git client
- No extension needed
- VCS menu for Git operations
- Visual diff and merge
- Branch visualization

**Configuration:**
Settings → Version Control → Git
- Set Git executable path
- Configure SSH

### GitHub Desktop

**Features:**
- Visual Git client
- Easy branching and merging
- PR management
- Integrated editor (VS Code)

**Download:** https://github.com/apps/github-desktop

---

## Network Configuration

### Clone vs Fork vs Download

**HTTPS Cloning (Easiest):**
```bash
git clone https://github.com/torvalds/linux.git
# Works behind firewalls
# Need credentials on private repos
```

**SSH Cloning (Recommended with SSH Setup):**
```bash
git clone git@github.com:torvalds/linux.git
# Requires SSH key setup
# Better for repeated operations
# More secure
```

**GitHub CLI (Best Overall):**
```bash
# Install https://cli.github.com
gh auth login
# Choose HTTPS or SSH
# Automatically handles credentials

# Clone with gh
gh repo clone torvalds/linux
```

### Bandwidth Optimization

**Shallow Clone (Faster for Large Repos):**
```bash
# Get only recent history
git clone --depth 1 https://github.com/torvalds/linux.git

# Later get more history
git fetch --unshallow
```

**Partial Clone (Good Compromise):**
```bash
# Only get blobs as needed
git clone --filter=blob:none https://github.com/torvalds/linux.git
```

---

## System Requirements

**Minimum:**
- 100 MB disk space
- 256 MB RAM
- Reliable internet connection
- Text editor or IDE

**Recommended:**
- 1 GB disk space per project
- 2 GB RAM
- Fast internet connection
- Modern IDE (VS Code, JetBrains, etc.)

**Hardware-Specific Considerations:**

**Raspberry Pi / Low-Power Devices:**
```bash
# Lighter weight clone
git clone --depth 1 --single-branch https://github.com/...

# Use shallow copies
git fetch --depth 10

# Clean up
git gc --aggressive
```

**Slow Network (Satellite, Bad Wifi):**
```bash
# Increase timeout
git config --global http.connectTimeout 120

# Lower buffer
git config --global core.packedRefsTimeout 120

# Use compression
git config --global core.compression 9
```

