/**
 * Exercise 5: Working with Objects
 * 
 * Objects are collections of related data (properties) 
 * and functions (methods).
 */

console.log("--- Exercise 5: Working with Objects ---");
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
