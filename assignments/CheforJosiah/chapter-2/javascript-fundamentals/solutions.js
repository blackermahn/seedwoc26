//  Exercise 1: Variables and Types
const firstName = "Chefor";
const lastName = "Josiah";
const age = 30; // number
const isCitizen = true; // boolean
const isStudent = true; // boolean
const isAdmin = true; // boolean
const isOwner = false; // boolean
const person = { lastName: "Josiah", age: 30 };
const skills = ["JavaScript", "HTML", "CSS", "React"];

// Inspect types
console.log(typeof firstName);  // "string"
console.log(typeof lastName);   // "string"
console.log(typeof isStudent);   // "boolean"
console.log(typeof person);      // "object"
console.log(Array.isArray(skills)); // true


let counter = 0;
counter = 1;
counter = 2;


const PI = 3.14159;

//Exercise 2: Operators


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


// Exercise 3: Conditionals

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


// Exercise 4: Type Coercion

// String coercion
console.log("5" + 3);      // "53" (concatenation)
console.log(5 + "3");      // "53"
console.log("5" - 3);      // 2 (subtraction forces numbers)

// Boolean coercion
console.log(!!"hello");    // true (truthy)
console.log(!!0);          // false (falsy)
console.log(!!"");         // false (falsy)



if ("hello") console.log("yes"); // Prints "yes"
if (0) console.log("no");       // Doesn't print


// Exercise 5: Working with Objects

// Create object
const user = {
  name: "Josiah",
  age: 25,
  email: "josiah@example.com",
  greet() {
    return `Hello, ${this.name}`;
  }
};

// Access properties
console.log(user.name);
console.log(user["age"]);

// Modify properties
user.age = 26;
user.phone = "650810537";
user.role = "admin"; // Add new property

// Delete property
delete user.phone;

// Method call
console.log(user.greet());

// Check if property exists
console.log("name" in user); // true