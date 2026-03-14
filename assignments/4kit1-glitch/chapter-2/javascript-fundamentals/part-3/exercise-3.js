const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log(color);
}

// With index
for (const [index, color] of colors.entries()) {
  console.log(index, color);
}