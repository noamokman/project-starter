# project-starter [![Build Status](https://travis-ci.org/noamokman/project-starter.svg?branch=master)](https://travis-ci.org/noamokman/project-starter)
a cli tool to help you start a new project

## Installation
``` bash
$ [sudo] npm install project-starter -g
```

### Preview
See the output of this project [here](https://github.com/noamokman/project-starter-sample)

## Features
The generated project uses the following technologies:

### Client
* [React](https://github.com/facebook/react) A declarative, efficient, and flexible JavaScript library for building user interfaces
* [React Router](https://github.com/rackt/react-router) Declarative routing for React
* [Redux](http://redux.js.org/) A predictable state container for JavaScript apps.
* [Axios](https://github.com/mzabriskie/axios) Promise based HTTP client for the browser and node.js
* [React Router Redux](https://github.com/reactjs/react-router-redux) Ruthlessly simple bindings to keep react-router and redux in sync
* [redux-axios-middleware](https://github.com/svrcekmichal/redux-axios-middleware) Redux middleware for fetching data with axios HTTP client
* [redux-simple-promise](https://github.com/alanrubin/redux-simple-promise) Promise middleware for Redux
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools) DevTools for Redux with hot reloading, action replay, and customizable UI
* [Material-ui](http://www.material-ui.com) A Set of React Components that Implement Google's Material Design
* [redux-form](https://github.com/erikras/redux-form) to manage form state in Redux
* [styled-components](https://www.styled-components.com/) Use the best bits of ES6 and CSS to style your apps without stress
* [socket.io-client](https://github.com/socketio/socket.io-client) Realtime application framework (client)
* [redux-actions](https://github.com/reduxactions/redux-actions) Flux Standard Action utilities for Redux
* [redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper) Handling Authentication and Authorization with Routing and Redux
* [redux-sockets](https://github.com/SharonGrossman/redux-sockets) simplify the integration of socket.io with your redux application
* [reflexbox](https://github.com/jxnblk/reflexbox) React flexbox layout and grid system
* [loadable-components](https://github.com/smooth-code/loadable-components) React code splitting made easy

### Server
* [Express](http://expressjs.com) Fast, minimalist web framework for Node.js
* [Socket.io](https://socket.io/) Socket.IO enables real-time bidirectional event-based communication
* [Mongoose](http://mongoosejs.com/) mongodb object modeling for node.js
* [express-async-router](https://github.com/spatools/express-async-router) An Express Router wrapper which automatically manage Promise.
* [express-json-error-handler](https://github.com/noamokman/express-json-error-handler) Error handler for express JSON APIs
* [express-jwt](https://github.com/auth0/express-jwt) express middleware that validates a JsonWebToken
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) JsonWebToken implementation for node.js
* [express-static-gzip](https://github.com/tkoenig89/express-static-gzip) Simple wrapper on top of express.static, that allows serving pre-gzipped files
* [passport](http://passportjs.org/) Passport is authentication middleware for Node.js
* [mongoose-plugin-seed](https://github.com/omrilitov/mongoose-plugin-seed) Mongoose plugin to seed your models
* [socketio-jwt](https://github.com/auth0/socketio-jwt) Authenticate socket.io incoming connections with JWTs
* [nodemon](https://nodemon.io/) Nodemon is a utility that will monitor for any changes in your source and automatically restart your server
* [bunyan](https://github.com/trentm/node-bunyan) a simple and fast JSON logging module for node.js services
* [env-bunyan](https://github.com/SharonGrossman/env-bunyan) Bunyan wrapper with environment variables

### Utilities
* [Babel](http://babeljs.io) Javascript Transpiler
* [babel-preset-env](https://github.com/babel/babel-preset-env) automatically determine what to compile.
* [babel-minify](https://github.com/babel/minify) An ES6+ aware minifier
* [Webpack](http://webpack.github.io) Module bundling
* [webpack-compression-plugin](https://github.com/webpack-contrib/compression-webpack-plugin) Prepare compressed versions of assets to serve
* [Jest](https://facebook.github.io/jest/) to allow writing unit tests for the project.
* [Enzyme](https://github.com/airbnb/enzyme) Javascript testing utilities for React
* [Husky](https://github.com/typicode/husky) Git hooks made easy
* [lint-staged](https://github.com/okonet/lint-staged) Run linters on git staged files
* [ESLint](http://eslint.org) Code styling
* [Plop](https://github.com/amwmedia/plop) Micro-generator
* [Commitlint](https://github.com/marionebl/commitlint) Lint commit messages

## Usage

Bootstrap a new project repository with these steps:

* Clone your repository

* run `npm init` with your preferred values (if no package json is found, will run `npm init -y` for you)

* run `project-starter` in the folder

### CLI
``` bash
$ project-starter

   project-starter 0.0.0 - a cli tool to help you start a new project
     
   USAGE

     project-starter [path]

   ARGUMENTS

     [path]      Directory to initialize      optional      default: "/path/to/cwd"

   GLOBAL OPTIONS

     -h, --help         Display help                                      
     -V, --version      Display version                                   
     --no-color         Disable colors                                    
     --quiet            Quiet mode - only displays warn and error messages
     -v, --verbose      Verbose mode - will also output debug messages    
```

### Example
``` bash
git clone https://github.com/me/my-project
cd my-project
project-starter
```

## License

[MIT](LICENSE)