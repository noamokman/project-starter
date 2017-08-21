import React from 'react';
import Root from '../../../../client/components/Root';
import {shallow} from 'enzyme';

describe('Root component', () => {
  it('renders without crashing', () => {
    shallow(<Root />);
  });
});