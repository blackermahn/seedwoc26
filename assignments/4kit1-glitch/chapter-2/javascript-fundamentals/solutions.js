
//  Exercise-1
const name = "Alice";
const age = 25;
const isStudent = true;
const person = { name: "Bob", age: 30 };
const skills = ["JavaScript", 4 , "HTML", "CSS"];

console.log(typeof name); 
console.log(typeof age);     
console.log(typeof isStudent);   
console.log(typeof person);  
console.log(Array.isArray(skills)); 

let counter = 0;
counter = 1;
counter = 2;

const PI = 3.14159
//PI = 3; //Error

//  Exercise-2-operators
const sum = 10 + 5;
const diff = 10 - 5;
const product = 10 * 5;
const quotient = 10 / 5;
const remainder = 10 % 3;

// Comparison
console.log(0 == null);
console.log(0 === null);
console.log(5 > 3);   
console.log(3 >= 3);      

// Logical
console.log(true && false);  // false
console.log(true || false);  // true
console.log(!true);          // false

const status = age > 18 ? "adult" : "minor";

// Nullish coalescing
const value = null ?? "default";
console.log(value)


//  Exercise 3-conditionals

const score = 85;
if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else {
  console.log("Grade C");
}

console.log("5" + 3);
console.log(5 + "3");
console.log("5" - 3);   

// Boolean coercion
console.log(!!"hello");
console.log(!!0);
console.log(!!"");

if ("hello") console.log("yes");
if (0) console.log("no"); 


// exercise-5-working-with-objects

// Create object
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com",
  greet() {                     // method declaration
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
console.log("name" in user);