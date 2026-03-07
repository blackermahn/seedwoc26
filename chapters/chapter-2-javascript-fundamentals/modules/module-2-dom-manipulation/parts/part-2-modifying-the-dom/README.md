# Part 2: Modifying the DOM

## 📚 Part Overview

Learn to create, modify, and delete HTML elements dynamically using JavaScript. Master DOM manipulation techniques for building dynamic web pages.

## 🎯 Learning Objectives

By completing this part, you will:
- Create new HTML elements
- Insert elements into the DOM
- Modify element properties and attributes
- Change element styling
- Add and remove CSS classes
- Update element content
- Clone elements
- Remove elements from DOM

## 🕐 Estimated Duration
- **Time**: 5-6 hours
- **Difficulty**: ⭐ Intermediate
- **Prerequisites**: Part 1

## Creating Elements

### createElement()

```javascript
const newDiv = document.createElement("div");
const newButton = document.createElement("button");
const newInput = document.createElement("input");

// Set properties before adding to DOM
newButton.textContent = "Click me";
newButton.id = "myButton";
newButton.className = "btn btn-primary";
```

## Inserting Elements

### appendChild()

```javascript
const container = document.getElementById("container");
const newParagraph = document.createElement("p");
newParagraph.textContent = "Hello World";

// Add as last child
container.appendChild(newParagraph);
```

### insertBefore()

```javascript
const parent = document.getElementById("list");
const newItem = document.createElement("li");
newItem.textContent = "New Item";
const firstItem = parent.firstElementChild;

// Insert before first item
parent.insertBefore(newItem, firstItem);
```

### insertAdjacentHTML()

```javascript
const element = document.getElementById("myDiv");

// Insert HTML string
element.insertAdjacentHTML("afterbegin", "<h1>Title</h1>");

// Positions: beforebegin, afterbegin, beforeend, afterend
```

## Modifying Content

### textContent vs. innerHTML

```javascript
const element = document.getElementById("content");

// textContent: Plain text (safer)
element.textContent = "Hello <b>World</b>";
// Output: Hello <b>World</b> (literal text)

// innerHTML: HTML parsing (less safe, but powerful)
element.innerHTML = "Hello <b>World</b>";
// Output: Hello World (bold)

// innerText: Rendered text only
// outerHTML: Including the element itself
```

## Modifying Attributes

### Using setAttribute/getAttribute

```javascript
const image = document.getElementById("myImage");

// Set attributes
image.setAttribute("src", "photo.jpg");
image.setAttribute("alt", "My Photo");
image.setAttribute("data-id", "123");

// Get attributes
const src = image.getAttribute("src");
const dataId = image.getAttribute("data-id");

// Remove attribute
image.removeAttribute("alt");

// Check if attribute exists
if (image.hasAttribute("alt")) {
  console.log("Has alt text");
}
```

### Direct Property Access

```javascript
const input = document.getElementById("username");

// Direct access (cleaner)
input.value = "Alice";
input.placeholder = "Enter name";
input.disabled = true;

// Get values
console.log(input.value);
console.log(input.checked);
```

## Modifying Styles

### Using style Property

```javascript
const element = document.getElementById("box");

// Set inline styles
element.style.backgroundColor = "blue";
element.style.width = "200px";
element.style.height = "200px";
element.style.borderRadius = "10px";
element.style.display = "flex";

// Get styles
console.log(element.style.backgroundColor);

// Remove inline style
element.style.display = "";
```

### Using classList

```javascript
const element = document.getElementById("button");

// Add class
element.classList.add("active");
element.classList.add("primary", "large");  // Multiple

// Remove class
element.classList.remove("inactive");

// Toggle class
element.classList.toggle("hidden");

// Check class
if (element.classList.contains("active")) {
  console.log("Is active");
}

// Replace class
element.classList.replace("old-class", "new-class");
```

## Removing Elements

### removeChild() and remove()

```javascript
const parent = document.getElementById("list");
const item = document.querySelectorAll("li")[0];

// Method 1: Remove from parent
parent.removeChild(item);

// Method 2: Remove directly (modern)
item.remove();
```

## Code Examples

### Create a Card

```javascript
function createCard(title, description, imageUrl) {
  const card = document.createElement("div");
  card.className = "card";
  
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = title;
  
  const h2 = document.createElement("h2");
  h2.textContent = title;
  
  const p = document.createElement("p");
  p.textContent = description;
  
  card.appendChild(img);
  card.appendChild(h2);
  card.appendChild(p);
  
  return card;
}

// Usage
const container = document.getElementById("container");
const card = createCard("Product", "Amazing product", "image.jpg");
container.appendChild(card);
```

### Todo List Manager

```javascript
function addTodoItem(text) {
  const li = document.createElement("li");
  
  const span = document.createElement("span");
  span.textContent = text;
  
  const button = document.createElement("button");
  button.textContent = "Delete";
  button.onclick = () => li.remove();
  
  li.appendChild(span);
  li.appendChild(button);
  
  const list = document.getElementById("todoList");
  list.appendChild(li);
}
```

## 📝 Exercises (10 total)

### Exercise 1: Create and Append
```javascript
const newDiv = document.createElement("div");
newDiv.textContent = "Hello";
document.body.appendChild(newDiv);
```

### Exercise 2: Set Multiple Attributes
```javascript
const img = document.createElement("img");
img.setAttribute("src", "photo.jpg");
img.setAttribute("alt", "Photo");
img.setAttribute("width", "200");
document.body.appendChild(img);
```

### Exercise 3: Modify Text Content
```javascript
const element = document.getElementById("myPara");
element.textContent = "Updated text";
```

### Exercise 4: Change Styles
```javascript
const box = document.getElementById("box");
box.style.backgroundColor = "red";
box.style.width = "100px";
box.style.height = "100px";
```

### Exercise 5: Toggle Classes
```javascript
const button = document.getElementById("btn");
button.addEventListener("click", () => {
  button.classList.toggle("active");
});
```

### Exercise 6: Create List Items
```javascript
const items = ["Item 1", "Item 2", "Item 3"];
const ul = document.getElementById("list");

items.forEach(itemText => {
  const li = document.createElement("li");
  li.textContent = itemText;
  ul.appendChild(li);
});
```

### Exercise 7: Remove Element
```javascript
const item = document.getElementById("removeMe");
item.remove();
// or
item.parentElement.removeChild(item);
```

### Exercise 8: Insert Before
```javascript
const list = document.getElementById("list");
const newItem = document.createElement("li");
newItem.textContent = "New Item";
list.insertBefore(newItem, list.firstChild);
```

### Exercise 9: Clone Element
```javascript
const original = document.getElementById("template");
const clone = original.cloneNode(true);  // Deep clone
document.body.appendChild(clone);
```

### Exercise 10: Build HTML Structure
```javascript
const div = document.createElement("div");
div.innerHTML = `
  <h1>${title}</h1>
  <p>${description}</p>
  <button>Click</button>
`;
document.body.appendChild(div);
```

## 🎓 Summary

You've learned:
- Creating new DOM elements
- Inserting elements into DOM
- Modifying properties and content
- Styling elements
- Managing classes
- Removing elements
- Building dynamic UIs

## ✅ Checklist

- [ ] Can create elements
- [ ] Modify element properties
- [ ] Change styles and classes
- [ ] Insert and remove elements
- [ ] Completed all exercises
