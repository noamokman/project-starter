import React from 'react';
import {shallow, mount} from 'enzyme';
import {object} from 'prop-types';
import configureMockStore from 'redux-mock-store';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import ClearCompletedButton from '../../../../../../client/App/Shell/Home/ClearCompletedButton';

describe('ClearCompletedButton container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({home: {todos: []}});

    shallow(<ClearCompletedButton store={store} />);
  });

  it('should be disabled if not one todo is completed', () => {
    const todos = [
      {completed: false},
      {completed: false}
    ];
    const mockStore = configureMockStore();
    const store = mockStore({home: {todos}});
    const muiTheme = getMuiTheme(lightBaseTheme);
    const wrapper = mount(<ClearCompletedButton muiTheme={muiTheme} store={store} todos={todos} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {muiTheme}
    });

    expect(wrapper.find('IconButton').props().disabled).toBeTruthy();
  });
});
