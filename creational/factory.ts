class HouseFactory {
  static createHouse(type: string): House {
    switch (type) {
      case "wooden":
        return new WoodenHouse();
      case "brick":
        return new BrickHouse();
      case "glass":
        return new GlassHouse();
      default:
        throw new Error("Unknown house type");
    }
  }
}

interface House {
  foundation: string;
  walls: string;
  roof: string;
  windows: number;
}

class WoodenHouse implements House {
  foundation = "wooden foundation";
  walls = "wooden walls";
  roof = "wooden roof";
  windows = 4;
}

class BrickHouse implements House {
  foundation = "brick foundation";
  walls = "brick walls";
  roof = "tile roof";
  windows = 6;
}

class GlassHouse implements House {
  foundation = "glass foundation";
  walls = "glass walls";
  roof = "glass roof";
  windows = 10;
}
