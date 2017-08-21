import React from 'react';
import {shallow} from 'enzyme';
import TodoList from '../../../../../../client/App/Shell/Home/TodoList/TodoList';

describe('TodoList component', () => {
  it('renders without crashing', () => {
    shallow(<TodoList />);
  });
});
