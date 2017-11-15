import React from 'react';
import {shallow, mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import {object} from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import NewTodoInput from '../../../../../../client/App/Shell/Home/NewTodoInput';

describe('NewTodoInput container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore();

    shallow(<NewTodoInput store={store} />);
  });

  it('should save text in state', () => {
    const mockStore = configureMockStore();
    const store = mockStore();
    const muiTheme = getMuiTheme(lightBaseTheme);

    const wrapper = mount(<NewTodoInput muiTheme={muiTheme} store={store} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {muiTheme}
    });

    wrapper.find('input').simulate('change', {target: {value: 'test'}});

    expect(wrapper.find(NewTodoInput).find('withState(withHandlers(mapProps(TextField)))').instance().state).toHaveProperty('stateValue', 'test');
  });

  it('should reject keys other than enter', () => {
    const mockStore = configureMockStore();
    const store = mockStore();
    const muiTheme = getMuiTheme(lightBaseTheme);

    const wrapper = mount(<NewTodoInput muiTheme={muiTheme} store={store} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {muiTheme}
    });

    wrapper.find('input').simulate('keydown', {which: 'a'});

    expect(store.getActions()).toHaveLength(0);
  });

  it('should accept on enter', () => {
    const mockStore = configureMockStore();
    const store = mockStore();
    const muiTheme = getMuiTheme(lightBaseTheme);

    const wrapper = mount(<NewTodoInput muiTheme={muiTheme} store={store} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {muiTheme}
    });

    wrapper.find('input').simulate('keydown', {which: 13, target: {value: 'test'}});

    const [{type}] = store.getActions();

    expect(type).toBe('ADD_TODO');
  });
});
