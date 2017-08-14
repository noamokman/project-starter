import reducer, {CLEAR_ERROR, clearError} from '../../../../../client/App/Exterior/Login/redux';
import {reject, resolve} from 'redux-simple-promise';
import {LOGIN} from '../../../../../client/reducers/auth';

describe('Login redux', () => {
  describe('reducer', () => {
    it('should return error on login rejected', () => {
      const initialState = {};
      const message = 'some error';
      const action = {type: reject(LOGIN), error: {response: {data: {message}}}};
      const state = reducer(initialState, action);

      expect(state).toHaveProperty('error', message);
    });

    it('should return empty object on login resolved', () => {
      const initialState = {};
      const action = {type: resolve(LOGIN)};
      const state = reducer(initialState, action);

      expect(initialState).toEqual(state);
    });

    it('should return empty object on clear error', () => {
      const initialState = {};
      const action = clearError();
      const state = reducer(initialState, action);

      expect(initialState).toEqual(state);
    });

    it('should return empty object on unknown action', () => {
      const initialState = {};
      const action = {type: 'UNKNOWN_ACTION'};
      const state = reducer(initialState, action);

      expect(state).toBe(initialState);
    });

    it('should return empty object on no initial state', () => {
      const expectedState = {};
      const action = {type: 'UNKNOWN_ACTION'};
      const state = reducer(undefined, action); // eslint-disable-line no-undefined

      expect(state).toEqual(expectedState);
    });
  });

  describe('actions', () => {
    it('should create an action to clear error', () => {
      const expectedAction = {
        type: CLEAR_ERROR
      };

      expect(clearError()).toEqual(expectedAction);
    });
  });
});