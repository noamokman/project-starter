import 'dotenv-extended/config';
import mongoose from 'mongoose';
import mongooseConfig from './config/mongoose';
import express from 'express';
import expressConfig from './config/express';
import logger from 'env-bunyan';

export const app = express();

expressConfig(app);

mongooseConfig(mongoose);

mongoose.connect(process.env.MONGO_URI);

export const server = app.listen(process.env.PORT, () => {
  logger.info('Express listening on port %s', process.env.PORT);
});

export const close = () => {
  server.close();
  mongoose.connection.close();
};