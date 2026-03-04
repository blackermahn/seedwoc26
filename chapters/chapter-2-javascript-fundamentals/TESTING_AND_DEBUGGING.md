# JavaScript Testing and Debugging

## Unit Testing with Jest

### Basic Test Setup

```bash
# Install Jest
npm install --save-dev jest

# In package.json
{
  "scripts": {
    "test": "jest"
  }
}
```

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
```

```javascript
// math.test.js
import { add, multiply } from './math';

describe('Math operations', () => {
  
  test('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });
  
  test('multiplies two numbers correctly', () => {
    expect(multiply(2, 3)).toBe(6);
  });
  
  test('handles negative numbers', () => {
    expect(add(-2, 3)).toBe(1);
    expect(multiply(-2, 3)).toBe(-6);
  });
});
```

### Matchers

```javascript
describe('Matchers', () => {
  test('equality matchers', () => {
    expect(value).toBe(expected);        // Exact equality (===)
    expect(value).toEqual(expected);     // Deep equality
    expect(value).toStrictEqual(expected); // Deep strict
  });
  
  test('truthiness', () => {
    expect(value).toBeTruthy();
    expect(value).toBeFalsy();
    expect(value).toBeNull();
    expect(value).toBeUndefined();
    expect(value).toBeDefined();
  });
  
  test('numbers', () => {
    expect(3 + 3).toBe(6);
    expect(3 + 3).toBeGreaterThan(5);
    expect(3 + 3).toBeGreaterThanOrEqual(6);
    expect(3 + 3).toBeLessThan(7);
    expect(3 + 3).toBeLessThanOrEqual(6);
  });
  
  test('strings', () => {
    expect('Hello').toMatch(/ell/);
    expect('Hello').toContain('ell');
  });
  
  test('arrays', () => {
    expect([1, 2, 3]).toContain(2);
    expect([1, 2, 3]).toHaveLength(3);
  });
  
  test('objects', () => {
    expect({ a: 1, b: 2 }).toHaveProperty('a');
    expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
  });
});
```

### Setup and Teardown

```javascript
describe('Database operations', () => {
  let db;
  
  beforeEach(() => {
    // Setup before each test
    db = createTestDatabase();
    db.connect();
  });
  
  afterEach(() => {
    // Cleanup after each test
    db.disconnect();
  });
  
  beforeAll(() => {
    // Setup once before all tests
    initializeTestEnv();
  });
  
  afterAll(() => {
    // Cleanup once after all tests
    cleanupTestEnv();
  });
  
  test('saves data', () => {
    db.save({ id: 1 });
    expect(db.get(1)).toEqual({ id: 1 });
  });
});
```

### Mocking

```javascript
// user.js
export function getUser(id) {
  // Actual API call
  return fetch(`/api/users/${id}`).then(r => r.json());
}

// user.test.js
import * as userModule from './user';

describe('User API', () => {
  test('fetches user data', async () => {
    // Mock the fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ id: 1, name: 'John' })
      })
    );
    
    const user = await userModule.getUser(1);
    expect(user.name).toBe('John');
    expect(global.fetch).toHaveBeenCalledWith('/api/users/1');
  });
  
  test('handles fetch error', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    );
    
    await expect(userModule.getUser(1)).rejects.toThrow('Network error');
  });
});

// Mock modules
jest.mock('./api', () => ({
  fetchUsers: jest.fn(() => Promise.resolve([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ]))
}));
```

---

## DOM Testing with Testing Library

```bash
npm install --save-dev @testing-library/dom @testing-library/jest-dom
```

```javascript
// button.js
export function createButton(onClick) {
  const btn = document.createElement('button');
  btn.textContent = 'Click me';
  btn.addEventListener('click', onClick);
  return btn;
}

// button.test.js
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { createButton } from './button';

test('button calls callback on click', async () => {
  const handleClick = jest.fn();
  const button = createButton(handleClick);
  document.body.appendChild(button);
  
  const user = userEvent.setup();
  await user.click(screen.getByText('Click me'));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

---

## Browser DevTools Debugging

### Console Logging

```javascript
// Basic logging
console.log('Basic message', value);

// Error logging
console.error('Error occurred', error);

// Warning logging
console.warn('Warning: deprecated');

// Table output
console.table([
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
]);

// Grouped logs
console.group('API Calls');
console.log('GET /users');
console.log('POST /posts');
console.groupEnd();

// Timed logs
console.time('operation');
// ... do work ...
console.timeEnd('operation');
```

### Breakpoint Types

```javascript
// Line breakpoint - pause at specific line
debugger; // Inline breakpoint in code

// Function breakpoint
function fetchData() {
  // Set breakpoint here to pause on entry
  return fetch('/api/data');
}

// Conditional breakpoint
let count = 0;
setInterval(() => {
  count++;
  if (count === 100) {
    debugger; // Only pause when count is 100
  }
}, 10);

// DOM breakpoint
// Right-click element → Break on → subtree modifications, attributes, node removal
```

### Debugging Async Code

```javascript
// Async function debugging
async function fetchAndDisplay() {
  const data = await fetch('/api/data').then(r => r.json());
  // Add breakpoint here to inspect data
  console.log(data);
}

// Promise chain debugging
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    debugger; // Pause here
    console.log(data);
  })
  .catch(error => {
    debugger; // Pause on error
    console.error(error);
  });
```

### Performance Profiling

```javascript
// Start recording performance
performance.mark('start');

// Do work
processLargeDataset();

// End recording
performance.mark('end');
performance.measure('processing', 'start', 'end');

// Analyze
const measure = performance.getEntriesByName('processing')[0];
console.log(`Processing took ${measure.duration.toFixed(2)}ms`);

// Compare implementations
console.time('method1');
method1();
console.timeEnd('method1');

console.time('method2');
method2();
console.timeEnd('method2');
```

---

## Network Debugging

### Fetch Interception

```javascript
// Log all fetch calls
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('Fetching:', args[0]);
  return originalFetch.apply(this, args).then(response => {
    console.log('Response:', response.status);
    return response;
  });
};
```

### XHR Debugging

```javascript
// Monitor XMLHttpRequest
const originalOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url) {
  console.log(`${method} ${url}`);
  return originalOpen.apply(this, arguments);
};
```

### Network Conditions Simulation

```javascript
// Simulate slow network
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithDelay(url, delayMs = 2000) {
  await delay(delayMs);
  return fetch(url);
}

// Test slow connection
fetchWithDelay('/api/data', 3000)
  .then(r => r.json())
  .catch(e => console.error('Timeout or error:', e));
```

---

## Common Debugging Patterns

### Null/Undefined Checks

```javascript
// Safe navigation
const name = user?.profile?.name ?? 'Unknown';

// Optional chaining with function calls
const result = user?.getData?.() ?? null;

// Defensive logging
console.log({
  userId: user?.id,
  userName: user?.name,
  userEmail: user?.email
});
```

### Type Checking in Callbacks

```javascript
// Debug what type is being passed
document.addEventListener('click', (e) => {
  console.log({
    type: typeof e,
    class: e.constructor.name,
    target: e.target,
    targetType: e.target.constructor.name
  });
});
```

### Async/Await Debugging

```javascript
// Add logging to async operations
async function fetchUserWithLogging(id) {
  console.time(`fetch-user-${id}`);
  try {
    const response = await fetch(`/api/users/${id}`);
    console.log('Response status:', response.status);
    
    const data = await response.json();
    console.log('Parsed data:', data);
    
    console.timeEnd(`fetch-user-${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    console.timeEnd(`fetch-user-${id}`);
    throw error;
  }
}
```

---

## Best Practices

✅ **DO:**
- Write tests for critical business logic
- Mock external dependencies
- Use descriptive test names
- Test user behavior, not implementation
- Use meaningful assertions
- Clean up after tests
- Profile before optimizing
- Use source maps for debugging

❌ **DON'T:**
- Skip testing difficult code
- Mock everything (defeats purpose)
- Write tests that are hard to understand
- Test private implementation details
- Ignore console errors/warnings
- Pause to debug every issue
- Over-complicate test setup

