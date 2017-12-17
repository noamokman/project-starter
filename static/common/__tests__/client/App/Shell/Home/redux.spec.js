import {resolve} from 'redux-simple-promise';
import reducer, {
  TOGGLE_VISIBILITY,
  toggleVisibility,
  ADD_TODO,
  addTodo,
  LOAD_TODOS,
  loadTodos,
  DELETE_TODO,
  deleteTodo,
  TODO_DELETE,
  TODO_SAVE,
  TODO_CLEAR_COMPLETED,
  TODO_COMPLETE_ALL,
  TODO_UPDATE,
  COMPLETE_TODO,
  completeTodo,
  COMPLETE_ALL,
  completeAll,
  clearCompleted,
  CLEAR_COMPLETED
} from '../../../../../client/App/Shell/Home/redux';

describe('Home redux', () => {
  describe('reducer', () => {
    it('should change the visibility on toggle', () => {
      const visibility = true;
      const initialState = {visibility};
      const action = {type: TOGGLE_VISIBILITY};
      const state = reducer(initialState, action);

      expect(state).toEqual({...initialState, visibility: !visibility});
    });

    it('should indicate that loaded is true on load todos resolved', () => {
      const initialState = {};
      const data = [{content: 'hi'}];
      const action = {type: resolve(LOAD_TODOS), payload: {data}};
      const state = reducer(initialState, action);

      expect(state).toEqual({...initialState, todos: data, loaded: true});
    });

    it('should add a todo upon socket action', () => {
      const initialState = {todos: [
        {content: '1'},
        {content: '2'}
      ]};
      const payload = {content: '3'};
      const action = {type: TODO_SAVE, payload};
      const state = reducer(initialState, action);

      expect(state).toEqual({...initialState, todos: [
        payload,
        ...initialState.todos
      ]});
    });

    it('should update a todo upon socket action', () => {
      const initialState = {todos: [
        {_id: '1', content: '1'},
        {_id: '2', content: '2'}
      ]};
      const payload = {_id: '1', content: 'updated'};
      const action = {type: TODO_UPDATE, payload};
      const state = reducer(initialState, action);

      expect(state.todos[0].content).toEqual('updated');
      expect(state.todos).toHaveLength(2);
    });

    it('should delete a todo upon socket action', () => {
      const initialState = {todos: [
        {_id: '1', content: '1'},
        {_id: '2', content: '2'}
      ]};
      const payload = {_id: '1'};
      const action = {type: TODO_DELETE, payload};
      const state = reducer(initialState, action);

      expect(state.todos[0]._id).toEqual('2');
      expect(state.todos).toHaveLength(1);
    });

    it('should complete all todos upon socket action', () => {
      const initialState = {
        todos: [
          {
            _id: '1',
            content: '1',
            completed: false
          },
          {
            _id: '2',
            content: '2',
            completed: true
          }
        ]
      };
      const payload = {completed: true};
      const action = {type: TODO_COMPLETE_ALL, payload};
      const state = reducer(initialState, action);

      expect(state.todos).toHaveLength(2);
      expect(state.todos[0].completed).toBeTruthy();
      expect(state.todos[1].completed).toBeTruthy();
    });

    it('should clear all completed todos upon socket action', () => {
      const initialState = {
        todos: [
          {
            _id: '1', content: '1', completed: true
          },
          {
            _id: '2',
            content: '2',
            completed: false
          }
        ]
      };
      const action = {type: TODO_CLEAR_COMPLETED};
      const state = reducer(initialState, action);

      expect(state.todos[0]._id).toEqual('2');
      expect(state.todos).toHaveLength(1);
    });

    it('should return initial state on unknown action', () => {
      const initialState = {};
      const action = {type: 'UNKNOWN'};
      const state = reducer(initialState, action);

      expect(state).toBe(initialState);
    });

    it('should have default initial state', () => {
      const initialState = {
        todos: [],
        loaded: false,
        visibility: true
      };
      const action = {type: 'UNKNOWN'};
      const state = reducer(undefined, action); // eslint-disable-line no-undefined

      expect(state).toEqual(initialState);
    });
  });

  describe('actions', () => {
    it('should create an action to toggle visibility', () => {
      const expectedAction = {
        type: TOGGLE_VISIBILITY
      };

      expect(toggleVisibility()).toEqual(expectedAction);
    });

    it('should create an action to add a todo', () => {
      const text = 'text';
      const expectedAction = {
        type: ADD_TODO,
        payload: {
          request: {
            url: '/todos',
            method: 'POST',
            data: {
              text
            }
          }
        }
      };
      const action = addTodo(text);

      expect(action).toEqual(expectedAction);
    });

    it('should create an action to delete todo', () => {
      const id = 'fakeId';
      const expectedAction = {
        type: DELETE_TODO,
        payload: {
          request: {
            url: `/todos/${id}`,
            method: 'delete'
          }
        }
      };
      const action = deleteTodo(id);

      expect(action).toEqual(expectedAction);
    });

    it('should create an action to complete all todos', () => {
      const completed = true;
      const expectedAction = {
        type: COMPLETE_ALL,
        payload: {
          request: {
            url: '/todos/completed',
            method: 'put',
            data: {
              completed
            }
          }
        }
      };
      const action = completeAll(completed);

      expect(action).toEqual(expectedAction);
    });

    it('should create an action to complete a todo', () => {
      const id = 'fakeId';
      const completed = true;
      const expectedAction = {
        type: COMPLETE_TODO,
        payload: {
          request: {
            url: `/todos/${id}`,
            method: 'put',
            data: {
              completed
            }
          }
        }
      };
      const action = completeTodo(id, completed);

      expect(action).toEqual(expectedAction);
    });

    it('should create an action to load todos', () => {
      const expectedAction = {
        type: LOAD_TODOS,
        payload: {
          request: {
            url: '/todos'
          }
        }
      };

      expect(loadTodos()).toEqual(expectedAction);
    });

    it('should create an action to clear completed todos', () => {
      const expectedAction = {
        type: CLEAR_COMPLETED,
        payload: {
          request: {
            method: 'delete',
            url: '/todos/clear'
          }
        }
      };

      expect(clearCompleted()).toEqual(expectedAction);
    });
  });
});