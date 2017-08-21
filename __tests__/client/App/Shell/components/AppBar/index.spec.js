import React from 'react';
import {shallow} from 'enzyme';
import AppBar from '../../../../../../client/App/Shell/components/AppBar';
import configureMockStore from 'redux-mock-store';

describe('AppBar container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore();

    shallow(<AppBar store={store} />);
  });
});
