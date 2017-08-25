export const initServer = name => {
  process.env.PORT = 0;
  process.env.MONGO_URI = `mongodb://localhost/starter-test-${name}`;

  return require('../../server/app');
};