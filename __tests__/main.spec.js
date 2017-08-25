describe('module', () => {
  const module = require('../src');

  describe('exports', () => {
    it('should expose a default function', () => {
      expect(typeof module.default).toBe('function');
    });
  });

  describe('add', () => {
    it('should add two numbers', () => {
      expect(module.default(1, 2)).toBe(3);
    });
  });
});