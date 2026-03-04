# JavaScript Async Programming Master Guide

## Event Loop Understanding

### How JavaScript Works

```javascript
// JavaScript runs in a single thread

// 1. Call Stack - Where code executes
function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log('Hello');
}

first();

// Stack trace:
// first()
//   └─ second()
//       └─ third()
//           └─ console.log()

// 2. Web APIs - Timer, fetch, etc.
setTimeout(() => console.log('Later'), 1000);
// Handed to Web API, stack continues

// 3. Callback Queue - Callbacks waiting
// setTimeout callback goes here after 1 second

// 4. Event Loop - Moves callbacks when stack is empty
// Checks: Is stack empty? If yes, move callback from queue to stack
```

### Microtask vs Macrotask Queue

```javascript
// Microtask Queue (higher priority)
// - Promise .then, .catch, .finally
// - queueMicrotask()
// - MutationObserver

// Macrotask Queue (lower priority)  
// - setTimeout, setInterval, setImmediate
// - requestAnimationFrame
// - I/O operations

console.log('Start');

// Macrotask
setTimeout(() => console.log('setTimeout'), 0);

// Microtask
Promise.resolve()
  .then(() => console.log('Promise'));

// Synchronous
console.log('End');

// Output:
// Start
// End
// Promise      (microtask runs first)
// setTimeout   (macrotask runs after all microtasks)
```

---

## Advanced Async Patterns

### Async Generator Functions

```javascript
// Generator with async
async function* asyncGenerator() {
  yield 1;
  await new Promise(r => setTimeout(r, 100));
  yield 2;
  await new Promise(r => setTimeout(r, 100));
  yield 3;
}

// Consume async generator
(async () => {
  for await (const value of asyncGenerator()) {
    console.log(value);  // 1, 2, 3 (with delays)
  }
})();
```

### Queue Implementation

```javascript
class AsyncQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }
  
  async add(task) {
    this.queue.push(task);
    await this.process();
  }
  
  async process() {
    if (this.running) return;
    
    this.running = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      try {
        await task();
      } catch (error) {
        console.error('Task failed:', error);
      }
    }
    this.running = false;
  }
}

// Usage
const queue = new AsyncQueue();
queue.add(() => fetch('/api/data1'));
queue.add(() => fetch('/api/data2'));
queue.add(() => fetch('/api/data3'));
// Tasks run sequentially
```

### Timeout Wrapper

```javascript
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  return Promise.race([promise, timeout]);
}

// Usage
try {
  const data = await withTimeout(
    fetch('/slow-api'),
    5000  // 5 second timeout
  );
} catch (error) {
  console.error('Request timed out or failed');
}
```

### Retry with Exponential Backoff

```javascript
async function retryWithBackoff(
  fn,
  maxRetries = 3,
  initialDelay = 1000
) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = initialDelay * Math.pow(2, i);
      const jitter = delay * 0.1 * Math.random();
      
      console.log(`Retry ${i + 1} after ${delay + jitter}ms`);
      await new Promise(r => setTimeout(r, delay + jitter));
    }
  }
}
```

---

##AbortController for Cancellation

### Cancel Requests

```javascript
const controller = new AbortController();
const signal = controller.signal;

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch('/api/data', { signal });
  const json = await response.json();
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request cancelled');
  }
}

// Or cancel on user action
button.addEventListener('click', () => {
  controller.abort();
  console.log('Request cancelled by user');
});
```

### Linked Abort Controllers

```javascript
// Parent controller cancels children
const parentController = new AbortController();

const child1 = new AbortController();
const child2 = new AbortController();

parentController.signal.addEventListener('abort', () => {
  child1.abort();
  child2.abort();
});

// Cancel parent cancels all
parentController.abort();
```

---

## Worker Threads

### Web Worker

```javascript
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ command: 'calculate', data: 1000000 });

worker.onmessage = (event) => {
  console.log('Result:', event.data);
};

worker.onerror = (error) => {
  console.error('Worker error:', error.message);
};

// Terminate when done
worker.terminate();
```

```javascript
// worker.js
self.onmessage = (event) => {
  if (event.data.command === 'calculate') {
    const { data } = event.data;
    const result = heavyCalculation(data);
    self.postMessage({ result });
  }
};

function heavyCalculation(n) {
  // Long running computation
  return n * 2;
}
```

---

## Performance Patterns

### Debounce vs Throttle Comparison

```javascript
// Debounce - Execute after delay
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const debouncedSearch = debounce((query) => {
  fetch(`/api/search?q=${query}`);
}, 500);

input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
  // Only executes 500ms after typing stops
});

// Throttle - Execute at most once per interval
function throttle(fn, interval) {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= interval) {
      fn(...args);
      lastRun = now;
    }
  };
}

const throttledScroll = throttle(() => {
  console.log('Scrolling');
}, 1000);

window.addEventListener('scroll', throttledScroll);
// Executes at most once per second
```

### Request Deduplication

```javascript
class RequestCache {
  constructor() {
    this.cache = new Map();
  }
  
  async fetch(key, fn) {
    // Return cached promise if exists
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    // Create and cache promise
    const promise = fn().then(
      result => result,
      error => {
        this.cache.delete(key);  // Clear on error
        throw error;
      }
    );
    
    this.cache.set(key, promise);
    return promise;
  }
}

// Usage
const cache = new RequestCache();

// First call fetches
cache.fetch('users', () => fetch('/api/users').then(r => r.json()));

// Second call uses cache (same promise)
cache.fetch('users', () => fetch('/api/users').then(r => r.json()));
```

---

## Date and Time Handling

```javascript
// Create date
new Date();
new Date(2024, 0, 15);  // Jan 15, 2024
new Date('2024-01-15T10:30:00Z');

// Getting values
const date = new Date();
date.getFullYear();     // 2024
date.getMonth();        // 0-11 (Jan = 0)
date.getDate();         // 1-31
date.getDay();          // 0-6 (Sun = 0)
date.getHours();        // 0-23
date.getMinutes();      // 0-59
date.getSeconds();      // 0-59
date.getTime();         // Milliseconds since 1970

// Duration calculation
const start = new Date();
// ... do work ...
const end = new Date();
const duration = end - start;  // Milliseconds

// Formatting (modern)
date.toLocaleDateString('en-US');     // '1/15/2024'
date.toLocaleTimeString('en-US');     // '10:30:45 AM'
date.toLocaleString('en-US');         // '1/15/2024, 10:30:45 AM'

// Working with Intl (internationalization)
const formatter = new Intl.DateTimeFormat('fr-FR');
formatter.format(new Date());          // '15/01/2024'
```

---

## Best Practices

✅ **DO:**
- Understand event loop and microtask queue
- Use async/await for readability
- Handle Promise rejections
- Use AbortController for cancellation
- Debounce high-frequency events
- Cache repeated requests
- Use Web Workers for heavy computation
- Measure async operation duration
- Gracefully handle timeouts

❌ **DON'T:**
- Block the main thread
- Ignore Promise rejections
- Create memory leaks with listeners
- Send too many parallel requests
- Forget error handling in async code
- Assume fast network (always timeout)
- Mix callbacks and promises unnecessarily

