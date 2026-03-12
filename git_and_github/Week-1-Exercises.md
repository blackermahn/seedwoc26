# Week 1: Git & GitHub Exercises

**Difficulty:** Beginner | **Time Required:** 4-6 hours | **Focus:** Hands-on Git practice

---

## 📝 Important Note

See **Week-1-Exercise-Guide.md** for detailed step-by-step instructions on how to complete these exercises!

---

## Exercise 1: Git Installation and Setup

**Objective:** Set up Git on your machine and configure it.

**Tasks:**
1. Install Git on your operating system
2. Verify Git installation
3. Configure your name and email globally
4. Verify your configuration
5. Take a screenshot showing configuration output

**Expected Result:**
```
Your name appears in git config --global --list
Your email appears in git config --global --list
```

---

## Exercise 2: Bash Terminal Practice

**Objective:** Get comfortable with bash commands.

**Tasks:**
1. Open Terminal/Git Bash on your computer
2. Navigate to your Desktop
3. Create a folder named `git-practice`
4. Navigate into that folder
5. Create three files: `index.html`, `style.css`, `script.js`
6. Create a folder named `assets`
7. List all files and folders
8. Go back to parent directory
9. List contents of git-practice folder from parent
10. Navigate back to git-practice folder

**Commands to use:**
```bash
pwd, cd, mkdir, touch, ls, cd ..
```

**Expected Result:**
```
/path/to/git-practice/
├── index.html
├── style.css
├── script.js
└── assets/
```

---

## Exercise 3: Initialize Git Repository

**Objective:** Create your first Git repository.

**Tasks:**
1. Go to your git-practice folder
2. Initialize a git repository
3. Check git status
4. Create a README.md file with project title
5. Create a .gitignore file
6. Check status again
7. View the hidden .git folder

**Expected Result:**
```
✅ .git folder exists
✅ git status shows untracked files
✅ README.md contains project title
```

---

## Exercise 4: Making Your First Commit (Commit 1)

**Objective:** Create your first commit.

**Tasks:**
1. Stage the README.md file
2. Check status
3. Create first commit with message "Initial commit with README"
4. View commit log
5. View the actual changes

**Expected Result:**
```
✅ git log shows your first commit
✅ Commit message is clear and descriptive
```

---

## Exercise 5: Adding Files and Committing (Commits 2-5)

**Objective:** Add initial project files and create multiple commits.

**Make 4 commits by doing the following:**

**Commit 2: Add HTML Structure**
- Add content to `index.html`:
  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <title>My First Project</title>
  </head>
  <body>
    <h1>Welcome to My Project</h1>
  </body>
  </html>
  ```
- Commit message: "Add HTML structure and title"

**Commit 3: Add CSS Styling**
- Add content to `style.css`:
  ```css
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
  }
  h1 {
    color: #333;
  }
  ```
- Commit message: "Add basic CSS styling"

**Commit 4: Add JavaScript**
- Add content to `script.js`:
  ```javascript
  console.log("Welcome to my project!");
  ```
- Commit message: "Add JavaScript console message"

**Commit 5: Update README with instructions**
- Add to README.md:
  ```markdown
  # My First Project

  This is my first GitHub project created during seedwoc Week 1.

  ## How to Run
  1. Open index.html in a browser
  2. Check the browser console

  ## Files
  - index.html - Main HTML file
  - style.css - Styling
  - script.js - JavaScript code
  ```
- Commit message: "Update README with project details"

**Expected Result:**
```
✅ 5 commits total (including initial)
✅ All files tracked
✅ Clear commit messages
✅ View with: git log --oneline
```

---

## Exercise 6: Branching Practice (Commits 6-7)

**Objective:** Create and work on a feature branch.

**Tasks:**

**Create Feature Branch:**
1. Create a new branch: `feature/add-footer`
2. Switch to the new branch
3. Check current branch

**Commit 6: Add Footer HTML**
- Modify `index.html` to add:
  ```html
  <footer>
    <p>&copy; 2024 My First Project. All rights reserved.</p>
  </footer>
  ```
- Commit message: "Add footer HTML"

**Commit 7: Style Footer**
- Add to `style.css`:
  ```css
  footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 20px;
  }
  ```
- Commit message: "Add footer styling"

**Expected Result:**
```
✅ Branch created: feature/add-footer
✅ 2 new commits on feature branch
✅ View with: git log --oneline
```

---

## Exercise 7: Merging Branches (Commit 8)

**Objective:** Merge a feature branch back to main.

**Tasks:**
1. Switch back to main branch
2. Merge the feature branch
3. View commit log to see merged commits
4. Delete the feature branch

**Expected Result:**
```
✅ Feature branch merged to main
✅ All commits visible in main
✅ Feature branch deleted
```

---

## Exercise 8: Adding More Content (Commits 9-10)

**Objective:** Create more commits to reach 10 total.

**Commit 9: Add Navigation Menu**
- Modify `index.html` to add navigation:
  ```html
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
  ```
- Commit message: "Add navigation menu"

**Commit 10: Style Navigation**
- Add to `style.css`:
  ```css
  nav ul {
    list-style: none;
    background-color: #333;
    padding: 10px;
  }
  nav li {
    display: inline;
    margin: 0 15px;
  }
  nav a {
    color: white;
    text-decoration: none;
  }
  ```
- Commit message: "Add navigation styling"

**Expected Result:**
```
✅ 10 total commits
✅ View with: git log --oneline
✅ All changes tracked
```

---

## Exercise 9: Create GitHub Account and Repository

**Objective:** Push your code to GitHub.

**Tasks:**
1. Go to https://github.com and create account (if you don't have one)
2. Create new repository named `git-practice-seedwoc`
3. Make it public
4. Don't initialize with README
5. Follow GitHub's instructions to push existing repository
6. Verify your code appears on GitHub

**Expected Result:**
```
✅ GitHub account created
✅ Repository created
✅ Code pushed successfully
✅ Can see all 10 commits on GitHub
```

---

## Exercise 10: Connect Local to GitHub and Push

**Objective:** Connect your local repository to GitHub and push your code.

**Tasks:**

**Important: Follow the specific steps in Exercise Guide!**

1. Add GitHub repository as remote
2. Rename branch to main (if needed)
3. Push all commits to GitHub
4. Verify by viewing on GitHub.com
5. Confirm all 10 commits are visible

**Expected Result:**
```
✅ Local connected to GitHub
✅ All 10 commits visible on GitHub.com
✅ Branch is main (not master)
✅ Can see all files on GitHub
```

---

## Verification Checklist

After completing all exercises:

- [ ] Git is installed and configured
- [ ] You have 10 local commits
- [ ] You understand git status
- [ ] You can create and switch branches
- [ ] You can merge branches
- [ ] You understand staging area
- [ ] You have GitHub account
- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] All 10 commits visible on GitHub
- [ ] README is complete
- [ ] .gitignore exists
- [ ] Project is public on GitHub

---

## 📋 What to Submit

1. **Link to your GitHub repository**
   - Example: https://github.com/your-username/git-practice-seedwoc

2. **Screenshot showing:**
   - Terminal with `git log --oneline` (shows all 10 commits)
   - GitHub page showing your repository

3. **Reflection (optional but appreciated):**
   - What was hardest?
   - What did you learn?
   - What will you do next?

---

## 🆘 Need Help?

See **Week-1-Exercise-Guide.md** for:
- Detailed step-by-step instructions
- Exact commands to type
- Screenshots of expected results
- Troubleshooting common mistakes
- Links to resources

---

## 🎯 Learning Goals Achieved

After completing these exercises you will have:

✅ Installed and configured Git
✅ Created a Git repository
✅ Made 10 meaningful commits
✅ Worked with branches
✅ Merged code
✅ Created a GitHub account
✅ Pushed code to GitHub
✅ Demonstrated version control understanding
✅ Built a portfolio project
✅ Ready for next week's lessons

---

**Great job! You're becoming a version control expert! 🚀**
