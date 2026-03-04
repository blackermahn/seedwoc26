# JavaScript Common Patterns and Best Practices

## Pattern 1: Event Delegation

**Use Case**: Handle events on dynamically created elements

```javascript
// Instead of binding each item individually
// Use event delegation on parent

const list = document.getElementById("items");

list.addEventListener("click", (e) => {
  if (e.target.matches(".item-btn")) {
    console.log("Item clicked:", e.target.closest(".item"));
  }
});
```

## Pattern 2: Debouncing

**Use Case**: Prevent function from being called too frequently

```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Usage: Search input
const searchInput = document.getElementById("search");
const handleSearch = debounce((e) => {
  console.log("Searching:", e.target.value);
}, 300);

searchInput.addEventListener("input", handleSearch);
```

## Pattern 3: Module Pattern

**Use Case**: Encapsulate related functionality

```javascript
const TodoApp = (() => {
  // Private variables
  const todos = [];
  
  // Private functions
  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  // Public methods
  return {
    addTodo(text) {
      todos.push(text);
      saveTodos();
    },
    getTodos() {
      return [...todos];  // Return copy
    }
  };
})();

// Usage
TodoApp.addTodo("Buy milk");
console.log(TodoApp.getTodos());
```

## Pattern 4: Revealing Module Pattern

```javascript
const Calculator = (() => {
  let result = 0;
  
  const add = (x) => result += x;
  const subtract = (x) => result -= x;
  const getResult = () => result;
  const reset = () => result = 0;
  
  return { add, subtract, getResult, reset };
})();

Calculator.add(5);
Calculator.add(3);
console.log(Calculator.getResult());  // 8
```

## Pattern 5: API Call with Error Handling

```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Usage
const data = await fetchData("/api/users");
```

## Pattern 6: Form Validation

```javascript
function validateForm(form) {
  const errors = {};
  const formData = new FormData(form);
  
  for (let [key, value] of formData) {
    if (!value || value.trim() === "") {
      errors[key] = `${key} is required`;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Usage
const form = document.getElementById("myForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const validation = validateForm(form);
  if (validation.isValid) {
    console.log("Form is valid!");
  } else {
    console.log("Errors:", validation.errors);
  }
});
```

## Anti-Patterns to Avoid

❌ **Avoid**: Global variables
```javascript
// BAD
window.count = 0;
```

✅ **Use**: Scoped variables
```javascript
// GOOD
const counter = (() => {
  let count = 0;
  return {
    increment() { return ++count; }
  };
})();
```

❌ **Avoid**: Callback hell
```javascript
// BAD
getUser(id, function(user) {
  getPostss(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      // Deeply nested!
    });
  });
});
```

✅ **Use**: Promises or async/await
```javascript
// GOOD
async function getFullData(id) {
  const user = await getUser(id);
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  return { user, posts, comments };
}
```

## Code Quality Checklist

- [ ] No console.log in production
- [ ] Error handling in all async calls
- [ ] Proper variable naming
- [ ] DRYCode (Don't Repeat Yourself)
- [ ] Functions do one thing
- [ ] Comments for complex logic
- [ ] No magic numbers
- [ ] Proper indentation
- [ ] No dead code
- [ ] Accessibility considered
