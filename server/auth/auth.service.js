import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import pify from 'pify';
import User from '../api/user/user.model';
import createError from 'http-errors';
const validateJwt = pify(expressJwt({secret: process.env.SESSION_SECRET}));

export function isAuthenticated () {
  return (req, res) => {
    // Allow access_token to be passed through query parameter as well
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = `Bearer ${req.query.access_token}`;
    }

    return validateJwt(req, res)
      .then(() => {
        return User.findById(req.user._id);
      })
      .then(user => {
        if (!user) {
          return Promise.reject(createError(401));
        }

        req.user = user;
      });
  };
}

export function isAdmin () {
  return (req, res) => {
    return isAuthenticated()(req, res)
      .then(() => {
        if (!req.user.admin) {
          return Promise.reject(createError(403));
        }
      });
  };
}

export function signToken (_id, expiresIn = '7d') {
  return jwt.sign({_id}, process.env.SESSION_SECRET, {expiresIn});
}