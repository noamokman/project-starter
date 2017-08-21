import React from 'react';
import {shallow} from 'enzyme';
import NewTodoInput from '../../../../../../client/App/Shell/Home/NewTodoInput';

describe('NewTodoInput container', () => {
  it('renders without crashing', () => {
    shallow(<NewTodoInput />);
  });
});
