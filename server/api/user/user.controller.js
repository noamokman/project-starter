import User from './user.model';
import createError from 'http-errors';
import empty from 'http-reject-empty';
import _ from 'lodash';

export function index () {
  return User.find({});
}

export function show ({params: {id}}) {
  return User.findById(id)
    .then(empty);
}

export function update ({user, params: {id}, body}) {
  if (!user._id.equals(id) && !user.admin) {
    return Promise.reject(createError(403));
  }

  const data = _.pick(body, ['name', 'email']);

  return User.findByIdAndUpdate(id, {$set: data})
    .then(empty)
    .then(_.noop);
}

export function changePassword ({user, params: {id}, body: {oldPassword, newPassword}}) {
  if (typeof oldPassword !== 'string' || typeof newPassword !== 'string') {
    return Promise.reject(createError(400, 'missing password arguments'));
  }

  if (!user._id.equals(id)) {
    return Promise.reject(createError(403));
  }

  return user.authenticate(oldPassword)
    .then(authenticated => !authenticated ? Promise.reject(createError(403)) : user.setPassword(newPassword))
    .then(() => user.save())
    .then(_.noop);
}

export function me ({user}) {
  return user;
}
