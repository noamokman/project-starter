import React from 'react';
import {mount} from 'enzyme';
import promiseMiddleware from 'redux-simple-promise';
import {multiClientMiddleware} from 'redux-axios-middleware';
import {axiosConfig} from '../../../../../../client/create-store';
import AuthenticatingUser from '../../../../../../client/App/Shell/components/AuthenticatingUser';
import configureMockStore from 'redux-mock-store';

describe('AuthenticatingUser container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore([
      promiseMiddleware(),
      multiClientMiddleware(axiosConfig)
    ]);
    const store = mockStore();

    mount(<AuthenticatingUser store={store} />);
  });
});
