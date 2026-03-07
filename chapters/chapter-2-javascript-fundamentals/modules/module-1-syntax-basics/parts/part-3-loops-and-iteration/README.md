# Part 3: Loops and Iteration

## 📚 Part Overview

Master loops - the programming construct for repeating code. Learn for, while, forEach, and other iteration patterns to process data efficiently.

## 🎯 Learning Objectives

By completing this part, you will:
- Understand loop mechanics and flow control
- Use for, while, and do-while loops
- Master for-of and for-in loops
- Use forEach, map, filter, reduce
- Understand break and continue
- Avoid infinite loops
- Choose the right loop for each task
- Work with nested loops

## 🕐 Estimated Duration
- **Time**: 5-6 hours
- **Difficulty**: ⭐ Easy to Intermediate
- **Prerequisites**: Part 1 & 2

## Core Loop Types

### For Loop

```javascript
// for (initialization; condition; increment)
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}

// Calculate sum
let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum += i;
}
console.log(sum);  // 55

// Array iteration
const fruits = ["apple", "banana", "orange"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

### While Loop

```javascript
let count = 0;
while (count < 5) {
  console.log(count);  // 0, 1, 2, 3, 4
  count++;
}

// Read user input until valid
let userInput;
while (!userInput || userInput.length === 0) {
  userInput = prompt("Enter something:");
}
```

### Do-While Loop

```javascript
let i = 0;
do {
  console.log(i);  // Executes at least once
  i++;
} while (i < 5);

// Menu loop
let choice;
do {
  choice = prompt("1: Continue, 2: Exit");
} while (choice !== "2");
```

### For-Of Loop (Arrays)

```javascript
const numbers = [10, 20, 30];
for (const num of numbers) {
  console.log(num);  // 10, 20, 30
}

const word = "hello";
for (const char of word) {
  console.log(char);  // h, e, l, l, o
}
```

### For-In Loop (Objects)

```javascript
const user = {
  name: "Alice",
  age: 25,
  city: "NYC"
};

for (const key in user) {
  console.log(`${key}: ${user[key]}`);
}
// name: Alice
// age: 25
// city: NYC
```

## Break and Continue

```javascript
// BREAK: Exit loop
for (let i = 0; i < 10; i++) {
  if (i === 5) break;  // Exits loop
  console.log(i);  // 0, 1, 2, 3, 4
}

// CONTINUE: Skip to next iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;  // Skips i=2
  console.log(i);  // 0, 1, 3, 4
}

// Find first number divisible by 7
for (let i = 1; i <= 100; i++) {
  if (i % 7 === 0) {
    console.log(i);  // 7
    break;
  }
}
```

## Array Methods

### map() - Transform elements

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

const users = ["alice", "bob", "charlie"];
const capitalized = users.map(u => u.toUpperCase());
// ["ALICE", "BOB", "CHARLIE"]
```

### filter() - Select elements

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens);  // [2, 4, 6]

const users = [
  {name: "Alice", age: 25},
  {name: "Bob", age: 17},
  {name: "Charlie", age: 30}
];
const adults = users.filter(u => u.age >= 18);
```

### reduce() - Accumulate value

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum);  // 15

// Product
const product = numbers.reduce((acc, num) => acc * num, 1);
console.log(product);  // 120

// Count occurrences
const words = ["apple", "banana", "apple"];
const counts = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
// { apple: 2, banana: 1 }
```

### forEach() - Execute for each

```javascript
const fruits = ["apple", "banana", "orange"];
fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});
// 0: apple
// 1: banana
// 2: orange

// Side effects (like console.log)
const numbers = [1, 2, 3];
numbers.forEach(num => {
  console.log(num * 2);  // 2, 4, 6
});
```

## Code Examples

### Number Patterns

```javascript
// Multiplication table
function multiplicationTable(n) {
  for (let i = 1; i <= n; i++) {
    let row = "";
    for (let j = 1; j <= n; j++) {
      row += (i * j).toString().padStart(5);
    }
    console.log(row);
  }
}
multiplicationTable(5);
```

### Data Processing

```javascript
const sales = [
  {product: "Laptop", price: 1200, quantity: 2},
  {product: "Mouse", price: 25, quantity: 5},
  {product: "Monitor", price: 350, quantity: 1}
];

// Total revenue
const revenue = sales.reduce((total, item) => {
  return total + (item.price * item.quantity);
}, 0);
console.log(`Total Revenue: $${revenue}`);

// Product names
const products = sales.map(item => item.product);
console.log(products);  // ["Laptop", "Mouse", "Monitor"]

// Expensive items
const expensive = sales.filter(item => item.price > 200);
console.log(expensive);
```

## 📝 Exercises (10 total)

### Exercise 1: Countdown Timer
```javascript
function countdown(start) {
  for (let i = start; i >= 0; i--) {
    console.log(i);
  }
  console.log("Blastoff!");
}
```

### Exercise 2: Sum to N
```javascript
function sumToN(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
console.log(sumToN(10));  // 55
```

### Exercise 3: Multiplication Table
```javascript
function table(n) {
  for (let i = 1; i <= 10; i++) {
    console.log(`${n} x ${i} = ${n * i}`);
  }
}
table(5);
```

### Exercise 4: Find Even Numbers
```javascript
const numbers = [1,2,3,4,5,6,7,8,9,10];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);  // [2,4,6,8,10]
```

### Exercise 5: Double Numbers
```javascript
const nums = [1,2,3,4,5];
const doubled = nums.map(n => n * 2);
console.log(doubled);  // [2,4,6,8,10]
```

### Exercise 6: Count Characters
```javascript
function countChars(str) {
  const counts = {};
  for (const char of str) {
    counts[char] = (counts[char] || 0) + 1;
  }
  return counts;
}
console.log(countChars("hello"));
// {h: 1, e: 1, l: 2, o: 1}
```

### Exercise 7: Find Largest
```javascript
const numbers = [5,2,8,1,9,3];
let max = numbers[0];
for (const num of numbers) {
  if (num > max) max = num;
}
console.log(max);  // 9
```

### Exercise 8: Array Sum with Reduce
```javascript
const nums = [1,2,3,4,5];
const sum = nums.reduce((a,b) => a + b, 0);
console.log(sum);  // 15
```

### Exercise 9: Filter and Map
```javascript
const users = [
  {name: "Alice", age: 25},
  {name: "Bob", age: 17},
  {name: "Charlie", age: 30}
];
const adults = users
  .filter(u => u.age >= 18)
  .map(u => u.name);
console.log(adults);  // ["Alice", "Charlie"]
```

### Exercise 10: Complex Data Processing
```javascript
const orders = [
  {id: 1, amount: 100},
  {id: 2, amount: 250},
  {id: 3, amount: 175}
];
const total = orders.reduce((sum, o) => sum + o.amount, 0);
const expensive = orders.filter(o => o.amount > 150);
console.log({total, expensive});
```

## 🎓 Summary

You've learned:
- For, while, and do-while loops
- For-of and for-in loops
- Array iteration methods
- Breaking and continuing loops
- Functional programming with map, filter, reduce

## ✅ Checklist

- [ ] Understand loop mechanics
- [ ] Can write for loops
- [ ] Know when to use forEach vs. for
- [ ] Understand map, filter, reduce
- [ ] Completed all 10 exercises
