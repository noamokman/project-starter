import 'dotenv-extended/config';
import mongoose from 'mongoose';
import seed from './config/mongoose';
import socketConfig from './config/socket';
import createApp from './config/express';
import logger from 'env-bunyan';

export const app = createApp();

const mongoStarted = seed();

export let server;

const expressStarted = new Promise(resolve => {
  server = app.listen(process.env.PORT, () => {
    logger.info('Express listening on port %s', process.env.PORT);
    resolve();
  });

  socketConfig(server);
});

export const started = Promise.all([
  mongoStarted,
  expressStarted
]);

export const close = () => {
  server.close();
  mongoose.connection.close();
};