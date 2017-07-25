import User from '../user/user.model';

export default {
  dependencies: [User],
  seed: ([user]) => [
    {
      text: 'Cool todo',
      user
    }
  ]
};