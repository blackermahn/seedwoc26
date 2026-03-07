# Part 1: Selecting and Querying DOM Elements

## 📚 Part Overview

Learn to find, select, and query HTML elements from the DOM using JavaScript. Master all methods for accessing elements in your webpage.

## 🎯 Learning Objectives

By completing this part, you will:
- Understand the DOM structure
- Select elements by ID, class, and tag
- Use CSS selectors with querySelector
- Understand NodeLists vs HTMLCollections
- Query elements efficiently
- Traverse the DOM tree
- Use modern selection methods
- Best practices for element selection

## 🕐 Estimated Duration
- **Time**: 4-5 hours
- **Difficulty**: ⭐ Easy to Intermediate
- **Prerequisites**: Chapter 2, Part 1

## DOM Structure

```
HTML Document
    ↓
Window
    ↓
Document
    ├── html (root element)
    │   ├── head
    │   │   ├── title
    │   │   └── meta
    │   └── body
    │       ├── div#container
    │       │   ├── h1.title
    │       │   └── p.description
    │       └── footer
```

## Selection Methods

### By ID (getElementById)

```javascript
// HTML: <h1 id="title">Welcome</h1>
const element = document.getElementById("title");
console.log(element.textContent);  // "Welcome"

// Returns null if not found
const missing = document.getElementById("nonexistent");
console.log(missing);  // null
```

### By Class Name (getElementsByClassName)

```javascript
// HTML: <p class="text">Para 1</p>
//       <p class="text">Para 2</p>

const elements = document.getElementsByClassName("text");
console.log(elements.length);  // 2
console.log(elements[0].textContent);  // "Para 1"

// Returns HTMLCollection (array-like)
for (let i = 0; i < elements.length; i++) {
  console.log(elements[i].textContent);
}
```

### By Tag Name (getElementsByTagName)

```javascript
// HTML: <button>Click me</button>

const buttons = document.getElementsByTagName("button");
console.log(buttons.length);

for (const button of buttons) {
  button.addEventListener("click", () => {
    console.log("Clicked!");
  });
}
```

### querySelector (CSS Selectors)

```javascript
// Single element
const element = document.querySelector(".container");
const element2 = document.querySelector("#title");
const element3 = document.querySelector("h1");

// Complex selectors
const element4 = document.querySelector("div.container > p");
const element5 = document.querySelector("[data-id='123']");
```

### querySelectorAll (Multiple elements)

```javascript
const elements = document.querySelectorAll(".card");
console.log(elements.length);

// Returns NodeList (better than HTMLCollection)
elements.forEach(element => {
  console.log(element.textContent);
});

// Complex selectors
const active = document.querySelectorAll("button.active");
const inputs = document.querySelectorAll("input[type='text']");
```

## CSS Selectors Guide

| Selector | Meaning | Example |
|----------|---------|---------|
| # | ID selector | `#idname` |
| . | Class selector | `.classname` |
| element | Tag selector | `p`, `div` |
| , | Multiple selectors | `h1, h2, h3` |
| space | Descendant | `div p` |
| > | Direct child | `div > p` |
| + | Adjacent sibling | `h1 + p` |
| ~ | General sibling | `h1 ~ p` |
| [attr] | Attribute | `[data-id]` |
| [attr=val] | Attribute value | `[type="text"]` |
| :first-child | First child | `p:first-child` |
| :last-child | Last child | `p:last-child` |
| :nth-child(n) | Nth child | `p:nth-child(2)` |

## Traversing the DOM

```javascript
const element = document.querySelector(".box");

// Parent
const parent = element.parentElement;
const parentNode = element.parentNode;

// Children
const children = element.children;  // HTMLCollection
const childNodes = element.childNodes;  // NodeList
const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;

// Siblings
const nextSibling = element.nextElementSibling;
const prevSibling = element.previousElementSibling;
```

## Code Examples

### Form Elements

```html
<!-- HTML -->
<form id="userForm">
  <input type="text" id="username" placeholder="Username">
  <input type="email" id="email" placeholder="Email">
  <input type="password" id="password" placeholder="Password">
  <button type="submit">Submit</button>
</form>
```

```javascript
// JavaScript
const form = document.getElementById("userForm");
const username = document.getElementById("username");
const email = document.getElementById("email");

// Or using querySelector
const password = document.querySelector("#password");
const submitBtn = form.querySelector("button");
```

### Navigation Menu

```html
<nav id="navbar">
  <ul class="nav-menu">
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

```javascript
// Get all navigation links
const navLinks = document.querySelectorAll(".nav-menu a");
console.log(navLinks.length);  // 3

navLinks.forEach((link, index) => {
  console.log(index, link.textContent);
});
```

### Product List

```html
<div class="products">
  <div class="product" data-id="1">Laptop</div>
  <div class="product" data-id="2">Mouse</div>
  <div class="product" data-id="3">Keyboard</div>
</div>
```

```javascript
// Select all products
const products = document.querySelectorAll(".product");

// Find specific product
const laptop = document.querySelector(".product[data-id='1']");

// Loop through products
products.forEach(product => {
  console.log(`ID: ${product.dataset.id}, Name: ${product.textContent}`);
});
```

## 📝 Exercises (10 total)

### Exercise 1: Get Element by ID
```javascript
// HTML: <h1 id="title">My Page</h1>
const title = document.getElementById("title");
console.log(title.textContent);
```

### Exercise 2: Get Elements by Class
```javascript
// HTML: <p class="intro">Para 1</p>
//       <p class="intro">Para 2</p>
const intros = document.getElementsByClassName("intro");
for (const intro of intros) {
  intro.style.color = "blue";
}
```

### Exercise 3: Get Elements by Tag
```javascript
// HTML: <button>Button 1</button>
//       <button>Button 2</button>
const buttons = document.getElementsByTagName("button");
console.log(`Found ${buttons.length} buttons`);
```

### Exercise 4: querySelector Single
```javascript
// Find first element matching selector
const firstParagraph = document.querySelector("p");
const elementWithID = document.querySelector("#myId");
const elementWithClass = document.querySelector(".myClass");
```

### Exercise 5: querySelectorAll Multiple
```javascript
// HTML: Multiple <input> elements
const allInputs = document.querySelectorAll("input");
allInputs.forEach(input => {
  input.value = "";  // Clear all inputs
});
```

### Exercise 6: Complex Selectors
```javascript
// Specific element types
const textInputs = document.querySelectorAll("input[type='text']");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const buttons = document.querySelectorAll("button.primary");
```

### Exercise 7: Navigate Parent-Child
```javascript
// HTML structure
// <div class="container">
//   <h1>Title</h1>
//   <p>Text</p>
// </div>

const h1 = document.querySelector("h1");
const container = h1.parentElement;
console.log(container.className);  // "container"
```

### Exercise 8: Find Siblings
```javascript
// HTML: <button>1</button>
//       <button>2</button>
//       <button>3</button>

const button2 = document.querySelectorAll("button")[1];
const button1 = button2.previousElementSibling;
const button3 = button2.nextElementSibling;
```

### Exercise 9: Count Elements
```javascript
// Count all paragraphs
const paragraphs = document.querySelectorAll("p");
console.log(`Total paragraphs: ${paragraphs.length}`);

// Count by class
const highlighted = document.querySelectorAll(".highlight");
console.log(`Highlighted: ${highlighted.length}`);
```

### Exercise 10: Search Within Element
```javascript
// Search only within container
const container = document.getElementById("container");
const items = container.querySelectorAll(".item");
// Only finds .item inside #container
```

## 🎓 Summary

You've learned:
- All DOM selection methods
- CSS selector syntax
- DOM tree navigation
- Efficiency and best practices
- Modern selection patterns

## ✅ Checklist

- [ ] Understand DOM structure
- [ ] Select elements by various methods
- [ ] Use querySelector effectively
- [ ] Navigate the DOM tree
- [ ] Completed all exercises
