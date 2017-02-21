import passport from 'passport';
import {signToken} from '../auth.service';

export function index (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    const error = err || info;

    if (error) {
      return res.status(401).json(error);
    }

    if (!user) {
      return res.status(404).json({message: 'something went wrong, please try again.'});
    }

    res.json({token: signToken(user._id)});
  })(req, res, next);
}