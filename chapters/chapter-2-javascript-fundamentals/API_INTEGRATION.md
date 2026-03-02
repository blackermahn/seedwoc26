# JavaScript API Integration and Fetching

## Fetch API Basics

### Simple GET Request

```javascript
// Basic fetch
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// With async/await
async function getUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### POST Request

```javascript
// Basic POST
async function createUser(user) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Usage
createUser({ name: 'John', email: 'john@example.com' })
  .then(result => console.log('Created:', result))
  .catch(error => console.error('Failed:', error));
```

### Error Handling

```javascript
// Fetch only rejects on network errors, not HTTP errors
async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    // Check HTTP status
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource not found');
      }
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    throw error; // Re-throw for caller
  }
}
```

---

## Advanced Patterns

### Request Timeout

```javascript
// Implement timeout with AbortController
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

// Usage
fetchWithTimeout('https://api.example.com/data', 3000)
  .then(data => console.log(data))
  .catch(error => console.error(error.message));
```

### Retry Logic

```javascript
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Exponential backoff
      const waitTime = delay * Math.pow(2, i);
      console.log(`Retry ${i + 1}/${maxRetries} after ${waitTime}ms`);
      await new Promise(r => setTimeout(r, waitTime));
    }
  }
}
```

### Request Cancellation

```javascript
// Cancel requests using AbortController
class APIClient {
  constructor() {
    this.controllers = new Map();
  }
  
  async fetch(key, url, options = {}) {
    // Cancel previous request with same key
    if (this.controllers.has(key)) {
      this.controllers.get(key).abort();
    }
    
    const controller = new AbortController();
    this.controllers.set(key, controller);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      return await response.json();
    } finally {
      this.controllers.delete(key);
    }
  }
  
  cancel(key) {
    if (this.controllers.has(key)) {
      this.controllers.get(key).abort();
      this.controllers.delete(key);
    }
  }
}

// Usage
const client = new APIClient();
client.fetch('users', '/api/users');
client.cancel('users'); // Cancel users request
```

---

## Real-World Examples

### Pagination

```javascript
async function fetchAllPages(baseUrl) {
  const items = [];
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    const response = await fetch(`${baseUrl}?page=${page}`);
    const data = await response.json();
    
    items.push(...data.items);
    
    hasMore = data.hasNextPage;
    page++;
  }
  
  return items;
}
```

### Parallel Requests

```javascript
// Fetch multiple resources in parallel
async function getAllData() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json())
    ]);
    
    return { users, posts, comments };
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

// With error handling for individual requests
async function getAllDataSafe() {
  const results = await Promise.allSettled([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  return {
    users: results[0].status === 'fulfilled' ? results[0].value : null,
    posts: results[1].status === 'fulfilled' ? results[1].value : null,
    comments: results[2].status === 'fulfilled' ? results[2].value : null,
    errors: results.filter(r => r.status === 'rejected')
  };
}
```

### Request Caching

```javascript
class CachedAPIClient {
  constructor() {
    this.cache = new Map();
    this.cacheTTL = 5 * 60 * 1000; // 5 minutes
  }
  
  async fetch(url) {
    // Check cache
    if (this.cache.has(url)) {
      const { data, timestamp } = this.cache.get(url);
      if (Date.now() - timestamp < this.cacheTTL) {
        return data; // Return cached data
      }
    }
    
    // Fetch fresh data
    const response = await fetch(url);
    const data = await response.json();
    
    // Store in cache
    this.cache.set(url, { data, timestamp: Date.now() });
    
    return data;
  }
  
  invalidate(url) {
    this.cache.delete(url);
  }
  
  clear() {
    this.cache.clear();
  }
}

// Usage
const client = new CachedAPIClient();
const users1 = await client.fetch('/api/users'); // Network call
const users2 = await client.fetch('/api/users'); // From cache
client.invalidate('/api/users'); // Clear cache for URL
```

### Rate Limiting

```javascript
class RateLimitedClient {
  constructor(requestsPerSecond = 1) {
    this.requestsPerSecond = requestsPerSecond;
    this.requestTimes = [];
  }
  
  async fetch(url, options = {}) {
    await this.checkRateLimit();
    return fetch(url, options);
  }
  
  async checkRateLimit() {
    const now = Date.now();
    const oneSecondAgo = now - 1000;
    
    // Remove old timestamps
    this.requestTimes = this.requestTimes.filter(t => t > oneSecondAgo);
    
    // Check if we need to wait
    if (this.requestTimes.length >= this.requestsPerSecond) {
      const oldestRequest = this.requestTimes[0];
      const waitTime = oldestRequest + 1000 - now;
      await new Promise(r => setTimeout(r, waitTime));
    }
    
    this.requestTimes.push(now);
  }
}

// Usage - max 1 request per second
const client = new RateLimitedClient(1);
for (let i = 0; i < 5; i++) {
  console.log(`Request ${i + 1} at`, new Date().toLocaleTimeString());
  await client.fetch('/api/data');
}
```

---

## Working with Different APIs

### REST API

```javascript
// Standard REST patterns
async function restAPI(resourceUrl, options = {}) {
  const {
    method = 'GET',
    data = null,
    headers = {}
  } = options;
  
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };
  
  if (data) {
    config.body = JSON.stringify(data);
  }
  
  const response = await fetch(resourceUrl, config);
  
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  
  return response.json();
}

// REST CRUD operations
const api = '/api/users';
const user = await restAPI(api, { method: 'POST', data: { name: 'John' } });
const users = await restAPI(api);
const updated = await restAPI(`${api}/1`, { method: 'PUT', data: { name: 'Jane' } });
await restAPI(`${api}/1`, { method: 'DELETE' });
```

### GraphQL

```javascript
async function graphQLQuery(query, variables = {}) {
  const response = await fetch('https://api.example.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  });
  
  const { data, errors } = await response.json();
  
  if (errors) {
    throw new Error(errors[0].message);
  }
  
  return data;
}

// Usage
const query = `
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

const data = await graphQLQuery(query, { id: '123' });
console.log(data.user);
```

---

## Best Practices

✅ **DO:**
- Always check `response.ok` or status
- Use async/await for readability
- Implement retry logic for unreliable networks
- Cache when appropriate
- Use AbortController for cancellation
- Error handling at each level
- Validate API responses
- Use TypeScript for type safety

❌ **DON'T:**
- Assume fetch succeeded without checking status
- Ignore network errors
- Store sensitive data in responses
- Make unlimited requests
- Hardcode API URLs
- Fetch in loops (batch when possible)
- Ignore CORS issues
- Trust unvalidated API data

