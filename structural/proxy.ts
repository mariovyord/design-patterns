interface Payment {
  pay(amount: number): void;
}

class RealPayment implements Payment {
  pay(amount: number): void {
    console.log("Payment processed.", amount);
  }
}

class PaymentProxy implements Payment {
  private realPayment: RealPayment;

  constructor() {
    this.realPayment = new RealPayment();
  }

  pay(amount: number): void {
    if (!this.validateAmount(amount)) {
      console.error("Payment failed due to invalid amount.");
      return;
    }

    this.realPayment.pay(amount);
  }

  private validateAmount(amount: number): boolean {
    if (amount <= 0) {
      console.error("Invalid payment amount.");
      return false;
    }
    return true;
  }
}
