interface IQuantityValidator {
  validate(quantity: number): { isValid: boolean; error: string | null };
}

export class QuantityValidator implements IQuantityValidator {
  private threshold: number;
  private packageSize: number;

  constructor(threshold: number, packageSize: number) {
    if (threshold < 0) throw new Error();
    if (packageSize <= 0) throw new Error();

    this.threshold = threshold;
    this.packageSize = packageSize;
  }

  public validate(quantity: number): { isValid: boolean; error: string | null } {
    if (quantity <= 0) {
      return { isValid: false, error: 'Quantity must be greater than zero' };
    }

    if (quantity >= this.threshold && quantity % this.packageSize !== 0) {
      return { 
        isValid: false, 
        error: `Quantity should be divisible by ${this.packageSize}` 
      };
    }

    return { isValid: true, error: null };
  }
}