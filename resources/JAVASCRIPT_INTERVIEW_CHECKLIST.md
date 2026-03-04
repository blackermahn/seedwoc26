# JavaScript Interview Preparation Checklist

## Pre-Interview Preparation (1 Week)

### Understanding Core Concepts
- [ ] Read [Best Practices](./javascript-guides/BEST_PRACTICES.md)
- [ ] Review [Quick Reference](./javascript-guides/QUICK_REFERENCE.md)
- [ ] Understand JavaScript's single-threaded nature
- [ ] Know the event loop and call stack
- [ ] Understand prototypal inheritance
- [ ] Know the difference between let, const, var
- [ ] Understand closures deeply

### Learning Fundamentals

**Data Types & Variables**
- [ ] Primitive types (string, number, boolean, null, undefined, symbol, bigint)
- [ ] Type coercion rules (loose and strict equality)
- [ ] Variable scope (global, function, block)
- [ ] Hoisting behavior (variables and functions)
- [ ] `this` binding in different contexts

**Functions**
- [ ] Function declaration vs expression
- [ ] Arrow function syntax and behavior
- [ ] Default parameters
- [ ] Rest and spread operators
- [ ] Callbacks and error handling
- [ ] Returning functions (higher-order functions)

**Objects & Arrays**
- [ ] Object creation and manipulation
- [ ] Destructuring (objects and arrays)
- [ ] Array methods (map, filter, reduce, forEach)
- [ ] Spreading and merging
- [ ] Iteration (for...in, for...of, forEach)

**Asynchronous JavaScript**
- [ ] Promises (states, chaining, error handling)
- [ ] Async/await syntax
- [ ] Event handling
- [ ] Timers (setTimeout, setInterval)
- [ ] Callbacks vs Promises vs Async/Await

### Advanced Concepts (Must Know)
- [ ] Read [Advanced Patterns](./javascript-guides/ADVANCED_PATTERNS.md)
- [ ] Study [Design Patterns](./javascript-guides/DESIGN_PATTERNS.md)
- [ ] Understand prototypal inheritance
- [ ] Know JavaScript's execution context
- [ ] Understand memoization and caching
- [ ] Know currying and partial application
- [ ] Understand generator functions
- [ ] Know about WeakMap and WeakSet

### Practice Coding
- [ ] Implement Promises from scratch
- [ ] Implement async/await using Promises
- [ ] Implement common array methods (map, filter, reduce)
- [ ] Create a simple event emitter
- [ ] Implement debounce and throttle
- [ ] Solve 20+ coding challenges on coding platform

### Interview Guide
- [ ] Study [Solutions and Examples](./javascript-guides/SOLUTIONS_AND_EXAMPLES.md)
- [ ] Practice answering verbal questions
- [ ] Prepare real-world examples
- [ ] Know edge cases for common patterns
- [ ] Write code on whiteboard/paper

---

## Interview Day Checklist

### Before Meeting
- [ ] Good internet connection (test it)
- [ ] Quiet environment without interruptions
- [ ] IDE or text editor ready (VS Code, etc.)
- [ ] Node.js installed and tested
- [ ] Sample code files at hand
- [ ] Pen and paper for notes/pseudocode
- [ ] Water and comfortable seating

### Mental Preparation
- [ ] Review key concepts in past 30 minutes
- [ ] Run through 5 common scenarios
- [ ] Practice explaining concepts aloud
- [ ] Know the job requirements
- [ ] Prepare questions for interviewer (2-3)
- [ ] Check company's tech stack

### During Interview
- [ ] Listen carefully to requirements
- [ ] Ask clarifying questions
- [ ] Think aloud about approach
- [ ] Write clean, readable code
- [ ] Test your code as you write it
- [ ] Discuss trade-offs and alternatives
- [ ] Handle errors gracefully

---

## Common Interview Questions Checklist

### Fundamental Questions

**Basic Concepts**
- [ ] "Explain the difference between `let`, `const`, and `var`"
  - Answer: `var` is function-scoped, `let`/`const` are block-scoped, `const` cannot be reassigned
- [ ] "What is hoisting?"
  - Answer: Variables and functions are moved to top of scope, undefined/TDZ errors occur
- [ ] "What does `this` refer to?"
  - Answer: Depends on how function is called (method, function, constructor, arrow)
- [ ] "Explain closures"
  - Answer: Function has access to outer scope even after outer function returns
- [ ] "What's the difference between `==` and `===`?"
  - Answer: `==` coerces types, `===` requires exact type match

**Functions & Scope**
- [ ] "What is a higher-order function?"
  - Answer: Function that takes or returns another function
- [ ] "Explain the difference between function declaration and expression"
  - Answer: Declarations are hoisted, expressions are not
- [ ] "What are arrow functions and how do they differ?"
  - Answer: Shorter syntax, lexical `this`, no own `arguments` object
- [ ] "How does `bind`, `call`, and `apply` work?"
  - Answer: All set `this` context; `call`/`apply` invoke, `bind` returns new function

### Intermediate Questions

**Asynchronous Programming**
- [ ] "Explain Promises and their states"
  - Answer: Pending → Fulfilled or Rejected; represent async operation result
- [ ] "What's the difference between Promise and Callback?"
  - Answer: Promises are chainable, avoid callback hell, cleaner error handling
- [ ] "Explain async/await"
  - Answer: Syntactic sugar over Promises, makes async code look synchronous
- [ ] "Walk me through the event loop"
  - Answer: Execution stack → Task queue → Microtask queue → rendering
- [ ] "What's a microtask vs macrotask?"
  - Answer: Microtasks (Promises) run before macrotasks (setTimeout), before rendering

**Arrays & Arrays Methods**
- [ ] "Implement `Array.map()`"
  ```javascript
  Array.prototype.customMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(callback(this[i], i, this));
    }
    return result;
  };
  ```
- [ ] "Implement `Array.filter()`"
  ```javascript
  Array.prototype.customFilter = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        result.push(this[i]);
      }
    }
    return result;
  };
  ```
- [ ] "Implement `Array.reduce()`"
  ```javascript
  Array.prototype.customReduce = function(callback, initial) {
    let accumulator = initial !== undefined ? initial : this[0];
    const start = initial !== undefined ? 0 : 1;
    for (let i = start; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
  };
  ```

**Objects & Inheritance**
- [ ] "Explain prototypal inheritance"
  - Answer: Objects inherit from other objects through [[Prototype]] chain
- [ ] "What's the difference between prototype and `__proto__`?"
  - Answer: `prototype` is property on constructors, `__proto__` is link on objects
- [ ] "How does `Object.create()` work?"
  - Answer: Creates new object with specified prototype, doesn't invoke constructor
- [ ] "What is the `instanceof` operator?"
  - Answer: Checks if object's prototype chain contains constructor's prototype

### Advanced Questions

**Performance & Optimization**
- [ ] "How would you optimize a JavaScript application?"
  - Answer: Lazy loading, code splitting, memoization, preventing memory leaks
- [ ] "What's debouncing and throttling?"
  - Answer: Debounce waits for pause, throttle limits execution frequency
- [ ] "Explain how JavaScript garbage collection works"
  - Answer: Mark-and-sweep algorithm removes unreachable objects
- [ ] "What causes memory leaks in JavaScript?"
  - Answer: Forgotten timers, detached DOM nodes, circular references

**Design Patterns**
- [ ] "Explain the Singleton pattern"
  - Answer: Only one instance exists, global access point
- [ ] "Explain the Factory pattern"
  - Answer: Function creates objects without specifying exact classes
- [ ] "Explain the Observer pattern"
  - Answer: Objects notify subscribers of state changes (e.g., event emitters)
- [ ] "Explain the Decorator pattern"
  - Answer: Adds functionality to objects without modifying original

### Coding Challenge Questions

**String Manipulation**
- [ ] "Implement `String.prototype.reverse()`"
- [ ] "Check if string is palindrome"
- [ ] "Find longest substring without repeating characters"
- [ ] "Implement `String.prototype.repeat()`"

**Array Manipulation**
- [ ] "Flatten nested array"
- [ ] "Find missing number in array"
- [ ] "Rotate array left/right"
- [ ] "Find two numbers that sum to target"

**Complex Problems**
- [ ] "Implement a Promise library"
- [ ] "Debounce/Throttle function"
- [ ] "Implement EventEmitter class"
- [ ] "Create a simple caching system (memoization)"
- [ ] "Implement function composition"
- [ ] "Implement array methods from scratch"

**Code Quality**
- [ ] "Write a function that handles both sync and async operations"
- [ ] "Implement error handling with retry logic"
- [ ] "Create a configurable logging system"
- [ ] "Write a plugin system"

---

## Implementation Examples

### 1. Debounce Function
```javascript
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Test
const logged = debounce(console.log, 300);
logged('Hello');
logged('World');  // Only this executes after 300ms
```

### 2. Promise Implementation
```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.handlers = [];
    
    executor(
      (value) => this.resolve(value),
      (reason) => this.reject(reason)
    );
  }
  
  resolve(value) {
    if (this.state !== 'pending') return;
    this.state = 'fulfilled';
    this.value = value;
    this.handlers.forEach(h => h());
  }
  
  reject(reason) {
    if (this.state !== 'pending') return;
    this.state = 'rejected';
    this.value = reason;
    this.handlers.forEach(h => h());
  }
  
  then(onFulfilled, onRejected) {
    // Implementation
  }
}
```

### 3. Shallow Copy vs Deep Copy
```javascript
// Shallow copy - only copies first level
const original = { a: 1, b: { c: 2 } };
const shallow = { ...original };
shallow.b.c = 3;  // Changes original too!

// Deep copy - copies everything
const deep = JSON.parse(JSON.stringify(original));
deep.b.c = 3;     // Original unchanged
```

### 4. Array Flattening
```javascript
// Method 1: Recursion
function flatten(arr) {
  if (!Array.isArray(arr)) return [arr];
  return arr.reduce((flat, item) => 
    flat.concat(flatten(item)), []
  );
}

// Method 2: Using toString and split
function flattenSimple(arr) {
  return arr.toString().split(',').map(Number);
}

// Test
console.log(flatten([1, [2, [3, 4]]]));  // [1, 2, 3, 4]
```

### 5. Event Emitter
```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => 
      callback(...args)
    );
  }
  
  off(event, callback) {
    this.events[event] = this.events[event]?.filter(
      cb => cb !== callback
    );
  }
}
```

---

## Common Mistakes to Avoid

❌ **Don't:**
- Confuse `==` and `===`
- Misunderstand `this` binding
- Forget about asynchronous behavior
- Ignore edge cases
- Write unreadable code

✅ **Do:**
- Test edge cases (empty arrays, null, undefined)
- Handle errors gracefully
- Write clean, readable code
- Show your thought process
- Ask for clarification

---

## Confidence Score Tracker

| Topic | Score (1-10) | Notes |
|-------|---|---|
| Variables & Scope | | |
| Functions | | |
| Closures | | |
| Promises & Async | | |
| Array Methods | | |
| Object Manipulation | | |
| Prototypal Inheritance | | |
| Design Patterns | | |
| Performance | | |
| Coding Challenges | | |

**Goal:** All topics at 8+ before interview

---

## Resources for Practice

- [Solutions and Examples](./javascript-guides/SOLUTIONS_AND_EXAMPLES.md) - 50+ examples
- [Design Patterns](./javascript-guides/DESIGN_PATTERNS.md) - 15+ patterns
- [Advanced Patterns](./javascript-guides/ADVANCED_PATTERNS.md) - Deep dives
- [Best Practices](./javascript-guides/BEST_PRACTICES.md) - Code quality
- [Testing and Debugging](./javascript-guides/TESTING_AND_DEBUGGING.md) - Quality assurance

---

## Practice Platforms

- **LeetCode** - Algorithm and data structure problems
- **HackerRank** - Coding challenges
- **Codewars** - Daily coding challenges
- **InterviewBit** - Interview-focused problems
- **Brilliant.org** - Computer science fundamentals

---

## After Interview

- [ ] Send thank you email within 24 hours
- [ ] Mention what you learned from our resources
- [ ] Highlight JavaScript expertise
- [ ] Ask about their development practices
- [ ] Show enthusiasm for the role

---

## Time Management During Interview

- **0-5 min:** Understand problem, ask clarifying questions
- **5-15 min:** Plan solution, pseudocode
- **15-35 min:** Write code
- **35-40 min:** Test code with examples
- **40-45 min:** Discuss edge cases and optimizations

---

## Most Important Concepts

1. **Event Loop** - Foundation of async JS
2. **Closures** - Powers many patterns
3. **Prototypal Inheritance** - How objects work
4. **Promises/Async-Await** - Modern async
5. **Array Methods** - Daily tools
6. **`this` Binding** - Tricky but important
7. **Type Coercion** - Common pitfall
8. **Memory & GC** - Performance matters

---

Good luck with your interview! 💪

Remember: **Communicate clearly + Show your thought process + Solve the problem = Success**

