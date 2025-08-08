interface Memento {
  getName();
  getSnapshotDate();
}

class Originator {
  private state: string;

  constructor(state: string) {
    this.state = state;
  }

  public createMemento(): Memento {
    return new ConcreteMemento(this.state);
  }

  public restore(memento: Memento): void {
    if (memento instanceof ConcreteMemento) {
      this.state = memento.getState();
    }
  }
}

class ConcreteMemento implements Memento {
  private state: string;
  private date: Date;

  constructor(state: string) {
    this.state = state;
    this.date = new Date();
  }

  public getName(): string {
    return `Memento of state: ${this.state}`;
  }

  public getSnapshotDate(): Date {
    return this.date;
  }

  public getState(): string {
    return this.state;
  }
}
