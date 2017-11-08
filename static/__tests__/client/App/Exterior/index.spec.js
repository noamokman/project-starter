import React from 'react';
import {shallow} from 'enzyme';
import Exterior from '../../../../client/App/Exterior';

describe('Exterior component', () => {
  it('renders without crashing', () => {
    shallow(<Exterior />);
  });
});