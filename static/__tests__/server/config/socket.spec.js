import socketConfig from '../../../server/config/socket';

describe('Socket config', () => {
  describe('exports', () => {
    it('should expose default function', () => {
      expect(typeof socketConfig).toBe('function');
    });
  });

  describe('getSockets function', () => {
    it('should filter sockets', () => {
      let getSockets;

      jest.mock('../../../server/api/todo/todo.socket', () => func => {
        getSockets = func;
      });
      jest.resetModules();
      const {__setConnectedSockets} = require('socket.io');
      const socketConfig = require('../../../server/config/socket').default;

      socketConfig();

      expect(getSockets()).toEqual([]);

      const unauthorizedSocket = {};

      __setConnectedSockets({first: unauthorizedSocket});
      expect(getSockets()).toEqual([]);

      const authorizedSocket = {decoded_token: {_id: 'id'}}; // eslint-disable-line camelcase

      __setConnectedSockets({first: unauthorizedSocket, second: authorizedSocket});
      expect(getSockets()).toEqual([authorizedSocket]);
    });
  });
});