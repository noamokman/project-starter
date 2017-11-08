export default {
  version: '0.0.0',
  main: 'server/app.js',
  scripts: {
    test: 'npm run lint && npm run jest',
    jest: 'jest',
    'jest-client': 'jest --testMatch **/__tests__/client/**/*.spec.js',
    'jest-server': 'jest --testMatch **/__tests__/server/**/*.spec.js',
    babel: 'babel server -d dist/server -s',
    copy: 'copyfiles package.json .env.defaults .env.schema dist',
    build: 'rimraf dist && npm run babel && npm run build-client && npm run copy',
    'build-client': 'webpack --env=production --define process.env.NODE_ENV="\'production\'"',
    lint: 'run-p lint-*',
    precommit: 'lint-staged',
    commitmsg: 'commitlint -e',
    'lint-server': 'eslint server --fix',
    'lint-client': 'eslint client --fix',
    'lint-tests': 'eslint __tests__ --fix',
    dev: 'run-p client-dev server-dev',
    'server-dev': 'nodemon --watch server --exec "babel-node" server/app.js',
    'client-dev': 'webpack-dev-server --open',
    prod: 'npm run build && node dist/server/app.js',
    'dev-docker': 'run-p client-dev-docker server-dev-docker',
    'client-dev-docker': 'webpack-dev-server --host 0.0.0.0 --watch-poll',
    'server-dev-docker': 'npm run server-dev -- -L'
  },
  private: true,
  engines: {
    node: '>=8'
  },
  'lint-staged': {
    '*.js': [
      'eslint --fix',
      'git add'
    ]
  },
  jest: {
    notify: true,
    testURL: 'http://localhost',
    setupTestFrameworkScriptFile: './node_modules/jest-enzyme/lib/index.js',
    collectCoverage: true,
    setupFiles: [
      './__tests__/client/setup.js',
      'jest-localstorage-mock'
    ],
    testMatch: ['**/__tests__/**/*.spec.js'],
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100
      }
    }
  },
  devDependencies: {
    '@commitlint/cli': '^4.2.2',
    '@commitlint/config-angular': '^4.2.1',
    axios: '^0.17.0',
    'babel-cli': '^6.26.0',
    'babel-eslint': '^8.0.2',
    'babel-jest': '^21.2.0',
    'babel-loader': '^7.1.2',
    'babel-minify-webpack-plugin': '^0.2.0',
    'babel-plugin-dynamic-import-node': '^1.1.0',
    'babel-plugin-lodash': '^3.2.11',
    'babel-plugin-syntax-dynamic-import': '^6.18.0',
    'babel-plugin-transform-es2015-modules-commonjs': '^6.26.0',
    'babel-plugin-transform-object-rest-spread': '^6.26.0',
    'babel-preset-env': '^1.6.1',
    'babel-preset-react': '^6.24.1',
    'babel-register': '^6.26.0',
    'compression-webpack-plugin': '^1.0.1',
    copyfiles: '^1.2.0',
    'css-loader': '^0.28.7',
    enzyme: '^3.1.1',
    'enzyme-adapter-react-16': '^1.0.4',
    eslint: '^4.10.0',
    'eslint-config-noamokman': '^7.0.1',
    'eslint-plugin-react': '^7.4.0',
    'file-loader': '^1.1.5',
    'html-webpack-plugin': '^2.30.1',
    husky: '^0.14.3',
    jest: '^21.2.1',
    'jest-enzyme': '^4.0.1',
    'jest-localstorage-mock': '^2.0.1',
    'lint-staged': '^4.3.0',
    'loadable-components': '^0.3.0',
    'material-ui': '^0.19.4',
    nodemon: '^1.12.1',
    'npm-run-all': '^4.1.2',
    plop: '^1.9.0',
    plur: '^2.1.2',
    'preload-webpack-plugin': '^2.0.0',
    'prop-types': '^15.6.0',
    raf: '^3.4.0',
    react: '^16.0.0',
    'react-collapse': '^4.0.3',
    'react-dom': '^16.0.0',
    'react-hot-loader': '^3.1.1',
    'react-motion': '^0.5.2',
    'react-redux': '^5.0.6',
    'react-router': '^3.0.0',
    'react-router-redux': '^4.0.8',
    'react-test-renderer': '^16.0.0',
    redux: '^3.7.2',
    'redux-actions': '^2.2.1',
    'redux-auth-wrapper': '^2.0.2',
    'redux-axios-middleware': '^4.0.0',
    'redux-devtools': '^3.4.0',
    'redux-devtools-dock-monitor': '^1.1.2',
    'redux-devtools-log-monitor': '^1.3.0',
    'redux-form': '^7.1.2',
    'redux-mock-store': '^1.3.0',
    'redux-simple-promise': '^2.0.2',
    'redux-sockets': '^1.1.1',
    reflexbox: '^3.0.0-0',
    rimraf: '^2.6.2',
    'socket.io-client': '^2.0.4',
    'style-loader': '^0.19.0',
    'styled-components': '^2.2.3',
    supertest: '^3.0.0',
    uppercamelcase: '^3.0.0',
    webpack: '^3.8.1',
    'webpack-dev-server': '^2.9.4'
  },
  dependencies: {
    'body-parser': '^1.18.2',
    bunyan: '^1.8.12',
    'bunyan-format': '^0.2.1',
    compression: '^1.7.1',
    'cookie-parser': '^1.4.3',
    'dotenv-extended': '^2.0.1',
    'email-address': '^1.2.2',
    'env-bunyan': '^0.1.0',
    express: '^4.16.2',
    'express-async-router': '^0.1.12',
    'express-json-error-handler': '^1.0.0',
    'express-jwt': '^5.3.0',
    'express-mongoose-errors': '^0.2.0',
    'express-param-objectid': '^1.0.0',
    'express-static-gzip': '^0.3.0',
    'http-errors': '^1.6.2',
    'http-reject-empty': '^1.0.0',
    'in-production': '^1.0.1',
    jsonwebtoken: '^8.1.0',
    lodash: '^4.17.4',
    'method-override': '^2.3.10',
    mongoose: '^4.13.0',
    'mongoose-plugin-seed': '^0.4.0',
    morgan: '^1.9.0',
    passport: '^0.4.0',
    'passport-local-mongoose': '^4.4.0',
    pify: '^3.0.0',
    'socket.io': '^2.0.4',
    'socketio-jwt': '^4.5.0'
  }
};