import {resolve} from 'path';
import program from 'caporal';
import updateNotifier from 'update-notifier';
import pkg from '../package.json';
import {initializeModuleDirectory} from './';

const notifier = updateNotifier({pkg});

program.version(pkg.version)
  .description(pkg.description)
  .argument('[path]', 'Directory to initialize', null, process.cwd())
  .option('-n, --name', 'Name of your project', program.STRING)
  .action(({path}, {name}, logger) => initializeModuleDirectory({path: resolve(path), name})
    .then(() => {
      logger.info('All done!');

      notifier.notify();
    })
    .catch(logger.error));

export default argv => {
  program
    .parse(argv);
};