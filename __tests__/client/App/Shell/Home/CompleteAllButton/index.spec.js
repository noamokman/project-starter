import React from 'react';
import {shallow} from 'enzyme';
import CompleteAllButton from '../../../../../../client/App/Shell/Home/CompleteAllButton';
import configureMockStore from 'redux-mock-store';

describe('CompleteAllButton container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({home: {todos: []}});

    shallow(<CompleteAllButton store={store} />);
  });
});
