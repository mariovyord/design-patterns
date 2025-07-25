interface Mediator {
  notify(sender: object, event: string): void;
}

class ConcreteMediator implements Mediator {
  notify(sender: object, event: string): void {
    switch (sender.constructor.name) {
      case "ComponentA":
        if (event === "eventA") {
          console.log("Mediator handling eventA from ComponentA");
        }
        break;
      case "ComponentB":
        if (event === "eventB") {
          console.log("Mediator handling eventB from ComponentB");
        }
        break;
      default:
        console.log(
          `Mediator received unknown event: ${event} from ${sender.constructor.name}`
        );
        break;
    }
  }
}

class ComponentA {
  constructor(private mediator: Mediator) {}

  triggerEventA(): void {
    console.log("ComponentA triggering eventA");
    this.mediator.notify(this, "eventA");
  }
}

class ComponentB {
  constructor(private mediator: Mediator) {}

  triggerEventB(): void {
    console.log("ComponentB triggering eventB");
    this.mediator.notify(this, "eventB");
  }
}

const concreteMediator = new ConcreteMediator();
const componentA = new ComponentA(concreteMediator);
const componentB = new ComponentB(concreteMediator);

// Example usage
componentA.triggerEventA();
componentB.triggerEventB();
componentA.triggerEventA(); // Triggering again to see mediator's response
componentB.triggerEventB(); // Triggering again to see mediator's response
