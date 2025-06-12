class TreeType {
  constructor(public name: string) {}
}

class TreeTypeFactory {
  private static treeTypes: { [key: string]: TreeType } = {};

  public static getTreeType(name: string): TreeType {
    if (!this.treeTypes[name]) {
      this.treeTypes[name] = new TreeType(name);
    }
    return this.treeTypes[name];
  }
}

class Tree {
  private x: number;
  private y: number;
  private type: TreeType; // Reference to the shared TreeType

  constructor(type: TreeType, x: number, y: number) {
    this.type = type;
    this.x = x;
    this.y = y;
  }

  draw(): void {
    console.log(`Drawing ${this.type.name} tree at (${this.x}, ${this.y})`);
  }
}

class Forest {
  private trees: Tree[] = [];

  addTree(typeName: string, x: number, y: number): void {
    const type = TreeTypeFactory.getTreeType(typeName);
    const tree = new Tree(type, x, y);
    this.trees.push(tree);
  }

  draw(): void {
    for (const tree of this.trees) {
      tree.draw();
    }
  }
}
