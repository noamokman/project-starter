import React from 'react';
import {shallow} from 'enzyme';
import AppBarActions from '../../../../../../client/App/Shell/components/AppBarActions/AppBarActions';

describe('AppBarActions component', () => {
  it('renders without crashing', () => {
    shallow(<AppBarActions />);
  });
});
