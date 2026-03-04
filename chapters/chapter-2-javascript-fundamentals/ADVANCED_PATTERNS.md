# Advanced JavaScript Patterns and Techniques

## Asynchronous Programming

### Callbacks (Legacy Pattern)

**Basic Callback:**
```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback(null, { id: 1, name: "John" });
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});
```

**Callback Hell (Avoid):**
```javascript
// Deeply nested callbacks
getUser(userId, function(user) {
  getOrders(user.id, function(orders) {
    getOrderItems(orders[0].id, function(items) {
      getPrice(items[0].id, function(price) {
        console.log(price); // Finally!
      });
    });
  });
});
```

---

### Promises

**Creating Promises:**
```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve({ id: 1, name: "John" });
    } else {
      reject(new Error("Failed to fetch"));
    }
  }, 1000);
});

promise
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

**Promise Chain:**
```javascript
fetchUser()
  .then(user => fetchOrders(user.id))
  .then(orders => fetchOrderItems(orders[0].id))
  .then(items => fetchPrice(items[0].id))
  .then(price => console.log(price))
  .catch(error => console.error(error))
  .finally(() => console.log("Done"));
```

**Promise.all (Wait for All):**
```javascript
Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments()
])
  .then(([user, posts, comments]) => {
    console.log(user, posts, comments);
  })
  .catch(error => console.error(error));
```

**Promise.race (First to Complete):**
```javascript
Promise.race([
  fetchWithServer1(),
  fetchWithServer2(),
  fetchWithServer3()
])
  .then(result => console.log("Fastest:", result))
  .catch(error => console.error("All failed:", error));
```

**Promise.allSettled (All Results):**
```javascript
Promise.allSettled([
  fetchUser(),
  fetchPosts(),
  fetchComments()
])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Result ${index}:`, result.value);
      } else {
        console.log(`Error ${index}:`, result.reason);
      }
    });
  });
```

---

### Async/Await

**Basic Async/Await:**
```javascript
async function getUserData() {
  try {
    const user = await fetchUser();
    const orders = await fetchOrders(user.id);
    const items = await fetchOrderItems(orders[0].id);
    return items;
  } catch (error) {
    console.error(error);
  }
}

getUserData().then(items => console.log(items));
```

**Parallel Requests:**
```javascript
async function getMultipleData() {
  try {
    // These run in sequence (slow)
    const user = await fetchUser();
    const posts = await fetchPosts();
    const comments = await fetchComments();
    
    return { user, posts, comments };
  } catch (error) {
    console.error(error);
  }
}

// parallelize with Promise.all
async function getMultipleDataFast() {
  try {
    const [user, posts, comments] = await Promise.all([
      fetchUser(),
      fetchPosts(),
      fetchComments()
    ]);
    
    return { user, posts, comments };
  } catch (error) {
    console.error(error);
  }
}
```

**Multiple Error Handling:**
```javascript
async function processData() {
  try {
    const data1 = await fetchData1();
  } catch (error) {
    console.error("Data1 error:", error);
  }
  
  try {
    const data2 = await fetchData2();
  } catch (error) {
    console.error("Data2 error:", error);
  }
  
  // Both execute even if one fails
}

// Or recover from errors
async function processDataWithRecovery() {
  const data1 = await fetchData1().catch(err => {
    console.error("Error:", err);
    return { default: true };
  });
  
  return data1;
}
```

---

## Closures and Scope

**Closure Example:**
```javascript
function createCounter() {
  let count = 0; // Captured in closure
  
  return {
    increment: function() {
      return ++count;
    },
    decrement: function() {
      return --count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount());  // 1
```

**Closure in Loops (Common Mistake):**
```javascript
// WRONG: All log 5
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i); // 5, 5, 5, 5, 5
  }, 100);
}

// CORRECT: Use let
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i); // 0, 1, 2, 3, 4
  }, 100);
}

// CORRECT: Create closure
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j); // 0, 1, 2, 3, 4
    }, 100);
  })(i);
}
```

---

## Higher-Order Functions

**Function That Returns Function:**
```javascript
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

**Function Composition:**
```javascript
function compose(...fns) {
  return function(value) {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
}

const add = x => y => x + y;
const multiply = x => y => x * y;
const toString = x => String(x);

const compute = compose(toString, multiply(2), add(3));
console.log(compute(5)); // (5 + 3) * 2 = "16"
```

**Pipe (Left to Right):**
```javascript
function pipe(...fns) {
  return function(value) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}

const process = pipe(
  x => x + 3,        // 5 + 3 = 8
  x => x * 2,        // 8 * 2 = 16
  x => String(x)     // "16"
);

console.log(process(5));
```

---

## Decorators and Wrappers

**Function Decorator:**
```javascript
function log(fn) {
  return function(...args) {
    console.log(`Calling ${fn.name} with`, args);
    const result = fn(...args);
    console.log(`Result:`, result);
    return result;
  };
}

const add = (a, b) => a + b;
const trackedAdd = log(add);

trackedAdd(2, 3);
// Calling add with [2, 3]
// Result: 5
```

**Memoization (Cache Results):**
```javascript
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log("From cache:", key);
      return cache[key];
    }
    
    console.log("Computing:", key);
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function expensive(n) {
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) sum += i;
  return n * sum;
}

const memoizedExpensive = memoize(expensive);
console.time("First call");
memoizedExpensive(5);
console.timeEnd("First call"); // ~1000ms

console.time("Second call");
memoizedExpensive(5);
console.timeEnd("Second call"); // <1ms
```

---

## Generators and Iterators

**Generator Function:**
```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = generateSequence();
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }
```

**Generator with Loop:**
```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

for (let value of generateSequence()) {
  console.log(value); // 1, 2, 3
}
```

**Generator for Lazy Evaluation:**
```javascript
function* infiniteNumbers() {
  let n = 0;
  while (true) {
    yield n++;
  }
}

const numbers = infiniteNumbers();
console.log(numbers.next()); // 0
console.log(numbers.next()); // 1
console.log(numbers.next()); // 2
// Only generates what we ask for
```

**Custom Iterator:**
```javascript
const iterable = {
  from: 1,
  to: 3,
  
  [Symbol.iterator]() {
    let current = this.from;
    return {
      next: () => {
        if (current <= this.to) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (let num of iterable) {
  console.log(num); // 1, 2, 3
}
```

---

## Currying and Partial Application

**Currying:**
```javascript
// Traditional
function sum(a, b, c) {
  return a + b + c;
}

// Curried
function curriedSum(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(curriedSum(1)(2)(3)); // 6

// Or with arrow functions
const curriedAdd = a => b => c => a + b + c;
```

**Partial Application:**
```javascript
function add(a, b, c) {
  return a + b + c;
}

// Apply first argument
const add5 = add.bind(null, 5);
console.log(add5(2, 3)); // 10

// Or create partial function
function partial(fn, ...args) {
  return function(...moreArgs) {
    return fn(...args, ...moreArgs);
  };
}

const add10 = partial(add, 10);
console.log(add10(2, 3)); // 15
```

---

## SOLID Principles in JavaScript

**Single Responsibility:**
```javascript
// GOOD
class UserValidator {
  validate(user) {
    // Only validation logic
  }
}

class UserRepository {
  save(user) {
    // Only database logic
  }
}

// BAD - Does too much
class User {
  validate() { ... }
  save() { ... }
  sendEmail() { ... }
}
```

**Open/Closed (Open for extension, closed for modification):**
```javascript
// GOOD - Can add new strategies without modifying
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  process(amount) {
    return this.strategy.pay(amount);
  }
}

class CreditCardPayment {
  pay(amount) { ... }
}

class PayPalPayment {
  pay(amount) { ... }
}
```

---

## Design Patterns

**Singleton:**
```javascript
const Singleton = (() => {
  let instance;
  
  return {
    getInstance() {
      if (!instance) {
        instance = {
          config: {},
          init() { ... }
        };
      }
      return instance;
    }
  };
})();

const app1 = Singleton.getInstance();
const app2 = Singleton.getInstance();
console.log(app1 === app2); // true
```

**Observer:**
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
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(cb => cb(data));
    }
  }
}

const emitter = new EventEmitter();
emitter.on("login", (user) => console.log("User logged in:", user));
emitter.emit("login", { name: "John" });
```

