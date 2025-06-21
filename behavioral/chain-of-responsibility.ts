interface AuthHandler {
  setNext(handler: AuthHandler): AuthHandler;
  handle(request: string): string | null;
}

class BaseAuthHandler implements AuthHandler {
  protected nextHandler: AuthHandler | null = null;

  setNext(handler: AuthHandler): AuthHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): string | null {
    throw new Error("This method should be overridden!");
  }
}

class UserRoleHandler extends BaseAuthHandler {
  handle(request: string): string | null {
    if (request !== "user") {
      throw new Error("Access denied: User role required.");
    }

    return this.nextHandler ? this.nextHandler.handle(request) : null;
  }
}

class PasswordHandler extends BaseAuthHandler {
  handle(request: string): string | null {
    if (request !== "password") {
      throw new Error("Access denied: Password required.");
    }

    return this.nextHandler ? this.nextHandler.handle(request) : null;
  }
}

class TwoFactorAuthHandler extends BaseAuthHandler {
  handle(request: string): string | null {
    if (request !== "2fa") {
      throw new Error("Access denied: Two-factor authentication required.");
    }

    return this.nextHandler ? this.nextHandler.handle(request) : null;
  }
}

const userRoleHandler = new UserRoleHandler();
const passwordHandler = new PasswordHandler();
const twoFactorAuthHandler = new TwoFactorAuthHandler();
userRoleHandler.setNext(passwordHandler);
passwordHandler.setNext(twoFactorAuthHandler);

try {
  const result = userRoleHandler.handle("user");
  console.log("Access granted:", result);
} catch (error) {
  console.error(error.message);
}
