import User from './user.model';
import createError from 'http-errors';
import {signToken} from '../../auth/auth.service';
import empty from 'http-reject-empty';
import _ from 'lodash';

export function index () {
  return User.find({});
}

export function show ({params: {id}}) {
  return User.findById(id)
    .then(empty);
}

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

export function update ({params: {id}, body}) {
  const data = _.pick(body, ['name', 'email']);

  return User.update({_id: id}, {$set: data})
    .then(({n}) => n)
    .then(empty)
    .then(_.noop);
}

export function destroy ({params: {id}}) {
  return User.findOneAndRemove({_id: id})
    .then(empty)
    .then(_.noop);
}

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

export function me ({user}) {
  return user;
}
