# Chapter 17, Module 2: Object-Oriented Design and Patterns

## Module Overview
This module explores object-oriented design principles, design patterns, and advanced OOP features in C++. Students will learn about SOLID principles, common design patterns (creational, structural, behavioral), and how to design robust, maintainable object-oriented systems. The module bridges theory with practical implementation.

## Learning Outcomes
Students will be able to:
- Apply SOLID principles to object-oriented design
- Recognize and implement creational, structural, and behavioral design patterns
- Use inheritance effectively while avoiding common pitfalls
- Implement interfaces and abstract base classes
- Apply composition over inheritance
- Design extensible and maintainable class hierarchies
- Evaluate design tradeoffs and choose appropriate patterns

## Curriculum Outline

### Part 1: SOLID Principles
- Duration: 7 hours
- Topics:
  - Single Responsibility Principle (SRP)
  - Open/Closed Principle (OCP)
  - Liskov Substitution Principle (LSP)
  - Interface Segregation Principle (ISP)
  - Dependency Inversion Principle (DIP)
  - Applying SOLID to C++ design
  - Trade-offs and practical constraints

### Part 2: Creational and Structural Patterns
- Duration: 8 hours
- Topics:
  - Singleton, Factory, Abstract Factory patterns
  - Builder pattern for complex objects
  - Adapter and Decorator patterns
  - Facade and Proxy patterns
  - Bridge and Composite patterns
  - Static vs. dynamic structural patterns
  - Pattern applicability and selection

### Part 3: Behavioral Patterns and Beyond
- Duration: 8 hours
- Topics:
  - Observer, Strategy, and State patterns
  - Command, Iterator, and Template Method patterns
  - Chain of Responsibility and Visitor patterns
  - Behavioral pattern combinations
  - Event-driven architecture
  - Reactive programming concepts
  - Pattern anti-patterns and common mistakes

### Part 4: Designing Large Systems
- Duration: 7 hours
- Topics:
  - Layered architecture
  - Dependency injection containers
  - Plugin architectures
  - Data access patterns (DAO, Repository)
  - Domain-driven design basics
  - Microservices and distributed patterns
  - Documentation and architecture communication

## Duration
Approximately 30 hours of instruction and hands-on practice

## Prerequisites
- Chapter 17, Module 1: C++ Programming and Object-Oriented Systems
- Solid understanding of C++ classes and inheritance
- Familiarity with design tradeoffs
- Experience building medium-sized projects

## Assignments

### Assignment 1: Design Pattern Implementation Suite (18 hours)
Implement 5-7 design patterns in C++, covering creational, structural, and behavioral categories. Provide clear examples for each pattern, document when to use each, and compare with related patterns. Include unit tests verifying correct behavior.

### Assignment 2: Refactor Legacy Code Using Patterns (16 hours)
Take an existing C++ codebase (your own or provided) and refactor it using design patterns. Document the current issues, Apply patterns to improve design, verify functionality is preserved, and measure improvements (testability, maintainability).

### Assignment 3: Build a Plugin Architecture (18 hours)
Design and implement a plugin system for an application (media player, graphics editor, or similar). Define a plugin interface, implement a plugin loader, create 3+ example plugins, and enable runtime plugin discovery. Document the plugin contract.

### Assignment 4: Domain-Driven Design Project (20 hours)
Design a medium-complexity domain using DDD principles. Define entities, value objects, aggregates, and repositories. Implement clean separation between domain and infrastructure layers. Create a complete example system and document the design decisions.

## Pro Tips
- Don't apply every pattern - use them when they solve real problems
- Composition is more flexible than inheritance - prefer it in most cases
- The Observer pattern is fundamental for event-driven systems - master it
- Dependency injection makes testing easier - consider using a DI container
- SOLID principles matter more than patterns - understand the principles first
- Factory patterns eliminate client coupling to concrete classes - powerful for APIs
- Strategy pattern is great for runtime algorithm selection - very flexible
- Don't implement patterns "just because" - add complexity purposefully
- Gang of Four patterns are timeless - worth studying thoroughly
- Modern C++ (C++14+) enables more elegant pattern implementations - use new features
- Anti-patterns are as important to recognize as patterns - study common mistakes
