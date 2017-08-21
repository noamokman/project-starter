import React from 'react';
import Login from '../../../../../client/App/Exterior/Login/Login';
import {shallow} from 'enzyme';

describe('Login component', () => {
  it('renders without crashing', () => {
    shallow(<Login />);
  });
});