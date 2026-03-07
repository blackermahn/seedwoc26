# Chapter 1: Version Control - Assignment Template

When submitting assignments for Chapter 1, use this structure:

```
assignments/
└── your-github-username/
    └── chapter-1-version-control/
        ├── module-1-git-basics/
        │   └── part-1-introduction/
        │       ├── exercise-1-setup.md
        │       ├── exercise-2-first-commit.md
        │       ├── exercise-3-repositories.md
        │       └── README.md (your notes)
        └── module-2-github-collaboration/
            └── part-1-github-essentials/
                ├── exercise-1-github-profile.md
                ├── exercise-2-fork-and-clone.md
                └── exercise-3-pull-request.md
```

## Exercise 1: Git Setup & First Repository

### Objective
Initialize your first Git repository and make meaningful commits.

### Tasks
1. [ ] Initialize a new Git repository
2. [ ] Configure Git with your name and email
3. [ ] Create a README.md file
4. [ ] Make your first commit with a proper message
5. [ ] View commit history

### Submission Requirements
- Create `exercise-1-setup.md` in your part folder
- Document:
  - Commands you used
  - Output from each command
  - What you learned

## Exercise 2: Understanding Commits

### Objective
Create meaningful commits with proper messages.

### Tasks
1. [ ] Create 3 new files
2. [ ] Commit each file separately with clear messages
3. [ ] Use conventional commit format (feat:, fix:, docs:)
4. [ ] View your commit log in different formats

### Submission Requirements
- Create `exercise-2-first-commit.md
- Show your commit messages
- Explain what each commit does

## Exercise 3: Branching Practice

### Objective
Master creating and switching between branches.

### Tasks
1. [ ] Create a new branch called `feat/my-feature`
2. [ ] Make changes on that branch
3. [ ] Switch back to main/master
4. [ ] Merge your feature branch
5. [ ] Delete the feature branch

### Submission Requirements
- Create `exercise-3-repositories.md`
- Show branch creation and merge commands
- Explain the purpose of branching

---

## Sample Solution Structure

```
exercise-1-setup.md
===
# Exercise 1: Git Setup & First Repository

## Commands Used

### Initialize Repository
\`\`\`bash
$ mkdir my-project
$ cd my-project
$ git init
Initialized empty Git repository in /Users/name/my-project/.git/
\`\`\`

### Configure Git
\`\`\`bash
$ git config user.name "John Doe"
$ git config user.email "john@example.com"
$ git config --list | grep user
user.name=John Doe
user.email=john@example.com
\`\`\`

## What I Learned
- ...
- ...
```

---

## Grading Rubric

| Criterion | Points | Notes |
|-----------|--------|-------|
| All exercises completed | 40 | Must complete all tasks |
| Proper Git commands | 30 | Using correct syntax |
| Clear documentation | 20 | Explaining your work |
| Commit messages | 10 | Following conventions |

---

## Common Issues & Solutions

**Q: I forgot to configure Git**
```bash
git config --global user.name "Your Name"
git config --global user.email "your@example.com"
```

**Q: My commit message was wrong**
```bash
git commit --amend -m "correct message"
```

**Q: I need to undo my last commit**
```bash
git reset HEAD~1
```

---

## Submission Guide

1. Complete exercises in your assignment directory
2. Commit your work frequently
3. When ready, create a Pull Request
4. In PR description, mention:
   - Which exercises you completed
   - Any challenges you faced
   - What you learned

Example PR:
```
Completed: Chapter 1, Module 1 exercises
All three exercises done with proper commits
Learned about branching and merge strategies
Would appreciate feedback on commit messages
```

