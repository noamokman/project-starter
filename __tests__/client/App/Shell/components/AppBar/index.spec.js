import React from 'react';
import {shallow, mount} from 'enzyme';
import AppBar from '../../../../../../client/App/Shell/components/AppBar';
import configureMockStore from 'redux-mock-store';
import {object} from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

describe('AppBar container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore();

    shallow(<AppBar store={store} />);
  });

  it('should handle click', () => {
    const mockStore = configureMockStore();
    const store = mockStore({auth: {}});
    const muiTheme = getMuiTheme(lightBaseTheme);
    const wrapper = mount(<AppBar muiTheme={muiTheme} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {
        muiTheme,
        store
      }
    });

    wrapper.find('AppBar')
      .props()
      .onTitleTouchTap();

    const [{payload}] = store.getActions();

    expect(payload).toEqual({
      method: 'push',
      args: ['/home']
    });
  });
});
