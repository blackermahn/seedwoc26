# Part 2: Operators and Control Flow

## 📚 Part Overview

Master operators and control flow - the building blocks of decision-making in code. Learn to write conditional logic, use operators effectively, and control program flow.

## 🎯 Learning Objectives

By completing this part, you will:
- Understand all JavaScript operator types
- Use comparison and logical operators
- Master conditional statements (if/else, switch)
- Use ternary and nullish operators
- Handle truthy and falsy values
- Write clean, readable conditionals
- Understand operator precedence
- Build complex decision logic

## 🕐 Estimated Duration
- **Time**: 5-6 hours
- **Difficulty**: ⭐ Easy to Intermediate
- **Prerequisites**: Part 1 - Variables and Data Types

## 📖 Table of Contents
1. [Operator Types](#operators)
2. [Comparison Operators](#comparison)
3. [Logical Operators](#logical)
4. [Conditional Statements](#conditionals)
5. [Advanced Operators](#advanced)
6. [Decision Trees](#trees)
7. [Exercises](#exercises)

---

## Operator Types {#operators}

### Operator Categories

```javascript
// ARITHMETIC Operators
const sum = 5 + 3;           // 8
const diff = 10 - 2;          // 8
const product = 4 * 5;        // 20
const quotient = 20 / 4;      // 5
const remainder = 17 % 5;     // 2
const power = 2 ** 3;         // 8 (exponent)

// INCREMENT/DECREMENT
let count = 5;
count++;                       // 6
count--;                       // 5
++count;                       // 6 (pre-increment)
count++;                       // 7 (post-increment)

// ASSIGNMENT Operators
let x = 10;
x += 5;                        // x = 15 (add and assign)
x -= 3;                        // x = 12
x *= 2;                        // x = 24
x /= 4;                        // x = 6

// STRING Concatenation
const name = "Alice";
const greeting = "Hello, " + name;  // "Hello, Alice"
const greeting2 = `Hello, ${name}`; // "Hello, Alice"
```

---

## Comparison Operators {#comparison}

### Types of Comparisons

```javascript
// EQUALITY Comparison
const a = 5;
const b = "5";

// == (loose equality - converts types)
console.log(a == b);         // true (5 == "5")
console.log(a == "10");      // false

// === (strict equality - no conversion)
console.log(a === b);        // false (number !== string)
console.log(a === 5);        // true

// != and !==
console.log(a != b);         // false (loose)
console.log(a !== b);        // true (strict)

// RELATIONAL Operators
console.log(5 > 3);          // true
console.log(5 >= 5);         // true
console.log(2 < 8);          // true
console.log(10 <= 10);       // true

// String Comparison (lexicographic)
console.log("apple" < "banana");    // true (a < b)
console.log("apple" > "Apple");     // true (lowercase > uppercase)
```

### Comparison Table

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| == | Equal to (loose) | 5 == "5" | true |
| === | Equal to (strict) | 5 === "5" | false |
| != | Not equal to (loose) | 5 != "5" | false |
| !== | Not equal to (strict) | 5 !== "5" | true |
| > | Greater than | 5 > 3 | true |
| >= | Greater or equal | 5 >= 5 | true |
| < | Less than | 3 < 5 | true |
| <= | Less or equal | 3 <= 5 | true |

**Best Practice: Always use === and !==**

---

## Logical Operators {#logical}

### AND, OR, NOT Operators

```javascript
// AND (&&) - Both must be true
const age = 25;
const hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log("Can drive");  // Prints
}

// Returns first falsy value, else returns last value
console.log(true && "hello");      // "hello"
console.log(false && "hello");     // false
console.log("hi" && "bye");        // "bye"

// OR (||) - At least one must be true
const isWeekend = false;
const isHoliday = true;

if (isWeekend || isHoliday) {
  console.log("No work!");  // Prints
}

// Returns first truthy value, else returns last value
console.log(false || "hello");     // "hello"
console.log("hi" || "bye");        // "hi"
console.log(false || false);       // false

// NOT (!) - Inverts boolean
const isSunny = true;
const isRainy = !isSunny;         // false

// Double negative = positive
console.log(!!0);                  // false
console.log(!!"hello");            // true
```

### Truth Table

```
AND (&&)
A     | B     | A && B
------|-------|-------
true  | true  | true
true  | false | false
false | true  | false
false | false | false

OR (||)
A     | B     | A || B
------|-------|-------
true  | true  | true
true  | false | true
false | true  | true
false | false | false

NOT (!)
A     | !A
------|----
true  | false
false | true
```

---

## Conditional Statements {#conditionals}

### If / Else If / Else

```javascript
const score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");  // Executes here
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}

// Rule: Only ONE branch executes
```

### Switch Statements

```javascript
const day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of week");
    break;                    // Important!
  case "Friday":
    console.log("Almost weekend");
    break;
  case "Saturday":
  case "Sunday":              // Multiple cases
    console.log("Weekend");
    break;
  default:
    console.log("Mid-week day");
}

// Without break: falls through!
switch (2) {
  case 1:
    console.log("One");       // Skipped
  case 2:
    console.log("Two");       // Prints
  case 3:
    console.log("Three");     // Also prints (fall-through)
  }
```

### Ternary Operator

```javascript
// condition ? true_value : false_value
const age = 20;
const status = age >= 18 ? "Adult" : "Minor";  // "Adult"

// Nested ternary (use carefully)
const grade = 85;
const letter = grade >= 90 ? "A" : 
               grade >= 80 ? "B" :
               grade >= 70 ? "C" :
               "F";

// Better: use if/else for complex logic
```

---

## Advanced Operators {#advanced}

### Nullish Coalescing (??)

```javascript
// ?? Returns right if left is null/undefined
const username = null;
const displayName = username ?? "Anonymous";  // "Anonymous"

const count = 0;
const result = count ?? 10;                   // 0 (0 is not nullish)

// Different from ||
const empty = "";
console.log(empty || "default");              // "default"
console.log(empty ?? "default");              // "" (empty string is fine)
```

### Optional Chaining (?.)

```javascript
const user = {
  profile: {
    name: "Alice"
  }
};

// Safe property access
console.log(user?.profile?.name);             // "Alice"
console.log(user?.age?.years);                // undefined (no error!)

// Safer than:
console.log(user.address.street);     // Error! address is undefined

// Array indexing
const arr = null;
console.log(arr?.[0]);                        // undefined
```

---

## Decision Trees {#trees}

### Visualizing Complex Logic

```
User Authentication Flow:

       User Login?
          /  \
        YES  NO → Show Login Screen
        |
    Username Valid?
       /    \
     YES    NO → Show Error, Retry
     |
  Password Valid?
     /    \
   YES    NO → Show Error, Retry
   |
  2FA Enabled?
   /   \
 YES   NO → Grant Access
 |
Send 2FA Code → User Enters Code → Code Valid? → Grant Access
                                        |
                                       NO → Resend Code
```

### Code Implementation

```javascript
function authenticateUser(username, password, has2FA) {
  // Check if credentials exist
  if (!username || !password) {
    return "Username and password required";
  }
  
  // Validate username
  if (username.length < 3) {
    return "Username too short";
  }
  
  // Validate password
  if (password.length < 8) {
    return "Password too weak";
  }
  
  // Check 2FA
  if (has2FA) {
    return "Send 2FA code";
  }
  
  return "Authentication successful";
}

// Test cases
console.log(authenticateUser("", "password123"));           // Required
console.log(authenticateUser("ab", "password123"));         // Too short
console.log(authenticateUser("alice", "pass"));             // Too weak
console.log(authenticateUser("alice", "password123", false)); // Success
console.log(authenticateUser("alice", "password123", true));  // 2FA
```

---

## Code Examples {#examples}

### Grade Calculator

```javascript
function calculateGrade(score) {
  if (score < 0 || score > 100) {
    return "Invalid score";
  }
  
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

// Test
console.log(calculateGrade(95));   // "A"
console.log(calculateGrade(85));   // "B"
console.log(calculateGrade(45));   // "F"
console.log(calculateGrade(150));  // "Invalid score"
```

### Access Control

```javascript
function checkAccess(user) {
  // More readable than nested ternary
  const { isAdmin, isActive, hasPermission } = user;
  
  if (!isActive) {
    return { granted: false, reason: "Account inactive" };
  }
  
  if (isAdmin) {
    return { granted: true, reason: "Admin access" };
  }
  
  if (!hasPermission) {
    return { granted: false, reason: "Permission denied" };
  }
  
  return { granted: true, reason: "Access granted" };
}

// Test
console.log(checkAccess({ isAdmin: true, isActive: true, hasPermission: false }));
// { granted: true, reason: "Admin access" }
```

---

## 📝 Exercises {#exercises}

### Exercise 1: Comparison Operators
**Task:** Compare values and understand strict vs. loose equality

```javascript
// Write a function that compares two values
function compare(a, b) {
  return {
    loose: a == b,
    strict: a === b,
    greater: a > b,
    difference: a - b
  };
}

// Test cases
console.log(compare(5, "5"));       // {loose: true, strict: false, ...}
console.log(compare(10, 10));       // {loose: true, strict: true, ...}
console.log(compare("a", "b"));     // {..., greater: false}

// Solution: Always use === for comparison
```

---

### Exercise 2: Age Validator
**Task:** Validate age and show appropriate messages

```javascript
function validateAge(age) {
  if (age < 0 || age > 150) {
    return "Invalid age";
  } else if (age < 13) {
    return "Child";
  } else if (age < 18) {
    return "Teen";
  } else if (age < 65) {
    return "Adult";
  } else {
    return "Senior";
  }
}

// Test
console.log(validateAge(8));    // "Child"
console.log(validateAge(15));   // "Teen"
console.log(validateAge(30));   // "Adult"
console.log(validateAge(70));   // "Senior"
console.log(validateAge(-5));   // "Invalid age"
```

---

### Exercise 3: Login System
**Task:** Simulate a login system with multiple validations

```javascript
function login(username, password, isAdmin) {
  if (!username || !password) {
    return "Username and password required";
  }
  
  if (username.length < 3) {
    return "Username must be at least 3 characters";
  }
  
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  
  if (!isAdmin && username === "admin") {
    return "Admin login failed";
  }
  
  return "Login successful";
}

// Test cases
console.log(login("", "password123"));            // Required
console.log(login("ab", "password123"));          // Too short
console.log(login("user", "pass"));               // Password weak
console.log(login("admin", "password123", false)); // Not admin
console.log(login("user", "password123", true));  // Success
```

---

### Exercise 4: Traffic Light System
**Task:** Implement traffic light logic using switch

```javascript
function trafficAction(color) {
  switch(color) {
    case "red":
      return "Stop";
    case "yellow":
      return "Prepare to stop";
    case "green":
      return "Go";
    default:
      return "Invalid color";
  }
}

// Test
console.log(trafficAction("red"));    // "Stop"
console.log(trafficAction("green"));  // "Go"
console.log(trafficAction("blue"));   // "Invalid color"
```

---

### Exercise 5: Discount Calculator
**Task:** Calculate discounts based on purchase amount and customer type

```javascript
function calculateDiscount(amount, customerType) {
  if (amount <= 0) {
    return "Invalid amount";
  }
  
  let discount = 0;
  
  if (customerType === "regular") {
    discount = amount > 100 ? 0.05 : 0;
  } else if (customerType === "member") {
    discount = 0.10;
  } else if (customerType === "vip") {
    discount = 0.20;
  } else {
    return "Invalid customer type";
  }
  
  const finalPrice = amount * (1 - discount);
  return {
    original: amount,
    discount: discount * 100,
    final: finalPrice.toFixed(2)
  };
}

// Test
console.log(calculateDiscount(100, "regular"));    // {original: 100, discount: 0, final: "100.00"}
console.log(calculateDiscount(150, "regular"));    // {original: 150, discount: 5, final: "142.50"}
console.log(calculateDiscount(150, "member"));     // {original: 150, discount: 10, final: "135.00"}
console.log(calculateDiscount(150, "vip"));        // {original: 150, discount: 20, final: "120.00"}
```

---

### Exercise 6: Password Strength Checker
**Task:** Check password strength with multiple criteria

```javascript
function checkPasswordStrength(password) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);
  const isLongEnough = password.length >= 8;
  
  let strength = 0;
  if (hasUppercase) strength++;
  if (hasLowercase) strength++;
  if (hasNumbers) strength++;
  if (hasSpecial) strength++;
  if (isLongEnough) strength++;
  
  switch(strength) {
    case 0:
    case 1:
      return "Weak";
    case 2:
    case 3:
      return "Medium";
    case 4:
      return "Strong";
    case 5:
      return "Very Strong";
  }
}

// Test
console.log(checkPasswordStrength("pass"));                // "Weak"
console.log(checkPasswordStrength("password"));            // "Medium"
console.log(checkPasswordStrength("Password1"));           // "Strong"
console.log(checkPasswordStrength("P@ssw0rd123"));         // "Very Strong"
```

---

### Exercise 7: Number Classifier
**Task:** Classify numbers into categories

```javascript
function classifyNumber(num) {
  let classification = {
    even: num % 2 === 0,
    positive: num > 0,
    prime: isPrime(num),
    perfect: isPerfectSquare(num)
  };
  
  return classification;
}

function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function isPerfectSquare(n) {
  return Math.sqrt(n) % 1 === 0;
}

// Test
console.log(classifyNumber(17));      // {even: false, positive: true, prime: true, perfect: false}
console.log(classifyNumber(25));      // {even: false, positive: true, prime: false, perfect: true}
console.log(classifyNumber(-4));      // {even: true, positive: false, prime: false, perfect: false}
```

---

### Exercise 8: Game Status Checker
**Task:** Determine game state based on player conditions

```javascript
function gameStatus(health, ammo, hasShield) {
  if (health <= 0) {
    return "Game Over - Dead";
  }
  
  if (health <= 20) {
    return "Critical - Low Health";
  }
  
  if (ammo === 0 && !hasShield) {
    return "Defenseless";
  }
  
  if (ammo < 10) {
    return "Low Ammunition";
  }
  
  if (hasShield) {
    return "Protected";
  }
  
  return "Ready to Battle";
}

// Test
console.log(gameStatus(0, 50, true));      // "Game Over - Dead"
console.log(gameStatus(10, 5, true));      // "Critical - Low Health"
console.log(gameStatus(100, 0, false));    // "Defenseless"
console.log(gameStatus(100, 5, false));    // "Low Ammunition"
console.log(gameStatus(100, 50, true));    // "Protected"
console.log(gameStatus(100, 50, false));   // "Ready to Battle"
```

---

### Exercise 9: Student Grade Report
**Task:** Generate comprehensive grade report

```javascript
function gradeReport(scores) {
  const average = scores.reduce((a, b) => a + b, 0) / scores.length;
  const highest = Math.max(...scores);
  const lowest = Math.min(...scores);
  
  let grade, status;
  
  if (average >= 90) {
    grade = "A";
    status = "Excellent";
  } else if (average >= 80) {
    grade = "B";
    status = "Good";
  } else if (average >= 70) {
    grade = "C";
    status = "Average";
  } else if (average >= 60) {
    grade = "D";
    status = "Below Average";
  } else {
    grade = "F";
    status = "Failing";
  }
  
  const passing = average >= 60;
  
  return {
    average: average.toFixed(2),
    grade,
    status,
    highest,
    lowest,
    passing
  };
}

// Test
console.log(gradeReport([95, 87, 92, 89, 91]));
// {average: "90.80", grade: "A", status: "Excellent", highest: 95, lowest: 87, passing: true}
```

---

### Exercise 10: Comprehensive Validation
**Task:** Multi-level validation system

```javascript
function validateUser(user) {
  const errors = [];
  
  // Name validation
  if (!user.name || user.name.trim() === "") {
    errors.push("Name is required");
  } else if (user.name.length < 2) {
    errors.push("Name must be at least 2 characters");
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!user.email || !emailRegex.test(user.email)) {
    errors.push("Invalid email format");
  }
  
  // Age validation
  if (user.age < 0 || user.age > 150) {
    errors.push("Age must be between 0 and 150");
  }
  
  // Password validation
  if (!user.password || user.password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  
  if (errors.length === 0) {
    return { valid: true, message: "User is valid" };
  } else {
    return { valid: false, errors };
  }
}

// Test
console.log(validateUser({ 
  name: "Alice", 
  email: "alice@example.com", 
  age: 25, 
  password: "securePass123" 
}));
// { valid: true, message: "User is valid" }

console.log(validateUser({ 
  name: "", 
  email: "invalid-email", 
  age: 200, 
  password: "123" 
}));
// { valid: false, errors: [...] }
```

---

## 🎓 Summary

You've learned:
- Arithmetic, comparison, and logical operators
- Conditional statements (if/else, switch, ternary)
- Advanced operators (nullish coalescing, optional chaining)
- Decision-making logic
- Best practices for readable conditionals

## ✅ Checklist for Success

- [ ] Understand all operator types
- [ ] Know when to use === vs ==
- [ ] Can write complex conditional logic
- [ ] Know ternary operator syntax
- [ ] Understand operator precedence
- [ ] Can debug conditional logic
- [ ] Completed all 10 exercises
