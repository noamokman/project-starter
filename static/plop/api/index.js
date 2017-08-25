import plur from 'plur';
import uppercamelcase from 'uppercamelcase';

export default plop => {
  plop.addHelper('plur', word => plur(word, 2));
  plop.addHelper('plurUpperCase', word => uppercamelcase(plur(word, 2)));

  plop.setGenerator('api', {
    description: 'Create an api',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your api?',
        validate: ({length}) => length ? true : 'name is required'
      },
      {
        type: 'confirm',
        name: 'auth',
        message: 'Do you want to add auth?'
      },
      {
        type: 'confirm',
        name: 'socket',
        message: 'Do you want to add sockets?'
      }
    ],
    actions: ({socket}) => {
      const actions = [
        {
          type: 'add',
          path: 'server/api/{{name}}/index.js',
          templateFile: 'plop/api/index.hbs'
        },
        {
          type: 'add',
          path: 'server/api/{{name}}/{{name}}.controller.js',
          templateFile: 'plop/api/controller.hbs'
        },
        {
          type: 'add',
          path: 'server/api/{{name}}/{{name}}.model.js',
          templateFile: 'plop/api/model.hbs'
        },
        {
          type: 'add',
          path: '__tests__/server/api/{{name}}.spec.js',
          templateFile: 'plop/api/spec.hbs'
        },
        {
          type: 'add',
          path: 'server/api/{{name}}/{{name}}.seed.js',
          templateFile: 'plop/api/seed.hbs'
        },
        {
          type: 'modify',
          path: 'server/config/express/routes.js',
          pattern: /(\/\/ inject:route-imports)/gi,
          template: '$1\r\nimport {{name}}Route from \'../../api/{{name}}\';'
        },
        {
          type: 'modify',
          path: 'server/config/express/routes.js',
          pattern: /(\/\/ inject:route-usage)/gi,
          template: '$1\r\n  app.use(\'/api/{{plur name}}\', {{name}}Route);'
        }
      ];

      if (socket) {
        actions.push(
          {
            type: 'modify',
            path: 'server/config/socket.js',
            pattern: /(\/\/ inject:socket-usage)/gi,
            template: '$1\r\n  {{name}}Socket(getSockets);'
          },
          {
            type: 'modify',
            path: 'server/config/socket.js',
            pattern: /(\/\/ inject:socket-imports)/gi,
            template: '$1\r\nimport {{name}}Socket from \'../api/{{name}}/{{name}}.socket\';'
          },
          {
            type: 'add',
            path: 'server/api/{{name}}/{{name}}.socket.js',
            templateFile: 'plop/api/socket.hbs'
          },
          {
            type: 'add',
            path: '__tests__/server/api/{{name}}.socket.spec.js',
            templateFile: 'plop/api/socket.spec.hbs'
          }
        );
      }

      return actions;
    }
  });
};