import request from 'supertest';
import {initServer} from './server.util';
import {getAuthorizationHeader} from './auth.util';

describe('Todo api', () => {
  const {started, close, server} = initServer('todo');
  let authorizationToken;

  beforeAll(() => {
    return started
      .then(() => getAuthorizationHeader())
      .then(token => {
        console.log(server.address().port);
        authorizationToken = token;
      });
  });

  afterAll(() => {
    close();
  });

  describe('GET /api/todos', () => {
    it('should fail if not authorized', () => {
      return request(server)
        .get('/api/todos')
        .expect(401);
    });

    it('should get todos array', () => {
      return request(server)
        .get('/api/todos')
        .set('Authorization', authorizationToken)
        .expect(200)
        .then(({body}) => {
          expect(Array.isArray(body)).toBe(true);
        });
    });
  });
});