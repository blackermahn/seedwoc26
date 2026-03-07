# Chapter 1, Module 2: Advanced Git Workflows and Team Collaboration

## Module Overview
This module covers advanced Git workflows, collaboration strategies, and professional development practices. Students will learn about branching strategies, code review workflows, handling merge conflicts, and using Git effectively in team environments. The module emphasizes best practices for collaborative development.

## Learning Outcomes
Students will be able to:
- Design and implement effective branching strategies (Git Flow, GitHub Flow, trunk-based)
- Collaborate with team members using pull requests and code reviews
- Resolve complex merge conflicts and rebase scenarios
- Understand and avoid common Git pitfalls
- Use Git for releases, versioning, and rollbacks
- Implement pre-commit hooks and automated checks
- Debug Git issues and inspect history effectively

## Curriculum Outline

### Part 1: Branching Strategies
- Duration: 6 hours
- Topics:
  - Feature branches and long-running branches
  - Git Flow workflow (main, develop, feature, release, hotfix)
  - GitHub Flow (main + feature branches)
  - Trunk-based development
  - Branch naming conventions
  - When to use each strategy
  - Integration with CI/CD

### Part 2: Collaborative Workflows
- Duration: 6 hours
- Topics:
  - Pull requests and code review process
  - Writing good pull request descriptions
  - Code review feedback and discussions
  - Automated checks and status checks
  - Squashing commits before merge
  - Merge vs. rebase strategies
  - Protecting main branch with rules

### Part 3: Advanced Git Operations
- Duration: 5 hours
- Topics:
  - Rebasing and interactive rebase
  - Cherry-picking specific commits
  - Stashing and recovering work
  - Tagging for releases
  - Reverting vs. resetting commits
  - Searching history (git log, git grep)
  - Reflog for recovery

### Part 4: Team Best Practices
- Duration: 5 hours
- Topics:
  - Commit message conventions
  - Code ownership and CODEOWNERS file
  - Git hooks and automation
  - LFS for large files
  - Resolving merge conflicts
  - Handling sensitive information
  - Release management and versioning

## Duration
Approximately 22 hours of instruction and hands-on practice

## Prerequisites
- Chapter 1, Module 1: Git Fundamentals
- Understanding of basic Git operations
- Familiarity with pull requests basics

## Assignments

### Assignment 1: Implement Git Flow Workflow (12 hours)
Set up a Git Flow workflow in a repository: create develop branch, implement feature branches, create release branch, handle hotfixes. Practice merging between branches, maintaining version tags, and documenting the workflow for team members.

### Assignment 2: Code Review Simulation (10 hours)
Create a scenario where team members submit pull requests with code to review. Practice providing constructive feedback, requesting changes, approving, and merging. Document best practices for code review based on the exercise.

### Assignment 3: Resolve Complex Merge Conflicts (12 hours)
Create deliberate merge conflict scenarios: conflicting changes to same file, merge conflicts across multiple files, conflicts during rebase. Practice resolution strategies, understand merge strategies, and document lessons learned.

### Assignment 4: Release Management Process (10 hours)
Plan and execute a release using Git: create release branch, handle last-minute fixes, tag release, merge back to main, create hotfix if needed. Document the complete process and create automation scripts for future releases.

## Pro Tips
- Git Flow is great for planned releases - GitHub Flow is simpler for continuous deployment
- Feature branches should be short-lived - long branches increase merge conflict risk
- Squash commits before merging - keeps main branch history clean and bisectable
- Rebase rewrites history - don't do it on shared branches
- Always write descriptive commit messages - future you (and others) will thank you
- Pre-commit hooks prevent mistakes - enforce style, tests, and security checks
- Protect main branch - require reviews and passing tests before merging
- Use semantic versioning - X.Y.Z format is standard
- Tags identify releases - use annotated tags with release notes
- LFS handles large binary files - don't commit them to Git normally
- Sensitive data removal from Git is hard - prevent it from being added
- Merge conflicts are normal - understand how to resolve them systematically
