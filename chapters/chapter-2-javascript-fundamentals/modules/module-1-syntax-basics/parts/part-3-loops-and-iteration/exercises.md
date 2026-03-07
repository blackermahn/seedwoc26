# Part 3: Loops and Iteration - Exercises

## Exercise 1: For Loops

```javascript
// Basic for loop
for (let i = 1; i <= 5; i++) {
  console.log(i); // 1, 2, 3, 4, 5
}

// Backward
for (let i = 5; i >= 1; i--) {
  console.log(i); // 5, 4, 3, 2, 1
}

// Skip numbers
for (let i = 0; i <= 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8, 10
}

// With array
const fruits = ["apple", "banana", "cherry"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

---

## Exercise 2: While Loops

```javascript
// Basic while
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}

// Do-while (runs at least once)
let num = 10;
do {
  console.log(num);
  num--;
} while (num > 0);
```

---

## Exercise 3: For-Of Loops

```javascript
// Iterate over array values
const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log(color);
}

// With index
for (const [index, color] of colors.entries()) {
  console.log(index, color);
}
```

---

## Exercise 4: For-In Loops

```javascript
// Iterate over object keys
const person = { name: "Alice", age: 25, email: "alice@test.com" };

for (const key in person) {
  console.log(key, person[key]);
}
```

---

## Exercise 5: Array Methods - forEach

```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach - just iterate
numbers.forEach(num => {
  console.log(num * 2); // 2, 4, 6, 8, 10
});

// With index
numbers.forEach((num, index) => {
  console.log(`${index}: ${num}`);
});
```

---

## Exercise 6: Array Methods - map

```javascript
// map - transform array
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Convert objects
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];
const names = users.map(user => user.name);
console.log(names); // ["Alice", "Bob"]
```

---

## Exercise 7: Array Methods - filter

```javascript
// filter - select items
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6]

// Filter users
const adults = users.filter(user => user.age >= 18);
```

---

## Exercise 8: Array Methods - reduce

```javascript
// reduce - combine to single value
const numbers = [1, 2, 3, 4, 5];

// Sum
const sum = numbers.reduce((total, n) => total + n, 0);
console.log(sum); // 15

// Product
const product = numbers.reduce((total, n) => total * n, 1);
console.log(product); // 120

// Count occurrences
const words = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const count = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
console.log(count); // {apple: 3, banana: 2, cherry: 1}
```

---

## Exercise 9: Chaining Methods

```javascript
// Combine filter, map, reduce
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = numbers
  .filter(n => n % 2 === 0)  // [2, 4, 6, 8, 10]
  .map(n => n * n)            // [4, 16, 36, 64, 100]
  .reduce((sum, n) => sum + n, 0); // 220

console.log(result); // 220
```

---

## Exercise 10: Break and Continue

```javascript
// break - exit loop
for (let i = 1; i <= 10; i++) {
  if (i === 5) break;
  console.log(i); // 1, 2, 3, 4
}

// continue - skip iteration
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  console.log(i); // 1, 2, 4, 5
}

// Find first match
const users = [{id: 1}, {id: 2}, {id: 3}];
for (const user of users) {
  if (user.id === 2) {
    console.log(user);
    break;
  }
}
```

