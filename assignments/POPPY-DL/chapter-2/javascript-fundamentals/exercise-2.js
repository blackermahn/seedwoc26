/**
 * Exercise 2: Operators
 * 
 * Operators allow us to perform calculations, compare values, 
 * and combine logic.
 */

const age = 25; // Re-declaring for standalone file
console.log("--- Exercise 2: Operators ---");
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
