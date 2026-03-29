import { getCurrentTime, hello } from '../src/index.js';

describe('Backend Utils', () => {
  describe('hello function', () => {
    it('should return "Hello, World!" when no name is provided', () => {
      const result = hello();
      expect(result).toBe('Hello, World!');
    });

    it('should return personalized greeting when name is provided', () => {
      const result = hello('TypeScript');
      expect(result).toBe('Hello, TypeScript!');
    });
  });

  describe('getCurrentTime function', () => {
    it('should return current time in ISO format', () => {
      const result = getCurrentTime();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });

    it('should return different times on consecutive calls', () => {
      const time1 = getCurrentTime();
      // Small delay to ensure different timestamps
      setTimeout(() => {
        const time2 = getCurrentTime();
        expect(time1).not.toBe(time2);
      }, 1);
    });
  });
});
