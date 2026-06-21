/// <reference types="jest" />
import { QuantityValidator } from './index';

describe('Task 2: QuantityValidator', () => {
  describe('Constructor Validation', () => {
    it('throws an error if threshold is negative', () => {
      expect(() => new QuantityValidator(-1, 5)).toThrow();
    });

    it('throws an error if packageSize is zero or less', () => {
      expect(() => new QuantityValidator(10, 0)).toThrow();
      expect(() => new QuantityValidator(10, -5)).toThrow();
    });
  });

  describe('Method: validate()', () => {
    let validator: QuantityValidator;

    beforeEach(() => {
      validator = new QuantityValidator(10, 5); 
    });

    it('returns false if quantity is zero or less', () => {
      expect(validator.validate(0).isValid).toBe(false);
      expect(validator.validate(-5).isValid).toBe(false);
    });

    it('returns true if quantity is less than threshold', () => {
      expect(validator.validate(7)).toEqual({ isValid: true, error: null });
    });

    it('returns true if quantity exceeds/equals threshold AND is divisible by packageSize', () => {
      expect(validator.validate(10)).toEqual({ isValid: true, error: null });
      expect(validator.validate(15)).toEqual({ isValid: true, error: null });
    });

    it('returns false and an error message if quantity exceeds threshold and is not divisible by packageSize', () => {
      expect(validator.validate(12)).toEqual({ 
        isValid: false, 
        error: 'Quantity should be divisible by 5' 
      });
    });
  });
});