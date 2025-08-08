interface House {
  foundation: string;
  walls: string;
  roof: string;
}

class HouseTemplate {
  protected house: House;

  // Template method
  public buildHouse(): House {
    this.buildFoundation();
    this.buildWalls();
    this.buildRoof();

    return this.house;
  }

  protected buildFoundation(): void {
    console.log("Building the foundation of the house.");
    this.house.foundation = "Concrete";
  }

  protected buildWalls(): void {
    console.log("Building the walls of the house.");
    this.house.walls = "Brick";
  }

  protected buildRoof(): void {
    console.log("Building the roof of the house.");
    this.house.roof = "Tile";
  }
}

class WoodenHouseTemplate extends HouseTemplate {
  protected buildWalls(): void {
    console.log("Building the walls of the wooden house.");
    this.house.walls = "Wood";
  }
}

const woodenHouse = new WoodenHouseTemplate();
const house = woodenHouse.buildHouse();
console.log(house);
// Output: { foundation: 'Concrete', walls: 'Wood', roof: 'Tile' }
