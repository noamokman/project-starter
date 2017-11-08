import empty from 'http-reject-empty';
import _ from 'lodash';
import Todo from './todo.model';
import {emitter} from './todo.socket';

export function index ({user}) {
  return Todo.find({user});
}

export function show ({user: {_id}, params: {id}}) {
  return Todo.findById(id)
    .then(empty)
    .then(todo => !todo.user.equals(_id) ? empty() : todo);
}

export function create ({user, body}, res) {
  const data = _.pick(body, ['text']);

  return Todo.create({...data, user})
    .then(empty)
    .then(todo => {
      res.status(201);

      return todo;
    });
}

export function update ({user, params: {id}, body}) {
  const data = _.pick(body, ['completed']);

  return Todo.findOneAndUpdate({_id: id, user}, {$set: data}, {new: true})
    .then(empty)
    .then(_.noop);
}

export function setCompleted ({user, body: {completed}}) {
  return Todo.update({user}, {$set: {completed}}, {multi: true})
    .then(({n}) => n)
    .then(empty)
    .then(() => {
      emitter.emit('completeAll', {completed, user});
    });
}

export function destroy ({user, params: {id}}) {
  return Todo.findOneAndRemove({_id: id, user})
    .then(empty)
    .then(_.noop);
}

export function clearCompleted ({user}) {
  return Todo.remove({completed: true, user})
    .then(({result: {ok}}) => ok === 1)
    .then(empty)
    .then(() => {
      emitter.emit('clearCompleted', {user});
    });
}