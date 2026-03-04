# Part 2: Operators and Control Flow - Exercises

## Exercise 1: Comparison Operators

```javascript
// Strict comparison (always use)
5 === 5          // true
5 === "5"        // false

// Standard comparison
5 > 3            // true
5 >= 5           // true
5 < 10           // true
5 <= 4           // false
5 != 5           // false

// With variables
const age = 20;
age >= 18        // true
age < 65         // true
```

---

## Exercise 2: Logical Operators

```javascript
// AND - both must be true
const isAdult = age >= 18;
const hasLicense = true;
const canDrive = isAdult && hasLicense; // true

// OR - at least one must be true
const canEnter = isStudent || hasTicket; // true if either

// NOT - reverses boolean
const isNotStudent = !isStudent;
```

---

## Exercise 3: If/Else Statements

```javascript
const grade = 85;

if (grade >= 90) {
  console.log("A");
} else if (grade >= 80) {
  console.log("B");
} else if (grade >= 70) {
  console.log("C");
} else {
  console.log("F");
}
```

---

## Exercise 4: Switch Statements

```javascript
const color = "red";

switch (color) {
  case "red":
    console.log("Stop");
    break;
  case "yellow":
    console.log("Caution");
    break;
  case "green":
    console.log("Go");
    break;
  default:
    console.log("Unknown");
}
```

---

## Exercise 5: Ternary Operator

```javascript
// Short conditional
const status = age >= 18 ? "Adult" : "Minor";

// Nested ternary
const category = 
  score >= 90 ? "A" :
  score >= 80 ? "B" :
  score >= 70 ? "C" :
  "F";
```

---

## Exercise 6: Combining Conditions

```javascript
const age = 25;
const hasLicense = true;
const isInsured = true;

// Can drive if all three conditions
if (age >= 18 && hasLicense && isInsured) {
  console.log("Safe to drive");
}

// Can access if member OR admin
if (isAdmin || isMember) {
  console.log("Access granted");
}

// Not locked out
if (!(isLocked)) {
  console.log("Can proceed");
}
```

---

## Exercise 7: Validation Example

```javascript
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
```

---

## Exercise 8: Complex Logic

```javascript
const score = 75;
const isBonusEligible = true;
const hasAttended = true;

// Multiple conditions
if (score >= 70 && hasAttended) {
  if (isBonusEligible && score >= 80) {
    console.log("Extra credit");
  } else {
    console.log("Passed");
  }
} else {
  console.log("Failed");
}
```

---

## Exercise 9: Guard Clauses

```javascript
// Good: Early returns
function processUser(user) {
  if (!user) return "No user";
  if (!user.email) return "No email";
  if (!user.age) return "No age";
  
  // Main logic
  return `Processing ${user.name}`;
}
```

---

## Exercise 10: Real-World Example

```javascript
// Login validation
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
```

