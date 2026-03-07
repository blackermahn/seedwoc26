# Higher-Order Functions in JavaScript

## Understanding Higher-Order Functions

A function that either:
1. Takes another function as argument
2. Returns a function
3. Or both

### Basic Example

```javascript
// Takes function as argument
function executeCallback(callback) {
  callback();
}

executeCallback(() => console.log('called'));

// Returns function
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
console.log(add5(3));  // 8
```

## Array Methods (Functional Programming)

### map: Transform Array

```javascript
const numbers = [1, 2, 3, 4, 5];

// Transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// Extract properties
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];

const names = users.map(u => u.name);
console.log(names);  // ['Alice', 'Bob']

// Complex transformation
const formatted = users.map(u => `${u.name} (${u.age})`);
// ['Alice (30)', 'Bob (25)']
```

### filter: Select Elements

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

// Keep even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);  // [2, 4, 6]

// Keep objects matching condition
const adults = users.filter(u => u.age >= 18);

// Chaining filters
const result = numbers
  .filter(n => n > 2)
  .filter(n => n < 6)
  .filter(n => n % 2 === 0);
console.log(result);  // [4]
```

### reduce: Aggregate Values

```javascript
const numbers = [1, 2, 3, 4, 5];

// Sum all
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum);  // 15

// Product
const product = numbers.reduce((acc, n) => acc * n, 1);
console.log(product);  // 120

// Build object
const grouped = users.reduce((acc, user) => {
  const key = user.age >= 30 ? 'senior' : 'junior';
  if (!acc[key]) acc[key] = [];
  acc[key].push(user);
  return acc;
}, {});

// Count occurrences
const text = 'hello world';
const charCount = text.split('').reduce((acc, char) => {
  acc[char] = (acc[char] || 0) + 1;
  return acc;
}, {});
// { h: 1, e: 1, l: 3, o: 2, ... }
```

### some/every: Boolean Results

```javascript
const numbers = [1, 2, 3, 4, 5];

// At least one matches
const hasEven = numbers.some(n => n % 2 === 0);
console.log(hasEven);  // true

// All match
const allPositive = numbers.every(n => n > 0);
console.log(allPositive);  // true

// Practical: Validate form
const form = document.querySelectorAll('input');
const isValid = Array.from(form).every(input => input.value.length > 0);
```

### find/findIndex: Search

```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

// Find first matching
const user = users.find(u => u.name === 'Bob');
console.log(user);  // { id: 2, name: 'Bob' }

// Find index
const index = users.findIndex(u => u.id === 2);
console.log(index);  // 1

// With default
const item = users.find(u => u.id === 999) || { id: 0, name: 'Unknown' };
```

## Chaining Methods

```javascript
// Pipeline pattern
const result = [1, 2, 3, 4, 5, 6]
  .filter(n => n > 2)        // [3, 4, 5, 6]
  .map(n => n * 2)           // [6, 8, 10, 12]
  .reduce((sum, n) => sum + n, 0);  // 36

// Real-world example
const total = users
  .filter(u => u.active)
  .map(u => u.balance)
  .reduce((sum, balance) => sum + balance, 0);
```

## Creating Higher-Order Functions

### Partial Application

```javascript
function multiply(x) {
  return function(y) {
    return x * y;
  };
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

### Composition

```javascript
// Compose functions
function compose(...fns) {
  return function(value) {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
}

const addOne = n => n + 1;
const double = n => n * 2;
const square = n => n * n;

const fn = compose(addOne, double, square);
console.log(fn(3));  // square(3)=9, double(9)=18, addOne(18)=19
```

### Pipe (Left to Right)

```javascript
function pipe(...fns) {
  return function(value) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}

const process = pipe(square, double, addOne);
console.log(process(3));  // square(3)=9, double(9)=18, addOne(18)=19
```

### Memoization

```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalculation = memoize((n) => {
  console.log(`Calculating ${n}...`);
  return n * n;
});

expensiveCalculation(5);  // Calculates
expensiveCalculation(5);  // From cache
expensiveCalculation(5);  // From cache
```

### Currying

```javascript
// Convert to curried function
function curry(fn) {
  const arity = fn.length;
  
  return function curried(...args) {
    if (args.length >= arity) {
      return fn(...args);
    }
    
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3));     // 6
console.log(curriedAdd(1, 2)(3));     // 6
console.log(curriedAdd(1)(2, 3));     // 6
```

### Debouncing

```javascript
function debounce(fn, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce((query) => {
  console.log('Searching for:', query);
  // Make API call
}, 300);

input.addEventListener('input', e => handleSearch(e.target.value));
```

### Throttling

```javascript
function throttle(fn, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const handleScroll = throttle(() => {
  console.log('Scrolling...');
  checkLoadMore();
}, 200);

window.addEventListener('scroll', handleScroll);
```

## Best Practices

✅ **DO:**
- Use array methods instead of loops
- Chain methods for readability
- Create reusable higher-order functions
- Use memoization for expensive operations
- Understand function composition

❌ **DON'T:**
- Nest too many callbacks
- Ignore performance of chains
- Mutate original arrays
- Create overly complex compositions
- Forget about error handling in chains

