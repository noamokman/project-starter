import React from 'react';
import {shallow, mount} from 'enzyme';
import {object} from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import LoginForm from '../../../../../client/App/Exterior/Login/LoginForm';

describe('LoginForm component', () => {
  it('renders without crashing', () => {
    shallow(<LoginForm />);
  });

  it('should have an error message for email validation', () => {
    const store = createStore(combineReducers({form: formReducer, auth: {}, login: {}}));
    const muiTheme = getMuiTheme(lightBaseTheme);
    const wrapper = mount(<LoginForm muiTheme={muiTheme} store={store} />, {
      childContextTypes: {
        muiTheme: object.isRequired,
        store: object.isRequired
      },
      context: {muiTheme, store}
    });

    const getField = element => wrapper.find('TextField')
      .findWhere(node => node.props().name === 'email')
      .find(element);
    const input = getField('input');

    input.simulate('change', {target: {value: 'test'}});
    input.simulate('blur');

    const textField = getField('TextField');

    expect(textField).toHaveProp('errorText', 'Invalid email address');
  });
});