import React from 'react';
import {shallow} from 'enzyme';
import Shell from '../../../../client/App/Shell';

describe('Shell component', () => {
  it('renders without crashing', () => {
    shallow(<Shell />);
  });
});