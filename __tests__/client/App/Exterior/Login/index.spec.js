import React from 'react';
import Login from '../../../../../client/App/Exterior/Login';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';

describe('Login container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({auth: {}, login: {}});

    shallow(<Login store={store} />);
  });
});