import React from 'react';
import {shallow} from 'enzyme';
import Layout from '../../../../../client/App/components/Layout';

describe('Layout component', () => {
  it('renders without crashing', () => {
    shallow(<Layout />);
  });
});