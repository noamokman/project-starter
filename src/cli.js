import {resolve} from 'path';
import program from 'caporal';
import updateNotifier from 'update-notifier';
import pkg from '../package.json';
import {initializeProjectDirectory} from '.';

const notifier = updateNotifier({pkg});

program.version(pkg.version)
  .description(pkg.description)
  .argument('[path]', 'Directory to initialize', null, process.cwd())
  .action(({path}, options, logger) => initializeProjectDirectory({path: resolve(path)})
    .then(() => {
      logger.info('All done!');

      notifier.notify();
    })
    .catch(console.error));

export default argv => {
  program
    .parse(argv);
};