import createStore, {createAxiosConfig} from '../../client/create-store';
import configureMockStore from 'redux-mock-store';
import promiseMiddleware from 'redux-simple-promise';
import {multiClientMiddleware} from 'redux-axios-middleware';
import axios from 'axios';
import DevTools from '../../client/components/DevTools';

describe('Create store', () => {
  describe('exports', () => {
    it('should export a create store function', () => {
      expect(typeof createStore).toBe('function');
    });

    it('should export a function that creates the axios config', () => {
      expect(typeof createAxiosConfig).toBe('function');
      expect(typeof createAxiosConfig()).toBe('object');
    });
  });

  describe('create store function', () => {
    it('should return a valid store', () => {
      const store = createStore({});

      expect(typeof store).toBe('object');
      expect(store).toHaveProperty('getState');
      expect(store).toHaveProperty('dispatch');
    });

    it('should use default initial state', () => {
      const store = createStore({}, {auth: {user: {name: 'rick'}}});

      expect(store.getState()).toMatchObject({auth: {user: {name: 'rick'}}});
    });

    it('should not include Devtools on production', () => {
      const env = process.env.NODE_ENV;

      process.env.NODE_ENV = 'production';

      const store = createStore({});

      expect(store).not.toHaveProperty('liftedStore');

      process.env.NODE_ENV = env;
    });

    it('should use devtools instrumentation', () => {
      const {devToolsExtension} = window;

      window.devToolsExtension = jest.fn(() => DevTools.instrument());
      createStore({});

      expect(window.devToolsExtension).toHaveBeenCalled();

      window.devToolsExtension = devToolsExtension;
    });
  });

  describe('axios middleware config', () => {
    beforeEach(() => {
      axios.__clear();
    });

    it('should have the token on headers upon request', () => {
      const mockStore = configureMockStore([
        promiseMiddleware(),
        multiClientMiddleware(createAxiosConfig())
      ]);

      const store = mockStore({auth: {token: 'token'}});

      store.dispatch({type: 'TEST', payload: {request: {url: '/test'}}});

      expect(axios.__clients[0].requests[0].headers.Authorization).toBe('Bearer token');
    });

    it('should not have a token on headers upon request', () => {
      const mockStore = configureMockStore([
        promiseMiddleware(),
        multiClientMiddleware(createAxiosConfig())
      ]);

      const store = mockStore({auth: {}});

      store.dispatch({type: 'TEST', payload: {request: {url: '/test'}}});

      const {__clients: [client]} = axios;

      expect(client.requests[0].headers.Authorization).toBeUndefined();
    });
  });
});