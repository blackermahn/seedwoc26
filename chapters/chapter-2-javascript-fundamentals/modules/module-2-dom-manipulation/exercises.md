# Module 2: DOM - Part 1, 2, 3 Exercises

## Part 1: DOM Selection Exercises

### Exercise 1: Get by ID
```javascript
const button = document.getElementById("myButton");
button.addEventListener("click", () => {
  console.log("Button clicked!");
});

const heading = document.getElementById("title");
console.log(heading.textContent);
```

### Exercise 2: Get by Class
```javascript
const paragraphs = document.getElementsByClassName("text");
for (const p of paragraphs) {
  p.style.color = "blue";
}

// Modern way
const modernGet = document.querySelectorAll(".text");
modernGet.forEach(p => p.style.color = "blue");
```

### Exercise 3: Get by Tag
```javascript
const buttons = document.getElementsByTagName("button");
console.log(`Found ${buttons.length} buttons`);

for (const btn of buttons) {
  btn.addEventListener("click", () => {
    console.log(btn.textContent);
  });
}
```

### Exercise 4: querySelector
```javascript
// Single element
const first = document.querySelector(".item");
const first = document.querySelector("button:first-child");
const specific = document.querySelector("#main > .container");
```

### Exercise 5: querySelectorAll
```javascript
// Multiple elements
const items = document.querySelectorAll(".item");
items.forEach(item => {
  item.style.border = "1px solid gray";
});

// Complex selectors
const buttons = document.querySelectorAll("button.primary");
const inputs = document.querySelectorAll("input[type='text']");
```

### Exercise 6: DOM Traversal
```javascript
const child = document.querySelector(".child");

// Parent
const parent = child.parentElement;

// Siblings
const prevSibling = child.previousElementSibling;
const nextSibling = child.nextElementSibling;

// Children
const siblings = child.parentElement.children;
const firstChild = parent.firstElementChild;
```

---

## Part 2: DOM Modification Exercises

### Exercise 1: Create Elements
```javascript
const div = document.createElement("div");
div.textContent = "Hello World";
div.className = "greeting";
div.id = "myDiv";

document.body.appendChild(div);
```

### Exercise 2: Modify Content
```javascript
const element = document.getElementById("content");

// Text content
element.textContent = "Updated text";

// HTML content
element.innerHTML = "<strong>Bold</strong>";

// Careful with innerHTML - security risk!
element.textContent = userInput; // Safe
```

### Exercise 3: Modify Attributes
```javascript
const img = document.querySelector("img");

// Get attribute
const src = img.getAttribute("src");
const alt = img.getAttribute("alt");

// Set attribute
img.setAttribute("alt", "Description");

// Remove attribute
img.removeAttribute("alt");

// Direct access
img.src = "new-path.jpg";
img.alt = "New Alt Text";
```

### Exercise 4: Modify Styles
```javascript
const box = document.querySelector(".box");

// Inline styles
box.style.color = "red";
box.style.backgroundColor = "yellow";
box.style.padding = "20px";

// Multiple styles
Object.assign(box.style, {
  color: "blue",
  fontSize: "18px",
  borderRadius: "5px"
});
```

### Exercise 5: Modify Classes
```javascript
const element = document.querySelector(".item");

// Add class
element.classList.add("highlight");

// Remove class
element.classList.remove("old-class");

// Toggle class
element.classList.toggle("selected");

// Check if has class
element.classList.contains("active"); // true/false
```

### Exercise 6: Create and Insert
```javascript
// Create
const newItem = document.createElement("li");
newItem.textContent = "New item";

// Append at end
const list = document.getElementById("list");
list.appendChild(newItem);

// Insert at specific position
const firstItem = list.firstElementChild;
list.insertBefore(newItem, firstItem);

// Before/After (modern)
firstItem.insertAdjacentHTML("afterend", "<li>New</li>");
firstItem.insertAdjacentElement("beforebegin", newItem);
```

### Exercise 7: Remove Elements
```javascript
const item = document.querySelector(".item");

// Remove self
item.remove();

// Remove via parent
item.parentElement.removeChild(item);
```

### Exercise 8: Clone Elements
```javascript
const original = document.querySelector(".template");
const clone = original.cloneNode(true); // Deep clone

clone.id = "clone-1";
document.body.appendChild(clone);
```

---

## Part 3: Event Handling Exercises

### Exercise 1: Click Handlers
```javascript
const button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log("Clicked!");
});

// Remove listener
const handler = () => console.log("Handler");
button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

### Exercise 2: Input Events
```javascript
const input = document.querySelector("input");
const output = document.querySelector("#output");

input.addEventListener("input", (e) => {
  output.textContent = `You typed: ${e.target.value}`;
});
```

### Exercise 3: Form Submission
```javascript
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop default behavior
  
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  console.log(data);
  // Send to server
});
```

### Exercise 4: Keyboard Events
```javascript
document.addEventListener("keypress", (e) => {
  console.log(e.key); // Which key
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log("Enter pressed");
  }
});
```

### Exercise 5: Multiple Events
```javascript
const element = document.querySelector(".box");

element.addEventListener("mouseenter", () => {
  element.style.backgroundColor = "blue";
});

element.addEventListener("mouseleave", () => {
  element.style.backgroundColor = "gray";
});

element.addEventListener("dblclick", () => {
  element.style.transform = "scale(1.2)";
});
```

### Exercise 6: Event Delegation
```javascript
const list = document.querySelector("ul");

list.addEventListener("click", (e) => {
  // Check if target is list item
  if (e.target.tagName === "LI") {
    e.target.style.backgroundColor = "yellow";
  }
});

// Now works for all items, even added later!
const newItem = document.createElement("li");
newItem.textContent = "New";
list.appendChild(newItem);
// Click works immediately!
```

### Exercise 7: Event Object
```javascript
element.addEventListener("click", (event) => {
  console.log(event.type);      // "click"
  console.log(event.target);    // Element clicked
  console.log(event.clientX);   // X position
  console.log(event.clientY);   // Y position
  console.log(event.timeStamp); // When occurred
});
```

### Exercise 8: Stop Propagation
```javascript
document.querySelector(".child").addEventListener("click", (e) => {
  e.stopPropagation(); // Stops bubbling up
  console.log("Child clicked");
});

document.querySelector(".parent").addEventListener("click", () => {
  console.log("Parent clicked"); // Won't fire if child stopped
});
```

### Exercise 9: Prevent Default
```javascript
document.querySelector("a").addEventListener("click", (e) => {
  e.preventDefault(); // Don't navigate
  console.log("Link clicked but not navigating");
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Don't submit normally
  // Handle custom logic
});
```

### Exercise 10: Todo App
```javascript
const input = document.querySelector("#input");
const addBtn = document.querySelector("#add");
const list = document.querySelector("#list");

addBtn.addEventListener("click", addTodo);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

list.addEventListener("click", (e) => {
  if (e.target.textContent === "Delete") {
    e.target.parentElement.remove();
  }
});

function addTodo() {
  if (!input.value.trim()) return;
  
  const li = document.createElement("li");
  li.textContent = input.value;
  
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  
  li.appendChild(deleteBtn);
  list.appendChild(li);
  input.value = "";
  input.focus();
}
```

