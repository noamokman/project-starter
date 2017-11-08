import React from 'react';
import {shallow, mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import {multiClientMiddleware} from 'redux-axios-middleware';
import {object} from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import promiseMiddleware from 'redux-simple-promise';
import Login from '../../../../../client/App/Exterior/Login';
import {createAxiosConfig} from '../../../../../client/create-store';

describe('Login container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({auth: {}, login: {}});

    shallow(<Login store={store} />);
  });

  it('login function dispatches correctly', () => {
    const mockStore = configureMockStore([
      promiseMiddleware(),
      multiClientMiddleware(createAxiosConfig())
    ]);
    const store = mockStore({auth: {}, login: {}});
    const muiTheme = getMuiTheme(lightBaseTheme);
    const wrapper = mount(<Login muiTheme={muiTheme} store={store} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {muiTheme, store}
    });

    wrapper.find('form')
      .props()
      .onSubmit();
  });

  it('load user occurs if there is a token', () => {
    const mockStore = configureMockStore([
      promiseMiddleware(),
      multiClientMiddleware(createAxiosConfig())
    ]);
    const store = mockStore({auth: {token: 'token'}, login: {}});
    const muiTheme = getMuiTheme(lightBaseTheme);

    mount(<Login muiTheme={muiTheme} store={store} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {muiTheme, store}
    });

    const action = store.getActions().filter(({type}) => type === 'LOAD_USER');

    expect(action).toBeTruthy();
  });
});