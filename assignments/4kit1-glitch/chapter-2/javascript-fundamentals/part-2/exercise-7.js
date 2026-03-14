let password = prompt("enter your pass word")

function validatePassword(password) {
  if (password.length < 8) {
    return "Too short";
  } else if (!/[A-Z]/.test(password)) {
    return "Missing uppercase";
  } else if (!/[0-9]/.test(password)) {
    return "Missing number";
  } else {
    return "Valid";
  }
}