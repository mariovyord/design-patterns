interface MyFile {
  name: string;
}

interface Visitor {
  print(file: MyFile): void;
}

class PrinterVisitor implements Visitor {
  print(file: MyFile): void {
    console.log(`Printing file: ${file.name}`);
  }
}

class EmailVisitor implements Visitor {
  print(file: MyFile): void {
    console.log(`Sending file: ${file.name} via email`);
  }
}

class ManualPrintVisitor implements Visitor {
  print(file: MyFile): void {
    console.log(`Manually printing file: ${file.name}`);
  }
}

class MyFile implements MyFile {
  constructor(public name: string) {}

  print(visitor: Visitor): void {
    visitor.print(this);
  }
}

const myFile = new MyFile("document.txt");
myFile.print(new PrinterVisitor());
myFile.print(new EmailVisitor());
myFile.print(new ManualPrintVisitor());
