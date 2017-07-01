import passport from 'passport';
import User from '../../api/user/user.model';

passport.use(User.createStrategy());