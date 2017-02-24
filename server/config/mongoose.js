import logger from 'env-bunyan';
import {seed} from 'mongoose-plugin-seed';

export default mongoose => {
  mongoose.Promise = Promise;

  if (process.env.SEED_DB !== 'true') {
    return Promise.resolve();
  }

  return seed(mongoose)
    .then(() => {
      logger.info('Finished populating database.');
    })
    .catch(err => {
      logger.error({err}, 'Unable to populate database');
    });
};
