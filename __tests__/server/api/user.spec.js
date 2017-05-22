import request from 'supertest';
import {initServer} from './server.util';
import {getAuthorizationHeader} from './auth.util';

describe('User api', () => {
  const {started, close, server} = initServer('user');
  let authorizationToken;

  beforeAll(() => {
    return started
      .then(() => getAuthorizationHeader())
      .then(token => {
        authorizationToken = token;
      });
  });

  afterAll(() => {
    close();
  });

  describe('GET /api/users', () => {
    it('should fail if not authorized', () => {
      return request(server)
        .get('/api/users')
        .expect(401);
    });

    it('should get users array', () => {
      return request(server)
        .get('/api/users')
        .set('Authorization', authorizationToken)
        .expect(200)
        .then(({body}) => {
          expect(Array.isArray(body)).toBe(true);
        });
    });
  });
});