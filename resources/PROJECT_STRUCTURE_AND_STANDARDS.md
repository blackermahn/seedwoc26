# Web Development Project Structure & Standards

## Table of Contents
1. [Project Structure](#project-structure)
2. [Code Standards](#code-standards)
3. [Naming Conventions](#naming-conventions)
4. [File Organization](#file-organization)
5. [Documentation Standards](#documentation-standards)
6. [Git Workflow](#git-workflow-standards)
7. [Performance Guidelines](#performance-guidelines)
8. [Security Best Practices](#security-best-practices)

---

## Project Structure

### Basic Web Project (Vanilla JavaScript)

```
my-project/
├── index.html                 # Entry point
├── .gitignore                 # Git ignore rules
├── README.md                  # Project documentation
├── docs/                      # Project documentation
│   ├── SETUP.md              # Setup instructions
│   ├── ARCHITECTURE.md       # Project architecture
│   └── API.md                # API documentation
├── src/                       # Source code
│   ├── js/
│   │   ├── main.js           # Entry point
│   │   ├── modules/          # Feature modules
│   │   │   ├── auth.js
│   │   │   ├── api.js
│   │   │   └── utils.js
│   │   └── components/       # Reusable components
│   │       ├── button.js
│   │       ├── modal.js
│   │       └── nav.js
│   ├── css/
│   │   ├── reset.css         # Reset styles
│   │   ├── variables.css     # CSS variables
│   │   ├── main.css          # Main styles
│   │   └── components/       # Component styles
│   │       ├── button.css
│   │       ├── modal.css
│   │       └── nav.css
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── fonts/
├── tests/                     # Test files
│   ├── unit/
│   └── integration/
├── config/                    # Configuration files
│   └── webpack.config.js      # Build configuration
└── dist/                      # Build output (gitignored)
```

### React Project Structure

```
my-react-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── index.js              # Entry point
│   ├── App.js                # Root component
│   ├── App.css
│   ├── components/           # Reusable components
│   │   ├── Button.js
│   │   ├── Button.test.js
│   │   ├── Modal.js
│   │   └── Modal.test.js
│   ├── pages/                # Page components
│   │   ├── HomePage.js
│   │   ├── AboutPage.js
│   │   └── NotFoundPage.js
│   ├── services/             # API and external services
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── storage.js
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   └── useLocalStorage.js
│   ├── utils/                # Utility functions
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── constants/            # Constants
│   │   └── config.js
│   ├── styles/               # Global styles
│   │   ├── variables.css
│   │   ├── global.css
│   │   └── animations.css
│   └── types/                # TypeScript types (if using TypeScript)
│       └── types.d.ts
├── tests/
│   ├── unit/
│   └── integration/
├── .env.example              # Environment template
├── .gitignore
├── package.json
├── README.md
└── jest.config.js            # Test configuration
```

### Node.js/Express Backend Project

```
my-backend/
├── src/
│   ├── index.js              # Entry point
│   ├── app.js                # Express app setup
│   ├── config/
│   │   ├── database.js
│   │   ├── environment.js
│   │   └── logging.js
│   ├── controllers/          # Request handlers
│   │   ├── userController.js
│   │   ├── postController.js
│   │   └── authController.js
│   ├── models/               # Database models
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routes/               # API routes
│   │   ├── users.js
│   │   ├── posts.js
│   │   └── auth.js
│   ├── middleware/           # Express middleware
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── services/             # Business logic
│   │   ├── userService.js
│   │   ├── emailService.js
│   │   └── authService.js
│   ├── utils/                # Helper functions
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   └── jwt.js
│   └── constants/
│       └── httpStatus.js
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── .env.example
├── .gitignore
├── README.md
├── package.json
└── jest.config.js
```

---

## Code Standards

### JavaScript Style Guidelines

**File and Variable Naming**
```javascript
// ✅ Good - Clear, descriptive names
const calculateUserAge = (birthDate) => {
  // implementation
};

const isValidEmail = (email) => {
  // implementation
};

let userCount = 0;
let isLoggedIn = false;

// ❌ Bad - Unclear names
const calc = (bd) => {};
const valid = (e) => {};
let u = 0;
let l = false;
```

**Function Length**
```javascript
// ✅ Good - Single responsibility
function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function getUserFromAPI(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => response.json());
}

// ❌ Bad - Too many responsibilities
function processUser(user) {
  // validate email
  // fetch data
  // update database
  // send email
  // log activity
}
```

**Error Handling**
```javascript
// ✅ Good - Proper error handling
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;  // Re-throw after logging
  }
}

// ❌ Bad - Ignoring errors
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

**Comments**
```javascript
// ✅ Good - Explains WHY, not WHAT
/**
 * Reduce price by percentage, minimum 10% discount
 * Business rule: We never discount below 10% per management request
 */
function applyDiscount(price, discount) {
  const percent = Math.max(discount, 10);
  return price * (1 - percent / 100);
}

// ❌ Bad - Explains obvious code
// Declare variable x
let x = 0;
// Loop from 0 to 10
for (let i = 0; i < 10; i++) {
  // Add i to x
  x += i;
}
```

---

## Naming Conventions

### Variables & Functions

| Type | Convention | Example |
|------|-----------|---------|
| Variable (data) | camelCase | `userName`, `totalPrice`, `isValid` |
| Function | camelCase with verb | `calculateAge()`, `validateEmail()`, `fetchUser()` |
| Class | PascalCase | `UserManager`, `APIClient`, `EventEmitter` |
| Constant | SCREAMING_SNAKE_CASE | `MAX_RETRIES`, `API_ENDPOINT` |
| Private method | camelCase with `_` prefix | `_formatDate()`, `_validateInput()` |
| Boolean | `is` or `has` prefix | `isActive`, `hasError`, `isValidated` |
| Array | Plural | `users`, `items`, `messages` |

### CSS and HTML

**CSS Classes**
```css
/* ✅ Good - BEM Methodology */
.button { }
.button--primary { }
.button--primary:hover { }
.button__text { }

.modal { }
.modal__header { }
.modal__content { }
.modal__footer { }

/* ❌ Bad - Unclear naming */
.btn-1 { }
.style2 { }
.active { }
.red { }
```

**HTML IDs and Classes**
```html
<!-- ✅ Good - Semantic and descriptive -->
<header class="site-header">
  <nav class="main-nav">
    <ul class="nav__list">
      <li><a href="/" class="nav__link">Home</a></li>
    </ul>
  </nav>
</header>

<main id="main-content">
  <article class="post">
    <h1 class="post__title">Title</h1>
    <p class="post__content">Content</p>
  </article>
</main>

<!-- ❌ Bad - Vague naming -->
<div class="container">
  <div class="stuff">
    <div class="item">Item</div>
  </div>
</div>
```

---

## File Organization

### Grouping Related Code

**By Feature (Recommended for medium/large projects)**
```
src/
├── auth/
│   ├── components/
│   │   ├── LoginForm.js
│   │   └── SignupForm.js
│   ├── services/
│   │   └── authService.js
│   ├── hooks/
│   │   └── useAuth.js
│   └── types/
│       └── auth.types.js
├── posts/
│   ├── components/
│   │   ├── PostList.js
│   │   └── PostDetail.js
│   ├── services/
│   │   └── postService.js
│   └── hooks/
│       └── usePosts.js
└── shared/
    ├── components/
    ├── utils/
    └── constants/
```

**By Type (Recommended for small projects)**
```
src/
├── components/
│   ├── Button.js
│   ├── Modal.js
│   └── Card.js
├── services/
│   ├── api.js
│   └── auth.js
├── utils/
│   └── helpers.js
└── constants/
    └── config.js
```

### Import Organization

```javascript
// ✅ Good - Organized imports
// 1. Built-in modules
import React from 'react';
import fs from 'fs';

// 2. Third-party libraries
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// 3. Local modules
import Button from './components/Button';
import { fetchUser } from './services/api';
import { USER_ROLES } from './constants/config';
import { formatDate } from './utils/helpers';

// ❌ Bad - Random order
import { fetchUser } from './services/api';
import axios from 'axios';
import { formatDate } from './utils/helpers';
import React from 'react';
import Button from './components/Button';
```

---

## Documentation Standards

### JSDoc Comments

```javascript
/**
 * Calculates the age of a person given their birth date.
 * 
 * @param {Date} birthDate - The person's birth date
 * @returns {number} The person's age in years
 * @throws {Error} If birth date is in the future
 * 
 * @example
 * const age = calculateAge(new Date('1990-05-15'));
 * console.log(age); // ~34
 */
function calculateAge(birthDate) {
  if (birthDate > new Date()) {
    throw new Error('Birth date cannot be in the future');
  }
  const diff = Date.now() - birthDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}
```

### README Examples

```markdown
# Project Name

## Description
Brief description of what this project does

## Installation
```bash
npm install
npm start
```

## Usage
```javascript
// Example code
const myModule = require('.');
```

## API Documentation
### GET /api/users
Retrieve all users

**Parameters:**
- limit (number): Max number of users

**Response:**
```json
{
  "users": [...],
  "total": 100
}
```

## Contributing
- Follow code standards
- Submit PR with tests
- Ensure CI passes
```

---

## Git Workflow Standards

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Type:** feat, fix, docs, style, refactor, test, chore

**Examples:**
```
feat: Add user authentication system

- Implement login/logout functionality
- Add JWT token generation
- Create user session management

Closes #123
```

```
fix: Prevent infinite loop in array processing

The forEach loop was creating a closure causing duplicate processing
when called multiple times. Fixed by using const instead of var.

Fixes #456
```

### Branch Naming

```
feature/user-authentication
feature/add-payment-integration
bugfix/fix-email-validation
docs/update-readme
style/format-css
```

### Commit Frequency

```javascript
// ✅ Good - Logical commits
// Commit 1: "feat: Add user model"
// Commit 2: "feat: Add user service"
// Commit 3: "feat: Add user routes"
// Commit 4: "test: Add user tests"

// ❌ Bad - Too many or too few
// Single commit: "Add everything for users"
// Multiple commits: "a", "b", "typo fix", "forgot something"
```

---

## Performance Guidelines

### JavaScript Performance

```javascript
// ✅ Good - Efficient
// Cache DOM queries
const button = document.querySelector('.button');
button.addEventListener('click', handler);
button.classList.add('active');

// Use event delegation
document.addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    handleClick(e.target);
  }
});

// Lazy evaluate
function expensiveCalculation() {
  let result = null;
  return () => {
    if (result === null) {
      result = /* computation */;
    }
    return result;
  };
}

// ❌ Inefficient - Repeated queries
document.querySelector('.button').addEventListener('click', handler);
document.querySelector('.button').classList.add('active');
document.querySelector('.button').textContent = 'Save';

// Unnecessary computation
array.filter(x => x > 0).map(x => x * 2).forEach(x => console.log(x));
```

### CSS Performance

```css
/* ✅ Good - Optimized */
.button {
  /* Avoid expensive properties */
  transform: translateY(0);
  opacity: 1;
}

.button:hover {
  transform: translateY(-2px);  /* Change transform, not position */
}

/* ❌ Poor - Triggers reflows */
.button {
  position: absolute;
}

.button:hover {
  top: -2px;  /* Triggers reflow */
}
```

---

## Security Best Practices

### Preventing XSS Attacks

```javascript
// ✅ Good - Safe
const name = userInput;
const element = document.createElement('div');
element.textContent = name;  // Safe - sets text, not HTML

// ❌ Bad - XSS vulnerability
const element = document.createElement('div');
element.innerHTML = userInput;  // Dangerous if userInput contains HTML

// React example (✅ Good)
const MyComponent = ({ userInput }) => {
  return <div>{userInput}</div>;  // Automatically escaped
};
```

### Handling Sensitive Data

```javascript
// ✅ Good - Store securely
// Passwords never logged
const user = { email: 'user@example.com' };
console.log(user.email);  // Safe

// Use environment variables for secrets
const apiKey = process.env.API_KEY;

// ❌ Bad - Exposed secrets
const apiKey = 'sk_live_abc123';  // Visible in code!
console.log(password);  // Never log passwords
```

### Input Validation

```javascript
// ✅ Good - Validate and sanitize
function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    throw new Error('Invalid email format');
  }
  return email.toLowerCase().trim();
}

// ❌ Bad - Trust user input
const email = userInput;  // What if it's malicious?
```

---

## Code Review Checklist

Before submitting PR:

- [ ] Code follows naming conventions
- [ ] Functions are focused (single responsibility)
- [ ] Error handling implemented
- [ ] No console logs left (except in logging library)
- [ ] Comments explain WHY, not WHAT
- [ ] No hardcoded values (use constants)
- [ ] Code is DRY (no repetition)
- [ ] Tests written and passing
- [ ] No security vulnerabilities
- [ ] Performance considered
- [ ] Commit messages are clear
- [ ] Follows project structure

---

## Tools for Enforcement

### ESLint (Code Quality)
```javascript
// .eslintrc.json
{
  "extends": "eslint:recommended",
  "rules": {
    "no-console": "warn",
    "no-var": "error",
    "prefer-const": "error"
  }
}
```

### Prettier (Code Formatting)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80
}
```

### Pre-commit Hooks
```bash
# .husky/pre-commit
#!/bin/sh
npm run lint
npm test
```

---

## Resources

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [MDN Web Standards](https://developer.mozilla.org/)
- [Web.dev Performance Tips](https://web.dev/)

---

## Quick Reference

| Best Practice | ✅ Do | ❌ Don't |
|---|---|---|
| Naming | camelCase vars | sCrEd.CaSe |
| Functions | One responsibility | Multiple concerns |
| Comments | Explain why | Explain what |
| Error handling | Try-catch | Ignore errors |
| DOM queries | Cache results | Repeated queries |
| User input | Validate & sanitize | Trust input |
| Commits | Logical chunks | One massive commit |
| Testing | Test important logic | No tests |
| Code review | Peer review PR | Merge without review |

---

Following these standards will keep your codebase clean, maintainable, and professional! 🚀

