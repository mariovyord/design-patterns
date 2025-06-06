export interface Product {
  foundation: string;
  walls: string;
  roof: string;
  windows: number;
}

export interface HouseFactory {
  createHouse(): Product;
}

export class WoodenHouseFactory implements HouseFactory {
  createHouse(): Product {
    return {
      foundation: "wooden foundation",
      walls: "wooden walls",
      roof: "wooden roof",
      windows: 4,
    };
  }
}

export class BrickHouseFactory implements HouseFactory {
  createHouse(): Product {
    return {
      foundation: "brick foundation",
      walls: "brick walls",
      roof: "tile roof",
      windows: 6,
    };
  }
}
export class GlassHouseFactory implements HouseFactory {
  createHouse(): Product {
    return {
      foundation: "glass foundation",
      walls: "glass walls",
      roof: "glass roof",
      windows: 10,
    };
  }
}
