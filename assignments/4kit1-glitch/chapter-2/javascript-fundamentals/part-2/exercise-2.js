// AND - both must be true
const isAdult = age >= 18;
const hasLicense = true;
const canDrive = isAdult && hasLicense; // true

// OR - at least one must be true
const canEnter = isStudent || hasTicket; // true if either

// NOT - reverses boolean
const isNotStudent = !isStudent;