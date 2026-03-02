# Advanced JavaScript Scenarios

## Real-World Application Patterns

### E-Commerce Cart System

```javascript
class ShoppingCart {
  constructor() {
    this.items = [];
    this.subscribers = [];
  }

  addItem(product, quantity = 1) {
    const existing = this.items.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ ...product, quantity });
    }
    
    this.notifySubscribers();
    return this;
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.notifySubscribers();
    return this;
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item && quantity > 0) {
      item.quantity = quantity;
      this.notifySubscribers();
    }
    return this;
  }

  getTotal() {
    return this.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  getTax(rate = 0.08) {
    return this.getTotal() * rate;
  }

  getSubtotal() {
    return this.getTotal() + this.getTax();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => {
      callback({
        total: this.getTotal(),
        itemCount: this.items.length,
        items: [...this.items]
      });
    });
  }

  clear() {
    this.items = [];
    this.notifySubscribers();
    return this;
  }

  serialize() {
    return JSON.stringify(this.items);
  }

  deserialize(json) {
    this.items = JSON.parse(json);
    this.notifySubscribers();
    return this;
  }
}

// Usage
const cart = new ShoppingCart();

cart.subscribe((state) => {
  console.log(`Cart updated: ${state.itemCount} items, $${state.total}`);
});

cart.addItem({ id: 1, name: 'Book', price: 15.99 }, 2);
```

### Real-Time Data Sync

```javascript
class DataSync {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.data = null;
    this.lastUpdate = null;
    this.retrying = false;
  }

  async fetchWithRetry(maxRetries = 3) {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(this.apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        this.data = await response.json();
        this.lastUpdate = new Date();
        this.retrying = false;
        
        return this.data;
      } catch (error) {
        lastError = error;
        this.retrying = true;
        
        if (i < maxRetries - 1) {
          const delay = Math.pow(2, i) * 1000; // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  }

  async syncPeriodically(intervalMs = 5000) {
    while (true) {
      try {
        await this.fetchWithRetry();
        console.log('Sync successful');
      } catch (error) {
        console.error('Sync failed:', error.message);
      }
      
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
  }

  getAge() {
    return Date.now() - this.lastUpdate.getTime();
  }

  isStale(maxAge = 60000) {
    return !this.lastUpdate || this.getAge() > maxAge;
  }
}

// Usage
const sync = new DataSync('/api/data');
sync.syncPeriodically(5000).catch(console.error);
```

### Form Validation Engine

```javascript
class FormValidator {
  constructor(form) {
    this.form = form;
    this.rules = {};
    this.errors = {};
  }

  addRule(fieldName, validator, message) {
    if (!this.rules[fieldName]) {
      this.rules[fieldName] = [];
    }
    
    this.rules[fieldName].push({ validator, message });
    return this;
  }

  async validate() {
    this.errors = {};
    
    for (const [fieldName, validators] of Object.entries(this.rules)) {
      const field = this.form.elements[fieldName];
      
      for (const { validator, message } of validators) {
        try {
          const isValid = await Promise.resolve(
            validator(field.value, field)
          );
          
          if (!isValid) {
            if (!this.errors[fieldName]) {
              this.errors[fieldName] = [];
            }
            this.errors[fieldName].push(message);
          }
        } catch (error) {
          if (!this.errors[fieldName]) {
            this.errors[fieldName] = [];
          }
          this.errors[fieldName].push(error.message);
        }
      }
    }
    
    return Object.keys(this.errors).length === 0;
  }

  getErrors(fieldName) {
    return this.errors[fieldName] || [];
  }
}

// Common validators
const validators = {
  required: (value) => value.trim().length > 0,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  minLength: (min) => (value) => value.length >= min,
  maxLength: (max) => (value) => value.length <= max,
  pattern: (regex) => (value) => regex.test(value),
  async unique(value, field) {
    const response = await fetch(`/api/check/${field.name}/${value}`);
    const { exists } = await response.json();
    return !exists;
  }
};

// Usage
const form = document.querySelector('form');
const validator = new FormValidator(form);

validator
  .addRule('email', validators.required, 'Email required')
  .addRule('email', validators.email, 'Invalid email')
  .addRule('password', validators.minLength(8), 'Min 8 chars')
  .addRule('username', validators.unique, 'Username taken');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (await validator.validate()) {
    form.submit();
  }
});
```

### Event Bus / Pub-Sub

```javascript
class EventBus {
  constructor() {
    this.events = new Map();
  }

  on(eventName, handler, options = {}) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    
    const listener = {
      handler,
      once: options.once || false
    };
    
    this.events.get(eventName).push(listener);
    
    // Return unsubscribe function
    return () => {
      const listeners = this.events.get(eventName);
      const idx = listeners.indexOf(listener);
      if (idx !== -1) {
        listeners.splice(idx, 1);
      }
    };
  }

  once(eventName, handler) {
    return this.on(eventName, handler, { once: true });
  }

  off(eventName, handler) {
    if (!this.events.has(eventName)) return;
    
    const listeners = this.events.get(eventName);
    const idx = listeners.findIndex(l => l.handler === handler);
    
    if (idx !== -1) {
      listeners.splice(idx, 1);
    }
  }

  emit(eventName, data) {
    if (!this.events.has(eventName)) return;
    
    const listeners = this.events.get(eventName);
    const toRemove = [];
    
    listeners.forEach((listener, idx) => {
      listener.handler(data);
      if (listener.once) {
        toRemove.push(idx);
      }
    });
    
    // Remove once listeners
    toRemove.reverse().forEach(idx => {
      listeners.splice(idx, 1);
    });
  }

  async emitAsync(eventName, data) {
    if (!this.events.has(eventName)) return;
    
    const listeners = this.events.get(eventName);
    const toRemove = [];
    
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      await listener.handler(data);
      if (listener.once) {
        toRemove.push(i);
      }
    }
    
    toRemove.reverse().forEach(idx => {
      listeners.splice(idx, 1);
    });
  }
}

// Usage
const bus = new EventBus();

bus.on('user:login', (user) => {
  console.log(`User logged in: ${user.name}`);
  updateUI(user);
});

bus.on('user:logout', () => {
  console.log('User logged out');
  clearUI();
});

// Emit events
bus.emit('user:login', { name: 'John', id: 1 });
bus.emit('user:logout');
```

### Throttling / Debouncing

```javascript
function debounce(func, delay) {
  let timeout;
  
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function throttle(func, limit) {
  let lastRun = 0;
  
  return function(...args) {
    const now = Date.now();
    
    if (now - lastRun >= limit) {
      func.apply(this, args);
      lastRun = now;
    }
  };
}

// Example: Search input
const searchInput = document.querySelector('#search');
const handleSearch = debounce(async (query) => {
  const results = await fetch(`/api/search?q=${query}`);
  displayResults(await results.json());
}, 300);

searchInput.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});

// Example: Scroll listener
const handleScroll = throttle(() => {
  if (isNearBottom()) {
    loadMore();
  }
}, 200);

window.addEventListener('scroll', handleScroll);
```

## Best Practices Summary

✅ **DO:**
- Use observer pattern for state changes
- Implement proper error handling
- Use async/await for clarity
- Validate user input
- Cache expensive data
- Implement retry logic
- Use event delegation

❌ **DON'T:**
- Block the main thread
- Ignore errors silently
- Create memory leaks
- Trust user input
- Fetch same data repeatedly
- Use busy-waiting loops
- Modify global state

