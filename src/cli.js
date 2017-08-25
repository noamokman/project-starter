import program from 'caporal';
import pkg from '../package.json';
import updateNotifier from 'update-notifier';
import add from './';

const notifier = updateNotifier({pkg});

program.version(pkg.version)
  .description(pkg.description)
  .command('add', 'Add two numbers')
  .argument('<a>', 'The first number', program.FLOAT)
  .argument('<b>', 'The second number', program.FLOAT)
  .action(({a, b}, options, logger) => {
    logger.info(`${a} + ${b} = ${add(a, b)}`);

    notifier.notify();
  });

export default argv => {
  program
    .parse(argv);
};