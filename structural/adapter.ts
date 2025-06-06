// Adapter pattern for handling different data sources

// Source interface (the complex/incompatible interface)
interface MyData {
  id: number;
  name: string;
  timestamp: string;
  source: string;
}

// Target interface (what the client expects)
interface MyDataNeeds {
  id: number;
}

// Original class with incompatible interface
class DataSource {
  fetchData(): MyData {
    return {
      id: 1,
      name: "Sample Data",
      timestamp: new Date().toISOString(),
      source: "default",
    };
  }
}

// Target interface that client will use
interface DataAdapter {
  getData(): MyDataNeeds; // Changed return type to MyDataNeeds
}

// Adapter class
class DataAdapterImpl implements DataAdapter {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  getData(): MyDataNeeds {
    const data = this.dataSource.fetchData();
    return {
      id: data.id,
    };
  }
}

// Example usage
const source = new DataSource();
const adapter = new DataAdapterImpl(source);
const result = adapter.getData(); // Returns { id: 1 }
