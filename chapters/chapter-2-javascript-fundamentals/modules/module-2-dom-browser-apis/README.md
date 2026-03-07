# Chapter 2, Module 2: DOM Manipulation and Browser APIs

## Module Overview
This module focuses on practical interaction with the Document Object Model (DOM), browser APIs, and event handling. Students will learn to manipulate the DOM, handle user events, work with timers, and use browser storage APIs. The module emphasizes practical web development skills and understanding browser capabilities.

## Learning Outcomes
Students will be able to:
- Select, create, and modify DOM elements
- Handle user events and event delegation
- Work with browser storage (localStorage, sessionStorage)
- Understand the event lifecycle and propagation
- Use timers and intervals effectively
- Access browser APIs (fetch, geolocation, notifications)
- Debug DOM-related issues in browser developer tools

## Curriculum Outline

### Part 1: DOM Selection and Manipulation
- Duration: 6 hours
- Topics:
  - getElementById, querySelector, querySelectorAll
  - Creating and removing DOM elements
  - Modifying element properties and attributes
  - Working with classes and styles
  - DOM traversal (parent, children, siblings)
  - Performance considerations for DOM updates
  - Virtual DOM concept (preview of frameworks)

### Part 2: Event Handling and Delegation
- Duration: 6 hours
- Topics:
  - Event listeners and removal
  - Event propagation (bubbling and capturing)
  - Event delegation for dynamic elements
  - Default event behavior
  - Event object properties and methods
  - Common events (click, input, submit, etc.)
  - Keyboard and mouse event handling

### Part 3: Browser Storage and State
- Duration: 5 hours
- Topics:
  - localStorage for persistent storage
  - sessionStorage for session-specific data
  - JSON serialization for complex objects
  - Storage events and cross-tab communication
  - Cookies basics
  - IndexedDB introduction
  - Security considerations for storage

### Part 4: Browser APIs and Features
- Duration: 5 hours
- Topics:
  - Fetch API for HTTP requests
  - XMLHttpRequest (older approach)
  - Geolocation API
  - Notification API
  - Web Workers introduction
  - Local file access with FileReader
  - Browser feature detection

## Duration
Approximately 22 hours of instruction and hands-on practice

## Prerequisites
- Chapter 2, Module 1: JavaScript Variables and Data Types
- Understanding of JavaScript functions and closures
- Basic HTML knowledge

## Assignments

### Assignment 1: Todo List Web App (12 hours)
Build a fully functional todo list using vanilla JavaScript: add/remove/edit todos, persist to localStorage, highlight completed items, clear all. Include input validation and local-first design. No frameworks allowed - pure DOM manipulation.

### Assignment 2: Weather Application (14 hours)
Create a weather app that fetches data from a weather API (OpenWeatherMap, WeatherAPI). Display current weather and forecast, store user preferences in localStorage, implement geolocation detection, and provide a clean UI with responsive design.

### Assignment 3: Dynamic Form with Validation (10 hours)
Build a multi-step form with real-time validation using DOM events. Provide feedback on validation, implement form submission via Fetch API, store draft data in sessionStorage, and include error handling with user-friendly messages.

### Assignment 4: Real-time Collaboration Demo (12 hours)
Create a simple shared note-taking app using Fetch API to communicate with a backend (or simulated). Implement real-time updates, show user count, handle conflicts, and demonstrate cross-tab notifications using storage events.

## Pro Tips
- querySelector is powerful - learn CSS selectors fully to leverage it
- Event delegation reduces memory - important for lists with many elements
- Avoid excessive DOM manipulation - batch updates for performance
- localStorage persists across sessions - perfect for user preferences
- Fetch API is promise-based - master promises before using it
- preventDefault stops default behavior - know when to use it (form submission)
- Event bubbling simplifies handlers - attach to parent instead of each item
- Browser developer tools are essential - master the Elements tab for debugging
- Serialization to JSON is standard for storage - but size is limited (~5MB)
- Cross-origin requests require CORS headers - understand the restrictions
- Geolocation requires user permission - provide clear context
- File uploads require form data - FormData API simplifies this
