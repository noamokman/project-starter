import {createStore} from 'redux';
import reducer from '../../client/reducer';

describe('Reducer', () => {
  it('root reducer should have all the reducers keys', () => {
    const store = createStore(reducer, {});
    const state = store.getState();

    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('routing');
    expect(state).toHaveProperty('login');
    expect(state).toHaveProperty('home');
    expect(state).toHaveProperty('socket');
    expect(state).toHaveProperty('form');
  });
});