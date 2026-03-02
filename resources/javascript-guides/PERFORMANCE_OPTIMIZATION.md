# JavaScript Performance Optimization Guide

## DOM Performance

### Minimize Reflows and Repaints

**Reflow (Recalculation of Layout):**
```javascript
// BAD - Triggers 3 reflows
const element = document.getElementById('box');
element.style.width = '100px';    // Reflow 1
element.style.height = '100px';   // Reflow 2
element.style.margin = '10px';    // Reflow 3

// GOOD - Batch changes
element.style.width = '100px';
element.style.height = '100px';
element.style.margin = '10px';
// Only 1 reflow at end

// BETTER - Use class
element.classList.add('sized');
// CSS:
// .sized { width: 100px; height: 100px; margin: 10px; }

// BEST - Use cssText
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';
```

**Reading/Writing Separately:**
```javascript
// BAD - Alternates reads/writes (forces reflows)
element.style.width = '100px';
const width = element.offsetWidth;
element.style.height = '200px';
const height = element.offsetHeight;

// GOOD - Read all, then write all
const width = element.offsetWidth;
const height = element.offsetHeight;
element.style.width = '100px';
element.style.height = '200px';
```

### Event Delegation

**Without Delegation (Bad for Many Elements):**
```javascript
// If you have 1000 list items, this is 1000 listeners
const items = document.querySelectorAll('li');
items.forEach(item => {
  item.addEventListener('click', (e) => {
    console.log('Clicked:', e.target.textContent);
  });
});
// Memory usage: High
// Performance: Slower
```

**With Delegation (Better):**
```javascript
// Single listener on parent
const list = document.getElementById('myList');
list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Clicked:', e.target.textContent);
  }
});
// Memory usage: Minimal
// Performance: Better
```

**Event Delegated Dynamic List:**
```javascript
const list = document.getElementById('list');

// Single listener handles all current and future items
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    console.log('Clicked:', e.target.textContent);
  }
});

// Add new items dynamically
document.getElementById('addBtn').addEventListener('click', () => {
  const newItem = document.createElement('li');
  newItem.className = 'item';
  newItem.textContent = 'New Item';
  list.appendChild(newItem);
  // Already has listener via delegation
});
```

---

## JavaScript Execution

### Debounce (For High-Frequency Events)

```javascript
// BAD - Fires on every keystroke
const input = document.getElementById('search');
input.addEventListener('input', (e) => {
  fetchSearchResults(e.target.value);
  // If user types "hello", fires 5 times
});

// GOOD - Waits for typing to stop
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const debouncedFetch = debounce(
  (value) => fetchSearchResults(value),
  300
);

input.addEventListener('input', (e) => {
  debouncedFetch(e.target.value);
});
// Now fires once, 300ms after typing stops
```

### Throttle (For Continuous Events)

```javascript
// BAD - Fires potentially thousands of times during scroll
window.addEventListener('scroll', () => {
  updateScrollPosition();
});

// GOOD - Fires at most once per 100ms
function throttle(fn, delay) {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun > delay) {
      fn(...args);
      lastRun = now;
    }
  };
}

const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);

window.addEventListener('scroll', throttledScroll);
```

### Lazy Loading

```javascript
// BAD - Load all images upfront
const images = document.querySelectorAll('img');

// GOOD - Load only visible images
const lazyImages = document.querySelectorAll('img[data-src]');

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function loadImage(img) {
  img.src = img.dataset.src;
  img.removeAttribute('data-src');
}

window.addEventListener('scroll', () => {
  lazyImages.forEach(img => {
    if (isInViewport(img)) {
      loadImage(img);
    }
  });
});

// BEST - Use Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

lazyImages.forEach(img => observer.observe(img));
```

---

## Memory Management

### Memory Leaks in Event Listeners

**BAD - Creates memory leak:**
```javascript
class Component {
  constructor(element) {
    this.element = element;
    this.element.addEventListener('click', this.handleClick);
  }
  
  handleClick() {
    console.log(this); // 'this' is the element, not Component
  }
  
  destroy() {
    // Remove broken listener
    this.element.removeEventListener('click', this.handleClick);
    this.element = null; // Still leak if listener not removed
  }
}
```

**GOOD - Proper cleanup:**
```javascript
class Component {
  constructor(element) {
    this.element = element;
    this.handleClick = this.handleClick.bind(this);
    this.element.addEventListener('click', this.handleClick);
  }
  
  handleClick() {
    console.log(this); // Correctly points to Component
  }
  
  destroy() {
    this.element.removeEventListener('click', this.handleClick);
    this.element = null;
  }
}

const comp = new Component(document.getElementById('btn'));
// Later, when done:
comp.destroy();
```

### Large Data Structures

```javascript
// BAD - Keeps entire array in memory
function processLargeDataset(data) {
  const filtered = data.filter(x => x.valid);
  const mapped = filtered.map(x => x.value);
  const sorted = mapped.sort();
  return sorted;
}

// GOOD - Use generator for lazy evaluation
function* processLargeDataset(data) {
  for (const item of data) {
    if (item.valid) {
      yield item.value;
    }
  }
}

const processed = processLargeDataset(largeArray);
// Only processes what you iterate over

for (const value of processed) {
  // Process one at a time
}
```

---

## Rendering Performance

### Virtual DOM Concept (React/Vue)

```javascript
// BAD - Direct DOM manipulation
const list = document.getElementById('list');
const items = data.map(item => {
  const li = document.createElement('li');
  li.textContent = item.name;
  return li;
});
list.innerHTML = '';
items.forEach(li => list.appendChild(li));
// Causes multiple reflows

// GOOD - Batch DOM updates
const fragment = document.createDocumentFragment();
data.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item.name;
  fragment.appendChild(li);
});
list.innerHTML = '';
list.appendChild(fragment);
// Only 1 reflow
```

### RequestAnimationFrame

```javascript
// BAD - Fires at unpredictable times
let scrollTop = 0;
window.addEventListener('scroll', () => {
  scrollTop = window.scrollY;
  updateUI();
});

// GOOD - Syncs with browser refresh rate
let scrollTop = 0;
let ticking = false;

window.addEventListener('scroll', () => {
  scrollTop = window.scrollY;
  
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateUI();
      ticking = false;
    });
    ticking = true;
  }
});
```

---

## Code Splitting

### Dynamic Imports

```javascript
// BAD - Load everything upfront
import { HeavyEditor } from './editor.js';
import { ComplexChart } from './chart.js';
import { MapComponent } from './map.js';

// GOOD - Load only when needed
async function handleEditorTab() {
  const { HeavyEditor } = await import('./editor.js');
  new HeavyEditor();
}

async function handleChartTab() {
  const { ComplexChart } = await import('./chart.js');
  new ComplexChart();
}

document.getElementById('editorBtn').addEventListener('click', handleEditorTab);
document.getElementById('chartBtn').addEventListener('click', handleChartTab);
```

### Loading Indicators

```javascript
async function loadModule() {
  // Show loading state
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
  
  try {
    const module = await import('./heavy-module.js');
    loader.style.display = 'none';
    return module;
  } catch (err) {
    loader.textContent = 'Failed to load';
    throw err;
  }
}
```

---

## Resource Hints

```html
<!-- Preload critical resources -->
<link rel="preload" href="font.woff2" as="font" crossorigin>
<link rel="preload" href="critical.css" as="style">

<!-- Prefetch lower priority resources -->
<link rel="prefetch" href="next-page.js">
<link rel="prefetch" href="future-page.html">

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://api.example.com">
<link rel="dns-prefetch" href="https://cdn.example.com">
```

---

## Performance Measurement

### Performance API

```javascript
// Measure custom timing
performance.mark('operation-start');

// ... do work ...

performance.mark('operation-end');
performance.measure('operation', 'operation-start', 'operation-end');

const measure = performance.getEntriesByName('operation')[0];
console.log(`Operation took ${measure.duration}ms`);

// Use console.time for quick measurements
console.time('api-call');
const data = await fetch('/api/data');
console.timeEnd('api-call');
```

### Long Tasks Detection

```javascript
// Monitor for long tasks (> 50ms that block main thread)
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.warn(`Long task detected: ${entry.duration}ms`);
  }
});

observer.observe({ entryTypes: ['longtask'] });
```

---

## Best Practices Summary

✅ **DO:**
- Batch DOM reads and writes
- Use event delegation
- Debounce/throttle high-frequency events
- Lazy load images and modules
- Clean up event listeners
- Use requestAnimationFrame for animations
- Measure performance with Performance API
- Split code into smaller chunks

❌ **DON'T:**
- Trigger reflows unnecessarily
- Create memory leaks with listener
- Load everything upfront
- Block main thread with long tasks
- Ignore performance monitoring
- Assume your optimization works
- Over-optimize early (profile first)

