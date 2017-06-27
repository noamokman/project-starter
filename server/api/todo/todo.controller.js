import Todo from './todo.model';
import empty from 'http-reject-empty';
import _ from 'lodash';

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

export function update ({params: {id}, body}) {
  const data = _.pick(body, ['text', 'completed']);

  return Todo.update({_id: id}, {$set: data})
    .then(({n}) => n)
    .then(empty)
    .then(_.noop);
}

export function destroy ({user, params: {id}}) {
  return Todo.findOneAndRemove({_id: id, user})
    .then(empty)
    .then(_.noop);
}