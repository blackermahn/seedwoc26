

//Exercise 1: Variables and Types

const firstName = "Valery";
const lastName = "Verberinyuy";
const age = 23;
const isStudent = true;
const gpa = 3.5;


console.log(`Name: ${firstName} ${lastName}`);
console.log(`Age: ${age}`);
console.log(`Student: ${isStudent}`);
console.log(`GPA: ${gpa}`);


//Exercise 2: Operators

//Arithmetic

const sum = 10 + 5;
const diff = 10 - 5;
const product = 10 * 5;
const quotient = 10 / 5;
const remainder = 10 % 3;

console.log("Sum:", sum);
console.log("Difference:", diff);
console.log("Product:", product);
console.log("Quotient:", quotient);
console.log("Remainder:", remainder);

//comparison
console.log(5== "5");       //true(loose comparison)
console.log(5=== "5");      //false(strict comparison)
console.log(5 > 3);         //true
console.log(3 >= 3);        //true


//Logical
console.log(true && false);
console.log(true || false);
console.log(!true);

//Ternary
const status = age > 18 ? "adult" : "minor";
console.log("Status:", status);

//Nullish coalescing
const value = null ?? "default";
console.log("Value:", value);

//Exercise 3: Conditionals

//if/else
const score = 85;

if (score >= 90) {
    console.log("Grade A");
}   else if (score >= 80) {
    console.log("Grade B");
}   else{
    console.log("Grade C");
}

//Switch
const day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of the of week");
        break;
        case "Friday":
            console.log("Almost weekend");
            break;
            default:
                console.log("Regular day");
}

//combining conditions
const isCitizen = true;
const isAdmin = false;
const isOwner = true;

const canVote = age >= 18 && isCitizen;
const hasPermission = isAdmin || isOwner;

console.log("Can vote:", canVote);
console.log("Has permission:", hasPermission);


//Exercise 4: Type coercion
//Understand javascript type coercion

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

//Exercise 5: Working with objects
//create and manipulate objects

// Create object
const user = {
  name: "Valery",
  age: 23,
  email: "lolavaleryverberinyuy@gmail.com",
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

//Exercise 6: Multiple Type Checks

let input = "25";

if (typeof input === "string") {
    console.log("Input is a string");
}

if (!isNaN(input)) {
    console.log("Input can be converted to a number");
}

//Exercise 7: Nested Objects

const person = {
    name: "Valery",
    age: 23,
    address: {
        city: "Bamenda",
        country: "Cameroon"
    }
};

console.log(person.address.city);
console.log(person.address.country);

//Exercis 8: Type Conversion

let numberString = "100";

let convertedNumber = Number(numberString);
console.log(convertedNumber);

let backToString = String(convertedNumber);
console.log(backToString);

//Exercise 9: Template Literals

let personName = "Valery";
let personAge = 23;

let message = `My name is ${personName} and I am ${personAge} years old.`;

console.log(message);

//Exercise 10: Array Methods

const numbers = [1,2,3,4,5];

//map
const doubled = numbers.map(num => num * 2);
console.log(doubled);

// filter
const even = numbers.filter(num => num % 2 === 0);
console.log(even);

// reduce
const totalSum = numbers.reduce((total, num) => total + num, 0);
console.log(totalSum);