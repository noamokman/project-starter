import reducer, {CLEAR_ERROR, clearError} from '../../../../../client/App/Exterior/Login/redux';
import {reject, resolve} from 'redux-simple-promise';
import {LOGIN} from '../../../../../client/reducers/auth';

describe('Login redux', () => {
  describe('Reducer', () => {
    it('login rejected should return error', () => {
      const initialState = {};
      const action = {type: reject(LOGIN), error: {response: {data: {message: 'some error'}}}};
      const state = reducer(initialState, action);

      expect(state).toHaveProperty('error');
    });

    it('login resolved should return empty object', () => {
      const initialState = {};
      const action = {type: resolve(LOGIN)};
      const state = reducer(initialState, action);

      expect(initialState).toEqual(state);
    });

    it('clear error should return empty object', () => {
      const initialState = {};
      const action = {type: CLEAR_ERROR};
      const state = reducer(initialState, action);

      expect(initialState).toEqual(state);
    });

    it('unknown action should return empty object', () => {
      const initialState = {};
      const action = {type: 'UNKNOWN_ACTION'};
      const state = reducer(initialState, action);

      expect(state).toEqual(initialState);
    });

    it('no initial state should return empty object', () => {
      const expectedState = {};
      const action = {type: 'UNKNOWN_ACTION'};
      const state = reducer(undefined, action); // eslint-disable-line no-undefined

      expect(state).toEqual(expectedState);
    });
  });

  describe('Action creator', () => {
    it('should create an action to clear error', () => {
      const expectedAction = {
        type: CLEAR_ERROR
      };

      expect(clearError()).toEqual(expectedAction);
    });
  });
});