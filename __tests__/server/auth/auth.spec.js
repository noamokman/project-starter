import request from 'supertest';
import {initServer} from '../server.util';

describe('Auth api', () => {
  const {started, close, server} = initServer('auth');

  beforeAll(() => started);
  afterAll(close);

  describe('POST /auth/local', () => {
    it('should fail if no data sent', () => request(server)
      .post('/auth/local')
      .expect(400));

    it('should fail if wrong data send', () => request(server)
      .post('/auth/local')
      .send({username: 'rick@gmail.com', password: '123456789'})
      .expect(400));

    it('should fail if wrong password', () => request(server)
      .post('/auth/local')
      .send({email: 'rick@gmail.com', password: 'lol'})
      .expect(401));


    it('should return a token', () => request(server)
      .post('/auth/local')
      .send({email: 'rick@gmail.com', password: '123456789'})
      .expect(200)
      .then(({body: {token}}) => {
        expect(typeof token).toBe('string');
      }));
  });
});