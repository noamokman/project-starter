import React from 'react';
import {shallow} from 'enzyme';
import AppBar from '../../../../../../client/App/Shell/components/AppBar';

describe('AppBar container', () => {
  it('renders without crashing', () => {
    shallow(<AppBar />);
  });
});
