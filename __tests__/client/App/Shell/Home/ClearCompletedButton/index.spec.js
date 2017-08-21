import React from 'react';
import {shallow} from 'enzyme';
import ClearCompletedButton from '../../../../../../client/App/Shell/Home/ClearCompletedButton';
import configureMockStore from 'redux-mock-store';

describe('ClearCompletedButton container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({home: {todos: []}});

    shallow(<ClearCompletedButton store={store} />);
  });
});
