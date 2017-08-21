import React from 'react';
import {shallow} from 'enzyme';
import ToggleVisibilityButton from '../../../../../../client/App/Shell/Home/ToggleVisibilityButton';

describe('ToggleVisibilityButton container', () => {
  it('renders without crashing', () => {
    shallow(<ToggleVisibilityButton />);
  });
});
