# JavaScript Best Practices and Security

## Code Quality Best Practices

### Variable Naming

**Good Names:**
```javascript
// Clear, descriptive names
const userAge = 25;
const isLoggedIn = true;
const fetchUserData = async () => { };
const MAXIMUM_RETRIES = 3;

// Function names describe action
loadUserProfile()
calculateTotal()
validateEmail()
handleButtonClick()
```

**Bad Names:**
```javascript
// Vague, unclear purpose
const x = 25;
const flag = true;
const fn = async () => { };
const MAX = 3;

// Unclear actions
process()
do_stuff()
go()
handle()
```

### Function Design

**Single Responsibility:**
```javascript
// GOOD - Each function does one thing
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function saveUser(user) {
  return api.post('/users', user);
}

function displayError(message) {
  const errorEl = document.getElementById('error');
  errorEl.textContent = message;
  errorEl.style.display = 'block';
}

// BAD - Function does too much
function process(user) {
  // Validate
  if (!user.email.includes('@')) return false;
  // Save
  api.post('/users', user);
  // Display
  document.getElementById('message').textContent = 'Saved!';
  return true;
}
```

**Pure Functions (Recommended):**
```javascript
// GOOD - Pure function (same input = same output)
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

const total = calculateTotal(cartItems);
// No side effects, easily testable

// AVOID - Side effects
let grandTotal = 0;

function addToTotal(item) {
  grandTotal += item.price;  // Modifies external state
  logToAnalytics(item);       // Side effect
  updateDatabase();           // Side effect
  return grandTotal;
}
```

---

## Error Handling

### Try-Catch Best Practices

```javascript
// GOOD - Specific error handling
try {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return await response.json();
} catch (error) {
  if (error instanceof TypeError) {
    console.error('Network error:', error.message);
    throw new Error('Network unavailable');
  } else {
    console.error('Parse error:', error.message);
    throw new Error('Invalid response format');
  }
}

// BAD - Generic catch-all
try {
  await fetch('/api/data').then(r => r.json());
} catch (error) {
  console.error('Error!');  // Unhelpful
  return null;
}
```

### Custom Errors

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

function validateUser(user) {
  if (!user.email) {
    throw new ValidationError('Email required', 'email');
  }
  if (!user.age || user.age < 18) {
    throw new ValidationError('Must be 18+', 'age');
  }
}

try {
  validateUser({ name: 'John' });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`${error.field} validation failed: ${error.message}`);
  }
}
```

---

## Security Best Practices

### Prevent XSS (Cross-Site Scripting)

**BAD - HTML Injection:**
```javascript
// User enters: <img src=x onerror="alert('XSS')">
const userComment = getUserInput();
document.getElementById('comments').innerHTML = userComment;
// Script executes!
```

**GOOD - Text Content:**
```javascript
const userComment = getUserInput();
document.getElementById('comments').textContent = userComment;
// Script displayed as text, not executed
```

**Entity Encoding:**
```javascript
function encodeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

const userInput = '<script>alert("XSS")</script>';
const safe = encodeHTML(userInput);
// Returns: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;
```

**Using DOMPurify Library:**
```javascript
// npm install dompurify
import DOMPurify from 'dompurify';

const dirty = '<img src=x onerror="alert(\'XSS\')">';
const clean = DOMPurify.sanitize(dirty);
// Output: <img src="x">
```

### Prevent CSRF (Cross-Site Request Forgery)

```javascript
// BAD - No protection
function deleteAccount() {
  fetch('/api/account', { method: 'DELETE' });
}

// GOOD - Use CSRF token
function deleteAccount() {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  fetch('/api/account', {
    method: 'DELETE',
    headers: {
      'X-CSRF-Token': token
    }
  });
}

// HTML
// <meta name="csrf-token" content="abc123def456">
```

### Never Store Sensitive Data in Local Storage

```javascript
// BAD - Exposed to XSS
localStorage.setItem('apiKey', 'secret-key-123');

// ALSO BAD - Any JS can read it
const key = localStorage.getItem('apiKey');

// BETTER - Use HttpOnly, Secure cookies (server sets)
// Server: Set-Cookie: auth=token; HttpOnly; Secure; SameSite=Strict
// JS cannot read it, auto-sent with requests

// OR - Session storage (cleared on tab close)
sessionStorage.setItem('tempToken', token);
```

---

## Performance Best Practices

### Avoid Global Variables

```javascript
// BAD - Pollutes global scope
var user = {};
var config = {};
window.setupUser = function() { };

// GOOD - Namespace
const app = {
  user: {},
  config: {},
  setupUser() { }
};
```

### String Concatenation vs Template Literals

```javascript
// BAD - Inefficient string building
let message = 'Hello ';
message += user.firstName + ' ';
message += user.lastName;

// GOOD - Template literals
const message = `Hello ${user.firstName} ${user.lastName}`;

// For many concatenations, use array join
const parts = [];
for (let i = 0; i < 1000; i++) {
  parts.push(`Item ${i}`);
}
const result = parts.join('\n');
```

### Avoid Unnecessary Object Creation

```javascript
// BAD - Creates new object every render
function Component() {
  const style = { color: 'red', fontSize: '16px' };
  return <div style={style}>Text</div>;
}

// GOOD - Reuse same object
const STYLE = { color: 'red', fontSize: '16px' };

function Component() {
  return <div style={STYLE}>Text</div>;
}

// Or use CSS classes
function Component() {
  return <div className="text-component">Text</div>;
}
```

---

## Code Organization

### Module Pattern

```javascript
// GOOD - Encapsulation
const UserModule = (() => {
  // Private
  const apiUrl = 'https://api.example.com';
  
  function fetchUser(id) {
    return fetch(`${apiUrl}/users/${id}`).then(r => r.json());
  }
  
  // Public
  return {
    getUser: fetchUser,
    createUser(user) { },
    deleteUser(id) { }
  };
})();

UserModule.getUser(123);
// apiUrl is not accessible from outside
```

### Class-Based Organization

```javascript
class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
  }
  
  // Public methods
  save() {
    return UserAPI.save(this);
  }
  
  delete() {
    return UserAPI.delete(this.id);
  }
  
  // Utility methods
  getDisplayName() {
    return this.name.toUpperCase();
  }
}

const user = new User({ id: 1, name: 'John', email: 'john@example.com' });
user.save();
```

---

## Comments and Documentation

### When to Comment

```javascript
// GOOD - Explains WHY, not WHAT
// We retry failed requests because APIs can be temporarily unavailable
// but we limit retries to prevent infinite loops from actual errors
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      // Wait before retry (exponential backoff)
      await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }
}

// BAD - States obvious
// Add 1 to counter
let counter = 0;
counter++; // Increment counter

// BAD - Outdated comment
// This used to fix bug #123, probably
const config = { timeout: 5000 };
```

### JSDoc Comments

```javascript
/**
 * Fetches user data from API
 * @param {number} userId - The user's unique identifier
 * @param {Object} options - Optional configuration
 * @param {boolean} options.includeProfile - Include profile data
 * @returns {Promise<User>} Promise that resolves with user data
 * @throws {APIError} When API request fails
 * 
 * @example
 * const user = await getUser(123);
 * const userWithProfile = await getUser(123, { includeProfile: true });
 */
async function getUser(userId, options = {}) {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new APIError(`Failed to fetch user ${userId}`);
  }
  const data = await response.json();
  
  if (options.includeProfile) {
    data.profile = await getProfile(userId);
  }
  
  return data;
}
```

---

## Testing Best Practices

### Test Organization

```javascript
describe('UserService', () => {
  describe('getUser', () => {
    test('returns user data for valid ID', async () => {
      // Arrange
      const userId = 123;
      const expectedUser = { id: 123, name: 'John' };
      
      // Act
      const result = await userService.getUser(userId);
      
      // Assert
      expect(result).toEqual(expectedUser);
    });
    
    test('throws error for invalid ID', async () => {
      await expect(userService.getUser(-1)).rejects.toThrow();
    });
  });
  
  describe('saveUser', () => {
    test('persists user data', async () => {
      const user = { name: 'Jane', email: 'jane@example.com' };
      await userService.saveUser(user);
      
      const saved = await userService.getUser(user.id);
      expect(saved.email).toBe('jane@example.com');
    });
  });
});
```

---

## Summary

✅ **Best Practices:**
- Use clear, descriptive names
- Keep functions small and focused
- Handle errors explicitly
- Prevent security vulnerabilities
- Organize code logically
- Write meaningful comments
- Test important functionality
- Use const/let over var
- Avoid global state
- Profile before optimizing

❌ **Anti-Patterns:**
- Vague variable names
- Functions that do too much
- Ignoring errors
- DOM innerHTML with user data
- Storing secrets in localStorage
- Too many comments explaining obvious code
- No error handling
- Modifying assumptions without testing
- Over-engineering for hypothetical cases

