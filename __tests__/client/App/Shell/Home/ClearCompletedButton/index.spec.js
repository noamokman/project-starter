import React from 'react';
import {shallow} from 'enzyme';
import ClearCompletedButton from '../../../../../../client/App/Shell/Home/ClearCompletedButton';

describe('ClearCompletedButton container', () => {
  it('renders without crashing', () => {
    shallow(<ClearCompletedButton />);
  });
});
