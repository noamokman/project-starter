import React from 'react';
import {shallow, mount} from 'enzyme';
import TodoList from '../../../../../../client/App/Shell/Home/TodoList';
import configureMockStore from 'redux-mock-store';
import {object} from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

describe('TodoList container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({home: {todos: []}});

    shallow(<TodoList store={store} />);
  });

  it('should load todos on mount', () => {
    const mockStore = configureMockStore();
    const store = mockStore({home: {todos: []}});
    const muiTheme = getMuiTheme(lightBaseTheme);

    mount(<TodoList muiTheme={muiTheme} store={store} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {
        muiTheme,
        store
      }
    });

    const [{payload}] = store.getActions();

    expect(payload).toEqual({
      request: {
        url: '/todos'
      }
    });
  });

  it('should not load todos if loaded', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      home: {
        todos: [
          {
            _id: '1',
            text: 'a',
            completed: false
          },
          {
            _id: '2',
            text: 'b',
            completed: false
          },
          {
            _id: '3',
            text: 'c',
            completed: true
          }
        ],
        loaded: true
      }
    });
    const muiTheme = getMuiTheme(lightBaseTheme);

    mount(<TodoList muiTheme={muiTheme} store={store} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {
        muiTheme,
        store
      }
    });

    expect(store.getActions()).toHaveLength(0);
  });
});
