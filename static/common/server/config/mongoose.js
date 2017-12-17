import logger from 'env-bunyan';
import mongoose from 'mongoose';
import {seed} from 'mongoose-plugin-seed';

mongoose.connect(process.env.MONGO_URI);

mongoose.Promise = Promise;

export default () => {
  if (process.env.SEED_DB !== 'true') {
    return Promise.resolve();
  }

  return seed()
    .then(() => {
      logger.info('Finished populating database.');
    })
    .catch(err => {
      logger.error({err}, 'Unable to populate database');
    });
};
