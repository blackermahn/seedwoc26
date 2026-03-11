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

//Conditional statement
//an if else statement tests if a condition is true or false and returns (mostly by printing) a value for either point.
// a "natural if else statement test a condition and returns a value"
const score = 85;
if (score >= 90) {
    console.log("Grade A");
} else if (score >= 80) {
    console.log("Grade B");
} else {
    console.log("Grade C");
}

// an if else statement can also test if a condition is true for a certain variable, and end up switching the value of the variable due to its present value
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

//two conditions can also be combinned (that it the results from two conditions combined ) and then stored in a variable.
//for example
// Combining conditions
//const canVote = age >= 18 && isCitizen;//tests if the age is good,a and also if the individual is a citizen
//const hasPermission = isAdmin || isOwner;//tests if the person is an admin, and if the said person is an owner, hence permission is granted based on a combination of two conditions.
//the above code returns an error value because the variables have not been defined.

//Ternary operators
const agestatus = age >= 18 ? "Adult" : "Minor";
// a ternary operator is a shorthand way of writing an if-else statement. it takes three operands: a condition, a value to return if the condition is true, and a value to return if the condition is false. in the above code, we are checking if the age is greater than or equal to 18, and if it is, we return "Adult", otherwise we return "Minor".
//multiple ternary operators can also be nested to check for multiple conditions. for example:

const category =
    score >= 90 ? "A" :
        score >= 80 ? "B" :
            score >= 70 ? "C" :
                "F";

//the above nested ternary operator checks the score and assigns a category based on the value of the score. if the score is greater than or equal to 90, it assigns "A", if it is greater than or equal to 80, it assigns "B", if it is greater than or equal to 70, it assigns "C", otherwise it assigns "F".

//Exercise 6: Combining Conditions
const newAge = 25;
const hasLicense = true;
const isInsured = true;
//variable declarations complete

//we can combine conditions using logical operators to determine if a person can drive. for example:
// Can drive if all three conditions
if (age >= 18 && hasLicense && isInsured) {
    console.log("Safe to drive");
}
//can drive if he has a license and is insured, and is old enough

// Can access if member OR admin
if (isAdmin || isMember) {
    console.log("Access granted");
}
//can be used to confirm member or admin logins at a security checkpoint
//uses the logical OR operator to check if either condition is true, granting access if either the user is an admin or a member.

// Not locked out
if (!(isLocked)) {
    console.log("Can proceed");
}
//can be used to check if a user is not locked out of an account, allowing them to proceed if they are not locked out. the logical NOT operator is used to negate the condition, meaning that if isLocked is false, the condition will evaluate to true, allowing the user to proceed.

