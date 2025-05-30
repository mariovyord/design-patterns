class ExternalComplexLibraryForHouses {
  public getDoors(): string[] {
    return ["front door", "back door", "garage door"];
  }
  public getWindows(): string[] {
    return ["living room window", "kitchen window", "bedroom window"];
  }
  public getRoofTypes(): string[] {
    return ["flat roof", "pitched roof", "gabled roof"];
  }
  public getWallMaterials(): string[] {
    return ["wood", "brick", "concrete"];
  }
}

class HouseFacade {
  private library = new ExternalComplexLibraryForHouses();

  public getHouseDetails(): string {
    const doors = this.library.getDoors().join(", ");
    const windows = this.library.getWindows().join(", ");
    const roofTypes = this.library.getRoofTypes().join(", ");
    const wallMaterials = this.library.getWallMaterials().join(", ");

    return `House Details:\nDoors: ${doors}\nWindows: ${windows}\nRoof Types: ${roofTypes}\nWall Materials: ${wallMaterials}`;
  }
}
