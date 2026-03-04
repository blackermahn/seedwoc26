# SeedWOC Recommended Tools and Software

**Version:** 1.0  
**Last Updated:** March 2024

---

## Essential Development Tools

### Code Editors/IDEs

| Tool | Best For | Cost | Platform |
|------|----------|------|----------|
| **VS Code** | General development | Free | All |
| **JetBrains Suite** | Professional IDEs | Paid/Free | All |
| **Sublime Text** | Lightweight editing | Freemium | All |
| **Vim/Neovim** | Terminal editing | Free | All |

**Recommendation:** Start with VS Code - balances simplicity with power.

### Version Control

| Tool | Purpose |
|------|---------|
| **Git** | Version control system (essential) |
| **GitHub** | Repository hosting & collaboration |
| **GitKraken** | Git client (visual) |
| **Sourcetree** | Git client (visual) |

**Setup:** [See SETUP_GUIDE.md](/docs/SETUP_GUIDE.md)

### Package Managers

**JavaScript:**
- `npm` - Node Package Manager (comes with Node.js)
- `yarn` - Alternative package manager
- `pnpm` - Fast package manager

**Python:**
- `pip` - Python package installer
- `conda` - Scientific package manager
- `poetry` - Poetry package manager

**System:**
- **Windows:** Chocolatey, Winget
- **Mac:** Homebrew
- **Linux:** apt, yum, pacman (OS-dependent)

---

## Programming Environment Setup

### Node.js Ecosystem

**Required:**
- Node.js (v16+ recommended)
- npm or yarn

**Useful packages:**
- `nvm` - Node Version Manager
- `npx` - Execute packages without install
- `nodemon` - Auto-restart development server

### Python Ecosystem

**Required:**
- Python 3.8+
- pip

**Virtual environments:**
- `venv` - Built-in (recommended)
- `virtualenv` - Extended version
- `conda` - For scientific computing
- `pyenv` - Python version manager

**Usage:**
```bash
# Create virtual environment
python -m venv env

# Activate
source env/bin/activate  # Mac/Linux
env\Scripts\activate     # Windows

# Deactivate
deactivate
```

### Database Tools

**SQL Databases:**
- **MySQL:** MySQL Workbench
- **PostgreSQL:** pgAdmin, DBeaver
- **SQLite:** DB Browser for SQLite

**NoSQL:**
- **MongoDB:** MongoDB Compass
- **Firebase:** Firebase Console

---

## Popular Development Tools by Chapter

### Chapter 1 - Version Control
```
Essential:
- Git
- GitHub account
- SSH keys

Optional:
- GitHub Desktop
- GitKraken
- git-flow extensions
```

### Chapter 2-3 - JavaScript
```
Essential:
- Node.js & npm
- VS Code
- Browser DevTools

Extensions:
- ES7+ Snippets
- Prettier
- ESLint
- Thunder Client

Tools:
- Postman (API testing)
- Insomnia (API testing)
- Jest (testing)
```

### Chapter 4 - Python
```
Essential:
- Python 3.8+
- pip
- Virtual environment

IDEs:
- VS Code + Python extension
- PyCharm Community
- JupyterLab

Tools:
- Black (formatter)
- Flake8 (linter)
- Pytest (testing)
```

### Chapter 5 - Dart
```
Essential:
- Dart SDK
- Flutter SDK (related)

Tools:
- DartPad (online editor)
- Dart DevTools
- Android Studio / VS Code

Extensions:
- Dart extension (VS Code)
```

### Chapter 6 - React
```
Essential:
- Node.js
- React DevTools

Tools:
- Create React App or Vite
- Redux DevTools
- Axios (HTTP client)
- React Router

Testing:
- Jest
- React Testing Library
```

### Chapter 7 - Angular
```
Essential:
- Node.js
- Angular CLI
- TypeScript

IDEs:
- VS Code
- WebStorm
- Angular DevTools

Tools:
- RxJS
- Redux DevTools
- Karma (testing runner)
- Protractor / Cypress (E2E)
```

### Chapter 8 - Node.js/Express
```
Essential:
- Node.js
- npm/yarn

Tools:
- Postman / Insomnia (API testing)
- Thunder Client
- MongoDB Compass (if using MongoDB)
- pgAdmin (if using PostgreSQL)

Libraries:
- Sequelize (SQL ORM)
- Mongoose (MongoDB ODM)
- Express
```

### Chapter 9 - Django
```
Essential:
- Python 3.8+
- pip
- Virtual environment

Tools:
- Django Shell
- Django Admin
- Postman / Insomnia
- DBeaver (database)

Extensions:
- Django extensions
- Django Debug Toolbar
```

### Chapter 10-13 - ML/AI
```
Essential:
- Python 3.8+
- pip / conda
- Jupyter Notebooks

Tools:
- Google Colab (free GPU)
- Jupyter Lab
- scikit-learn
- TensorFlow / PyTorch
- Pandas
- Matplotlib / Seaborn

Advanced:
- Weights & Biases
- TensorBoard
- Kaggle
```

### Chapter 14 - Cybersecurity
```
Essential:
- Linux terminal
- OpenSSL

Tools:
- Wireshark (network analysis)
- Burp Suite Community
- OWASP ZAP
- Kali Linux VM
- John the Ripper
- Metasploit
- Nmap

Practice:
- TryHackMe
- HackTheBox
```

### Chapter 15 - Arduino
```
Hardware:
- Arduino board (Uno recommended)
- USB cable
- Breadboard
- Components (LEDs, resistors, sensors)

Software:
- Arduino IDE
- VS Code + Arduino extension

Resources:
- Arduino Create
- Arduino Project Hub
```

### Chapter 16-17 - C/C++
```
Essential:
- GCC or Clang
- Make

IDEs:
- VS Code
- CodeBlocks
- CLion
- Qt Creator

Tools:
- GDB (debugger)
- Valgrind (memory checking)
- CMake (build system)
- Gprof (profiling)
```

---

## Browser Tools and Extensions

### Essential Browser Extensions

| Extension | Purpose | Browser |
|-----------|---------|---------|
| React DevTools | Debug React apps | Chrome, Firefox |
| Redux DevTools | State management debugging | Chrome |
| Vue DevTools | Vue debugging | Chrome, Firefox |
| Angular DevTools | Angular debugging | Chrome |
| Web Developer | General web dev tools | All |
| JSON Viewer | Pretty print JSON | All |

### DevTools Tips

- **Console:** JavaScript execution and debugging
- **Network:** Monitor HTTP requests
- **Elements:** DOM inspection
- **Performance:** Profile application speed
- **Application:** LocalStorage, IndexedDB inspection

---

## Terminal/Shell Tools

### Essential Commands

```bash
# File navigation
cd, ls, pwd, mkdir, rm, cp, mv

# Git commands
git clone, git add, git commit, git push, git pull

# Process management
ps, kill, top, htop

# Package management
npm, pip, brew, apt

# Network
curl, wget, telnet, netstat

# Text manipulation
grep, sed, awk, sort, uniq

# Utilities
nano, vim, cat, echo, chmod
```

### Recommended Shell Tools

- **Shell:** zsh, fish, bash
- **Terminal Multiplexer:** tmux, screen
- **Package Manager:** Homebrew (Mac), scoop/chocolatey (Windows)
- **CLI Tools:**
  - `httpie` - HTTP client
  - `jq` - JSON processor
  - `exa` - Modern ls
  - `ripgrep` - Fast search
  - `bat` - Better cat

---

## Containerization and Deployment

### Docker

```bash
# Install Docker Desktop
# Mac/Windows: Docker Desktop
# Linux: Docker Engine

# Basic commands
docker run, docker build, docker compose
```

### Cloud Platforms

| Platform | Best For | Free Tier |
|----------|----------|-----------|
| **Heroku** | Simple app hosting | Limited |
| **AWS** | Enterprise scale | 1 year free |
| **Google Cloud** | AI/ML services | $300 credit |
| **Azure** | Microsoft ecosystem | $200 credit |
| **DigitalOcean** | Simplicity | None |
| **Netlify** | Static/frontend | Generous |
| **Vercel** | Next.js/frontend | Generous |
| **Railway** | Simplicity | $5/month |

---

## Productivity and Collaboration

### Documentation

- **Markdown:** README files
- **Documentation generators:**
  - `Docusaurus` - React-based
  - `MkDocs` - Python-based
  - `Sphinx` - Python documentation
  - `Jekyll` - GitHub Pages

### Collaboration Tools

- **Version Control:** Git/GitHub
- **Communication:** Discord, Slack
- **Project Management:** GitHub Projects, Jira, Trello
- **Shared Documents:** Google Docs, Notion

### Time Management

- **Pomodoro Timer:** Focus on deep work
- **Task Managers:** Todoist, Microsoft To Do
- **Calendar:** Google Calendar, Outlook

---

## Learning Resources

### Online Platforms

- **FreeCodeCamp:** Free comprehensive courses
- **Udemy:** Affordable courses
- **Coursera:** University-level courses
- **Pluralsight:** Developer-focused
- **edX:** University partnerships

### Code Practice

- **LeetCode:** Algorithm practice
- **HackerRank:** Coding challenges
- **Codewars:** Skill-building
- **Exercism:** Language learning
- **Project Euler:** Mathematics + coding

### Documentation

- **MDN Web Docs:** Best web documentation
- **Official docs:** Language/framework docs
- **StackOverflow:** Q&A help
- **GitHub:** Code examples

---

## System Requirements

### Minimum Specs

- **Processor:** Dual-core 2GHz+
- **RAM:** 4GB (8GB+ recommended)
- **Storage:** 50GB+ free space
- **Display:** 1080p recommended

### Recommended Specs

- **Processor:** Quad-core 2.5GHz+
- **RAM:** 16GB+
- **Storage:** 256GB+ SSD
- **GPU:** For ML chapters (optional)

### Operating Systems

- **Windows 10/11:** Supported
- **macOS 10.15+:** Supported
- **Linux (Ubuntu 18.04+):** Recommended for servers

---

## Free vs Paid Tools

### Always Free (No Premium Needed)

- VS Code
- Git/GitHub
- Python
- Node.js
- Linux
- Audacity (audio)
- GIMP (image editing)
- Blender (3D)

### Free with Optional Premium

- GitHub (free tier sufficient)
- Firebase (limited free)
- Heroku (no free tier anymore, but paid is reasonable)
- MongoDB (free tier exists)

### Worth the Cost

- JetBrains IDEs (professional development)
- Paid courses (quality education)
- Upgraded hosting (performance)

---

## Tool Installation Guides

See [SETUP_GUIDE.md](/docs/SETUP_GUIDE.md) for:
- Step-by-step installation
- Platform-specific instructions
- Configuration guides
- Troubleshooting

---

## First-Time Setup Checklist

- [ ] Install Git
- [ ] Create GitHub account
- [ ] Install VS Code
- [ ] Install Node.js and npm
- [ ] Install Python
- [ ] Configure SSH keys
- [ ] Test git commands
- [ ] Create first repository
- [ ] Read SETUP_GUIDE.md

---

## Staying Current

### Follow These for Updates

- **Release Notes:** Check official docs
- **GitHub:** Watch projects and releases
- **Newsletters:** Dev newsletters (JavaScript Weekly, Python Weekly)
- **Conferences:** Virtual tech conferences
- **Podcasts:** Developer podcasts
- **Blogs:** Developer blogs

---

## Support

Need help choosing tools?

1. Check project requirements
2. Try free options first
3. Ask in community discussions
4. Check tool documentation
5. Experiment locally before committing

---

**Happy Coding! 🚀**

