export default plop => {
  plop.setGenerator('plop-generator', {
    description: 'Create a new plop generator',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your plop generator name?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is your description of your plop generator?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'plop/{{name}}/index.js',
        templateFile: 'plop/plop-generator/index.hbs'
      },
      {
        type: 'add',
        path: 'plop/{{name}}/template.hbs',
        templateFile: 'plop/plop-generator/template.hbs'
      }
    ]
  });
};