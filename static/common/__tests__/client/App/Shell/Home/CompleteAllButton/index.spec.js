import React from 'react';
import {shallow, mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import {object} from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import CompleteAllButton from '../../../../../../client/App/Shell/Home/CompleteAllButton';

describe('CompleteAllButton container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({home: {todos: []}});

    shallow(<CompleteAllButton store={store} />);
  });

  it('should handle click', () => {
    const mockStore = configureMockStore();
    const store = mockStore({home: {todos: [{_id: '1', completed: false}]}});
    const muiTheme = getMuiTheme(lightBaseTheme);
    const wrapper = mount(<CompleteAllButton muiTheme={muiTheme} store={store} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {muiTheme}
    });

    wrapper.find('IconButton')
      .props()
      .onClick();

    const [{payload: {request: {data}}}] = store.getActions();

    expect(data).toHaveProperty('completed', true);
  });
});
