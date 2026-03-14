/**
 * Exercise 4: Type Coercion
 * 
 * Coercion is when JavaScript automatically converts one 
 * data type to another (e.g., number to string).
 */

console.log("--- Exercise 4: Type Coercion ---");
console.log("Coercion ('5' + 3):", "5" + 3);  // "53" (addition with string = concatenation)
console.log("Coercion ('5' - 3):", "5" - 3);  // 2 (subtraction forces number conversion)

// Boolean Coercion (Truthy/Falsy)
console.log("Truthy value (!!'hello'):", !!"hello"); // true
console.log("Falsy value (!!0):", !!0);             // false
