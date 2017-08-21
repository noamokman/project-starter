import React from 'react';
import Shell from '../../../../client/App/Shell';
import {shallow} from 'enzyme';

describe('Shell component', () => {
  it('renders without crashing', () => {
    shallow(<Shell />);
  });
});