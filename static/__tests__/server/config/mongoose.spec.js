import mongoose from 'mongoose';

const mockInfo = jest.fn();
const mockError = jest.fn();
const mockSeed = jest.fn();

jest.mock('env-bunyan', () => ({
  info: mockInfo,
  error: mockError
}));

jest.mock('mongoose-plugin-seed', () => ({
  seed: mockSeed
}));

describe('Mongoose config', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  describe('exports', () => {
    it('should expose default function', () => {
      const module = require('../../../server/config/mongoose');

      expect(module).toHaveProperty('default');
      expect(typeof module.default).toBe('function');
    });
  });

  describe('seed function', () => {
    beforeEach(() => {
      mockInfo.mockReset();
      mockError.mockReset();
      mockSeed.mockReset();
    });

    it('should return a promise on SEED_DB undefined', () => {
      delete process.env.SEED_DB;

      const {default: seed} = require('../../../server/config/mongoose');

      const promise = seed();

      expect(promise).toBeInstanceOf(Promise);

      return promise.then(() => {
        expect(mockError).not.toBeCalled();
        expect(mockInfo).not.toBeCalled();
        expect(mockSeed).not.toBeCalled();
      });
    });

    it('should return a promise on SEED_DB=false', () => {
      process.env.SEED_DB = 'false';

      const {default: seed} = require('../../../server/config/mongoose');

      const promise = seed();

      expect(promise).toBeInstanceOf(Promise);

      return promise.then(() => {
        expect(mockError).not.toBeCalled();
        expect(mockInfo).not.toBeCalled();
        expect(mockSeed).not.toBeCalled();
      });
    });

    it('should call seed on SEED_DB=true', () => {
      process.env.SEED_DB = 'true';
      mockSeed.mockImplementation(() => Promise.resolve());

      const {default: seed} = require('../../../server/config/mongoose');

      const promise = seed();

      expect(promise).toBeInstanceOf(Promise);

      return promise.then(() => {
        expect(mockSeed).toBeCalled();
        expect(mockInfo).toBeCalledWith('Finished populating database.');
        expect(mockError).not.toBeCalled();
      });
    });

    it('should log seed errors', () => {
      process.env.SEED_DB = 'true';
      const err = new Error('lol');

      mockSeed.mockImplementation(() => Promise.reject(err));

      const {default: seed} = require('../../../server/config/mongoose');

      const promise = seed();

      expect(promise).toBeInstanceOf(Promise);

      return promise.then(() => {
        expect(mockSeed).toBeCalled();
        expect(mockInfo).not.toBeCalled();
        expect(mockError).toBeCalledWith({err}, 'Unable to populate database');
      });
    });
  });
});