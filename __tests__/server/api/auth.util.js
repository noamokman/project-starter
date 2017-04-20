export const getAuthorizationHeader = (email = 'rick@gmail.com') => {
  const {signToken} = require('../../../server/auth/auth.service');
  const User = require('../../../server/api/user/user.model').default;

  return User.findOne({email})
    .then(({_id}) => `Bearer ${signToken(_id)}`);
};