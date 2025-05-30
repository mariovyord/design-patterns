interface RouteStrategy {
  calculateRoute(start: string, end: string): string;
}

class CarRouteStrategy implements RouteStrategy {
  calculateRoute(start: string, end: string): string {
    return `Car route from ${start} to ${end}`;
  }
}

class BikeRouteStrategy implements RouteStrategy {
  calculateRoute(start: string, end: string): string {
    return `Bike route from ${start} to ${end}`;
  }
}

class WalkingRouteStrategy implements RouteStrategy {
  calculateRoute(start: string, end: string): string {
    return `Walking route from ${start} to ${end}`;
  }
}

class Client {
  private readonly strategy: RouteStrategy;

  constructor(userInput: RouteStrategy) {
    this.strategy = userInput;
  }

  getRoute(start: string, end: string): string {
    return this.strategy.calculateRoute(start, end);
  }
}
