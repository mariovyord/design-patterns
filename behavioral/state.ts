interface State {
  render(): void;
  publish(): void;
}

class MyDocument {
  private state: State;

  constructor(public title: string) {
    this.state = new DraftDocumentState(this);
  }

  setState(state: State): void {
    this.state = state;
  }

  render(): void {
    this.state.render();
  }

  publish(): void {
    this.state.publish();
  }
}

class DraftDocumentState implements State {
  constructor(private document: MyDocument) {}

  render(): void {
    console.log(`Rendering draft document: ${this.document.title}`);
  }

  publish(): void {
    console.log(`Publishing draft document: ${this.document.title}`);
    this.document.setState(new PublishedDocumentState(this.document));
  }
}

class PublishedDocumentState implements State {
  constructor(private document: MyDocument) {}

  render(): void {
    console.log(`Rendering published document: ${this.document.title}`);
  }

  publish(): void {
    console.log(`Document already published: ${this.document.title}`);
  }
}

// Example usage
const myDoc = new MyDocument("My First Document");
myDoc.render(); // Rendering draft document: My First Document
myDoc.publish(); // Publishing draft document: My First Document
myDoc.render(); // Rendering published document: My First Document
myDoc.publish(); // Document already published: My First Document
myDoc.render(); // Rendering published document: My First Document
myDoc.publish(); // Document already published: My First Document
myDoc.render(); // Rendering published document: My First Document
myDoc.publish(); // Document already published: My First Document
myDoc.render(); // Rendering published document: My First Document
