import React from 'react';
import {mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {object} from 'prop-types';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import AppBarActions from '../../../../../../client/App/Shell/components/AppBarActions';

describe('AppBarActions container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({auth: {}});
    const muiTheme = getMuiTheme(lightBaseTheme);

    mount(<AppBarActions muiTheme={muiTheme} store={store} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {muiTheme}
    });
  });

  it('should handle about click', () => {
    const mockStore = configureMockStore();
    const store = mockStore({auth: {}});
    const muiTheme = getMuiTheme(lightBaseTheme);
    const wrapper = mount(<AppBarActions muiTheme={muiTheme} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {
        muiTheme,
        store
      }
    });

    wrapper.findWhere(node => node.props().tooltip === 'About')
      .props()
      .onClick();

    const [{payload}] = store.getActions();

    expect(payload).toEqual({
      method: 'push',
      args: ['/about']
    });
  });

  it('should handle admin click', () => {
    const mockStore = configureMockStore();
    const store = mockStore({auth: {user: {admin: true}}});
    const muiTheme = getMuiTheme(lightBaseTheme);
    const wrapper = mount(<AppBarActions muiTheme={muiTheme} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {
        muiTheme,
        store
      }
    });

    wrapper.findWhere(node => node.props().tooltip === 'Admin')
      .props()
      .onClick();

    const [{payload}] = store.getActions();

    expect(payload).toEqual({
      method: 'push',
      args: ['/admin']
    });
  });
});
