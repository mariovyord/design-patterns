import java.util.Stack;

public class StackExample {
    public static void main(String[] args) {
        // Create a stack of integers
        Stack<Integer> stack = new Stack<>();

        // Push elements onto the stack
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println("Stack after pushes: " + stack); // [10, 20, 30]

        // Peek at the top element
        int top = stack.peek();
        System.out.println("Top element: " + top); // 30

        // Pop an element from the stack
        int popped = stack.pop();
        System.out.println("Popped element: " + popped); // 30
        System.out.println("Stack after pop: " + stack); // [10, 20]
    }
}
