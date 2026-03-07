const firstname = "YIBEH";
const lastname = "Miibemsembom";
const age = 25;
const isStudent = true;
const gpa = 3.8;

console.log(`Name: ${firstname} ${lastname}`);
console.log(`Age: ${age}`);
console.log(`Is Student: ${isStudent}`);
console.log(`GPA: ${gpa}`);

console.log(typeof name);        // "string", to store letters of the alphabet
console.log(typeof age);         // "number", for integers only
console.log(typeof isStudent);   // "boolean", for values that can only either be true or false
console.log(typeof person);      // "object"
console.log(Array.isArray(["me", "you"])); // true, generally, arrays are used to store lists of items, such as hobbies, etc.

//variable values can be changed after they have been declared. for example:// Variables can be reassigned (let)
let city = "New York";
console.log(city); // Output: New York
city = "Los Angeles";
console.log(city); // Output: Los Angeles
//note that only variables that we declared with the 'let' keyword can be reassigned. variables declared with the 'const' keyword cannot be reassigned.



//exercise 2. arithmetic operators
const sum = 20 + 2;//gives the sum of two variables
const difference = 20 - 2;//gives the difference of two variables
const product = 20 * 2;//gives the product of two variables
const quotient = 20 / 2;//gives the quotient of two variables. that is: the result of dividing the first variable by the second variable
const remainder = 20 % 2;//gives the remainder after division of two variables

//comparison operators
console.log(20 == 20); //true because both sides are equal (but it is loose)
console.log(20 === 20); //true because both sides are equal (and it is strict)
console.log(20 > 2); //true because 20 is greater than 2
console.log(2 < 20); //true because 2 is less than 20
console.log(20 >= 20); //true because 20 is greater than or equal to 20
//comparison operators are used mainly to compare the values of two variables. majorly used in if-else statements and loops


//logical operators are used for statements that require multiple conditions to be evaluated, and if met, give a certain result. 
console.log(true && false);  // false
console.log(true || false);  // true
console.log(!true);          // false


//a ternary operator is a shorthand way of writing an if-else statement. it takes three operands: a condition, a value to return if the condition is true, and a value to return if the condition is false.
const status = age > 18 ? "adult" : "minor";
console.log(status); // Output: "adult" because age is greater than 18

// Nullish coalescing is another form of a ternary operator that checks if the value of a variable is null or it contains something.
const value = null ?? "default"; // "default"