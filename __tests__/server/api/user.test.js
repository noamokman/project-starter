import request from 'supertest';

describe('User api', () => {
  let app;

  beforeEach(() => {
    app = require('../../../server/app');
  });
  afterEach(() => {
    app.close();
  });

  describe('GET /api/users', () => {
    it('should fail if not authorized', () => {
      return request(app.server)
        .get('/api/users')
        .expect(401);
    });
  });
});