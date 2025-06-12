// composite example

interface Graphic {
  draw(): void;
  move(x: number, y: number): void;
}

class Dot implements Graphic {
  constructor(private x: number, private y: number) {}

  draw(): void {
    console.log(`Drawing a dot at (${this.x}, ${this.y})`);
  }

  move(x: number, y: number): void {
    this.x = x;
    this.y = y;
    console.log(`Moved dot to (${this.x}, ${this.y})`);
  }
}

class Circle implements Graphic {
  constructor(private x: number, private y: number, private radius: number) {}

  draw(): void {
    console.log(
      `Drawing a circle at (${this.x}, ${this.y}) with radius ${this.radius}`
    );
  }

  move(x: number, y: number): void {
    this.x = x;
    this.y = y;
    console.log(`Moved circle to (${this.x}, ${this.y})`);
  }
}

class CompositeGraphic implements Graphic {
  private children: Graphic[] = [];

  add(graphic: Graphic): void {
    this.children.push(graphic);
  }

  remove(graphic: Graphic): void {
    const index = this.children.indexOf(graphic);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  draw(): void {
    for (const child of this.children) {
      child.draw();
    }
  }

  move(x: number, y: number): void {
    for (const child of this.children) {
      child.move(x, y);
    }
  }
}

const dot1 = new Dot(1, 2);
const dot2 = new Dot(3, 4);
const circle1 = new Circle(5, 6, 10);
const composite = new CompositeGraphic();
composite.add(dot1);
composite.add(dot2);
composite.add(circle1);
composite.draw(); // Draws all graphics in the composite
composite.move(10, 10); // Moves all graphics in the composite
composite.draw(); // Draws all graphics in the composite after moving
