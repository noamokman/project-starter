import React from 'react';
import {shallow} from 'enzyme';
import Home from '../../../../../client/App/Shell/Home';

describe('Home component', () => {
  it('renders without crashing', () => {
    shallow(<Home />);
  });
});