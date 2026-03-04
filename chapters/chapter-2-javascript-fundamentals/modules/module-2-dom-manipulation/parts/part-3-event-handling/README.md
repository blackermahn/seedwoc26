# Part 3: Event Handling

## 📚 Part Overview

Master JavaScript events - how web pages respond to user interactions. Learn to handle clicks, form submissions, keyboard input, and more.

## 🎯 Learning Objectives

By completing this part, you will:
- Understand the event system
- Add event listeners
- Handle common events
- Understand event objects
- Use event delegation
- Manage event propagation
- Remove event listeners
- Best practices for event handling

## 🕐 Estimated Duration
- **Time**: 5-7 hours
- **Difficulty**: ⭐ Intermediate
- **Prerequisites**: Parts 1 & 2

## Common Events

### Mouse Events

```javascript
const element = document.getElementById("box");

// Click event
element.addEventListener("click", (event) => {
  console.log("Clicked!");
});

// Double click
element.addEventListener("dblclick", () => {
  console.log("Double clicked!");
});

// Mouse over/out
element.addEventListener("mouseover", () => {
  console.log("Mouse over");
});

element.addEventListener("mouseout", () => {
  console.log("Mouse out");
});

// Mouse move
element.addEventListener("mousemove", (event) => {
  console.log(`Mouse at: ${event.clientX}, ${event.clientY}`);
});
```

### Form Events

```javascript
const input = document.getElementById("username");
const form = document.getElementById("userForm");

// Input change
input.addEventListener("input", (e) => {
  console.log(`Current value: ${e.target.value}`);
});

// Change (on blur or selection change)
input.addEventListener("change", (e) => {
  console.log(`Changed to: ${e.target.value}`);
});

// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();  // Prevent default form submission
  console.log("Form submitted");
  // Process form data
});

// Focus and blur
input.addEventListener("focus", () => {
  console.log("Input focused");
});

input.addEventListener("blur", () => {
  console.log("Input lost focus");
});
```

### Keyboard Events

```javascript
const input = document.querySelector("input");

// Key press
input.addEventListener("keydown", (e) => {
  console.log(`Key pressed: ${e.key}`);
  if (e.key === "Enter") {
    console.log("Enter pressed");
  }
});

// Distinguish keys
input.addEventListener("keydown", (e) => {
  if (e.key === " ") console.log("Space");
  if (e.key === "Escape") console.log("Escape");
  if (e.key === "ArrowUp") console.log("Up arrow");
});
```

## Event Object

```javascript
const element = document.getElementById("button");

element.addEventListener("click", (event) => {
  // Event properties
  console.log(event.type);        // "click"
  console.log(event.target);      // Element clicked
  console.log(event.currentTarget); // Element with listener
  console.log(event.clientX);     // X coordinate
  console.log(event.clientY);     // Y coordinate
  console.log(event.timestamp);   // When it occurred
  console.log(event.key);         // For keyboard events
  
  // Event methods
  event.preventDefault();          // Stop default behavior
  event.stopPropagation();        // Stop event bubbling
});
```

## Event Listeners

### Adding Event Listeners

```javascript
// Modern way (preferred)
element.addEventListener("click", handleClick);

function handleClick(event) {
  console.log("Clicked!");
}

// Arrow function
element.addEventListener("click", (e) => {
  console.log("Clicked!");
});

// Multiple listeners
element.addEventListener("click", () => console.log("1"));
element.addEventListener("click", () => console.log("2"));
// Both execute!
```

### Removing Event Listeners

```javascript
function handleClick() {
  console.log("Clicked");
}

// Add listener
element.addEventListener("click", handleClick);

// Remove listener (must reference same function)
element.removeEventListener("click", handleClick);
```

### Event Delegation

```javascript
// HTML
// <ul id="list">
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li>Item 3</li>
// </ul>

const list = document.getElementById("list");

// Single listener on parent
list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log(`Clicked: ${e.target.textContent}`);
    e.target.style.backgroundColor = "blue";
  }
});

// This handles all current and future <li> elements!
```

## Event Propagation

```
Event Bubbling (default):
user clicks <button>
      ↓
   (1) BUTTON click event fires
      ↓
   (2) DIV click event fires (bubbles up)
      ↓
   (3) BODY click event fires (bubbles up)

Event Capturing (rare):
      ↓
   (1) BODY click event fires
      ↓
   (2) DIV click event fires
      ↓
   (3) BUTTON click event fires
```

### Controlling Propagation

```javascript
const button = document.querySelector("button");
const div = button.parentElement;

button.addEventListener("click", (e) => {
  console.log("Button clicked");
  e.stopPropagation();  // Prevents bubbling
});

div.addEventListener("click", (e) => {
  console.log("Div clicked");  // Won't fire if stopPropagation called
});
```

## Code Examples

### Interactive Counter

```javascript
// HTML
// <button id="decreaseBtn">-</button>
// <span id="count">0</span>
// <button id="increaseBtn">+</button>

let count = 0;

document.getElementById("increaseBtn").addEventListener("click", () => {
  count++;
  document.getElementById("count").textContent = count;
});

document.getElementById("decreaseBtn").addEventListener("click", () => {
  count--;
  document.getElementById("count").textContent = count;
});
```

### Form Validation

```javascript
const form = document.getElementById("myForm");
const emailInput = document.getElementById("email");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const email = emailInput.value;
  const isValid = email.includes("@");
  
  if (!isValid) {
    errorMsg.textContent = "Invalid email";
    errorMsg.style.color = "red";
  } else {
    errorMsg.textContent = "Valid email!";
    errorMsg.style.color = "green";
    // form.submit();
  }
});
```

### Dynamic List

```javascript
const form = document.getElementById("addForm");
const input = document.getElementById("itemInput");
const list = document.getElementById("items");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const li = document.createElement("li");
  li.textContent = input.value;
  
  // Delete on click
  li.addEventListener("click", () => {
    li.remove();
  });
  
  list.appendChild(li);
  input.value = "";
  input.focus();
});
```

## 📝 Exercises (10 total)

### Exercise 1: Click Handler
```javascript
const btn = document.getElementById("myBtn");
btn.addEventListener("click", () => {
  alert("Button clicked!");
});
```

### Exercise 2: Input Tracking
```javascript
const input = document.getElementById("input");
const output = document.getElementById("output");

input.addEventListener("input", (e) => {
  output.textContent = `You typed: ${e.target.value}`;
});
```

### Exercise 3: Form Submit
```javascript
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form data submitted");
});
```

### Exercise 4: Keyboard Detection
```javascript
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log("Enter pressed");
  }
});
```

### Exercise 5: Event Delegation
```javascript
const ul = document.querySelector("ul");
ul.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log(`Clicked: ${e.target.textContent}`);
  }
});
```

### Exercise 6: Mouse Hover
```javascript
const box = document.getElementById("box");
box.addEventListener("mouseover", () => {
  box.style.backgroundColor = "red";
});
box.addEventListener("mouseout", () => {
  box.style.backgroundColor = "";
});
```

### Exercise 7: Toggle Class
```javascript
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  btn.classList.toggle("active");
});
```

### Exercise 8: Prevent Default
```javascript
const link = document.querySelector("a");
link.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Link click prevented");
});
```

### Exercise 9: Event Object Properties
```javascript
document.addEventListener("click", (e) => {
  console.log(`Clicked at: ${e.clientX}, ${e.clientY}`);
  console.log(`Target: ${e.target.id}`);
});
```

### Exercise 10: Remove Listener
```javascript
function handler() {
  console.log("Clicked");
}
const btn = document.getElementById("btn");
btn.addEventListener("click", handler);
// Later...
btn.removeEventListener("click", handler);
```

##🎓 Summary

You've learned:
- All major event types
- Adding/removing listeners
- Event object properties
- Event delegation
- Event propagation control
- Best practices

## ✅ Checklist

- [ ] Add event listeners
- [ ] Handle common events
- [ ] Use event delegation
- [ ] Control propagation
- [ ] Completed exercises
