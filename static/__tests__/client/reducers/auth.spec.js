import {reject, resolve} from 'redux-simple-promise';
import socketIoMiddleware, {socketConnect} from 'redux-sockets';
import configureMockStore from 'redux-mock-store';
import reducer, {
  LOGIN,
  LOGOUT,
  LOAD_USER,
  localLogin,
  authorize,
  loadUser,
  logout, AUTHORIZE
} from '../../../client/reducers/auth';
import {socket} from './__mocks__/socket.io-client';

describe('Auth redux', () => {
  describe('reducer', () => {
    it('should save token on resolve login', () => {
      const initialState = {};
      const token = 'token';
      const action = {type: resolve(LOGIN), payload: {data: {token}}};
      const state = reducer(initialState, action);

      expect(localStorage.getItem('token')).toBe(token);
      expect(state).toEqual({...initialState, token});
    });

    it('should remove token on logout', () => {
      const initialState = {};
      const token = 'token';
      const action = logout();

      localStorage.setItem('token', token);
      const state = reducer(initialState, action);

      expect(localStorage.getItem('token')).toBeNull();
      expect(state).toEqual(initialState);
    });

    it('should remove token on load user rejected', () => {
      const initialState = {};
      const token = 'token';
      const action = {type: reject(LOAD_USER)};

      localStorage.setItem('token', token);
      const state = reducer(initialState, action);

      expect(localStorage.getItem('token')).toBeNull();
      expect(state).toEqual(initialState);
    });

    it('should save user on load user resolved', () => {
      const initialState = {};
      const data = {email: 'rick@gmail.com', password: 'morty'};
      const action = {type: resolve(LOAD_USER), payload: {data}};
      const state = reducer(initialState, action);

      expect(state).toEqual({...initialState, user: data});
    });

    it('should return initial state on unknown action', () => {
      const initialState = {};
      const action = {type: 'UNKNOWN'};
      const state = reducer(initialState, action);

      expect(state).toBe(initialState);
    });

    it('should load token to initial state', () => {
      const expectedState = {token: 'token'};
      const action = {type: 'UNKNOWN_ACTION'};

      localStorage.setItem('token', 'token');

      jest.resetModules();
      const reducer = require('../../../client/reducers/auth').default;

      const state = reducer(undefined, action); // eslint-disable-line no-undefined

      expect(state).toEqual(expectedState);
      localStorage.removeItem('token');
    });
  });

  describe('actions', () => {
    it('should create an action to logout', () => {
      const expectedAction = {
        type: LOGOUT
      };

      expect(logout()).toEqual(expectedAction);
    });

    it('should create an action to load user', () => {
      const expectedAction = {
        type: LOAD_USER,
        payload: {
          request: {
            url: '/users/me'
          }
        }
      };

      expect(loadUser()).toEqual(expectedAction);
    });

    it('should create an action to authorize', () => {
      const expectedAction = {
        type: AUTHORIZE,
        payload: {
          socket: {
            emitName: 'authenticate'
          }
        }
      };

      const action = authorize();

      expect(action).toMatchObject(expectedAction);
      expect(action).toHaveProperty('payload.socket.data');
    });

    it('should create an action to login', () => {
      const data = {email: 'rick@gmail.com', password: 'morty'};
      const expectedAction = {
        type: LOGIN,
        payload: {
          client: 'auth',
          request: {
            url: '/local',
            method: 'POST',
            data
          }
        }
      };

      const action = localLogin(data);

      expect(action).toEqual(expectedAction);
    });

    it('should get data from state on authorize', () => {
      const mockStore = configureMockStore([socketIoMiddleware()]);
      const store = mockStore({auth: {token: 'token'}});

      return store.dispatch(socketConnect()).then(() => {
        store.dispatch(authorize());

        expect(socket.events).toHaveLength(1);
        const [event] = socket.events;

        expect(event).toEqual({name: 'authenticate', data: {token: 'token'}});
      });
    });
  });
});