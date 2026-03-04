# JavaScript Promises Deep Dive

## Promise States and Transitions

### States

```javascript
// A promise starts in PENDING state
const promise = new Promise((resolve, reject) => {
  // Still pending here
  setTimeout(() => resolve('done'), 1000);
  // After 1 second, transitions to FULFILLED
});

// States:
// 1. Pending - Initial state, operation hasn't completed
// 2. Fulfilled - Operation completed successfully, has value
// 3. Rejected - Operation failed, has reason (error)

// A promise can only transition ONCE
// Once rejected/fulfilled, it cannot change
```

### Creating Promises

```javascript
// From scratch
const myPromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5;
  if (success) {
    resolve('Success!');
  } else {
    reject('Failed!');
  }
});

// Resolve immediately
Promise.resolve('value');

// Reject immediately
Promise.reject('error');

// From another promise
const resolved = Promise.resolve(fetch('/api/data'));
```

---

## Promise Chaining

### Basic Chain

```javascript
fetch('/api/users')
  .then(response => response.json())      // Step 1: Parse JSON
  .then(users => {
    console.log(users);                   // Step 2: Log users
    return users[0];                      // Step 3: Return first user
  })
  .then(user => {
    console.log('First user:', user);     // Step 4: Log first user
  })
  .catch(error => {
    console.error('Error:', error);       // Catches error from any step
  });
```

### Return Values

```javascript
// Each .then() returns a new promise
Promise.resolve(1)
  .then(x => {
    console.log(x); // 1
    return x + 1;   // Implicit promise wrapping
  })
  .then(x => {
    console.log(x); // 2
    return Promise.resolve(x + 1);  // Explicit wrapping
  })
  .then(x => {
    console.log(x); // 3
  });

// Returning a promise waits for it
Promise.resolve(1)
  .then(() => new Promise(r => setTimeout(() => r('delayed'), 1000)))
  .then(value => {
    console.log(value); // 'delayed' after 1 second
  });
```

---

## Promise Validation

### Promise.all()

```javascript
// Wait for ALL promises to resolve
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
])
  .then(async (responses) => {
    const data = await Promise.all(responses.map(r => r.json()));
    console.log('All data:', data);
  })
  .catch(error => {
    console.error('Any request failed:', error);
  });

// If one fails, entire chain fails
const results = await Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject('Error!') // This fails the whole thing
]);
// Throws error
```

### Promise.race()

```javascript
// First promise to settle wins
const firstResponse = await Promise.race([
  fetch('https://server1.com/data'),
  fetch('https://server2.com/data'),
  fetch('https://server3.com/data')
]);
// Returns first response from any server

// Timeout race
const timeoutPromise = new Promise((resolve, reject) =>
  setTimeout(() => reject('Timeout!'), 5000)
);

Promise.race([
  fetch('/api/data'),
  timeoutPromise
]).catch(error => {
  console.log(error); // Either fetch error or 'Timeout!'
});
```

### Promise.allSettled()

```javascript
// Like all(), but waits for all to SETTLE (resolve or reject)
const results = await Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Failed'),
  Promise.resolve('Also success')
]);

// Results:
// [
//   { status: 'fulfilled', value: 'Success' },
//   { status: 'rejected', reason: 'Failed' },
//   { status: 'fulfilled', value: 'Also success' }
// ]

// Process results
results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(`#${index} succeeded:`, result.value);
  } else {
    console.log(`#${index} failed:`, result.reason);
  }
});
```

---

## Error Handling

### Finally Block

```javascript
// Finally runs regardless of outcome
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
  .finally(() => {
    console.log('Request complete (success or failure)');
    // Cleanup code goes here
    // Close loading indicator
    // Reset UI state
  });
```

### Error Recovery

```javascript
// Recover from error with fallback
fetch('/api/users')
  .then(r => r.json())
  .catch(error => {
    console.errors('Primary failed, using fallback');
    return []; // Fallback value
  })
  .then(users => {
    console.log('Users:', users); // [] if error occurred
  });

// Selective error handling
fetch('/api/data')
  .then(r => r.json())
  .catch(error => {
    if (error.message === 'Network error') {
      return getLocalData(); // Fallback
    }
    throw error; // Re-throw other errors
  });
```

---

## Advanced Patterns

### Promise Pooling (Limit Concurrent Requests)

```javascript
async function promisePooling(tasks, concurrency = 3) {
  const results = [];
  const executing = [];
  
  for (const task of tasks) {
    const promise = Promise.resolve().then(task);
    results.push(promise);
    
    if (tasks.length >= concurrency) {
      executing.push(promise);
      promise.then(() => {
        executing.splice(executing.indexOf(promise), 1);
      });
      
      if (executing.length >= concurrency) {
        await Promise.race(executing);
      }
    }
  }
  
  return Promise.all(results);
}

// Usage - max 3 requests at a time
const urls = [
  '/api/user/1',
  '/api/user/2',
  '/api/user/3',
  '/api/user/4',
  '/api/user/5'
];

const tasks = urls.map(url => () => fetch(url).then(r => r.json()));
const results = await promisePooling(tasks, 3);
```

### Promise Memoization

```javascript
function memoizePromise(fn) {
  const cache = new Map();
  
  return async function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const promise = fn.apply(this, args);
    cache.set(key, promise);
    
    try {
      return await promise;
    } catch (error) {
      // Remove failed promise from cache
      cache.delete(key);
      throw error;
    }
  };
}

// Usage
const memoizedFetch = memoizePromise(async (url) => {
  const response = await fetch(url);
  return response.json();
});

// First call makes request
const data1 = await memoizedFetch('/api/users');

// Second call returns cached promise (no network call)
const data2 = await memoizedFetch('/api/users');

// Different URL makes new request
const data3 = await memoizedFetch('/api/posts');
```

### Retry with Exponential Backoff

```javascript
async function retryAsync(fn, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error; // Final attempt failed
      }
      
      // Exponential backoff: 1s, 2s, 4s, 8s, ...
      const delay = baseDelay * Math.pow(2, attempt);
      
      // Add jitter to prevent thundering herd
      const jitter = delay * 0.1 * Math.random();
      const waitTime = delay + jitter;
      
      console.log(`Attempt ${attempt + 1} failed, retrying in ${waitTime}ms`);
      await new Promise(r => setTimeout(r, waitTime));
    }
  }
}

// Usage
const data = await retryAsync(() => fetch('/api/data').then(r => r.json()), 5);
```

---

## Promise vs Callback vs Async/Await

### Callback Hell

```javascript
// Nested callbacks (hard to read)
function getUser(id, callback) {
  database.query(`SELECT * FROM users WHERE id = ${id}`, (err, user) => {
    if (err) callback(err, null);
    else {
      database.query(`SELECT * FROM posts WHERE userId = ${user.id}`, (err2, posts) => {
        if (err2) callback(err2, null);
        else {
          database.query(`SELECT * FROM comments WHERE userId = ${user.id}`, (err3, comments) => {
            if (err3) callback(err3, null);
            else callback(null, { user, posts, comments });
          });
        }
      });
    }
  });
}

getUser(1, (err, data) => {
  if (err) console.error(err);
  else console.log(data);
});
```

### Promise Chain

```javascript
// Better, but still nested
function getUser(id) {
  return database.query(`SELECT * FROM users WHERE id = ${id}`)
    .then(user =>
      database.query(`SELECT * FROM posts WHERE userId = ${user.id}`)
        .then(posts =>
          database.query(`SELECT * FROM comments WHERE userId = ${user.id}`)
            .then(comments => ({ user, posts, comments }))
        )
    );
}

getUser(1)
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Async/Await

```javascript
// Cleanest, most readable
async function getUser(id) {
  const user = await database.query(`SELECT * FROM users WHERE id = ${id}`);
  const posts = await database.query(`SELECT * FROM posts WHERE userId = ${user.id}`);
  const comments = await database.query(`SELECT * FROM comments WHERE userId = ${user.id}`);
  return { user, posts, comments };
}

// Usage
try {
  const data = await getUser(1);
  console.log(data);
} catch (err) {
  console.error(err);
}
```

---

## Best Practices

✅ **DO:**
- Return promises from functions
- Chain promises instead of nesting
- Use async/await for readability
- Catch errors at appropriate levels
- Use Promise.all for parallel operations
- Use finally for cleanup
- Understand promise states

❌ **DON'T:**
- Mix callbacks and promises
- Forget to catch errors
- Create "promise hell" with nesting
- Use promises when callbacks work fine
- Ignore promise rejection warnings
- Create unnecessary promises
- Forget that promises are async

