# Chapter 2: JavaScript Fundamentals - Quick Reference Guide

## Variables

```javascript
const name = "Alice";      // Preferred - immutable
let count = 0;             // Use when reassigning
var old = "avoid";         // Old syntax

// Type checking
typeof 42                  // "number"
typeof "hello"            // "string"
typeof true               // "boolean"
typeof []                 // "object"
typeof {}                 // "object"
typeof undefined          // "undefined"
typeof null               // "object" (quirk!)
```

## Data Types

```javascript
// Primitives
42                        // Number
"hello"                   // String
true/false                // Boolean
null                      // Intentional no value
undefined                 // Uninitialized

// Complex types
[1, 2, 3]                 // Array
{name: "Alice"}           // Object
function() {}             // Function
```

## Operators

```javascript
// Arithmetic
+, -, *, /, %, **

// Comparison
===, !==, <, >, <=, >=

// Logical
&&, ||, !

// Assignment
=, +=, -=, *=, /=

// Ternary
condition ? true_value : false_value
```

## Control Flow

```javascript
// If/Else
if (condition) {
  // code
} else if (condition2) {
  // code
} else {
  // code
}

// Switch
switch (value) {
  case A:
    // code
    break;
  default:
    // code
}

// Ternary
const result = condition ? "yes" : "no";
```

## Loops

```javascript
// For
for (let i = 0; i < 5; i++) {
  // code
}

// While
while (condition) {
  // code
}

// For-of (arrays)
for (const item of array) {
  // code
}

// For-in (objects)
for (const key in object) {
  // code
}

// Array methods
array.forEach(item => {})
array.map(item => result)
array.filter(item => boolean)
array.reduce((acc, item) => acc, initial)
```

## DOM Selection

```javascript
// By ID
document.getElementById("id")

// By class
document.getElementsByClassName("class")

// By tag
document.getElementsByTagName("tag")

// Modern (preferred)
document.querySelector(".class")          // First match
document.querySelectorAll(".class")        // All matches
```

## DOM Manipulation

```javascript
// Create
const el = document.createElement("div");

// Content
el.textContent = "text"
el.innerHTML = "<p>HTML</p>"

// Attributes
el.setAttribute("attr", "value")
el.className = "class-name"
el.id = "my-id"

// Styles
el.style.color = "red"
el.style.display = "none"

// Classes
el.classList.add("class")
el.classList.remove("class")
el.classList.toggle("class")

// Insert
parent.appendChild(el)
parent.insertBefore(el, reference)

// Remove
el.remove()
parent.removeChild(el)
```

## Events

```javascript
// Add listener
el.addEventListener("click", (e) => {
  e.preventDefault()
  e.stopPropagation()
})

// Common events
"click", "change", "input", "submit", "keydown", "mouseover"

// Remove
el.removeEventListener("click", handler)

// Event object
e.target      // Element that triggered event
e.type        // Event type
e.key         // For keyboard events
e.preventDefault()  // Stop default action
```

## Functions

```javascript
// Declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Arrow function
const greet = (name) => `Hello, ${name}!`;

// Call
greet("Alice")
```

## String Methods

```javascript
const str = "Hello World";

str.toUpperCase()           // "HELLO WORLD"
str.toLowerCase()           // "hello world"
str.includes("World")       // true
str.startsWith("Hello")     // true
str.endsWith("World")       // true
str.replace("World", "JS")  // "Hello JS"
str.split(" ")              // ["Hello", "World"]
str.trim()                  // Remove whitespace
str.slice(0, 5)             // "Hello"
```

## Array Methods

```javascript
const arr = [1, 2, 3, 4, 5];

arr.length                  // 5
arr[0]                      // 1
arr.push(6)                 // Add to end
arr.pop()                   // Remove from end
arr.shift()                 // Remove from start
arr.unshift(0)              // Add to start
arr.includes(3)             // true
arr.indexOf(3)              // 2
arr.join(", ")              // "1, 2, 3, 4, 5"
arr.reverse()               // [5, 4, 3, 2, 1]
arr.sort()                  // Sorted
```

## Object Basics

```javascript
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};

user.name               // "Alice"
user["name"]            // "Alice"
Object.keys(user)       // ["name", "age", "email"]
Object.values(user)     // ["Alice", 25, "alice@example.com"]
```

## Common Patterns

```javascript
// Validate input
if (!username || username.length < 3) {
  return "Invalid username";
}

// Handle null/undefined
const result = value ?? defaultValue;

// Safe property access
const city = user?.address?.city;

// Array filtering
const adults = users.filter(u => u.age >= 18);

// Array transformation
const names = users.map(u => u.name);

// Array to object
const userMap = users.reduce((acc, u) => {
  acc[u.id] = u;
  return acc;
}, {});
```

## Debugging

```javascript
console.log("text", variable)     // Log
console.error("Error message")    // Error
console.table(arrayOfObjects)     // Table format
console.time("label")             // Start timer
console.timeEnd("label")          // End timer
```

## Learning Path

1. ✅ Variables & Types (Part 1)
2. ✅ Operators & Control Flow (Part 2)
3. ✅ Loops & Iteration (Part 3)
4. ✅ DOM Selection (Module 2, Part 1)
5. ✅ DOM Modification (Module 2, Part 2)
6. ✅ Event Handling (Module 2, Part 3)

**Next**: Build interactive projects!
