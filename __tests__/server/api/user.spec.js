import request from 'supertest';
import {initServer} from '../server.util';
import {getAuthorizationHeader} from '../auth.util';

describe('User api', () => {
  const {started, close, server} = initServer('user');
  let authorizationToken;

  beforeAll(() => started
    .then(() => getAuthorizationHeader())
    .then(token => {
      authorizationToken = token;
    }));

  afterAll(close);

  describe('GET /api/users', () => {
    it('should fail if not authorized', () => request(server)
      .get('/api/users')
      .expect(401));

    it('should fail if not admin', () => getAuthorizationHeader('morty@gmail.com')
      .then(token => request(server)
        .get('/api/users')
        .set('Authorization', token)
        .expect(403)));

    it('should get users array', () => request(server)
      .get('/api/users')
      .set('Authorization', authorizationToken)
      .expect(200)
      .then(({body}) => {
        expect(Array.isArray(body)).toBe(true);
      }));
  });

  describe('GET /api/users/:id', () => {
    let user;

    beforeAll(() => request(server)
      .get('/api/users/me')
      .set('Authorization', authorizationToken)
      .then(({body}) => {
        user = body;
      }));

    it('should fail if not authorized', () => request(server)
      .get(`/api/users/${user._id}`)
      .expect(401));

    it('should fail if not valid id', () => request(server)
      .get('/api/users/lol')
      .expect(400));


    it('should fail if not admin', () => getAuthorizationHeader('morty@gmail.com')
      .then(token => request(server)
        .get(`/api/users/${user._id}`)
        .set('Authorization', token)
        .expect(403)));

    it('should fail if does not exist', () => request(server)
      .get('/api/users/507f1f77bcf86cd799439011')
      .set('Authorization', authorizationToken)
      .expect(404));

    it('should get user', () => request(server)
      .get(`/api/users/${user._id}`)
      .set('Authorization', authorizationToken)
      .expect(200)
      .then(({body}) => {
        expect(body).toMatchObject(user);
      }));
  });

  describe('GET /api/users/me', () => {
    it('should fail if not authorized', () => request(server)
      .get('/api/users/me')
      .expect(401));

    it('should get yourself', () => request(server)
      .get('/api/users/me')
      .set('Authorization', authorizationToken)
      .expect(200)
      .then(({body}) => {
        expect(body).toHaveProperty('email', 'rick@gmail.com');
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('_id');
      }));
  });

  describe('PUT /api/users/:id', () => {
    let user;

    beforeAll(() => request(server)
      .get('/api/users/me')
      .set('Authorization', authorizationToken)
      .then(({body}) => {
        user = body;
      }));

    it('should fail if not authorized', () => request(server)
      .put(`/api/users/${user._id}`)
      .expect(401));

    it('should fail if not valid id', () => request(server)
      .put('/api/users/lol')
      .expect(400));

    it('should fail if does not exist', () => request(server)
      .put('/api/users/507f1f77bcf86cd799439011')
      .set('Authorization', authorizationToken)
      .expect(404));

    it('should fail if not yourself', () => getAuthorizationHeader('morty@gmail.com')
      .then(token => request(server)
        .put(`/api/users/${user._id}`)
        .send({name: {first: 'morty'}})
        .set('Authorization', token)
        .expect(403)));

    it('should update a diferent user if admin', () => getAuthorizationHeader('morty@gmail.com')
      .then(token => Promise.all([
        token,
        request(server)
          .get('/api/users/me')
          .set('Authorization', token)
      ]))
      .then(([token, {body: {_id}}]) => Promise.all([
        token,
        request(server)
          .put(`/api/users/${_id}`)
          .send({email: 'lol@gmail.com'})
          .set('Authorization', authorizationToken)
          .expect(200)
      ]))
      .then(([token]) => request(server)
        .get('/api/users/me')
        .set('Authorization', token))
      .then(({body: {_id, email}}) => {
        expect(email).toBe('lol@gmail.com');

        return request(server)
          .put(`/api/users/${_id}`)
          .send({email: 'morty@gmail.com'})
          .set('Authorization', authorizationToken)
          .expect(200);
      }));

    it('should update a user', () => request(server)
      .put(`/api/users/${user._id}`)
      .send({email: 'lol2@gmail.com'})
      .set('Authorization', authorizationToken)
      .expect(200)
      .then(({body}) => {
        expect(Object.keys(body)).toHaveLength(0);
      })
      .then(() => request(server)
        .get('/api/users/me')
        .set('Authorization', authorizationToken))
      .then(({body: {email}}) => {
        expect(email).toBe('lol2@gmail.com');
      })
      .then(() => request(server)
        .put(`/api/users/${user._id}`)
        .send({email: 'rick@gmail.com'})
        .set('Authorization', authorizationToken)
        .expect(200)));
  });

  describe('PUT /api/users/:id/password', () => {
    let user;

    beforeAll(() => request(server)
      .get('/api/users/me')
      .set('Authorization', authorizationToken)
      .then(({body}) => {
        user = body;
      }));

    it('should fail if not authorized', () => request(server)
      .put(`/api/users/${user._id}/password`)
      .expect(401));

    it('should fail if not valid id', () => request(server)
      .put('/api/users/lol/password')
      .expect(400));

    it('should fail if not yourself', () => getAuthorizationHeader('morty@gmail.com')
      .then(token => request(server)
        .put(`/api/users/${user._id}/password`)
        .send({oldPassword: '123456789', newPassword: '123456'})
        .set('Authorization', token)
        .expect(403)));

    it('should fail if no password given', () => request(server)
      .put(`/api/users/${user._id}/password`)
      .set('Authorization', authorizationToken)
      .expect(400)
      .then(({body: {message}}) => {
        expect(message).toBe('missing password arguments');
      }));

    it('should fail if wrong password given', () => request(server)
      .put(`/api/users/${user._id}/password`)
      .send({oldPassword: 'lol', newPassword: '123456'})
      .set('Authorization', authorizationToken)
      .expect(403));

    it('should update a users password', () => request(server)
      .put(`/api/users/${user._id}/password`)
      .send({oldPassword: '123456789', newPassword: '123456'})
      .set('Authorization', authorizationToken)
      .expect(200)
      .then(({body}) => {
        expect(Object.keys(body)).toHaveLength(0);
      }));
  });
});