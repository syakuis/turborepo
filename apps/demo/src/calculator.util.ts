export class Calculator {
  static add(a: number, b: number): number {
    return a + b;
  }

  static subtract(a: number, b: number): number {
    return a - b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  static divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }

  static percentage(value: number, percent: number): number {
    return (value * percent) / 100;
  }

  static power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }
}
