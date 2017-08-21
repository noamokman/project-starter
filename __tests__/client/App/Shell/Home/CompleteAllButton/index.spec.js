import React from 'react';
import {shallow} from 'enzyme';
import CompleteAllButton from '../../../../../../client/App/Shell/Home/CompleteAllButton';

describe('CompleteAllButton container', () => {
  it('renders without crashing', () => {
    shallow(<CompleteAllButton />);
  });
});
