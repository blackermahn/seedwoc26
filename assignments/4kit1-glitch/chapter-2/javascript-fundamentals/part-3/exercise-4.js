const person = { name: "Alice", age: 25, email: "alice@test.com" };

for (const key in person) {
  console.log(key, person[key]);
}