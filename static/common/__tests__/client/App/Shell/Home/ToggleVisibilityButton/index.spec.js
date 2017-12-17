import React from 'react';
import {mount} from 'enzyme';
import {object} from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import configureMockStore from 'redux-mock-store';
import ToggleVisibilityButton from '../../../../../../client/App/Shell/Home/ToggleVisibilityButton';

describe('ToggleVisibilityButton container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({home: {visibility: true}});
    const muiTheme = getMuiTheme(lightBaseTheme);

    mount(<ToggleVisibilityButton muiTheme={muiTheme} store={store} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {muiTheme}
    });
  });
});
