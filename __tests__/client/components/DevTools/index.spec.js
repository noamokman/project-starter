import React from 'react';
import DevTools from '../../../../client/components/DevTools';
import {shallow} from 'enzyme';

describe('DevTools component', () => {
  it('renders without crashing', () => {
    shallow(<DevTools />);
  });
});