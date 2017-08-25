import {resolve} from 'path';
import program from 'caporal';
import pkg from '../package.json';
import updateNotifier from 'update-notifier';
import {initializeModuleDirectory} from './';

const notifier = updateNotifier({pkg});

program.version(pkg.version)
  .description(pkg.description)
  .argument('[path]', 'Directory to initialize', null, process.cwd())
  .option('-n, --name', 'Name your project', program.STRING)
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