import React from 'react';
import About from '../../../../../client/App/Shell/About';
import {shallow} from 'enzyme';

describe('About component', () => {
  it('renders without crashing', () => {
    shallow(<About />);
  });
});