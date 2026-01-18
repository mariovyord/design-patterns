// Simple stack example in JavaScript

// Using an array as a stack
const stack = [];

// Push elements onto the stack
stack.push(10);
stack.push(20);
stack.push(30);
console.log("Stack after pushes:", stack); // [10, 20, 30]

// Peek at the top element (last pushed)
const top = stack[stack.length - 1];
console.log("Top element:", top); // 30

// Pop elements from the stack
const popped = stack.pop();
console.log("Popped element:", popped); // 30
console.log("Stack after pop:", stack); // [10, 20]
