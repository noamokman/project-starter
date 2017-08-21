import React from 'react';
import {shallow} from 'enzyme';
import NewTodoInput from '../../../../../../client/App/Shell/Home/NewTodoInput/NewTodoInput';

describe('NewTodoInput component', () => {
  it('renders without crashing', () => {
    shallow(<NewTodoInput />);
  });
});
