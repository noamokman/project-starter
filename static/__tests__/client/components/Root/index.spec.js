import React from 'react';
import Root from '../../../../client/components/Root';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';

describe('Root component', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({});

    shallow(<Root store={store} />);
  });
});