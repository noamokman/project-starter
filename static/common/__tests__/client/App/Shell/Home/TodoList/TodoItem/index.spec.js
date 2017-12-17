import React from 'react';
import {object} from 'prop-types';
import {shallow, mount} from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import TodoItem from '../../../../../../../client/App/Shell/Home/TodoList/TodoItem';

describe('TodoItem component', () => {
  it('renders without crashing', () => {
    const todo = {_id: '1', completed: false};

    shallow(<TodoItem todo={todo} />);
  });

  it('should handle delete click', () => {
    const todo = {_id: '1', completed: false};
    const deleteTodo = jest.fn();

    const wrapper = mount(<TodoItem todo={todo} deleteTodo={deleteTodo} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {muiTheme: getMuiTheme(lightBaseTheme)}
    });

    wrapper.find('IconButton').simulate('click');

    expect(deleteTodo).toHaveBeenCalledWith('1');
  });

  it('should handle complete click', () => {
    const todo = {_id: '1', completed: false};
    const completeTodo = jest.fn();

    const wrapper = mount(<TodoItem todo={todo} completeTodo={completeTodo} />, {
      childContextTypes: {
        muiTheme: object.isRequired
      },
      context: {muiTheme: getMuiTheme(lightBaseTheme)}
    });

    wrapper.find('Checkbox')
      .props()
      .onCheck({target: {checked: true}});

    expect(completeTodo).toHaveBeenCalledWith('1', true);
  });
});
