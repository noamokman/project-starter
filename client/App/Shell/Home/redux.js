const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const COMPLETE_TODO = 'COMPLETE_TODO';
const COMPLETE_ALL = 'COMPLETE_ALL';
const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

export const SHOW_ALL = 'show_all';
export const SHOW_COMPLETED = 'show_completed';
export const SHOW_ACTIVE = 'show_active';

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
];

export default function todos (state = initialState, action) {
  switch (action.type) {
  case ADD_TODO:
    return [
      {
        id: state.reduce((maxId, {id}) => Math.max(id, maxId), -1) + 1,
        completed: false,
        text: action.text
      },
      ...state
    ];

  case DELETE_TODO:
    return state.filter(todo =>
        todo.id !== action.id
      );

  case EDIT_TODO:
    return state.map(todo =>
        todo.id === action.id ?
        {...todo, text: action.text} :
          todo
      );

  case COMPLETE_TODO:
    return state.map(todo =>
        todo.id === action.id ?
        {...todo, completed: !todo.completed} :
          todo
      );

  case COMPLETE_ALL: {
    const areAllMarked = state.every(({completed}) => completed);


    return state.map(todo => ({
      ...todo,
      completed: !areAllMarked
    }));
  }
  case CLEAR_COMPLETED:
    return state.filter(todo => todo.completed === false);

  default:
    return state;
  }
}

export const addTodo = text => ({type: ADD_TODO, text});
export const deleteTodo = id => ({type: DELETE_TODO, id});
export const editTodo = (id, text) => ({type: EDIT_TODO, id, text});
export const completeTodo = id => ({type: COMPLETE_TODO, id});
export const completeAll = () => ({type: COMPLETE_ALL});
export const clearCompleted = () => ({type: CLEAR_COMPLETED});
