// Chapter 2: JavaScript Fundamentals - Solutions
// Name: POPPY-DL

/**
 * Exercise 1: Variables and Types
 * 
 * In JavaScript, we use 'const' for variables that won't change 
 * and 'let' for variables that will. 'typeof' helps us check 
 * what kind of data is stored in a variable.
 */

// Declare variables using const (preferred for values that don't change)
const name = "POPPY-DL";
const age = 25;
const isStudent = true;
const person = { name: "Bob", age: 30 };
const skills = ["JavaScript", "HTML", "CSS"];

console.log("--- Exercise 1: Variables and Types ---");
console.log("Name:", name, "| Type:", typeof name);        // "string"
console.log("Age:", age, "| Type:", typeof age);          // "number"
console.log("Is Student:", isStudent, "| Type:", typeof isStudent); // "boolean"
console.log("Person Object:", person, "| Type:", typeof person);   // "object"
console.log("Is skills an Array?", Array.isArray(skills)); // true (Arrays are technically objects)

// Variables that need reassignment use 'let'
let counter = 0;
counter = 1;
counter = 2;
console.log("Counter value:", counter);

/**
 * Exercise 2: Operators
 * 
 * Operators allow us to perform calculations, compare values, 
 * and combine logic.
 */

console.log("\n--- Exercise 2: Operators ---");
// Arithmetic
const sum = 10 + 5;
console.log("Sum (10 + 5):", sum);
const remainder = 10 % 3;
console.log("Remainder (10 % 3):", remainder);

// Comparison
console.log("Loose equality (5 == '5'):", 5 == "5");    // true (checks value only)
console.log("Strict equality (5 === '5'):", 5 === "5"); // false (checks value AND type)

// Logical
console.log("Logical AND (true && false):", true && false);
console.log("Logical OR (true || false):", true || false);

// Ternary (Short-hand if/else)
const status = age >= 18 ? "adult" : "minor";
console.log("Status based on age:", status);

/**
 * Exercise 3: Conditionals
 * 
 * Conditionals control the flow of the program based on 
 * whether a condition is true or false.
 */

console.log("\n--- Exercise 3: Conditionals ---");
const score = 85;
console.log("Score:", score);
if (score >= 90) {
  console.log("Result: Grade A");
} else if (score >= 80) {
  console.log("Result: Grade B");
} else {
  console.log("Result: Grade C");
}

// Switch statement for specific values
const day = "Monday";
switch (day) {
  case "Monday":
    console.log("Day message: Start of the week!");
    break;
  case "Friday":
    console.log("Day message: Almost the weekend!");
    break;
  default:
    console.log("Day message: Just another regular day.");
}

/**
 * Exercise 4: Type Coercion
 * 
 * Coercion is when JavaScript automatically converts one 
 * data type to another (e.g., number to string).
 */

console.log("\n--- Exercise 4: Type Coercion ---");
console.log("Coercion ('5' + 3):", "5" + 3);  // "53" (addition with string = concatenation)
console.log("Coercion ('5' - 3):", "5" - 3);  // 2 (subtraction forces number conversion)

// Boolean Coercion (Truthy/Falsy)
console.log("Truthy value (!!'hello'):", !!"hello"); // true
console.log("Falsy value (!!0):", !!0);             // false

/**
 * Exercise 5: Working with Objects
 * 
 * Objects are collections of related data (properties) 
 * and functions (methods).
 */

console.log("\n--- Exercise 5: Working with Objects ---");
const user = {
  userName: "Alice",
  userAge: 25,
  email: "alice@example.com",
  greet() {
    return `Hello, my name is ${this.userName}`;
  }
};

console.log("Initial User:", user.userName);
user.userAge = 26; // Modify property
user.country = "Cameroon"; // Add new property
console.log("Updated User Age:", user.userAge);
console.log("New Property (Country):", user.country);
console.log("Method Call:", user.greet());
