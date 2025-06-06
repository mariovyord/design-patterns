interface House {
  foundation: string;
  walls: string;
  roof: string;
  windows: number;
}

class HouseBuilder {
  private readonly house: Partial<House> = {};

  setFoundation(type: string): this {
    this.house.foundation = type;
    return this;
  }

  setWalls(material: string): this {
    this.house.walls = material;
    return this;
  }

  setRoof(type: string): this {
    this.house.roof = type;
    return this;
  }

  setWindows(number: number): this {
    this.house.windows = number;
    return this;
  }

  build(): any {
    return this.house;
  }
}
