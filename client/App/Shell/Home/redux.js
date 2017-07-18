import {createAction} from 'redux-actions';

const SET_FILTER = 'SET_FILTER';
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const COMPLETE_TODO = 'COMPLETE_TODO';
const COMPLETE_ALL = 'COMPLETE_ALL';
const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

const initialState = {
  todos: [
    {
      text: 'Use Redux',
      completed: false,
      id: 0
    }
  ],
  filter: 'all'
};

export default function (state = initialState, {type, payload}) {
  switch (type) {
  case SET_FILTER:
    return {
      ...state,
      filter: payload.filter
    };
  case ADD_TODO:
    return {
      ...state,
      todos: [
        {
          id: state.todos.reduce((maxId, {id}) => Math.max(id, maxId), -1) + 1,
          completed: false,
          text: payload.text
        },
        ...state.todos
      ]
    };

  case DELETE_TODO:
    return {
      ...state,
      todos: state.todos.filter(({id}) => id !== payload.id)
    };

  case COMPLETE_TODO:
    return {
      ...state,
      todos: state.todos.map(todo =>
        todo.id === payload.id ?
          {...todo, completed: !todo.completed} :
          todo
      )
    };

  case COMPLETE_ALL:
    return {
      ...state,
      todos: state.todos.map(todo => ({
        ...todo,
        completed: !state.todos.every(({completed}) => completed)
      }))
    };

  case CLEAR_COMPLETED:
    return {
      ...state,
      todos: state.todos.filter(({completed}) => !completed)
    };

  default:
    return state;
  }
}

export const setFilter = createAction(SET_FILTER, filter => ({filter}));
export const addTodo = createAction(ADD_TODO, text => ({text}));
export const deleteTodo = createAction(DELETE_TODO, id => ({id}));
export const completeTodo = createAction(COMPLETE_TODO, id => ({id}));
export const completeAll = createAction(COMPLETE_ALL);
export const clearCompleted = createAction(CLEAR_COMPLETED);
