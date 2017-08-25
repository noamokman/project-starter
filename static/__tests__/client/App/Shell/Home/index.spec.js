import React from 'react';
import Home from '../../../../../client/App/Shell/Home';
import {shallow} from 'enzyme';

describe('Home component', () => {
  it('renders without crashing', () => {
    shallow(<Home />);
  });
});