import React from 'react';
import {shallow} from 'enzyme';
import NewTodoInput from '../../../../../../client/App/Shell/Home/NewTodoInput';
import configureMockStore from 'redux-mock-store';

describe('NewTodoInput container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore();

    shallow(<NewTodoInput store={store} />);
  });
});
