# Week 1: Exercise Guide - Step By Step

**This is your detailed walkthrough guide for Week 1 exercises.**

---

## 📌 Before You Start

**You need:**
- ✅ Computer with Windows, Mac, or Linux
- ✅ Git installed
- ✅ Text editor (VS Code recommended)
- ✅ 3-4 hours of time
- ✅ Your GitHub username and password ready

**What you'll do:**
1. Create a project folder
2. Initialize Git
3. Make 10 commits
4. Push to GitHub

---

## 🔧 Step 0: Verify Git Installation

Open your terminal/Git Bash and verify Git works:

### Windows Users:
```
1. Click Start Menu
2. Search for "Git Bash"
3. Click "Git Bash"
4. A terminal window opens
```

### Mac Users:
```
1. Open Spotlight (Cmd + Space)
2. Type "Terminal"
3. Press Enter
4. Terminal opens
```

### Linux Users:
```
1. Press Ctrl + Alt + T
2. Terminal opens
```

### All Users - Verify Git:
```bash
git --version
```

**Expected output:**
```
git version 2.39.2 (or higher)
```

If you get "command not found":
- Go back and install Git from https://git-scm.com

---

## ⚙️ Step 1: Configure Git (Do Once!)

This configuration is stored globally and used for all your projects.

```bash
# Set your name (use your real name)
git config --global user.name "John Doe"

# Set your email (important: must match GitHub email)
git config --global user.email "john@example.com"

# Verify configuration
git config --global --list
```

**Expected output (example):**
```
user.name=John Doe
user.email=john@example.com
... other settings ...
```

**Make note of these values - you'll need them for GitHub!**

---

## 📁 Step 2: Create Project Folder

```bash
# Navigate to where you want your project
# Option 1: Desktop
cd Desktop

# Option 2: Documents  
cd Documents

# Option 3: Your projects folder (recommended)
cd projects

# If projects folder doesn't exist, create it:
mkdir projects
cd projects

# Create your project folder
mkdir git-practice-seedwoc
cd git-practice-seedwoc

# Verify you're in the right place
pwd
# Should output something like: /Users/john/projects/git-practice-seedwoc
```

---

## 🌳 Step 3: Initialize Git Repository

You're now in your project folder. Initialize Git:

```bash
# Initialize Git
git init

# Verify it worked
git status
```

**Expected output:**
```
On branch master

No commits yet

nothing to commit
```

**What just happened:**
- A hidden `.git` folder was created
- Git is now tracking this folder
- Any changes will be tracked

---

## 📝 Step 4: Create Project Files

Let's create the files for our project:

```bash
# Create HTML file
touch index.html

# Create CSS file
touch style.css

# Create JavaScript file
touch script.js

# Create assets folder
mkdir assets

# Create README
touch README.md

# Create .gitignore
touch .gitignore

# List all files to verify
ls -la
```

**Expected output:**
```
total 24
drwxr-xr-x   8 john  staff   256 Feb 23 10:00 .
drwxr-xr-x  20 john  staff   640 Feb 23 09:59 ..
drwxr-xr-x  13 john  staff   416 Feb 23 10:00 .git
drwxr-xr-x   2 john  staff    64 Feb 23 10:00 assets
-rw-r--r--   1 john  staff     0 Feb 23 10:00 .gitignore
-rw-r--r--   1 john  staff     0 Feb 23 10:00 README.md
-rw-r--r--   1 john  staff     0 Feb 23 10:00 index.html
-rw-r--r--   1 john  staff     0 Feb 23 10:00 script.js
-rw-r--r--   1 john  staff     0 Feb 23 10:00 style.css
```

---

## ✅ Step 5: Check Git Status

Before each commit, check the status:

```bash
git status
```

**You'll see:**
```
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore
        README.md
        index.html
        script.js
        style.css
        assets/

nothing added to commit but untracked files will be shown
```

**Untracked files** = Files Git sees but isn't tracking yet

---

## 🎯 COMMITS 1-10: The Main Exercises

Now let's make 10 commits as required:

---

### 📌 COMMIT 1: Initial Commit with README

**Step 1a: Add content to README.md**

Open README.md in your text editor (VS Code recommended):

```markdown
# My First GitHub Project

Welcome to my seedwoc Week 1 project!

## About This Project

This is my first project where I learned:
- Git fundamentals
- Version control
- GitHub collaboration
- Making meaningful commits

## Project Structure

- `index.html` - Main HTML file
- `style.css` - Project styling
- `script.js` - JavaScript code
- `assets/` - Images and resources
- `README.md` - Project documentation

## Author

Created during seedwoc weekend program.

## Getting Started

1. Clone this repository
2. Open `index.html` in a browser
3. Check the browser console for messages

## Skills Learned

✅ Git initialization
✅ Making commits
✅ Branching
✅ Merging
✅ Pushing to GitHub
```

Save the file.

**Step 1b: Add content to .gitignore**

Open `.gitignore`:

```
# Node modules (optional, for future projects)
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
```

Save the file.

**Step 1c: Stage the files**

```bash
git add README.md
git add .gitignore

# Or add all at once:
git add .

# Check status
git status
```

**Expected output:**
```
On branch master

No commits yet

Changes to be committed:
  (use "rm --cached <file>..." to unstage)
        new file:   .gitignore
        new file:   README.md
        ... other files ...
```

**Step 1d: Create first commit**

```bash
git commit -m "Initial commit with README and gitignore"

# View the commit
git log --oneline
```

**Expected output:**
```
abc1234 Initial commit with README and gitignore
```

✅ **COMMIT 1 COMPLETE!**

---

### 📌 COMMIT 2: Add HTML Structure

**Step 2a: Add HTML content**

Open `index.html` and add:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome to My First Project</h1>
  <p>Created during seedwoc Week 1 - Git & GitHub Basics</p>
  
  <script src="script.js"></script>
</body>
</html>
```

Save the file.

**Step 2b: Stage and commit**

```bash
git add index.html

#Check status
git status

# Commit
git commit -m "Add HTML structure and title"

# View commits
git log --oneline
```

**Expected output:**
```
def5678 Add HTML structure and title
abc1234 Initial commit with README and gitignore
```

✅ **COMMIT 2 COMPLETE!**

---

### 📌 COMMIT 3: Add CSS Styling

**Step 3a: Add CSS content**

Open `style.css` and add:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
  line-height: 1.6;
  min-height: 100vh;
}

h1 {
  color: white;
  font-size: 2.5rem;
  margin: 20px 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
  color: white;
  font-size: 1.1rem;
  margin-bottom: 20px;
}
```

Save the file.

**Step 3b: Stage and commit**

```bash
git add style.css

git commit -m "Add CSS styling and gradient background"

git log --oneline
```

**Expected output:**
```
ghi9012 Add CSS styling and gradient background
def5678 Add HTML structure and title
abc1234 Initial commit with README and gitignore
```

✅ **COMMIT 3 COMPLETE!**

---

### 📌 COMMIT 4: Add JavaScript

**Step 4a: Add JavaScript content**

Open `script.js` and add:

```javascript
// Welcome message
console.log("👋 Welcome to my seedwoc project!");
console.log("📚 Learning Git and GitHub");
console.log("🚀 Ready to collaborate!");

// Get current date
const today = new Date();
console.log(`📅 Today is: ${today.toLocaleDateString()}`);

// Simple greeting
const greeting = document.querySelector('h1');
if (greeting) {
  greeting.addEventListener('click', function() {
    alert('Thanks for visiting my project! 🎉');
  });
}
```

Save the file.

**Step 4b: Stage and commit**

```bash
git add script.js

git commit -m "Add JavaScript with console messages and interactions"

git log --oneline
```

**Expected output:**
```
jkl3456 Add JavaScript with console messages and interactions
ghi9012 Add CSS styling and gradient background
def5678 Add HTML structure and title
abc1234 Initial commit with README and gitignore
```

✅ **COMMIT 4 COMPLETE!**

---

### 📌 COMMIT 5: Update HTML with More Content

**Step 5a: Update HTML**

Modify `index.html` to add more content:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <main>
    <h1>Welcome to My First Project</h1>
    <p>Created during seedwoc Week 1 - Git & GitHub Basics</p>
    
    <section id="about">
      <h2>About This Project</h2>
      <p>This is my first GitHub project where I'm learning version control and collaboration.</p>
    </section>

    <section id="features">
      <h2>Features</h2>
      <ul>
        <li>Version control with Git</li>
        <li>Collaboration on GitHub</li>
        <li>10 meaningful commits</li>
        <li>Branching and merging</li>
      </ul>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 My First Project. Created during seedwoc.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

Save the file.

**Step 5b: Stage and commit**

```bash
git add index.html

git commit -m "Add navigation, sections, and footer to HTML"

git log --oneline
```

**Expected output:**
```
mno7890 Add navigation, sections, and footer to HTML
jkl3456 Add JavaScript with console messages and interactions
ghi9012 Add CSS styling and gradient background
def5678 Add HTML structure and title
abc1234 Initial commit with README and gitignore
```

✅ **COMMIT 5 COMPLETE!**

---

### 📌 COMMIT 6: Create Feature Branch and Add Footer Styles

**Step 6a: Create a new branch**

```bash
# Create and switch to new branch in one command
git checkout -b feature/improve-styling

# Verify you're on new branch
git branch
# Should show:
# * feature/improve-styling
#   master
```

**Step 6b: Update CSS with styling for new elements**

Open `style.css` and add at the end:

```css
nav {
  background-color: rgba(0,0,0,0.3);
  padding: 15px;
  position: sticky;
  top: 0;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: opacity 0.3s;
}

nav a:hover {
  opacity: 0.8;
}

main {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

section {
  margin: 30px 0;
  padding: 20px;
  border-left: 4px solid #667eea;
}

h2 {
  color: #667eea;
  margin-top: 20px;
}

ul {
  margin-left: 20px;
}

li {
  margin: 10px 0;
}

footer {
  background-color: rgba(0,0,0,0.5);
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
}
```

Save the file.

**Step 6c: Stage and commit (on feature branch)**

```bash
git add style.css

git commit -m "Add improved styling for navigation, sections, and footer"

git log --oneline
```

**Expected output:**
```
pqr4321 Add improved styling for navigation, sections, and footer
mno7890 Add navigation, sections, and footer to HTML
jkl3456 Add JavaScript with console messages and interactions
ghi9012 Add CSS styling and gradient background
def5678 Add HTML structure and title
abc1234 Initial commit with README and gitignore
```

✅ **COMMIT 6 COMPLETE!**

---

### 📌 COMMIT 7: Add More JavaScript Features on Feature Branch

**Step 7a: Enhance JavaScript**

Open `script.js` and modify to:

```javascript
// Welcome message
console.log("👋 Welcome to my seedwoc project!");
console.log("📚 Learning Git and GitHub");
console.log("🚀 Ready to collaborate!");

// Get current date
const today = new Date();
console.log(`📅 Today is: ${today.toLocaleDateString()}`);

// Simple greeting
const greeting = document.querySelector('h1');
if (greeting) {
  greeting.addEventListener('click', function() {
    alert('Thanks for visiting my project! 🎉');
  });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Page load message
window.addEventListener('load', function() {
  console.log('✅ Page fully loaded!');
  console.log('📌 This is my seedwoc Week 1 project');
  console.log('💡 I\'ve made 7 commits so far!');
});
```

Save the file.

**Step 7b: Stage and commit (still on feature branch)**

```bash
git add script.js

git commit -m "Add smooth scrolling and page load features"

git log --oneline
```

**Expected output:**
```
stu5654 Add smooth scrolling and page load features
pqr4321 Add improved styling for navigation, sections, and footer
mno7890 Add navigation, sections, and footer to HTML
jkl3456 Add JavaScript with console messages and interactions
ghi9012 Add CSS styling and gradient background
def5678 Add HTML structure and title
abc1234 Initial commit with README and gitignore
```

✅ **COMMIT 7 COMPLETE!**

---

### 📌 COMMIT 8: Merge Feature Branch to Master

**Step 8a: Switch to master branch**

```bash
git checkout master
# or
git switch master

# Verify you're on master
git branch
# Should show:
# * master
#   feature/improve-styling
```

**Step 8b: Merge feature branch**

```bash
# Merge the feature branch
git merge feature/improve-styling

# View the merge
git log --oneline
```

**Expected output:**
```
stu5654 Add smooth scrolling and page load features
pqr4321 Add improved styling for navigation, sections, and footer
mno7890 Add navigation, sections, and footer to HTML
jkl3456 Add JavaScript with console messages and interactions
ghi9012 Add CSS styling and gradient background
def5678 Add HTML structure and title
abc1234 Initial commit with README and gitignore
```

**Step 8c: Delete the feature branch (optional but good practice)**

```bash
git branch -d feature/improve-styling

# Verify it's deleted
git branch
# Should only show:
# * master
```

✅ **COMMIT 8 COMPLETE! (Merge counts as activity)**

---

### 📌 COMMIT 9: Add More Features

**Step 9a: Create a contact section**

Open `index.html` and find the footer section. Add before the footer:

```html
    <section id="contact">
      <h2>Contact Me</h2>
      <p>I'm learning Git and GitHub!</p>
      <form>
        <input type="email" placeholder="Your email" required>
        <textarea placeholder="Your message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
```

Save the file.

**Step 9b: Add form styling to CSS**

Open `style.css` and add:

```css
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
}

input, textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: inherit;
}

button {
  padding: 10px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #764ba2;
}
```

Save the file.

**Step 9c: Stage and commit**

```bash
git add index.html
git add style.css

git commit -m "Add contact form section with styling"

git log --oneline
```

**Expected output:**
```
vwx8765 Add contact form section with styling
stu5654 Add smooth scrolling and page load features
pqr4321 Add improved styling for navigation, sections, and footer
mno7890 Add navigation, sections, and footer to HTML
jkl3456 Add JavaScript with console messages and interactions
ghi9012 Add CSS styling and gradient background
def5678 Add HTML structure and title
abc1234 Initial commit with README and gitignore
```

✅ **COMMIT 9 COMPLETE!**

---

### 📌 COMMIT 10: Final Polish and Documentation

**Step 10a: Update README with more details**

Open `README.md` and update:

```markdown
# My First GitHub Project

Welcome to my seedwoc Week 1 project!

## About This Project

This is my first GitHub project where I learned:
- Git fundamentals and commands
- Version control workflows
- GitHub collaboration
- Making meaningful commits (10 commits total!)
- Branching and merging
- Pushing code to GitHub

## Project Structure

```
git-practice-seedwoc/
├── index.html       # Main HTML file
├── style.css        # Project styling
├── script.js        # JavaScript features
├── README.md        # This file
├── .gitignore       # Files to ignore
└── assets/          # Images and resources
```

## Features

✅ Responsive design
✅ Navigation menu with smooth scrolling
✅ Contact form
✅ Modern gradient background
✅ JavaScript interactions
✅ Well-organized code

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Git & GitHub

## Getting Started

### Prerequisites
- A modern web browser
- Git installed on your machine

### Steps to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/git-practice-seedwoc.git
   ```

2. Navigate to the project:
   ```bash
   cd git-practice-seedwoc
   ```

3. Open index.html in your browser:
   ```bash
   open index.html  # Mac
   start index.html # Windows
   ```

### View in Browser
Simply open `index.html` with any modern web browser.

## How I Made 10 Commits

1. **Commit 1:** Initial commit with README and gitignore
2. **Commit 2:** Add HTML structure and title
3. **Commit 3:** Add CSS styling and gradient background
4. **Commit 4:** Add JavaScript with console messages
5. **Commit 5:** Add navigation, sections, and footer
6. **Commit 6:** Add improved styling (feature branch)
7. **Commit 7:** Add smooth scrolling features
8. **Commit 8:** Merge feature branch
9. **Commit 9:** Add contact form
10. **Commit 10:** Final documentation and polish

## Learning Journey - Week 1

### What I Learned:
- ✅ Setting up Git locally
- ✅ Initializing repositories
- ✅ Staging changes with `git add`
- ✅ Creating commits with meaningful messages
- ✅ Viewing commit history with `git log`
- ✅ Creating feature branches
- ✅ Merging branches
- ✅ Pushing code to GitHub
- ✅ Understanding distributed version control
- ✅ Bash terminal basics

### Key Commands I Used:
```bash
git init                    # Initialize repository
git add <file>             # Stage changes
git commit -m "message"    # Create commit
git branch <name>          # Create branch
git checkout <branch>      # Switch branch
git merge <branch>         # Merge branch
git push origin main       # Push to GitHub
git log --oneline          # View commits
```

## Next Steps (Week 2+)

- [ ] Learn about pull requests
- [ ] Collaborate with other developers
- [ ] Learn advanced Git concepts
- [ ] Deploy project to GitHub Pages
- [ ] Build more projects

## Author

Created during **seedwoc Weekend of Code Program**
- 📍 Location: Online
- 📅 Date: February 23-24, 2024
- 🎓 Program: seedwoc Week 1 - Git & GitHub Fundamentals

## License

This project is open source and available under the MIT License.

## Contact

Have questions? Feel free to:
- Create an issue in this repository
- Email me (add email if desired)
- Check my GitHub profile

---

## Commit History

To see all 10 commits:
```bash
git log --oneline --graph
```

## Acknowledgments

Thanks to the seedwoc program for this learning opportunity! 🙏

**Created with ❤️ while learning Git & GitHub**
```

Save the file.

**Step 10b: Stage and commit**

```bash
git add README.md

git commit -m "Complete documentation and final polish"

git log --oneline
```

**Expected output:**
```
yza9876 Complete documentation and final polish
vwx8765 Add contact form section with styling
stu5654 Add smooth scrolling and page load features
pqr4321 Add improved styling for navigation, sections, and footer
mno7890 Add navigation, sections, and footer to HTML
jkl3456 Add JavaScript with console messages and interactions
ghi9012 Add CSS styling and gradient background
def5678 Add HTML structure and title
abc1234 Initial commit with README and gitignore
```

✅ **COMMIT 10 COMPLETE! 🎉**

---

## ✅ Verify All 10 Commits

Before pushing to GitHub, verify you have exactly 10 commits:

```bash
git log --oneline
```

**Count the commits** - should be exactly 10!

You can also see a nice graph:

```bash
git log --oneline --graph --all
```

---

## 🌐 Step 11: Push to GitHub

### Step 11a: Create GitHub Repository

1. Go to https://github.com
2. Sign in to your account
3. Click the **+** icon in top right
4. Select "New repository"
5. Name it: `git-practice-seedwoc`
6. Add description: "My first GitHub project from seedwoc Week 1"
7. Choose **Public** (so others can see it)
8. **Skip** "Initialize with README" (we already have one)
9. Click "Create repository"

### Step 11b: Connect Local to GitHub

GitHub will show you commands. Follow them exactly:

```bash
# These commands connect your local repo to GitHub
git remote add origin https://github.com/YOUR-USERNAME/git-practice-seedwoc.git

# Rename branch to main (GitHub default)
git branch -M main

# Push all commits to GitHub
git push -u origin main
```

**Replace YOUR-USERNAME with your actual GitHub username!**

### Step 11c: Verify Push

```bash
# Check remote is connected
git remote -v

# Should show:
# origin  https://github.com/YOUR-USERNAME/git-practice-seedwoc.git (fetch)
# origin  https://github.com/YOUR-USERNAME/git-practice-seedwoc.git (push)
```

### Step 11d: View on GitHub

1. Go to GitHub.com
2. Go to your repositories
3. Click on `git-practice-seedwoc`
4. **You should see all your files!**
5. Click "Commits" tab
6. **You should see all 10 commits!**

---

## 🎉 SUCCESS!

You should now have:

✅ A local Git repository with 10 commits
✅ A GitHub account
✅ A public repository on GitHub
✅ All code pushed to GitHub
✅ All 10 commits visible on GitHub
✅ Complete project documentation
✅ A portfolio piece to show employers!

---

## 📋 Troubleshooting Guide

### Problem: "Git command not found"
**Solution:** Git isn't installed. Download from https://git-scm.com

### Problem: "fatal: not a git repository"
**Solution:** You're not in the project folder. Run `git init` first.

### Problem: "Permission denied" when pushing
**Solution:** Check your GitHub credentials. May need to use personal access token instead of password.

### Problem: "branch 'master' set up to track remote 'origin/main'"
**Solution:** This is normal! GitHub uses 'main' as default branch now.

### Problem: "The file will have its original line endings"
**Solution:** This is fine, just press Enter. It's about Windows vs Unix line endings.

### Problem: Can't see repository on GitHub
**Solution:**
1. Refresh the page
2. Check you're logged in
3. Check you pushed to correct branch
4. Run `git push -u origin main` again

### Problem: Forgot a file in a commit
**Solution:**
```bash
git add forgotten-file.txt
git commit --amend    # This adds to last commit
```

### Problem: Made a typo in commit message
**Solution:**
```bash
git commit --amend -m "Corrected message"
```

### Problem: Accidentally committed to wrong branch
**Solution:**
```bash
# Create new branch from your commits
git checkout -b correct-branch

# Go back to original
git checkout original
git reset --hard origin/original
```

### Problem: "authentication failed"
**Solution:** Use GitHub Personal Access Token instead of password:
1. Go to github.com → Settings → Developer Settings → Personal Access Tokens
2. Generate new token with 'repo' scope
3. Use token when prompted for password

---

## 🚀 Next Steps After Completing Week 1

1. **Show your work:**
   - Share GitHub link with friends
   - Add to resume/portfolio
   - Show to potential employers

2. **Keep learning:**
   - Complete Week 2 exercises
   - Make more projects
   - Study advanced Git concepts

3. **Help others:**
   - Explain Git to classmates
   - Help teammates with GitHub
   - Share what you learned

4. **Explore Git more:**
   - Learn pull requests
   - Study collaborative workflows
   - Experiment with branches

---

## 📚 Useful Links

- **Git Documentation:** https://git-scm.com/doc
- **GitHub Learning Lab:** https://github.com/skills
- **Git Visualizer:** https://git-school.github.io/visualizing-git/
- **Learn Git Branching:** https://learngitbranching.js.org/
- **GitHub Docs:** https://docs.github.com
- **Bash Cheat Sheet:** https://devhints.io/bash

---

## ✨ Celebration Checklist

When you've completed everything:

- [ ] 10 commits made locally
- [ ] All commits visible in `git log`
- [ ] Pushed to GitHub
- [ ] Repository visible on GitHub.com
- [ ] All 10 commits visible on GitHub
- [ ] README is complete
- [ ] Files look good on GitHub
- [ ] You can see file contents on GitHub
- [ ] Project is public
- [ ] You can share the link

---

**Congratulations! You've completed seedwoc Week 1! 🎓🚀**

You now understand:
- Version control systems
- Git fundamentals  
- GitHub collaboration
- Professional development practices

**Keep coding! The best is yet to come! 💪**
