import { describe, expect, it } from '@jest/globals';
import { Calculator } from '../src/calculator.util.js';

describe('Calculator', () => {
  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      // Given
      const a = 5;
      const b = 3;

      // When
      const result = Calculator.add(a, b);

      // Then
      expect(result).toBe(8);
    });

    it('should add negative numbers correctly', () => {
      // Given
      const a = -5;
      const b = -3;

      // When
      const result = Calculator.add(a, b);

      // Then
      expect(result).toBe(-8);
    });

    it('should add zero correctly', () => {
      // Given
      const a = 5;
      const b = 0;

      // When
      const result = Calculator.add(a, b);

      // Then
      expect(result).toBe(5);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers correctly', () => {
      // Given
      const a = 10;
      const b = 3;

      // When
      const result = Calculator.subtract(a, b);

      // Then
      expect(result).toBe(7);
    });

    it('should handle negative results', () => {
      // Given
      const a = 3;
      const b = 10;

      // When
      const result = Calculator.subtract(a, b);

      // Then
      expect(result).toBe(-7);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      // Given
      const a = 4;
      const b = 5;

      // When
      const result = Calculator.multiply(a, b);

      // Then
      expect(result).toBe(20);
    });

    it('should handle multiplication by zero', () => {
      // Given
      const a = 5;
      const b = 0;

      // When
      const result = Calculator.multiply(a, b);

      // Then
      expect(result).toBe(0);
    });

    it('should handle negative numbers', () => {
      // Given
      const a = -3;
      const b = 4;

      // When
      const result = Calculator.multiply(a, b);

      // Then
      expect(result).toBe(-12);
    });
  });

  describe('divide', () => {
    it('should divide two numbers correctly', () => {
      // Given
      const a = 15;
      const b = 3;

      // When
      const result = Calculator.divide(a, b);

      // Then
      expect(result).toBe(5);
    });

    it('should handle decimal results', () => {
      // Given
      const a = 10;
      const b = 3;

      // When
      const result = Calculator.divide(a, b);

      // Then
      expect(result).toBeCloseTo(3.333, 3);
    });

    it('should throw error when dividing by zero', () => {
      // Given
      const a = 10;
      const b = 0;

      // When & Then
      expect(() => Calculator.divide(a, b)).toThrow('Division by zero is not allowed');
    });
  });

  describe('percentage', () => {
    it('should calculate percentage correctly', () => {
      // Given
      const value = 200;
      const percent = 15;

      // When
      const result = Calculator.percentage(value, percent);

      // Then
      expect(result).toBe(30);
    });

    it('should handle zero percentage', () => {
      // Given
      const value = 100;
      const percent = 0;

      // When
      const result = Calculator.percentage(value, percent);

      // Then
      expect(result).toBe(0);
    });
  });

  describe('power', () => {
    it('should calculate power correctly', () => {
      // Given
      const base = 2;
      const exponent = 3;

      // When
      const result = Calculator.power(base, exponent);

      // Then
      expect(result).toBe(8);
    });

    it('should handle power of zero', () => {
      // Given
      const base = 5;
      const exponent = 0;

      // When
      const result = Calculator.power(base, exponent);

      // Then
      expect(result).toBe(1);
    });

    it('should handle negative exponents', () => {
      // Given
      const base = 2;
      const exponent = -2;

      // When
      const result = Calculator.power(base, exponent);

      // Then
      expect(result).toBe(0.25);
    });
  });
});
