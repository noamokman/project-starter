import React from 'react';
import {shallow} from 'enzyme';
import TodoItemDeleteButton from '../../../../../../../client/App/Shell/Home/TodoList/TodoItem/TodoItemDeleteButton';

describe('TodoItemDeleteButton component', () => {
  it('renders without crashing', () => {
    shallow(<TodoItemDeleteButton />);
  });
});
