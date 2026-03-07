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