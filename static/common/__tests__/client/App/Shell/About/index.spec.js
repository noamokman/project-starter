import React from 'react';
import {shallow} from 'enzyme';
import About from '../../../../../client/App/Shell/About';

describe('About component', () => {
  it('renders without crashing', () => {
    shallow(<About />);
  });
});