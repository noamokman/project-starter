import React from 'react';
import TextField from '../../../../../../../client/App/Exterior/Login/components/TextField';
import {shallow} from 'enzyme';

describe('TextField component', () => {
  it('renders without crashing', () => {
    shallow(<TextField />);
  });
});