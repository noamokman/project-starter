export default {
  seed: () => [
    {
      name: {
        first: 'rick',
        last: 'sanchez'
      },
      email: 'rick@gmail.com',
      password: '123456789',
      admin: true
    },
    {
      name: {
        first: 'morty',
        last: 'sanchez'
      },
      email: 'morty@gmail.com',
      password: '123456789'
    }
  ]
};