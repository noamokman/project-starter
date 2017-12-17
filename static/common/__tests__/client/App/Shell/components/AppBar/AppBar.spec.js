import React from 'react';
import {shallow} from 'enzyme';
import AppBar from '../../../../../../client/App/Shell/components/AppBar/AppBar';

describe('AppBar component', () => {
  it('renders without crashing', () => {
    shallow(<AppBar />);
  });
});
