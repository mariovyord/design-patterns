// Component interface
interface Coffee {
  cost(): number;
  description(): string;
}

// Concrete Component
class SimpleCoffee implements Coffee {
  cost(): number {
    return 5;
  }

  description(): string {
    return "Simple coffee";
  }
}

// Base Decorator
abstract class CoffeeDecorator implements Coffee {
  protected coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  cost(): number {
    return this.coffee.cost();
  }

  description(): string {
    return this.coffee.description();
  }
}

// Concrete Decorators
class MilkDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 2;
  }

  description(): string {
    return this.coffee.description() + ", with milk";
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 1;
  }

  description(): string {
    return this.coffee.description() + ", with sugar";
  }
}

// Example usage
const coffee = new SimpleCoffee();
console.log(coffee.description()); // "Simple coffee"
console.log(coffee.cost()); // 5

const coffeeWithMilk = new MilkDecorator(coffee);
console.log(coffeeWithMilk.description()); // "Simple coffee, with milk"
console.log(coffeeWithMilk.cost()); // 7

const coffeeWithMilkAndSugar = new SugarDecorator(coffeeWithMilk);
console.log(coffeeWithMilkAndSugar.description()); // "Simple coffee, with milk, with sugar"
console.log(coffeeWithMilkAndSugar.cost()); // 8
