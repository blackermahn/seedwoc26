# DOM Manipulation Mastery

## Core Concepts

### Selecting Elements

#### getElementById
```javascript
const element = document.getElementById('myId');
// Fast, unique selector
```

#### querySelector(All)
```javascript
// Single element
const element = document.querySelector('.class-name');
const element = document.querySelector('div.active');
const element = document.querySelector('[data-id="123"]');

// Multiple elements
const elements = document.querySelectorAll('.item');
// Returns NodeList (not live)

// Search within subtree
const parent = document.getElementById('container');
const children = parent.querySelectorAll('.child');
```

#### getElementsBy* (Legacy)
```javascript
document.getElementsByClassName('active');     // HTMLCollection (live)
document.getElementsByTagName('div');          // HTMLCollection (live)
document.getElementsByName('radio');           // NodeList
```

**Difference:**
- `querySelector` - static, newer, CSS selectors
- `getElementsBy*` - live collections, faster for simple selectors

### Creating & Inserting Elements

#### createElement
```javascript
const div = document.createElement('div');
div.className = 'container';
div.textContent = 'Hello';
div.id = 'main';

// Or set attributes
div.setAttribute('data-index', '0');
div.setAttribute('aria-label', 'Main container');
```

#### appendChild vs insertBefore
```javascript
// Add at end
parent.appendChild(newElement);

// Add at position
parent.insertBefore(newElement, parent.firstChild);
parent.insertBefore(newElement, parent.children[2]);

// Insert adjacent
element.insertAdjacentHTML('beforebegin', '<h1>Title</h1>');
element.insertAdjacentHTML('afterbegin', '<p>Start</p>');
element.insertAdjacentHTML('beforeend', '<p>End</p>');
element.insertAdjacentHTML('afterend', '<footer>Bottom</footer>');

// Clone and insert
const clone = element.cloneNode(true);  // true = deep clone
parent.appendChild(clone);
```

### Removing Elements

```javascript
// Remove element
element.remove();
// or
element.parentNode.removeChild(element);

// Clear all children
parent.innerHTML = '';  // Caution: loses event listeners
// or
while (parent.firstChild) {
  parent.removeChild(parent.firstChild);
}
```

## Attributes & Properties

### Setting Attributes
```javascript
// String attributes
element.setAttribute('disabled', '');
element.setAttribute('data-value', 'test');

// Remove attribute
element.removeAttribute('disabled');

// Check attribute
if (element.hasAttribute('disabled')) {
  // ...
}

// Get attribute
const value = element.getAttribute('data-value');
```

### Using Properties
```javascript
// Direct property assignment (preferred)
input.disabled = true;
button.title = 'Click me';
div.className = 'active';
img.src = '/image.png';
a.href = '/page';

// Read properties
console.log(input.disabled);
console.log(div.className);

// Special case: class manipulation
div.classList.add('active');
div.classList.remove('inactive');
div.classList.toggle('highlighted');
div.classList.contains('active');  // boolean
```

### Data Attributes
```javascript
// Set via HTML
// <div data-id="123" data-user="john"></div>

// Access via dataset
const id = element.dataset.id;      // '123'
const user = element.dataset.user;  // 'john'

// Set via dataset
element.dataset.timestamp = Date.now();
element.dataset.isActive = true;

// In attribute form
element.getAttribute('data-timestamp');
```

## Styling Elements

### Inline Styles
```javascript
element.style.color = 'red';
element.style.backgroundColor = 'blue';  // CamelCase
element.style.padding = '10px';
element.style.fontSize = '16px';

// Multiple styles
Object.assign(element.style, {
  color: 'red',
  backgroundColor: 'white',
  padding: '10px'
});
```

### Classes (Preferred)
```javascript
// Toggle class
element.classList.toggle('active');

// Add multiple
element.classList.add('visible', 'highlight');

// Remove multiple
element.classList.remove('hidden', 'disabled');

// Replace class
element.classList.replace('old-class', 'new-class');

// Check
if (element.classList.contains('active')) {
  // ...
}
```

### Computed Styles
```javascript
// Get computed style (includes CSS)
const style = window.getComputedStyle(element);
const color = style.color;
const width = style.width;

// Note: always returns computed value
const display = style.display;  // 'block', not ''
```

## Event Handling

### addEventListener (Modern)
```javascript
element.addEventListener('click', (e) => {
  console.log('Clicked!');
  e.preventDefault();
  e.stopPropagation();
});

// Remove listener
const handler = (e) => console.log('clicked');
element.addEventListener('click', handler);
element.removeEventListener('click', handler);

// Once
element.addEventListener('click', () => {
  console.log('Only triggered once');
}, { once: true });

// Capture phase
element.addEventListener('click', handler, true);
```

### Event Delegation
```javascript
// Efficient: One listener for many elements
const list = document.getElementById('list');

list.addEventListener('click', (e) => {
  const item = e.target.closest('li');  // Find nearest li
  
  if (item) {
    console.log('Clicked item:', item.textContent);
    item.classList.toggle('selected');
  }
});
```

### Common Events
```javascript
// Form events
input.addEventListener('change', (e) => {  // After blur
  console.log(e.target.value);
});

input.addEventListener('input', (e) => {   // Real-time
  console.log(e.target.value);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Validate and send
});

// Mouse events
element.addEventListener('mouseenter', () => {});
element.addEventListener('mouseleave', () => {});
element.addEventListener('mouseover', () => {});   // Bubbles
element.addEventListener('mouseout', () => {});    // Bubbles

// Keyboard events
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { }
  if (e.key === 'Escape') { }
  if (e.ctrlKey && e.key === 's') { }
});
```

## Traversing the DOM

### Navigation Properties
```javascript
element.parentNode              // Parent node
element.parentElement           // Parent element
element.children                // Child elements
element.childNodes              // Child nodes (text, comment, etc)
element.firstChild              // First node
element.firstElementChild       // First element
element.lastChild               // Last node
element.lastElementChild        // Last element
element.nextSibling             // Next node
element.nextElementSibling      // Next element
element.previousSibling         // Previous node
element.previousElementSibling  // Previous element
```

### Traversing Up
```javascript
function findAncestor(element, className) {
  while (element) {
    if (element.classList?.contains(className)) {
      return element;
    }
    element = element.parentElement;
  }
  return null;
}

// Or use closest()
const container = element.closest('.container');
```

### Traversing Down
```javascript
function getAllDescendants(element) {
  const descendants = [];
  
  for (const child of element.children) {
    descendants.push(child);
    descendants.push(...getAllDescendants(child));
  }
  
  return descendants;
}

// Or use querySelectorAll
const descendants = element.querySelectorAll('*');
```

## Performance Optimization

### Batch DOM Updates
```javascript
// Bad: Multiple reflows
for (let i = 0; i < 1000; i++) {
  ul.innerHTML += '<li>' + i + '</li>';  // Reflow each time
}

// Good: Single reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = i;
  fragment.appendChild(li);
}
ul.appendChild(fragment);
```

### Use innerHTML for Bulk Content
```javascript
// Good for setting lots of content
container.innerHTML = `
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
`;
```

### Avoid Layout Thrashing
```javascript
// Bad: Interleaving reads/writes
for (let i = 0; i < elements.length; i++) {
  elements[i].style.left = (elements[i].offsetLeft + 10) + 'px';
  // Read offsetLeft (layout) → Write style (layout) → Repeat
}

// Good: Batch reads then writes
const positions = elements.map(el => el.offsetLeft + 10);
elements.forEach((el, i) => {
  el.style.left = positions[i] + 'px';
});
```

### Caching References
```javascript
// Bad: Repeated queries
for (let i = 0; i < 1000; i++) {
  document.querySelector('.item').textContent += i;  // Slow
}

// Good: Cache reference
const item = document.querySelector('.item');
for (let i = 0; i < 1000; i++) {
  item.textContent += i;
}
```

## Best Practices

✅ **DO:**
- Use `querySelector` for flexibility
- Use class names for styling
- Use event delegation
- Cache DOM references
- Batch DOM updates
- Use fragments for bulk inserts
- Remove listeners when done

❌ **DON'T:**
- Use `innerHTML` for single elements
- Store DOM references globally
- Traverse large DOMs repeatedly
- Modify styles in loops
- Use `eval()` on HTML
- Forget to remove event listeners
- Trust user input in innerHTML

