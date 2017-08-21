import React from 'react';
import {shallow} from 'enzyme';
import ClearCompletedButton from '../../../../../../client/App/Shell/Home/ClearCompletedButton/ClearCompletedButton';

describe('ClearCompletedButton component', () => {
  it('renders without crashing', () => {
    shallow(<ClearCompletedButton />);
  });
});
