# Chapter 2: JavaScript Code Examples and Exercises Solutions

## Module 1, Part 1: Variables and Data Types - Solutions

### Exercise 1: Type Detection
```javascript
function typeOf(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

console.log(typeOf(42));          // "number"
console.log(typeOf("hello"));     // "string"
console.log(typeOf(true));        // "boolean"
console.log(typeOf(null));        // "null"
console.log(typeOf([1,2]));       // "array"
console.log(typeOf({}));          // "object"
```

### Exercise 2: Object Creation
```javascript
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com",
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

console.log(user.name);          // "Alice"
console.log(user.greet());       // "Hello, I'm Alice"

// Update property
user.age = 26;
user.city = "NYC";              // Add new property
```

### Exercise 3: Array Methods
```javascript
const numbers = [1, 2, 3, 4, 5];

// Get length
console.log(numbers.length);    // 5

// Access elements
console.log(numbers[0]);        // 1
console.log(numbers[numbers.length - 1]);  // 5

// Modify array
numbers.push(6);                // [1,2,3,4,5,6]
numbers.pop();                  // [1,2,3,4,5]
numbers.shift();                // [2,3,4,5]
numbers.unshift(1);             // [1,2,3,4,5]

// Check contents
console.log(numbers.includes(3));  // true
console.log(numbers.indexOf(3));   // 2
```

## Module 1, Part 2: Operators and Control Flow - Solutions

### Exercise 1: Grade Calculator
```javascript
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

console.log(getGrade(95));  // "A"
console.log(getGrade(75));  // "C"
console.log(getGrade(55));  // "F"
```

### Exercise 2: Even/Odd Checker
```javascript
function checkNumber(num) {
  return num % 2 === 0 ? "even" : "odd";
}

console.log(checkNumber(4));  // "even"
console.log(checkNumber(7));  // "odd"
```

### Exercise 3: Age Validator
```javascript
function validateAge(age) {
  if (age < 0) return "Invalid age";
  if (age < 18) return "Minor";
  if (age < 65) return "Adult";
  return "Senior";
}

console.log(validateAge(10));   // "Minor"
console.log(validateAge(30));   // "Adult"
console.log(validateAge(70));   // "Senior"
```

## Module 1, Part 3: Loops and Iteration - Solutions

### Exercise 1: Sum to N
```javascript
function sumToN(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

console.log(sumToN(5));   // 15 (1+2+3+4+5)
console.log(sumToN(10));  // 55
```

### Exercise 2: Factorial
```javascript
function factorial(n) {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorial(5));  // 120
console.log(factorial(0));  // 1
```

### Exercise 3: Count Vowels
```javascript
function countVowels(str) {
  let count = 0;
  for (const char of str.toLowerCase()) {
    if ("aeiou".includes(char)) {
      count++;
    }
  }
  return count;
}

console.log(countVowels("Hello"));      // 2
console.log(countVowels("JavaScript")); // 3
```

### Exercise 4: Array Transformation
```javascript
const numbers = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers.map(n => n * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// Filter even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);    // [2, 4]

// Sum all numbers
const total = numbers.reduce((sum, n) => sum + n, 0);
console.log(total);    // 15
```

## Module 2, Part 1: DOM Selection - Solutions

### Exercise 1: Select by ID
```javascript
const button = document.getElementById("myButton");
console.log(button.textContent);  // Button text

// Add click handler
button.addEventListener("click", () => {
  console.log("Button clicked");
});
```

### Exercise 2: Select by Class
```javascript
const paragraphs = document.getElementsByClassName("text");
for (const p of paragraphs) {
  p.style.color = "blue";
}

// Or with modern method
const modernSelect = document.querySelectorAll(".text");
modernSelect.forEach(p => {
  p.style.color = "blue";
});
```

### Exercise 3: Select by Tag
```javascript
const allButtons = document.getElementsByTagName("button");
console.log(`Found ${allButtons.length} buttons`);

allButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    console.log(btn.textContent);
  });
});
```

## Module 2, Part 2: DOM Manipulation - Solutions

### Exercise 1: Create and Insert
```javascript
const div = document.createElement("div");
div.textContent = "Hello World";
div.className = "greeting";
div.id = "myDiv";

document.body.appendChild(div);
```

### Exercise 2: Update Content
```javascript
const element = document.getElementById("content");
element.textContent = "Updated text";
element.innerHTML = "<strong>Bold text</strong>";

// Change styles
element.style.color = "blue";
element.style.fontSize = "20px";

// Add classes
element.classList.add("highlight");
element.classList.remove("old-class");
```

### Exercise 3: Remove Elements
```javascript
const item = document.getElementById("removeMe");
item.remove();

// Or with parent
const parent = item.parentElement;
parent.removeChild(item);
```

## Module 2, Part 3: Event Handling - Solutions

### Exercise 1: Click Handler
```javascript
const button = document.getElementById("btn");
button.addEventListener("click", (event) => {
  console.log("Button clicked!");
  console.log("Event:", event);
});
```

### Exercise 2: Input Tracking
```javascript
const input = document.getElementById("userInput");
const output = document.getElementById("output");

input.addEventListener("input", (e) => {
  output.textContent = `You typed: ${e.target.value}`;
});
```

### Exercise 3: Form Submission
```javascript
const form = document.getElementById("myForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  console.log(Object.fromEntries(formData));
  
  // Here you could send data to server
});
```

### Exercise 4: Event Delegation
```javascript
const list = document.getElementById("list");

list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("selected");
  }
});
```

## Complete Todo Application

```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo App</title>
  <style>
    li { list-style: none; padding: 10px; }
    li.done { text-decoration: line-through; }
  </style>
</head>
<body>
  <h1>My Todos</h1>
  <input id="input" type="text" placeholder="Add todo...">
  <button id="addBtn">Add</button>
  <ul id="list"></ul>
  
  <script>
    const input = document.getElementById("input");
    const addBtn = document.getElementById("addBtn");
    const list = document.getElementById("list");
    
    addBtn.addEventListener("click", addTodo);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTodo();
    });
    
    list.addEventListener("click", (e) => {
      if (e.target.textContent === "Delete") {
        e.target.parentElement.remove();
      } else if (e.target.tagName === "LI") {
        e.target.classList.toggle("done");
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
  </script>
</body>
</html>
```

## Testing Your Code

```javascript
// Simple test function
function test(description, fn) {
  try {
    fn();
    console.log("✓", description);
  } catch (error) {
    console.error("✗", description, error.message);
  }
}

// Usage
test("Add 2 + 2 equals 4", () => {
  if (2 + 2 !== 4) throw new Error("Math is broken");
});

test("Array includes works", () => {
  const arr = [1, 2, 3];
  if (!arr.includes(2)) throw new Error("includes failed");
});
```
