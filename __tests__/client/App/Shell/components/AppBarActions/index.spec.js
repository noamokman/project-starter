import React from 'react';
import {shallow} from 'enzyme';
import AppBarActions from '../../../../../../client/App/Shell/components/AppBarActions';

describe('AppBarActions container', () => {
  it('renders without crashing', () => {
    shallow(<AppBarActions />);
  });
});
