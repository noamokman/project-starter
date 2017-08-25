import React from 'react';
import Admin from '../../../../../client/App/Shell/Admin';
import {shallow} from 'enzyme';

describe('Admin component', () => {
  it('renders without crashing', () => {
    shallow(<Admin />);
  });
});