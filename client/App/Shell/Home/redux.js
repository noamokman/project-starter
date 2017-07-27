import {createAction} from 'redux-actions';
import {resolve} from 'redux-simple-promise';
import _ from 'lodash';

const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';
const ADD_TODO = 'ADD_TODO';
const LOAD_TODOS = 'LOAD_TODOS';
const DELETE_TODO = 'DELETE_TODO';
const TODO_SAVE = 'server/TODO_SAVE';
const TODO_UPDATE = 'server/TODO_UPDATE';
const TODO_COMPLETE_ALL = 'server/TODO_COMPLETE_ALL';
const TODO_DELETE = 'server/TODO_DELETE';
const COMPLETE_TODO = 'COMPLETE_TODO';
const COMPLETE_ALL = 'COMPLETE_ALL';
const TODO_CLEAR_COMPLETED = 'server/TODO_CLEAR_COMPLETED';
const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

const initialState = {
  todos: [],
  loaded: false,
  visibility: true
};

export default function (state = initialState, {type, payload}) {
  switch (type) {
  case TOGGLE_VISIBILITY:
    return {
      ...state,
      visibility: !state.visibility
    };
  case TODO_SAVE:
    return {
      ...state,
      todos: [
        payload,
        ...state.todos
      ]
    };
  case TODO_UPDATE:
    return {
      ...state,
      todos: state.todos.map(todo => {
        if (todo._id === payload._id) {
          return payload;
        }

        return todo;
      })
    };
  case resolve(LOAD_TODOS):
    return {
      ...state,
      loaded: true,
      todos: payload.data
    };
  case TODO_DELETE:
    return {
      ...state,
      todos: state.todos.filter(({_id}) => _id !== payload._id)
    };
  case TODO_COMPLETE_ALL:
    return {
      ...state,
      todos: state.todos.map(todo => ({
        ...todo,
        completed: payload.completed
      }))
    };

  case TODO_CLEAR_COMPLETED:
    return {
      ...state,
      todos: state.todos.filter(({completed}) => !completed)
    };

  default:
    return state;
  }
}

export const toggleVisibility = createAction(TOGGLE_VISIBILITY, _.noop);
export const addTodo = createAction(ADD_TODO, text => ({
  request: {
    url: '/todos',
    method: 'POST',
    data: {
      text
    }
  }
}));
export const loadTodos = createAction(LOAD_TODOS, () => ({
  request: {
    url: '/todos'
  }
}));
export const deleteTodo = createAction(DELETE_TODO, _id => ({
  request: {
    url: `/todos/${_id}`,
    method: 'delete'
  }
}));
export const completeTodo = createAction(COMPLETE_TODO, (_id, completed) => ({
  request: {
    url: `/todos/${_id}`,
    method: 'put',
    data: {
      completed
    }
  }
}));
export const completeAll = createAction(COMPLETE_ALL, completed => ({
  request: {
    url: '/todos/completed',
    method: 'put',
    data: {
      completed
    }
  }
}));
export const clearCompleted = createAction(CLEAR_COMPLETED, () => ({
  request: {
    url: '/todos/clear',
    method: 'delete'
  }
}));
