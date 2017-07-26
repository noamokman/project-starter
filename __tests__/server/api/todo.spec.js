import request from 'supertest';
import {initServer} from '../server.util';
import {getAuthorizationHeader} from '../auth.util';

describe('Todo api', () => {
  const {started, close, server} = initServer('todo');
  let authorizationToken;

  beforeAll(() => started
    .then(() => getAuthorizationHeader())
    .then(token => {
      authorizationToken = token;
    }));

  afterAll(close);

  describe('GET /api/todos', () => {
    it('should fail if not authorized', () => request(server)
      .get('/api/todos')
      .expect(401));

    it('should get todos array', () => request(server)
      .get('/api/todos')
      .set('Authorization', authorizationToken)
      .expect(200)
      .then(({body}) => {
        expect(Array.isArray(body)).toBe(true);
      }));
  });

  describe('POST /api/todos', () => {
    it('should fail if not authorized', () => request(server)
      .post('/api/todos')
      .expect(401));

    it('should reject bad data', () => request(server)
      .post('/api/todos')
      .send({name: 'lol'})
      .set('Authorization', authorizationToken)
      .expect(400)
      .then(({body: {message}}) => {
        expect(message).toMatch('Todo validation failed');
      }));

    it('should create a todo', () => request(server)
      .post('/api/todos')
      .send({text: 'lol'})
      .set('Authorization', authorizationToken)
      .expect(201)
      .then(({body}) => {
        expect(body).toHaveProperty('text', 'lol');
        expect(body).toHaveProperty('completed', false);
        expect(body).toHaveProperty('user');
        expect(body).toHaveProperty('_id');
      }));

    it('should trim text todo', () => request(server)
      .post('/api/todos')
      .send({text: ' lol '})
      .set('Authorization', authorizationToken)
      .expect(201)
      .then(({body}) => {
        expect(body).toHaveProperty('text', 'lol');
        expect(body).toHaveProperty('completed', false);
        expect(body).toHaveProperty('user');
        expect(body).toHaveProperty('_id');
      }));
  });

  describe('GET /api/todos/:id', () => {
    let todo;

    beforeAll(() => request(server)
      .post('/api/todos')
      .send({text: 'lol'})
      .set('Authorization', authorizationToken)
      .then(({body}) => {
        todo = body;
      }));

    it('should fail if not authorized', () => request(server)
      .get(`/api/todos/${todo._id}`)
      .expect(401));

    it('should fail if not valid id', () => request(server)
      .get('/api/todos/lol')
      .expect(400));

    it('should fail if does not exist', () => request(server)
      .get('/api/todos/507f1f77bcf86cd799439011')
      .set('Authorization', authorizationToken)
      .expect(404));

    it('should fail if not your todo', () => getAuthorizationHeader('morty@gmail.com')
      .then(token => request(server)
        .post('/api/todos')
        .send({text: 'lol'})
        .set('Authorization', token))
      .then(({body: {_id}}) => request(server)
        .get(`/api/todos/${_id}`)
        .set('Authorization', authorizationToken)
        .expect(404)));

    it('should get todo', () => request(server)
      .get(`/api/todos/${todo._id}`)
      .set('Authorization', authorizationToken)
      .expect(200)
      .then(({body}) => {
        expect(body).toHaveProperty('text', todo.text);
        expect(body).toHaveProperty('completed', todo.completed);
        expect(body).toHaveProperty('user', todo.user._id);
        expect(body).toHaveProperty('_id');
      }));
  });

  describe('PUT /api/todos/:id', () => {
    let todo;

    beforeAll(() => request(server)
      .post('/api/todos')
      .send({text: 'lol'})
      .set('Authorization', authorizationToken)
      .then(({body}) => {
        todo = body;
      }));

    it('should fail if not authorized', () => request(server)
      .put(`/api/todos/${todo._id}`)
      .expect(401));

    it('should fail if not valid id', () => request(server)
      .put('/api/todos/lol')
      .expect(400));

    it('should fail if does not exist', () => request(server)
      .put('/api/todos/507f1f77bcf86cd799439011')
      .set('Authorization', authorizationToken)
      .expect(404));

    it('should fail if not your todo', () => getAuthorizationHeader('morty@gmail.com')
      .then(token => request(server)
        .post('/api/todos')
        .send({text: 'lol'})
        .set('Authorization', token))
      .then(({body: {_id}}) => request(server)
        .put(`/api/todos/${_id}`)
        .set('Authorization', authorizationToken)
        .expect(404)));

    it('should update a todo', () => request(server)
      .put(`/api/todos/${todo._id}`)
      .send({text: 'yay'})
      .set('Authorization', authorizationToken)
      .expect(200)
      .then(({body}) => {
        expect(Object.keys(body)).toHaveLength(0);
      })
      .then(() => request(server)
        .get(`/api/todos/${todo._id}`)
        .set('Authorization', authorizationToken)
        .expect(200))
      .then(({body}) => {
        expect(body).toHaveProperty('text', 'yay');
        expect(body).toHaveProperty('completed', todo.completed);
        expect(body).toHaveProperty('user', todo.user._id);
        expect(body).toHaveProperty('_id');
      }));
  });

  describe('DELETE /api/todos/:id', () => {
    let todo;

    beforeAll(() => request(server)
      .post('/api/todos')
      .send({text: 'lol'})
      .set('Authorization', authorizationToken)
      .then(({body}) => {
        todo = body;
      }));

    it('should fail if not authorized', () => request(server)
      .delete(`/api/todos/${todo._id}`)
      .expect(401));

    it('should fail if not valid id', () => request(server)
      .delete('/api/todos/lol')
      .expect(400));

    it('should fail if does not exist', () => request(server)
      .delete('/api/todos/507f1f77bcf86cd799439011')
      .set('Authorization', authorizationToken)
      .expect(404));

    it('should fail if not your todo', () => getAuthorizationHeader('morty@gmail.com')
      .then(token => request(server)
        .post('/api/todos')
        .send({text: 'lol'})
        .set('Authorization', token))
      .then(({body: {_id}}) => request(server)
        .delete(`/api/todos/${_id}`)
        .set('Authorization', authorizationToken)
        .expect(404)));

    it('should delete a todo', () => request(server)
      .delete(`/api/todos/${todo._id}`)
      .set('Authorization', authorizationToken)
      .expect(200)
      .then(({body}) => {
        expect(Object.keys(body)).toHaveLength(0);

        return request(server)
          .get(`/api/todos/${todo._id}`)
          .set('Authorization', authorizationToken)
          .expect(404);
      }));
  });
});