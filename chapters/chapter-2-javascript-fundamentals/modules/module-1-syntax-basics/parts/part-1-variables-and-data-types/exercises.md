# Part 1 & 2: Variables, Data Types, Operators - Exercises

## JavaScript Exercises

### Exercise 1: Variables and Types

Create and inspect variables of different types.

```javascript
// Declare variables using const (preferred)
const name = "Alice";
const age = 25;
const isStudent = true;
const person = { name: "Bob", age: 30 };
const skills = ["JavaScript", "HTML", "CSS"];

// Inspect types
console.log(typeof name);        // "string"
console.log(typeof age);         // "number"
console.log(typeof isStudent);   // "boolean"
console.log(typeof person);      // "object"
console.log(Array.isArray(skills)); // true

// Variables can be reassigned (let)
let counter = 0;
counter = 1;
counter = 2;

// Variables cannot be reassigned (const) - good practice
const PI = 3.14159;
// PI = 3; // Error!
```

---

### Exercise 2: Operators

Practice all operator types.

```javascript
// Arithmetic
const sum = 10 + 5;
const diff = 10 - 5;
const product = 10 * 5;
const quotient = 10 / 5;
const remainder = 10 % 3;

// Comparison
console.log(5 == "5");    // true (loose)
console.log(5 === "5");   // false (strict)
console.log(5 > 3);       // true
console.log(3 >= 3);      // true

// Logical
console.log(true && false);  // false
console.log(true || false);  // true
console.log(!true);          // false

// Ternary
const status = age > 18 ? "adult" : "minor";

// Nullish coalescing
const value = null ?? "default"; // "default"
```

---

### Exercise 3: Conditionals

Practice if/else and switch statements.

```javascript
// If/else
const score = 85;
if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else {
  console.log("Grade C");
}

// Switch
const day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of week");
    break;
  case "Friday":
    console.log("Almost weekend");
    break;
  default:
    console.log("Regular day");
}

// Combining conditions
const canVote = age >= 18 && isCitizen;
const hasPermission = isAdmin || isOwner;
```

---

### Exercise 4: Type Coercion

Understand JavaScript type coercion.

```javascript
// String coercion
console.log("5" + 3);      // "53" (concatenation)
console.log(5 + "3");      // "53"
console.log("5" - 3);      // 2 (subtraction forces numbers)

// Boolean coercion
console.log(!!"hello");    // true (truthy)
console.log(!!0);          // false (falsy)
console.log(!!"");         // false (falsy)

// Falsy values: false, 0, "", null, undefined, NaN
// Truthy values: everything else

if ("hello") console.log("yes"); // Prints "yes"
if (0) console.log("no");       // Doesn't print
```

---

### Exercise 5: Working with Objects

Create and manipulate objects.

```javascript
// Create object
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com",
  greet() {
    return `Hello, ${this.name}`;
  }
};

// Access properties
console.log(user.name);
console.log(user["age"]);

// Modify properties
user.age = 26;
user.phone = "555-1234"; // Add new property

// Delete property
delete user.phone;

// Method call
console.log(user.greet());

// Check if property exists
console.log("name" in user); // true
```

---

### Exercises 6-10: More Scenarios

6. **Multiple Type Checks** - Validate user input types
7. **Nested Objects** - Work with complex data structures
8. **Type Conversion** - Convert between types explicitly
9. **Template Literals** - Use backticks for string interpolation
10. **Array Methods** - map, filter, reduce on arrays

---

## Key Takeaways

✅ Use `const` by default  
✅ Use `===` instead of `==`  
✅ Understand truthy/falsy  
✅ Know operator precedence  
✅ Type coercion can be tricky!

