# JavaScript Design Patterns and Architecture

## Architectural Patterns

### MVC (Model-View-Controller)

```javascript
// Model - Data and logic
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  save() {
    return fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name: this.name, email: this.email })
    });
  }
  
  validate() {
    return this.email.includes('@') && this.name.length > 0;
  }
}

// View - Display data
class UserView {
  constructor(user) {
    this.user = user;
  }
  
  render() {
    return `
      <div class="user">
        <h1>${this.user.name}</h1>
        <p>${this.user.email}</p>
      </div>
    `;
  }
}

// Controller - Handle interaction
class UserController {
  constructor(user, view) {
    this.user = user;
    this.view = view;
  }
  
  handleSubmit(name, email) {
    this.user.name = name;
    this.user.email = email;
    
    if (this.user.validate()) {
      this.user.save();
    }
  }
}

// Usage
const user = new User('John', 'john@example.com');
const view = new UserView(user);
const controller = new UserController(user, view);
```

### MVVM (Model-View-ViewModel)

```javascript
// ViewModel binds Model and View
class UserViewModel {
  constructor(user) {
    this.user = user;
    this.name = user.name;
    this.email = user.email;
  }
  
  // Two-way binding simulation
  get displayName() {
    return this.user.name.toUpperCase();
  }
  
  set displayName(value) {
    this.user.name = value.toLowerCase();
  }
  
  saveUser() {
    return this.user.save();
  }
}

// View only knows about ViewModel
class UserView {
  constructor(viewModel) {
    this.vm = viewModel;
    this.nameInput = document.getElementById('name');
    
    this.nameInput.addEventListener('change', (e) => {
      this.vm.displayName = e.target.value;
    });
  }
  
  render() {
    this.nameInput.value = this.vm.displayName;
  }
}
```

---

## Behavioral Patterns

### Factory Pattern

```javascript
// Simple Factory
class EnemyFactory {
  static create(type) {
    switch (type) {
      case 'goblin':
        return new Goblin();
      case 'dragon':
        return new Dragon();
      case 'zombie':
        return new Zombie();
    }
  }
}

class Goblin {
  attack() { return 5; }
}

class Dragon {
  attack() { return 50; }
}

const enemy1 = EnemyFactory.create('goblin');
const enemy2 = EnemyFactory.create('dragon');
```

### Strategy Pattern

```javascript
// Different payment strategies
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  process(amount) {
    return this.strategy.pay(amount);
  }
}

class CreditCardPayment {
  constructor(cardNumber, cvv) {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }
  
  pay(amount) {
    console.log(`Charging $${amount} to card ${this.cardNumber}`);
    return { success: true, amount };
  }
}

class PayPalPayment {
  constructor(email) {
    this.email = email;
  }
  
  pay(amount) {
    console.log(`Charging $${amount} via PayPal to ${this.email}`);
    return { success: true, amount };
  }
}

// Usage
const cardPayment = new CreditCardPayment('1234-5678', '123');
const processor = new PaymentProcessor(cardPayment);
processor.process(99.99);

// Switch strategy
const paypalPayment = new PayPalPayment('user@example.com');
processor.strategy = paypalPayment;
processor.process(99.99);
```

### Observer/Pub-Sub Pattern

```javascript
class EventBus {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

// Usage
const bus = new EventBus();

bus.on('user-login', (user) => {
  console.log(`User ${user.name} logged in`);
});

bus.on('user-login', (user) => {
  console.log(`Welcome back, ${user.name}!`);
});

bus.emit('user-login', { name: 'John', id: 1 });
// Logs both messages
```

---

## Structural Patterns

### Adapter Pattern

```javascript
// Old API
class OldUserAPI {
  getUser(id) {
    return { userId: id, userName: 'John' };
  }
}

// New API expects different format
class NewUserAPI {
  getUser(id) {
    return { id, name: 'John' };
  }
}

// Adapter bridges the gap
class UserAPIAdapter {
  constructor(oldAPI) {
    this.oldAPI = oldAPI;
  }
  
  getUser(id) {
    const oldData = this.oldAPI.getUser(id);
    return {
      id: oldData.userId,
      name: oldData.userName
    };
  }
}

// Usage
const oldAPI = new OldUserAPI();
const adapter = new UserAPIAdapter(oldAPI);
const user = adapter.getUser(1); // Returns { id: 1, name: 'John' }
```

### Decorator Pattern

```javascript
// Base component
class TextComponent {
  render() {
    return 'Hello World';
  }
}

// Decorator adds functionality
class BoldDecorator {
  constructor(component) {
    this.component = component;
  }
  
  render() {
    return `<b>${this.component.render()}</b>`;
  }
}

class ItalicDecorator {
  constructor(component) {
    this.component = component;
  }
  
  render() {
    return `<i>${this.component.render()}</i>`;
  }
}

// Composition
let text = new TextComponent();
text = new BoldDecorator(text);
text = new ItalicDecorator(text);
console.log(text.render()); // <i><b>Hello World</b></i>
```

---

## Creational Patterns

### Prototype Pattern

```javascript
// Prototype object
const userPrototype = {
  greet() {
    return `Hello, I'm ${this.name}`;
  },
  
  birthday() {
    this.age++;
  }
};

// Create new instances from prototype
function createUser(name, age) {
  const user = Object.create(userPrototype);
  user.name = name;
  user.age = age;
  return user;
}

const user1 = createUser('John', 30);
const user2 = createUser('Jane', 28);

console.log(user1.greet()); // Hello, I'm John
user1.birthday();
console.log(user1.age); // 31
```

### Builder Pattern

```javascript
class UserBuilder {
  constructor(name) {
    this.user = { name };
  }
  
  setEmail(email) {
    this.user.email = email;
    return this;
  }
  
  setAge(age) {
    this.user.age = age;
    return this;
  }
  
  setRole(role) {
    this.user.role = role;
    return this;
  }
  
  build() {
    return this.user;
  }
}

// Usage - fluent interface
const user = new UserBuilder('John')
  .setEmail('john@example.com')
  .setAge(30)
  .setRole('admin')
  .build();

console.log(user);
// { name: 'John', email: 'john@example.com', age: 30, role: 'admin' }
```

---

## Architectural Principles

### SOLID Principles

**Single Responsibility:**
```javascript
// GOOD
class UserRepository {
  save(user) { }
  find(id) { }
}

class UserValidator {
  validate(user) { }
}

// BAD
class User {
  save() { }
  validate() { }
  sendEmail() { }
  logActivity() { }
}
```

**Open/Closed:**
```javascript
// GOOD - Open for extension, closed for modification
class ReportGenerator {
  constructor(formatter) {
    this.formatter = formatter; // Inject strategy
  }
  
  generate(data) {
    return this.formatter.format(data);
  }
}

class CSVFormatter {
  format(data) { return 'csv'; }
}

class JSONFormatter {
  format(data) { return 'json'; }
}

// Add new formatter without changing ReportGenerator
class XMLFormatter {
  format(data) { return 'xml'; }
}
```

**Liskov Substitution:**
```javascript
// GOOD - Subclasses can replace parent
class Animal {
  makeSound() { }
}

class Dog extends Animal {
  makeSound() { return 'Woof'; }
}

class Cat extends Animal {
  makeSound() { return 'Meow'; }
}

// Can use any subclass
function playSound(animal) {
  console.log(animal.makeSound());
}

playSound(new Dog());   // Woof
playSound(new Cat());   // Meow
```

---

## Best Practices

✅ **DO:**
- Use patterns that solve real problems
- Keep patterns simple
- Document why you chose a pattern
- Refactor as understanding improves
- Use composition over inheritance
- Depend on abstractions, not concretions

❌ **DON'T:**
- Over-engineer with patterns
- Use patterns just because they sound good
- Create nested decorators that are hard to trace
- Mix patterns confusingly
- Forget about readability for cleverness

