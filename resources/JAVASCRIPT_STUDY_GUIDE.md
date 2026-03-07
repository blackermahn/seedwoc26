# JavaScript Study Guide

## Week 1: Fundamentals (40 hours)

### Day 1-2: Variables, Types, Operators
**Topics to Cover:**
- [ ] Variable declaration (var, let, const)
- [ ] Primitive types (string, number, boolean, null, undefined, symbol, bigint)
- [ ] Type coercion and strict equality (==, ===)
- [ ] Operators (arithmetic, comparison, logical, bitwise)
- [ ] Template literals and string interpolation

**Resources:**
- [Best Practices](./javascript-guides/BEST_PRACTICES.md)
- Chapter 2 modules on fundamentals

**Practice Exercises:**
```javascript
// 1. Type coercion puzzles
console.log(0 == false);        // true
console.log(0 === false);       // false
console.log("5" + 3);          // "53"
console.log("5" - 3);          // 2

// 2. Declaring variables in different scopes
var x = 1;
let y = 2;
const z = 3;

// 3. Using template literals
const name = "Developer";
const message = `Hello, ${name}!`;
```

**Confidence Check:**
- [ ] Understand all primitive types
- [ ] Explain type coercion rules
- [ ] Know difference between var, let, const
- [ ] Comfortable with all operators

---

### Day 3-4: Control Flow
**Topics to Cover:**
- [ ] if/else, switch statements
- [ ] Truthy/falsy values
- [ ] Logical operators short-circuiting
- [ ] Loops (for, while, do-while)
- [ ] for...of and for...in
- [ ] break and continue

**Practice Exercises:**
```javascript
// 1. Conditional logic
const age = 25;
if (age < 13) {
  console.log("Child");
} else if (age < 18) {
  console.log("Teen");
} else {
  console.log("Adult");
}

// 2. Switch statement
const day = 3;
switch(day) {
  case 1: console.log("Monday"); break;
  case 2: console.log("Tuesday"); break;
  default: console.log("Other day");
}

// 3. Loops
for (let i = 0; i < 5; i++) {
  console.log(i);
}

const arr = [1, 2, 3];
for (const num of arr) {
  console.log(num);
}
```

**Confidence Check:**
- [ ] Truthy/falsy values memorized
- [ ] Comfortable with all loop types
- [ ] Know when to use for...of vs for...in
- [ ] Understand short-circuit evaluation

---

### Day 5: Functions
**Topics to Cover:**
- [ ] Function declaration vs expression
- [ ] Arrow functions
- [ ] Parameters and default values
- [ ] Rest parameters and spread operator
- [ ] Return values and void functions
- [ ] Function scope and closures intro

**Resources:**
- [Higher Order Functions](./javascript-guides/HIGHER_ORDER_FUNCTIONS.md)

**Practice Exercises:**
```javascript
// 1. Function declarations
function add(a, b) {
  return a + b;
}

// 2. Arrow functions
const multiply = (a, b) => a * b;

// 3. Default parameters
const greet = (name = "User") => `Hello, ${name}!`;

// 4. Rest parameters
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);

// 5. Spread operator
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];
```

**Confidence Check:**
- [ ] Know when to use each function syntax
- [ ] Understand arrow function `this` binding
- [ ] Comfortable with rest and spread
- [ ] Can explain closure concept

---

## Week 2: Objects & Arrays (40 hours)

### Day 6-7: Objects
**Topics to Cover:**
- [ ] Object literals
- [ ] Accessing properties (dot vs bracket)
- [ ] Object methods
- [ ] The `this` keyword
- [ ] Constructor functions
- [ ] Object.keys, Object.values, Object.entries

**Practice Exercises:**
```javascript
// 1. Object creation and access
const person = {
  name: "John",
  age: 30,
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

// 2. Destructuring
const { name, age } = person;
const { x, y, ...rest } = { x: 1, y: 2, z: 3 };

// 3. Object methods
Object.keys(person);        // ['name', 'age', 'greet']
Object.values(person);      // ['John', 30, function]
Object.entries(person);     // [['name', 'John'], ['age', 30], ...]

// 4. Merging objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
```

**Confidence Check:**
- [ ] Comfortable creating and modifying objects
- [ ] Understand `this` in different contexts
- [ ] Can destructure objects
- [ ] Know object iteration methods

---

### Day 8-9: Arrays
**Topics to Cover:**
- [ ] Array methods (push, pop, shift, unshift)
- [ ] Array iteration (map, filter, reduce, forEach)
- [ ] find, findIndex, some, every
- [ ] Array destructuring
- [ ] Spread operator with arrays
- [ ] Sorting and reversing

**Resources:**
- [Solutions and Examples](./javascript-guides/SOLUTIONS_AND_EXAMPLES.md)

**Practice Exercises:**
```javascript
const numbers = [1, 2, 3, 4, 5];

// 1. Map
const doubled = numbers.map(n => n * 2);  // [2, 4, 6, 8, 10]

// 2. Filter
const evens = numbers.filter(n => n % 2 === 0);  // [2, 4]

// 3. Reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);  // 15

// 4. Find
const firstEven = numbers.find(n => n % 2 === 0);  // 2

// 5. Some/Every
numbers.some(n => n > 3);      // true
numbers.every(n => n > 0);     // true

// 6. Destructuring
const [first, second, ...rest] = numbers;
```

**Confidence Check:**
- [ ] Master all array methods
- [ ] Understand reduce deeply
- [ ] Can chain methods
- [ ] Comfortable with destructuring

---

### Day 10: JSON
**Topics to Cover:**
- [ ] JSON syntax
- [ ] JSON.stringify and parse
- [ ] Handling Date objects
- [ ] Custom serialization/deserialization

**Practice:**
```javascript
// 1. Stringify
const obj = { name: "John", age: 30 };
const json = JSON.stringify(obj);

// 2. Parse
const parsed = JSON.parse(json);

// 3. With formatting
const formatted = JSON.stringify(obj, null, 2);

// 4. Custom replacer
const custom = JSON.stringify(obj, (key, value) => {
  if (typeof value === 'number') return value * 2;
  return value;
});
```

---

## Week 3: Advanced Concepts (40 hours)

### Day 11-12: Promises & Async/Await
**Topics to Cover:**
- [ ] Promise states and transitions
- [ ] Promise chaining
- [ ] .catch() and error handling
- [ ] Promise.all, Promise.race
- [ ] async/await syntax
- [ ] Error handling in async/await
- [ ] Async iteration

**Resources:**
- [Promises Deep Dive](./javascript-guides/PROMISES_DEEP_DIVE.md)
- [Async Programming](./javascript-guides/ASYNC_PROGRAMMING.md)

**Practice Exercises:**
```javascript
// 1. Promise chaining
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ id, name: "John" }), 1000);
  });
}

fetchUser(1)
  .then(user => console.log(user))
  .catch(err => console.error(err));

// 2. Async/await
async function getUser(id) {
  try {
    const user = await fetchUser(id);
    console.log(user);
  } catch (error) {
    console.error(error);
  }
}

// 3. Promise.all
const promises = [fetchUser(1), fetchUser(2), fetchUser(3)];
Promise.all(promises).then(users => console.log(users));

// 4. Async iteration
async function* asyncGen() {
  for (let i = 0; i < 3; i++) {
    yield new Promise(resolve => 
      setTimeout(() => resolve(i), 1000)
    );
  }
}
```

**Confidence Check:**
- [ ] Understand promise lifecycle
- [ ] Comfortable with async/await
- [ ] Can handle errors properly
- [ ] Know Promise.all vs Promise.race

---

### Day 13-14: Advanced Patterns
**Topics to Cover:**
- [ ] Closures deep understanding
- [ ] Higher-order functions
- [ ] Currying and partial application
- [ ] Decorators/middleware pattern
- [ ] Factory pattern
- [ ] Observer pattern

**Resources:**
- [Advanced Patterns](./javascript-guides/ADVANCED_PATTERNS.md)
- [Design Patterns](./javascript-guides/DESIGN_PATTERNS.md)

**Practice Exercises:**
```javascript
// 1. Closure
function makeCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

// 2. Currying
const add = (a) => (b) => (c) => a + b + c;
const add1 = add(1);
const add1And2 = add1(2);
const result = add1And2(3);  // 6

// 3. Higher-order function
function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

const double = x => x * 2;
const addOne = x => x + 1;
const composed = compose(double, addOne);
composed(5);  // (5 + 1) * 2 = 12

// 4. Observer pattern
class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }
  
  emit(event, data) {
    this.listeners[event]?.forEach(cb => cb(data));
  }
}
```

**Confidence Check:**
- [ ] Closure mastered
- [ ] Understand currying and partial application
- [ ] Can implement design patterns
- [ ] Know when to use each pattern

---

### Day 15: Testing & Debugging
**Topics to Cover:**
- [ ] Console methods (log, error, warn, table)
- [ ] Browser DevTools
- [ ] Debugger statement
- [ ] Testing frameworks (Jest basics)
- [ ] Writing testable code

**Resources:**
- [Testing and Debugging](./javascript-guides/TESTING_AND_DEBUGGING.md)

**Practice:**
```javascript
// 1. Logging
console.log("message");
console.error("error");
console.warn("warning");
console.table([{ name: "John" }, { name: "Jane" }]);

// 2. Debugger
function problematicFunction() {
  debugger;  // Execution pauses here
  const result = "something";
  return result;
}

// 3. Jest test
describe("add", () => {
  test("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

---

## Week 4: DOM & Web APIs (40 hours)

### Day 16-17: DOM Manipulation
**Topics to Cover:**
- [ ] Selecting elements
- [ ] Creating and modifying elements
- [ ] Attributes vs Properties
- [ ] Classes and styles
- [ ] Events and listeners
- [ ] Event delegation
- [ ] Event bubbling and capturing

**Resources:**
- [DOM Manipulation](./javascript-guides/DOM_MANIPULATION.md)
- [Web Development Essentials](./javascript-guides/WEB_DEVELOPMENT_ESSENTIALS.md)

**Practice:**
```javascript
// 1. Selecting elements
const elem = document.querySelector('.my-class');
const elems = document.querySelectorAll('li');
const byId = document.getElementById('myId');

// 2. Creating elements
const div = document.createElement('div');
div.className = 'container';
div.textContent = 'Hello';
document.body.appendChild(div);

// 3. Event listeners
elem.addEventListener('click', (e) => {
  console.log('Clicked!');
});

// 4. Event delegation
document.addEventListener('click', (e) => {
  if (e.target.matches('.btn')) {
    console.log('Button clicked');
  }
});

// 5. Styles
elem.style.color = 'red';
elem.classList.add('active');
```

**Confidence Check:**
- [ ] Can efficiently query DOM
- [ ] Understand event delegation
- [ ] Know event bubbling/capturing
- [ ] Comfortable with class manipulation

---

### Day 18-19: API Integration
**Topics to Cover:**
- [ ] Fetch API
- [ ] XMLHttpRequest (legacy)
- [ ] REST API principles
- [ ] JSON responses
- [ ] Error handling in requests
- [ ] Headers and authentication
- [ ] CORS

**Resources:**
- [API Integration](./javascript-guides/API_INTEGRATION.md)

**Practice:**
```javascript
// 1. Fetch GET
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// 2. Fetch POST
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'John', age: 30 })
})
  .then(response => response.json())
  .then(data => console.log(data));

// 3. With async/await
async function getUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch:', error);
  }
}

// 4. Error handling
fetch('/api/users')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  });
```

**Confidence Check:**
- [ ] Master Fetch API
- [ ] Handle CORS properly
- [ ] Understand REST principles
- [ ] Can implement retry logic

---

### Day 20: Performance & Optimization
**Topics to Cover:**
- [ ] Lazy loading
- [ ] Debouncing and throttling
- [ ] Memoization
- [ ] Web Workers basics
- [ ] Code splitting
- [ ] Asset optimization

**Resources:**
- [Performance Optimization](./javascript-guides/PERFORMANCE_OPTIMIZATION.md)

**Practice:**
```javascript
// 1. Debounce
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// 2. Throttle
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// 3. Memoization
const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];
    return (cache[key] = fn(...args));
  };
};

// 4. Lazy loading
const image = document.querySelector('img');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(image);
}
```

---

## Assessment

### Self-Assessment Rubric

| Skill | Not Started | Learning | Proficient | Mastered |
|-------|-----------|----------|-----------|----------|
| Variables & Types | | | | |
| Functions | | | | |
| Objects & Arrays | | | | |
| Promises/Async | | | | |
| DOM Manipulation | | | | |
| API Integration | | | | |
| Performance | | | | |
| Testing | | | | |

### Project Ideas (Choose 3)

1. **To-Do List App**
   - DOM manipulation
   - Local storage
   - Event listeners
   - Array methods

2. **Weather App**
   - Fetch API
   - Async/await
   - DOM updates
   - Error handling

3. **Calculator**
   - Functions
   - Event listeners
   - String/Number operations
   - State management

4. **Blog Platform**
   - CRUD operations
   - API integration
   - User authentication
   - Comments system

---

## Resources Quick Links

- [Design Patterns](./javascript-guides/DESIGN_PATTERNS.md)
- [Advanced Patterns](./javascript-guides/ADVANCED_PATTERNS.md)
- [Testing and Debugging](./javascript-guides/TESTING_AND_DEBUGGING.md)
- [Real World Patterns](./javascript-guides/REAL_WORLD_PATTERNS.md)
- [Modules and Build Tools](./javascript-guides/MODULES_AND_BUILD_TOOLS.md)

---

## Timeline Summary

**Week 1**: Fundamentals (40 hours) ✓
**Week 2**: Objects & Arrays (40 hours) ✓
**Week 3**: Advanced Concepts (40 hours) ✓
**Week 4**: DOM & Web APIs (40 hours) ✓

**Total**: 160 hours of structured learning
**Projects**: 3-5 practical applications
**Goal**: Production-ready JavaScript developer

