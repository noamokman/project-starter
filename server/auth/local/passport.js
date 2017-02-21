import passport from 'passport';
import User from '../../api/user/user.model';

export default () => {
  passport.use(User.createStrategy());
};