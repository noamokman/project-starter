import React from 'react';
import {shallow} from 'enzyme';
import TodoList from '../../../../../../client/App/Shell/Home/TodoList';
import configureMockStore from 'redux-mock-store';

describe('TodoList container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({home: {todos: []}});

    shallow(<TodoList store={store} />);
  });
});
