class MyPrototype {
  name: string;

  constructor(myPrototype?: MyPrototype) {
    if (myPrototype) {
      this.name = myPrototype.name;
    } else {
      this.name = "Default Name";
    }
  }

  clone(): MyPrototype {
    return new MyPrototype(this);
  }
}

const original = new MyPrototype();
const clone = original.clone();
console.log(original === clone); // Output: false, they are different instances
