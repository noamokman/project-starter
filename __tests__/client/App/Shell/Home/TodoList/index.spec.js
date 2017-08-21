import React from 'react';
import {shallow} from 'enzyme';
import TodoList from '../../../../../../client/App/Shell/Home/TodoList';

describe('TodoList container', () => {
  it('renders without crashing', () => {
    shallow(<TodoList />);
  });
});
