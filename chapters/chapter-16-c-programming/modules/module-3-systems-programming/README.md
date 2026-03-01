# Chapter 16, Module 3: Systems Programming and C Standards

## Module Overview
This module covers systems programming with C, focusing on operating system interfaces, POSIX standards, and low-level system access. Students will learn about processes, threads, inter-process communication, file systems, and system calls. The module emphasizes writing reliable systems code while understanding the underlying OS concepts.

## Learning Outcomes
Students will be able to:
- Use POSIX APIs for process and thread management
- Implement inter-process communication mechanisms
- Work with files, directories, and file systems
- Manage signals and asynchronous events
- Implement networking code with sockets
- Understand and work with multiple C standards
- Debug systems-level code effectively

## Curriculum Outline

### Part 1: Processes and Threads
- Duration: 8 hours
- Topics:
  - Process creation and management
  - Process lifecycle and exit codes
  - Environment variables and process context
  - POSIX threads (pthreads)
  - Thread synchronization (mutexes, condition variables)
  - Race conditions and data races
  - Debugging multi-threaded applications

### Part 2: Inter-Process Communication
- Duration: 8 hours
- Topics:
  - Pipes and named pipes (FIFOs)
  - Message queues and shared memory
  - Sockets and network communication
  - Signals and signal handling
  - Semaphores for process synchronization
  - Unix domain sockets
  - IPC security and permissions

### Part 3: File Systems and I/O
- Duration: 7 hours
- Topics:
  - File descriptors and file operations
  - Directory traversal and manipulation
  - File permissions and access control
  - Memory-mapped files
  - Asynchronous I/O
  - Block and character devices
  - File locking and concurrent access

### Part 4: Standards and Portability
- Duration: 7 hours
- Topics:
  - C89, C99, C11, and C23 standards
  - Compiler extensions and portability
  - Autotools and build systems
  - Conditional compilation
  - Platform-specific code handling
  - Testing and continuous integration
  - Documentation and code style standards

## Duration
Approximately 30 hours of instruction and hands-on practice

## Prerequisites
- Chapter 16, Module 1: C Programming Fundamentals
- Chapter 16, Module 2: Advanced C Programming
- Understanding of operating system concepts
- Experience with Linux/Unix environment

## Assignments

### Assignment 1: Multi-Process Pipeline (16 hours)
Create a command-line pipeline program that spawns multiple child processes, establishes pipes between them, and coordinates data flow. Implement similar to shell pipes (|). Handle process termination, zombie prevention, and provide progress reporting.

### Assignment 2: Thread-Safe Data Structure (16 hours)
Implement a thread-safe queue or hash table using pthreads. Include proper synchronization primitives, deadlock prevention, and performance optimization for multi-threaded access. Write stress tests to verify thread safety and measure performance scaling.

### Assignment 3: Socket-Based Network Server (18 hours)
Build a TCP or UDP server handling multiple client connections. Implement connection handling (either threaded or event-based with select/epoll), protocol implementation, and graceful shutdown. Test with multiple concurrent clients and measure throughput.

### Assignment 4: File System Utility (16 hours)
Create a file system tool (comparable to find, du, or similar) that efficiently traverses directories, gathers statistics, handles permissions, and presents results. Include error handling for permission issues, symbolic links, and large directory trees. Optimize for performance.

## Pro Tips
- fork() is the Unix way to create processes - understand the child/parent relationship
- Always handle SIGCHLD to prevent zombie processes - use waitpid in signal handler
- pthreads require careful synchronization - improper locking causes subtle race conditions
- Memory barriers matter on weak-memory architectures - be careful with shared data
- Signals are limited and asynchronous - keep signal handlers minimal
- File locking is advisory, not mandatory - multiple processes can ignore locks
- Memory-mapped files are efficient for large files - but sync issues require care
- select/poll/epoll are necessary for high-performance I/O - blocking syscalls don't scale
- Named pipes (FIFOs) are simpler than sockets for local IPC - but less flexible
- C99 and later have useful features (variadic macros, inline) - but limit portability
- Link-time optimization helps but may hide errors - test with and without
- Always set close-on-exec flags for file descriptors - prevents accidental inheritance
