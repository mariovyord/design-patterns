class MySingleton {
  private static instance: MySingleton;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static getInstance(): MySingleton {
    if (!MySingleton.instance) {
      MySingleton.instance = new MySingleton();
    }
    return MySingleton.instance;
  }

  public greet(): string {
    return "Hello, Singleton!";
  }
}

// Usage
const singleton1 = MySingleton.getInstance();
const singleton2 = MySingleton.getInstance();
console.log(singleton1.greet()); // Output: Hello, Singleton!
console.log(singleton1 === singleton2); // Output: true, both variables point to the same instance
