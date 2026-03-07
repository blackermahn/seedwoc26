const numbers = [1, 2, 3, 4, 5];

// forEach - just iterate
numbers.forEach(num => {
  console.log(num * 2); // 2, 4, 6, 8, 10
});

// With index
numbers.forEach((num, index) => {
  console.log(`${index}: ${num}`);
});