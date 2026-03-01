# Best Practices Guide

## Code Organization

### Directory Structure
```
project/
├── src/                    # Source code
├── tests/                  # Test files
├── docs/                   # Documentation
├── config/                 # Configuration files
├── build/                  # Build outputs
└── .gitignore             # Git ignore patterns
```

### File Naming Conventions
- **JavaScript/TypeScript**: `camelCase.js` or `kebab-case.js`
- **Python**: `snake_case.py`
- **Classes**: `PascalCase.js` (JavaScript), `PascalCase.py` (Python)
- **Directories**: `lowercase-with-hyphens/`

## Git Best Practices

### Commit Messages
Follow conventional commits format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Maintenance

**Example:**
```
feat(auth): implement jwt token verification

Add JWT token verification to authentication middleware.
Validates token expiration and user permissions.

Closes #123
```

### Commit Frequency
- Commit every logical change (usually every 15-30 minutes)
- Don't wait until you're done with a feature
- Small commits are easier to understand and debug

### Branch Naming
```
feat/feature-name
fix/bug-description
docs/documentation-update
refactor/code-restructuring
test/test-additions
```

## Code Quality

### Write Readable Code
```javascript
// ❌ Bad: Unclear variable names
const d = new Date();
const a = arr.map(x => x * 2);

// ✅ Good: Clear, descriptive names
const currentDate = new Date();
const doubledNumbers = numbers.map(num => num * 2);
```

### Comments Matter
```javascript
// ✅ Good: Explains WHY, not WHAT
// Multiply by 2 to convert from binary to decimal representation
const result = value * 2;

// ❌ Bad: States the obvious
// Multiply value by 2
const result = value * 2;
```

### DRY (Don't Repeat Yourself)
```javascript
// ❌ Bad: Repeated code
function validateEmail(email) { return email.includes('@'); }
function validatePhone(phone) { return phone.length === 10; }
function validateZip(zip) { return zip.length === 5; }

// ✅ Good: Reusable validation
const validators = {
  email: (val) => val.includes('@'),
  phone: (val) => val.length === 10,
  zip: (val) => val.length === 5,
};
```

### Keep Functions Small
```javascript
// ✅ Good: Single responsibility
function fetchUserData(userId) {
  return api.get(`/users/${userId}`);
}

function formatUserData(data) {
  return {
    name: `${data.firstName} ${data.lastName}`,
    email: data.email
  };
}

// Usage
const user = await fetchUserData(123);
const formatted = formatUserData(user);
```

## Testing Best Practices

### Test Coverage
- Aim for 70-80% code coverage
- Test edge cases and error conditions
- Don't test third-party libraries thoroughly

### Test Organization
```
project/
├── src/
│   ├── auth.js
│   ├── users.js
│   └── ...
├── tests/
│   ├── auth.test.js
│   ├── users.test.js
│   └── ...
```

### Test Writing
```javascript
// ✅ Good: Clear, descriptive tests
describe('Authentication', () => {
  test('should validate email format', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });

  test('should reject empty password', () => {
    expect(validatePassword('')).toBe(false);
  });
});
```

## Documentation Best Practices

### README Template
```markdown
# Project Name

## Description
What does it do?

## Installation
How to install and setup

## Usage
How to use it

## API Documentation
If applicable

## Contributing
How to contribute

## License
License information
```

### Code Comments
- Comment WHY not WHAT
- Keep comments up-to-date with code
- Use JSDoc/docstrings for functions

```python
def calculate_discount(price, customer_type):
    """
    Calculate discount based on customer type.
    
    Args:
        price (float): Original price
        customer_type (str): Type of customer ('premium', 'regular')
    
    Returns:
        float: Discounted price
    """
    # Premium customers get 20% discount to encourage loyalty
    if customer_type == 'premium':
        return price * 0.8
    return price
```

## Database Best Practices

### Schema Design
- Use meaningful column names
- Add appropriate indexes
- Include timestamps (created_at, updated_at)
- Use constraints for data integrity

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_email ON users(email);
```

### Query Best Practices
- Use parameterized queries to prevent SQL injection
- Select only needed columns
- Use proper indexes
- Avoid N+1 queries

## Security Best Practices

### Never Commit Secrets
Use environment variables:

```bash
# .env file (add to .gitignore)
DATABASE_URL=postgresql://user:pass@localhost/db
API_KEY=secret_key_here
```

```javascript
// Access in code
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;
```

### Input Validation
```javascript
// ✅ Good: Always validate user input
function createUser(email, password) {
  // Validate before processing
  if (!email || !email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (!password || password.length < 8) {
    throw new Error('Password too short');
  }
  // Process...
}
```

### Use HTTPS
Always use HTTPS in production. Never send sensitive data over HTTP.

## Performance Best Practices

### Optimize Assets
- Minify CSS, JavaScript
- Compress images
- Load fonts strategically
- Code splitting for large apps

### Caching
- Use browser caching headers
- Implement application-level caching
- Consider CDN for static assets

### Database Optimization
- Use indexes wisely
- Avoid SELECT *
- Optimize queries with EXPLAIN
- Consider denormalization when needed

## Development Workflow

### Before Starting Work
1. Pull latest changes: `git pull`
2. Create feature branch: `git checkout -b feat/feature-name`
3. Ensure tests pass: `npm test` or `python -m pytest`

### During Development
1. Write tests first (TDD)
2. Implement feature
3. Run tests frequently
4. Keep commits small and focused
5. Write clear commit messages

### Before Pushing
1. Run full test suite
2. Run linter: `npm run lint`
3. Check code coverage: `npm run coverage`
4. Review your own changes: `git diff`
5. Update documentation

### Pull Request Process
1. Push changes: `git push origin feat/feature-name`
2. Create pull request with description
3. Request reviewers
4. Address feedback
5. Ensure CI passes
6. Merge when approved

## Learning from Others

### Read Good Code
- Study open-source projects
- Read code reviews on GitHub
- Follow developers you admire
- Participate in code reviews

### Continuous Improvement
- Learn new tools and frameworks
- Practice refactoring
- Contribute to open source
- Teach others

## Common Anti-Patterns to Avoid

### ❌ Using var
```javascript
// Bad: var has confusing scoping
var count = 0;

// Good: const/let with block scope
const count = 0;
```

### ❌ Global Variables
```javascript
// Bad: Pollutes global scope
window.data = {};
window.processData = function() {};

// Good: Use modules
export const data = {};
export function processData() {}
```

### ❌ Nested Callbacks (Callback Hell)
```javascript
// ❌ Bad: Deeply nested callbacks
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      // Deeply nested...
    });
  });
});

// ✅ Good: Use async/await
const a = await getData();
const b = await getMoreData(a);
const c = await getMoreData(b);
```

### ❌ Ignoring Errors
```javascript
// ❌ Bad: Silently failing
try {
  riskyOperation();
} catch (err) {
  // Do nothing!
}

// ✅ Good: Handle or log errors
try {
  riskyOperation();
} catch (err) {
  console.error('Operation failed:', err);
  // Take appropriate action
}
```

## Tools for Quality

### Linting
- JavaScript: ESLint
- Python: pylint, flake8
- Keep code consistent

### Formatting
- JavaScript: Prettier
- Python: Black
- Automatic formatting saves time

### Testing
- Jest (JavaScript)
- pytest (Python)
- Keep tests fast and focused

### Static Analysis
- SonarQube
- CodeClimate
- Catch issues before review

---

## Remember

> "Code is read much more often than it is written."

Write code for the next person (who might be you, months later). Clean, well-documented code is a sign of professionalism.

