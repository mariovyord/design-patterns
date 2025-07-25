interface Iterator<T> {
  getNext(): T | null;
  hasNext(): boolean;
}

class ArrayIterator<T> implements Iterator<T> {
  private currentIndex: number = 0;

  constructor(private items: T[]) {}

  getNext(): T | null {
    if (this.hasNext()) {
      return this.items[this.currentIndex++];
    }
    return null;
  }

  hasNext(): boolean {
    return this.currentIndex < this.items.length;
  }
}

class IterableCollection<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  iterator(): Iterator<T> {
    return new ArrayIterator(this.items);
  }
}

// Example usage
const collection = new IterableCollection<number>();
collection.add(1);
collection.add(2);
collection.add(3);

const iterator = collection.iterator();
while (iterator.hasNext()) {
  console.log(iterator.getNext());
}
