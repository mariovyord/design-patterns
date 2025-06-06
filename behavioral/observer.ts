class Publisher {
  private observers: ((data: any) => void)[] = [];

  subscribe(observer: (data: any) => void): () => void {
    this.observers.push(observer);
    return () => {
      this.unsubscribe(observer);
    };
  }

  unsubscribe(observer: (data: any) => void): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data: any): void {
    for (const observer of this.observers) {
      observer(data);
    }
  }
}

const publ = new Publisher();
const callback = (data: any) => {
  console.log("Received data:", data);
};

const unsubscribe = publ.subscribe(callback);
publ.notify("Hello, Observers!"); // Outputs: Received data: Hello, Observers!
unsubscribe(); // Unsubscribe the observer
