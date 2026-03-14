/**
 * Exercise 3: Conditionals
 * 
 * Conditionals control the flow of the program based on 
 * whether a condition is true or false.
 */

console.log("--- Exercise 3: Conditionals ---");
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
