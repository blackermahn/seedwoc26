# Chapter 1: Practice Project - Personal Portfolio Repository

## Project Overview
Create a personal portfolio project using Git and GitHub collaboration.

## Learning Objectives
- Create feature branches for each portfolio section
- Practice meaningful commits
- Create pull requests for code review
- Manage multiple features in parallel

## Project Setup

```bash
# Initialize project
mkdir my-portfolio
cd my-portfolio
git init

# Create initial structure
echo "# My Portfolio" > README.md
echo "body { margin: 0; }" > styles.css
echo "console.log('Portfolio');" > app.js

git add .
git commit -m "Initial: Set up project structure"
```

## Features to Implement

### Feature 1: Hero Section
```bash
git checkout -b feature/hero-section

# Create hero section
echo "<section class='hero'><h1>Welcome</h1></section>" >> index.html

git commit -am "feat: Add hero section"
git push -u origin feature/hero-section
# Create PR, merge after review
```

### Feature 2: Projects Section
```bash
git checkout main
git pull

git checkout -b feature/projects-section

echo "<section class='projects'><h2>Projects</h2></section>" >> index.html
git commit -am "feat: Add projects section"
git push -u origin feature/projects-section
# Create PR, merge
```

### Feature 3: Contact Form
```bash
git checkout main
git pull

git checkout -b feature/contact-form

echo "<form class='contact'><input type='email'></form>" >> index.html
git commit -am "feat: Add contact form"
git push -u origin feature/contact-form
```

## Commit History Example
```
* abc1234 Merge: Contact form feature
|\
| * def5678 feat: Add contact form
|/
* 123abcd Merge: Projects section
|\
| * 456defg feat: Add projects section
|/
* 789ghij Merge: Hero section
|\
| * abc1234 feat: Add hero section
|/
* 777eeee Initial: Set up project structure
```

## Key Practices

1. **Branching**: One feature per branch
2. **Commits**: Logical, meaningful commits
3. **PRs**: Create PR for each feature
4. **Review**: Have peer review changes
5. **Merge**: Merge after approval
6. **Documentation**: Update README

## Next Steps
- Add styling improvements
- Implement JavaScript interactivity
- Deploy to GitHub Pages
- Add collaborators

---

# Chapter 2: Practice Project - Interactive JavaScript Applications

## Project 1: Todo List Application

### Features
- Add todos with input form
- Display todos in a list
- Mark todos as complete
- Delete todos
- Store in localStorage

### Files Structure
```
todo-app/
├── index.html
├── styles.css
├── app.js
└── README.md
```

### HTML Structure
```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>My Todo List</h1>
    <form id="todoForm">
      <input id="input" type="text" placeholder="Add a task...">
      <button type="submit">Add</button>
    </form>
    <ul id="todoList"></ul>
  </div>
  <script src="app.js"></script>
</body>
</html>
```

### JavaScript Implementation
```javascript
const form = document.getElementById("todoForm");
const input = document.getElementById("input");
const list = document.getElementById("todoList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if (!input.value) return;
  
  const li = document.createElement("li");
  li.textContent = input.value;
  
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });
  
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => li.remove());
  
  li.appendChild(deleteBtn);
  list.appendChild(li);
  input.value = "";
});
```

## Project 2: Color Palette Generator

### Features
- Generate random colors
- Display hex codes
- Copy to clipboard
- Save favorites

### Code Structure
```javascript
// Color generator
function generateColor() {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

// Event listeners
document.getElementById("generate").addEventListener("click", () => {
  const color = generateColor();
  document.body.style.backgroundColor = color;
  document.getElementById("colorCode").textContent = color;
});

// Copy to clipboard
document.getElementById("copy").addEventListener("click", () => {
  const color = document.getElementById("colorCode").textContent;
  navigator.clipboard.writeText(color);
  alert("Color copied!");
});
```

## Project 3: Calculator Application

### Features
- Basic arithmetic operations
- Clear and delete
- Operation history
- Keyboard support

### Implementation
```javascript
class Calculator {
  constructor() {
    this.display = document.getElementById("display");
    this.currentValue = 0;
    this.previousValue = 0;
    this.operator = null;
  }
  
  add(num) {
    this.currentValue = this.currentValue * 10 + num;
    this.updateDisplay();
  }
  
  updateDisplay() {
    this.display.textContent = this.currentValue;
  }
  
  operate(op) {
    this.previousValue = this.currentValue;
    this.currentValue = 0;
    this.operator = op;
  }
  
  equals() {
    let result = 0;
    switch(this.operator) {
      case "+":
        result = this.previousValue + this.currentValue;
        break;
      case "-":
        result = this.previousValue - this.currentValue;
        break;
    }
    this.currentValue = result;
    this.updateDisplay();
    this.operator = null;
  }
}
```

## Best Practices

1. **HTML Structure**: Semantic, clean markup
2. **CSS Styling**: Responsive design, modern CSS
3. **JavaScript**: Clean code, event delegation, error handling
4. **User Experience**: Feedback, validation, accessibility

## Testing Checklist

- [ ] All features working
- [ ] Responsive design
- [ ] Form validation
- [ ] No console errors
- [ ] Accessibility compliant
- [ ] Code reviewed
