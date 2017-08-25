import React from 'react';
import Layout from '../../../../../client/App/components/Layout';
import {shallow} from 'enzyme';

describe('Layout component', () => {
  it('renders without crashing', () => {
    shallow(<Layout />);
  });
});