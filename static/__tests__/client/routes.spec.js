import React from 'react';
import {shallow} from 'enzyme';
import Router from '../../client/routes';

describe('router component', () => {
  it('renders without crashing', () => {
    shallow(<Router />);
  });
});
