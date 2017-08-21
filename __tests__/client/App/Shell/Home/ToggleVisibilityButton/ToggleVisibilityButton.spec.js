import React from 'react';
import {shallow} from 'enzyme';
import ToggleVisibilityButton from '../../../../../../client/App/Shell/Home/ToggleVisibilityButton/ToggleVisibilityButton';

describe('ToggleVisibilityButton component', () => {
  it('renders without crashing', () => {
    shallow(<ToggleVisibilityButton />);
  });
});
