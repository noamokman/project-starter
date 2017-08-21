import React from 'react';
import LoginForm from '../../../../../client/App/Exterior/Login/LoginForm';
import {shallow} from 'enzyme';

describe('LoginForm component', () => {
  it('renders without crashing', () => {
    shallow(<LoginForm />);
  });
});