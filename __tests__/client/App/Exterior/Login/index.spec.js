import React from 'react';
import Login from '../../../../../client/App/Exterior/Login';
import {shallow} from 'enzyme';

describe('Login container', () => {
  it('renders without crashing', () => {
    shallow(<Login />);
  });
});