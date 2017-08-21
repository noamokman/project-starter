import React from 'react';
import {shallow} from 'enzyme';
import CompleteAllButton from '../../../../../../client/App/Shell/Home/CompleteAllButton/CompleteAllButton';

describe('CompleteAllButton component', () => {
  it('renders without crashing', () => {
    shallow(<CompleteAllButton />);
  });
});
