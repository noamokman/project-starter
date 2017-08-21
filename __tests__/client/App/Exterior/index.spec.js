import React from 'react';
import Exterior from '../../../../client/App/Exterior';
import {shallow} from 'enzyme';

describe('Exterior component', () => {
  it('renders without crashing', () => {
    shallow(<Exterior />);
  });
});