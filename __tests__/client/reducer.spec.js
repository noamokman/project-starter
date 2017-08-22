import {createStore} from 'redux';
import reducer from '../../client/reducer';

describe('Reducer', () => {
  describe('export', () => {
    it('root reducer should have all the reducers keys', () => {
      const store = createStore(reducer, {});

      expect(store.getState()).toHaveProperty('auth');
      expect(store.getState()).toHaveProperty('routing');
      expect(store.getState()).toHaveProperty('login');
      expect(store.getState()).toHaveProperty('home');
      expect(store.getState()).toHaveProperty('socket');
      expect(store.getState()).toHaveProperty('form');
    });
  });
});