export const getAuthorizationHeader = (email = 'rick@gmail.com') => {
  const {signToken} = require('../../../server/auth/auth.service');
  const {default: User} = require('../../../server/api/user/user.model');

  return User.findOne({email})
    .then(({_id}) => `Bearer ${signToken(_id)}`);
};