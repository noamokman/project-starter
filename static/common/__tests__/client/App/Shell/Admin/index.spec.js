import React from 'react';
import {shallow} from 'enzyme';
import Admin from '../../../../../client/App/Shell/Admin';

describe('Admin component', () => {
  it('renders without crashing', () => {
    shallow(<Admin />);
  });
});