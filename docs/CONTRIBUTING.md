# 🤝 Contributing to SeedWOC

Thank you for your interest in contributing to SeedWOC! This document provides guidelines and instructions for contributing to the platform.

## Code of Conduct

Be respectful, inclusive, and professional. We're building a community where everyone can learn and grow.

## Types of Contributions

### 1. Student Submissions (Assignments)
- Solve exercises from chapters
- Follow the directory structure: `assignments/{github_username}/{chapter}/{module}/{part}/`
- Submit via Pull Request with your solutions

### 2. Content Creation
- Create new chapters, modules, or parts
- Write lectures and tutorials
- Design exercises and projects
- Create documentation

### 3. Code Reviews & Feedback
- Review fellow student submissions
- Provide constructive feedback
- Suggest improvements

### 4. Bug Reports & Issues
- Report issues with instructions
- Suggest improvements
- Request new topics

## Getting Started

### Setup
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/seedwoc.git
cd seedwoc

# Create a feature branch
git checkout -b feat/your-feature-name
```

### Working on Your Submission

**For Student Assignments:**
```bash
# Create your assignment directory
mkdir -p assignments/YOUR_GITHUB_USERNAME/chapter-1-version-control/module-1-git-basics/part-1-introduction

# Add files
cd assignments/YOUR_GITHUB_USERNAME/chapter-1-version-control/module-1-git-basics/part-1-introduction

# Solve exercises
# Create files: exercise-1.md, solution.md, etc.
```

**For New Content:**
```bash
# For a new part
mkdir -p chapters/chapter-1-version-control/modules/module-1-git-basics/parts/part-1-introduction

# Create structure
touch chapters/chapter-1-version-control/modules/module-1-git-basics/parts/part-1-introduction/README.md
mkdir -p chapters/chapter-1-version-control/modules/module-1-git-basics/parts/part-1-introduction/examples
mkdir -p chapters/chapter-1-version-control/modules/module-1-git-basics/parts/part-1-introduction/exercises
```

## File Templates

### Part README Template
```markdown
# Part {n}: {Topic Name}

## Learning Objectives
- Objective 1
- Objective 2
- Objective 3

## Prerequisites
- Previous part/chapter knowledge needed
- Tools/software required

## Key Concepts
1. **Concept 1**: Description
2. **Concept 2**: Description

## Duration
Estimated 2-3 hours

## Resources
- [Resource 1](link)
- [Resource 2](link)

## Next Steps
- Move to Part {n+1}
- Recommended practice exercises
```

### Exercise Template
```markdown
# Exercise {n}: {Problem Title}

## Difficulty: ⭐⭐ (Easy/Medium/Hard)

## Problem Statement
Clear description of what needs to be done.

## Requirements
- Requirement 1
- Requirement 2
- Requirement 3

## Starter Code
\`\`\`javascript
// Your starting code here
\`\`\`

## Expected Output
Example of what a correct solution should produce.

## Hints
(Optional) Tips without giving away the solution
- Hint 1
- Hint 2

## Resources
- [Relevant documentation](link)
```

### Lecture Template
```markdown
# {Topic Name} - Lecture Notes

## Overview
Brief description of the lecture

## Table of Contents
1. Section 1
2. Section 2
3. Section 3

## Section 1: {Subtitle}
Detailed explanation with code examples

\`\`\`language
// Code examples
\`\`\`

## Key Takeaways
- Point 1
- Point 2

## Practice Exercises
- Problem 1
- Problem 2
```

## Commit Message Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add chapter 10 module 1 exercises
fix: correct solution for chapter 2 exercise 3
docs: update installation guide
refactor: reorganize chapter structure
test: add test suite for chapter 5
chore: update dependencies
ci: configure github actions
```

Format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature or content
- `fix`: Bug fixes or corrections
- `docs`: Documentation changes
- `refactor`: Code restructuring without functionality change
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD configuration

**Examples:**
```bash
feat(chapter-1): add advanced git branching exercises
fix(chapter-2): correct expected output in exercise 3
docs(readme): add learning path for ml specialists
```

## Pull Request Process

1. **Create a descriptive PR title:**
   ```
   feat: Add Chapter 6 React Fundamentals Module
   fix: Correct Python syntax in Chapter 4 Exercise 2
   ```

2. **Fill out the PR template:**
   ```markdown
   ## Type of Change
   - [ ] New content (chapter/module/exercise)
   - [ ] Student assignment submission
   - [ ] Bug fix
   - [ ] Documentation update

   ## Description
   Clear description of changes

   ## Related Issues
   Closes #123

   ## Changes Made
   - Change 1
   - Change 2

   ## Testing
   How was this tested?

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] All exercises tested
   - [ ] READMEs updated
   - [ ] No merge conflicts
   ```

3. **Ensure your branch is up to date:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

4. **Push and create PR**

## Content Guidelines

### Exercise Design
- **Difficulty progression**: Start easy, gradually increase complexity
- **Real-world context**: Connect to practical applications
- **Testing**: Ensure solutions actually work
- **Feedback**: Include hints and learning resources
- **Solution**: Provide reference solutions (documented separately)

### Code Quality
- Use consistent formatting
- Include comments for complex logic
- Follow language-specific conventions
- Test all code examples before submitting
- Use meaningful variable/function names

### Documentation
- Be clear and concise
- Use examples liberally
- Include prerequisites
- Link to external resources
- Provide visual diagrams where helpful

### Accessibility
- Use clear, simple language
- Avoid jargon without explanation
- Include code comments
- Provide multiple formats (text, video, code, diagrams)
- Ensure proper formatting for readability

## Review Process

All submissions will be reviewed for:
1. **Accuracy**: Content is correct and up-to-date
2. **Clarity**: Easy to understand
3. **Completeness**: All requirements met
4. **Quality**: Follows standards
5. **Test**: Code actually works

**Review timeframe**: 24-48 hours

**Feedback**: Constructive and supportive

## Branching Strategy

```
main
├── feat/chapter-1-content
├── feat/chapter-2-exercises
├── fix/exercise-3-solution
└── docs/contributing-guide
```

**Branch naming:**
- `feat/<description>` - New content
- `fix/<description>` - Bug fixes
- `docs/<description>` - Documentation
- `refactor/<description>` - Restructuring

## Directory Structure Requirements

```
✅ Correct:
assignments/john-doe/chapter-1-version-control/module-1-git-basics/part-1-introduction/

❌ Incorrect:
assignments/John Doe/Chapter 1 Version Control/
assignments/john_doe/ch1/mod1/
```

**Rules:**
- Use lowercase
- Use hyphens for spaces
- Be descriptive
- Match existing structure

## Testing Your Work

Before submitting, test everything:

```bash
# For JavaScript/Node.js
npm test
npm run lint

# For Python
python -m pytest
python -m flake8

# For HTML/CSS
# Open in browser and verify appearance

# For all
git diff              # Review your changes
git log --oneline     # Verify commit messages
```

## Getting Help

- **Questions**: Open an issue with label `question`
- **Discussions**: Start a discussion in GitHub Discussions
- **Clarification**: Comment on related issues
- **Review**: Ask for review in PR comments

## Recognition

Contributors are recognized through:
- Commit history in the repository
- Contributor badge
- Monthly contributor highlights
- Tier-based achievement badges

## Important Reminders

✅ **DO:**
- Write clear commit messages
- Test your code
- Update documentation
- Follow the structure
- Be respectful and constructive
- Make small, focused commits
- Reference issues when relevant

❌ **DON'T:**
- Submit incomplete work
- Copy solutions without understanding
- Use offensive language
- Ignore feedback
- Make huge monolithic commits
- Push directly to main branch

## Questions?

If you have questions:
1. Check [FAQ](../docs/FAQ.md)
2. Search existing issues
3. Create a new issue
4. Start a discussion
5. Reach out on community channels

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making SeedWOC better! Together we build a stronger learning community.** 🌱

