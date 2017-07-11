import {initServer} from '../server.util';
import {getUserToken} from '../auth.util';

describe('Auth service', () => {
  const {started, close} = initServer('auth-service');
  let service;

  beforeAll(() => started
    .then(() => {
      service = require('../../../server/auth/auth.service');
    }));
  afterAll(close);

  describe('isAuthenticated', () => {
    let middleware;
    let authorizationToken;

    beforeAll(() => {
      middleware = service.isAuthenticated();

      return getUserToken()
        .then(token => {
          authorizationToken = token;
        });
    });

    it('should reject no token data', () => {
      const req = {};
      const res = {};

      return expect(middleware(req, res)).rejects.toHaveProperty('message', 'No authorization token was found');
    });

    it('should reject bad token data', () => {
      const req = {
        headers: {
          authorization: 'Bearer lol'
        }
      };
      const res = {};

      return expect(middleware(req, res)).rejects.toHaveProperty('message', 'jwt malformed');
    });

    it('should reject old token data', () => {
      const req = {
        headers: {
          authorization: `Bearer ${service.signToken('lol', 0)}`
        }
      };
      const res = {};

      return expect(middleware(req, res)).rejects.toHaveProperty('message', 'jwt expired');
    });

    it('should reject token for invalid user', () => {
      const req = {
        headers: {
          authorization: `Bearer ${service.signToken('507f1f77bcf86cd799439011')}`
        }
      };
      const res = {};

      return expect(middleware(req, res)).rejects.toHaveProperty('message', 'Unauthorized');
    });

    it('should accept token from query', () => {
      const req = {
        query: {
          access_token: authorizationToken // eslint-disable-line camelcase
        },
        headers: {}
      };
      const res = {};

      return middleware(req, res)
        .then(() => {
          expect(req.user.email).toBe('rick@gmail.com');
        });
    });
  });
});