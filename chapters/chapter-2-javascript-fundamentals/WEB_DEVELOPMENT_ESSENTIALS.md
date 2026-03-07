# JavaScript Web Development Essentials

## Modern JavaScript Standards

### ES6+ Features (Most Important)

```javascript
// Arrow Functions
const add = (a, b) => a + b;
const greet = name => `Hello, ${name}`;
const getId = () => Math.random();

// Template Literals
const name = 'John';
const age = 30;
const message = `${name} is ${age} years old`;

// Destructuring
const user = { name: 'John', email: 'john@example.com' };
const { name, email } = user;

const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Spread Operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Classes
class User {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello, ${this.name}`;
  }
}

// Promises
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});

// Default Parameters
function greet(name = 'Guest') {
  return `Hello, ${name}`;
}

// For...of Loop
const arr = [1, 2, 3];
for (const item of arr) {
  console.log(item);
}

// const and let
const constant = 'cannot change';
let variable = 'can change';
var oldStyle = 'avoid this';
```

---

## DOM Manipulation Best Practices

### Selecting Elements

```javascript
// Modern way
const element = document.querySelector('.my-class');
const elements = document.querySelectorAll('.my-class');

// Specific selectors
document.getElementById('id');
document.getElementsByClassName('class');
document.getElementsByTagName('div');

// Query with attribute selectors
document.querySelector('[data-id="123"]');
document.querySelectorAll('[data-user]');
```

### Modifying Elements

```javascript
// Text content (safe)
element.textContent = 'Hello';          // Escaped

// HTML (use carefully, XSS risk)
element.innerHTML = '<b>Bold</b>';      // Not escaped

// Safe approach
const fragment = document.createDocumentFragment();
const div = document.createElement('div');
div.textContent = userInput;            // Automatically escaped
fragment.appendChild(div);
element.appendChild(fragment);

// Attributes
element.setAttribute('data-id', '123');
element.getAttribute('data-id');
element.removeAttribute('data-id');

// Classes
element.classList.add('active');
element.classList.remove('active');
element.classList.toggle('active');
element.classList.contains('active');

// Styles
element.style.color = 'red';
element.style.cssText = 'color: red; font-size: 16px';
```

---

## Common Algorithms

### Array Operations

```javascript
// Map - transform each element
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);  // [2, 4, 6, 8, 10]

// Filter - keep matching elements
const evens = numbers.filter(n => n % 2 === 0);  // [2, 4]

// Reduce - combine into single value
const sum = numbers.reduce((acc, n) => acc + n, 0);  // 15

// Find - return first matching
const first = numbers.find(n => n > 2);  // 3

// Some - check if any match
const hasEven = numbers.some(n => n % 2 === 0);  // true

// Every - check if all match
const allPositive = numbers.every(n => n > 0);  // true

// Sort
const sorted = [...numbers].sort((a, b) => a - b);  // Descending: b - a

// Chaining
const result = numbers
  .filter(n => n > 2)
  .map(n => n * 2)
  .reduce((sum, n) => sum + n, 0);
```

### String Operations

```javascript
// Split and join
'hello world'.split(' ');          // ['hello', 'world']
['hello', 'world'].join('-');      // 'hello-world'

// Includes
'hello world'.includes('world');   // true

// Start/end
'hello world'.startsWith('hello'); // true
'hello world'.endsWith('world');   // true

// Repeat & Padstart
'ab'.repeat(3);                    // 'ababab'
'5'.padStart(3, '0');              // '005'

// Replace
'hello world'.replace('world', 'there');     // 'hello there'
'hello world'.replaceAll('l', 'L');         // 'heLLo worLd'

// Case
'hello'.toUpperCase();             // 'HELLO'
'HELLO'.toLowerCase();             // 'hello'

// Trim
'  hello  '.trim();                // 'hello'

// Regular expressions
/pattern/.test('string');          // true/false
'string'.match(/t.*/);             // Match and capture
'hello world'.search(/o/);         // Index of first match
```

---

## Data Structures

### Objects

```javascript
// Create
const user = { name: 'John', age: 30 };

// Access
user.name;           // Dot notation
user['name'];        // Bracket notation
user.missing;        // undefined

// Modify
user.name = 'Jane';
user.email = 'jane@example.com';
delete user.age;

// Check property
'name' in user;      // true
user.hasOwnProperty('name');  // true

// Get all keys
Object.keys(user);   // ['name', 'email']
Object.values(user); // ['Jane', 'jane@example.com']
Object.entries(user); // [['name', 'Jane'], ['email', 'jane@example.com']]

// Merge objects
Object.assign({}, user, { role: 'admin' });
{ ...user, role: 'admin' };
```

### Maps and Sets

```javascript
// Map - Any key type
const map = new Map();
map.set('key', 'value');
map.set(123, 'numeric key');
map.set({}, 'object key');

map.get('key');              // 'value'
map.has('key');              // true
map.delete('key');
map.size;                    // Number of entries
map.clear();

// Loop
for (const [key, value] of map) {
  console.log(key, value);
}

// Set - Unique values
const set = new Set([1, 2, 2, 3, 3, 3]);
console.log(set); // Set { 1, 2, 3 }

set.add(4);
set.has(2);       // true
set.delete(2);
set.size;         // Number of items
set.clear();
```

---

## Error Handling Patterns

### Try-Catch with Multiple Errors

```javascript
try {
  const response = await fetch('/api/data');
  const json = response.json();
  processData(json);
} catch (error) {
  if (error instanceof TypeError) {
    console.error('Network error:', error);
  } else if (error instanceof SyntaxError) {
    console.error('Invalid JSON:', error);
  } else {
    console.error('Unknown error:', error);
  }
}
```

### Error with Context

```javascript
class APIError extends Error {
  constructor(message, status, endpoint) {
    super(message);
    this.status = status;
    this.endpoint = endpoint;
  }
}

try {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new APIError(
      'API request failed',
      response.status,
      '/api/data'
    );
  }
} catch (error) {
  if (error instanceof APIError) {
    console.error(`API Error at ${error.endpoint}: ${error.status}`);
  }
}
```

---

## Debugging Techniques

### Console Methods

```javascript
console.log('Basic logging');
console.warn('Warning message');
console.error('Error message');
console.assert(value > 0, 'Value must be positive');

// Table
console.table([
  { name: 'John', age: 30 },
  { name: 'Jane', age: 28 }
]);

// Grouped
console.group('Details');
console.log('Item 1');
console.log('Item 2');
console.groupEnd();

// Time measurement
console.time('operation');
// ... do work ...
console.timeEnd('operation');

// Trace stack
console.trace('At this point');
```

### Debugging Async Code

```javascript
// Add logging
async function fetchData(url) {
  console.log(`Fetching: ${url}`);
  const start = performance.now();
  
  try {
    const response = await fetch(url);
    console.log(`Response status: ${response.status}`);
    
    const data = await response.json();
    console.log('Data:', data);
    
    const elapsed = performance.now() - start;
    console.log(`Completed in ${elapsed.toFixed(2)}ms`);
    
    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

// Using debugger
async function debug() {
  debugger; // Pauses here in DevTools
  const data = await fetchData('/api/data');
  debugger; // Pause to inspect data
  return data;
}
```

---

## Performance Tips

```javascript
// Cache DOM lookups
const container = document.getElementById('container');
container.appendChild(element);  // Fast
document.getElementById('container').appendChild(element);  // Slower

// Batch DOM updates
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(createItem(i));
}
document.body.appendChild(fragment);  // Single reflow

// Use event delegation
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    handleItemClick(e.target);
  }
});

// Avoid layout thrashing
// BAD: Alternates reads/writes
for (let i = 0; i < elements.length; i++) {
  elements[i].style.width = '100px';      // Write
  const width = elements[i].offsetWidth;  // Read (forces reflow)
}

// GOOD: Group reads and writes
const widths = elements.map(el => el.offsetWidth);  // All reads
elements.forEach((el, i) => {
  el.style.width = widths[i] + 'px';  // All writes
});
```

---

## Best Practices Summary

✅ **DO:**
- Use const by default, let when reassigning
- Use arrow functions for callbacks
- Use template literals for strings
- Use destructuring for cleaner code
- Validate and sanitize user input
- Handle errors explicitly
- Use semantic HTML
- Test critical paths
- Monitor performance
- Keep code DRY

❌ **DON'T:**
- Use var
- Trust user input
- Ignore errors
- Manually manipulate HTML without escaping
- Block the main thread
- Use innerHTML with untrusted data
- Create memory leaks with listeners
- Ignore browser compatibility
- Leave console logs in production
- Assume features are supported

