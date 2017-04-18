import User from './user.model';
import createError from 'http-errors';
import {signToken} from '../../auth/auth.service';
import empty from 'http-reject-empty';
import _ from 'lodash';

// Get list of users
export function index () {
  return User.find({});
}

// Get a single user
export function show ({params: {id}}) {
  return User.findById(id)
    .then(empty);
}

// Creates a new user
export function create ({body}, res) {
  const data = _.pick(body, ['name']);

  return User.create(data)
    .then(empty)
    .then(({_id}) => {
      res.status(201);

      return {
        token: signToken(_id)
      };
    });
}

// Updates an existing user in the DB.
export function update ({params: {id}, body}) {
  const data = _.pick(body, ['name', 'email']);

  return User.update({_id: id}, {$set: data})
    .then(({n}) => n)
    .then(empty)
    .then(_.noop);
}

// Deletes a user
export function destroy ({params: id}) {
  return User.findOneAndRemove({_id: id})
    .then(empty)
    .then(_.noop);
}

// Change a users password
export function changePassword ({user: _id, body: {oldPassword, newPassword}}) {
  return User.findById(_id)
    .then(empty)
    .then(user => {
      return user.authenticate(oldPassword)
        .then(authenticated => {
          if (!authenticated) {
            return Promise.reject(createError(403));
          }

          return user.setPassword(newPassword);
        })
        .then(user => user.save())
        .then(_.noop);
    });
}

// Get my info
export function me ({user}) {
  return user;
}
