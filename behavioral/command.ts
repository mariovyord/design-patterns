interface PaymentCommand {
  execute(): void;
  undo(): void;
}

class BankTransferCommand implements PaymentCommand {
  private amount: number;
  private description: string;
  private executed: boolean = false;

  constructor(amount: number, description: string) {
    this.amount = amount;
    this.description = description;
  }

  execute(): void {
    console.log(
      `Executing bank transfer of ${this.amount} for ${this.description}`
    );
    this.executed = true;
  }

  undo(): void {
    if (this.executed) {
      console.log(
        `Reversing bank transfer of ${this.amount} for ${this.description}`
      );
      this.executed = false;
    } else {
      console.log("Cannot undo: Transfer was not executed");
    }
  }
}

class CreditCardCommand implements PaymentCommand {
  private amount: number;
  private description: string;
  private executed: boolean = false;

  constructor(amount: number, description: string) {
    this.amount = amount;
    this.description = description;
  }

  execute(): void {
    console.log(
      `Executing credit card payment of ${this.amount} for ${this.description}`
    );
    this.executed = true;
  }

  undo(): void {
    if (this.executed) {
      console.log(
        `Refunding credit card payment of ${this.amount} for ${this.description}`
      );
      this.executed = false;
    } else {
      console.log("Cannot undo: Payment was not executed");
    }
  }
}

// EXAMPLE USAGE
// This example demonstrates a simple command pattern for processing payments.

class PaymentProcessor {
  private commands: PaymentCommand[] = [];
  private history: PaymentCommand[] = [];

  addCommand(command: PaymentCommand): void {
    this.commands.push(command);
  }

  processPayment(): void {
    for (const cmd of this.commands) {
      cmd.execute();
      this.history.push(cmd);
    }
    // Clear commands after processing
    this.commands = [];
  }

  undoLastPayment(): void {
    const lastCommand = this.history.pop();
    if (lastCommand) {
      lastCommand.undo();
    } else {
      console.log("No payments to undo");
    }
  }
}

const bankTransfer = new BankTransferCommand(100, "Invoice #123");
const creditCard = new CreditCardCommand(200, "Invoice #456");

const paymentProcessor = new PaymentProcessor();
paymentProcessor.addCommand(bankTransfer);
paymentProcessor.processPayment();

const creditCardProcessor = new PaymentProcessor();
creditCardProcessor.addCommand(creditCard);
creditCardProcessor.processPayment();
creditCardProcessor.undoLastPayment(); // This will undo the credit card payment
