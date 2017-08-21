import React from 'react';
import {shallow} from 'enzyme';
import TodoItem from '../../../../../../../../client/App/Shell/Home/TodoList/components/TodoItem';

describe('TodoItem component', () => {
  it('renders without crashing', () => {
    shallow(<TodoItem />);
  });
});
