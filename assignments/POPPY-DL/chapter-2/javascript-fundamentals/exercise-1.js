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
