import React from 'react';
import {mount} from 'enzyme';
import promiseMiddleware from 'redux-simple-promise';
import {multiClientMiddleware} from 'redux-axios-middleware';
import configureMockStore from 'redux-mock-store';
import {createAxiosConfig} from '../../../../../../client/create-store';
import AuthenticatingUser from '../../../../../../client/App/Shell/components/AuthenticatingUser';

describe('AuthenticatingUser container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore([
      promiseMiddleware(),
      multiClientMiddleware(createAxiosConfig())
    ]);
    const store = mockStore({auth: {}});

    mount(<AuthenticatingUser store={store} />);
  });
});
