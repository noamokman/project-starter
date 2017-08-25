export const initServer = name => {
  process.env.PORT = 0;
  process.env.SESSION_SECRET = 'test';
  process.env.SEED_DB = true;
  process.env.MONGO_URI = `mongodb://localhost/starter-test-${name}`;

  return require('../../server/app');
};