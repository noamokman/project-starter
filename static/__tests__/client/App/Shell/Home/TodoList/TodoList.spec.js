import React from 'react';
import {shallow} from 'enzyme';
import TodoList from '../../../../../../client/App/Shell/Home/TodoList/TodoList';

describe('TodoList component', () => {
  it('renders without crashing', () => {
    const todos = [{_id: '1', content: '1', completed: false}];

    shallow(<TodoList todos={todos} />);
  });
});
