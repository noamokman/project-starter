import React from 'react';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Root from '../../../../client/components/Root';

describe('Root component', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({});

    shallow(<Root store={store} />);
  });
});