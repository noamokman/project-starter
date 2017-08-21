import React from 'react';
import {shallow} from 'enzyme';
import AppBarActions from '../../../../../../client/App/Shell/components/AppBarActions';
import configureMockStore from 'redux-mock-store';

describe('AppBarActions container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({auth: {}});

    shallow(<AppBarActions store={store} />);
  });
});
