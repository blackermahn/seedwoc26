let email = prompt("Enter your email:");
let password = prompt("Enter your password:");
let rememberMe = Boolean(prompt("enter 1 or 0"));


function login(email, password, rememberMe) {
  if (!email || !password) {
    return { success: false, message: "Email and password required" };
  }
  
  const emailValid = email.includes("@");
  const passwordValid = password.length >= 6;
  
  if (!emailValid) {
    return { success: false, message: "Invalid email" };
  }
  
  if (!passwordValid) {
    return { success: false, message: "Password too short" };
  }
  
  // If remember me, save credentials
  if (rememberMe) {
    localStorage.setItem("email", email);
  }
  
  return { success: true, message: "Login successful" };
}


login(email, password, rememberMe)