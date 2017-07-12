const mockMorgan = jest.fn(() =>
  (req, res, next) => {
    next();
  });

jest.mock('morgan', () => mockMorgan);

describe('Express config', () => {
  beforeAll(() => {
    process.env.SESSION_SECRET = 'lol';
    process.env.LOG_NAME = 'lol';
  });
  beforeEach(() => {
    jest.resetModules();
    mockMorgan.mockClear();
  });

  describe('exports', () => {
    it('should expose default function', () => {
      const module = require('../../../../server/config/express');

      expect(module).toHaveProperty('default');
      expect(typeof module.default).toBe('function');
    });
  });

  describe('default function', () => {
    it('should return an express app', () => {
      const {default: createApp} = require('../../../../server/config/express');

      expect(createApp).toBeInstanceOf(Function);
      expect(createApp()).toHaveProperty('use');
      expect(mockMorgan).toHaveBeenCalled();
    });

    it('should not use morgan on production', () => {
      process.env.NODE_ENV = 'production';

      const {default: createApp} = require('../../../../server/config/express');

      expect(createApp).toBeInstanceOf(Function);
      expect(createApp()).toHaveProperty('use');
      expect(mockMorgan).not.toHaveBeenCalled();
    });
  });
});