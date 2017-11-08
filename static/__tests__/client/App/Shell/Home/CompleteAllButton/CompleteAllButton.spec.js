import React from 'react';
import {shallow} from 'enzyme';
import {blue500} from 'material-ui/styles/colors';
import CompleteAllButton from '../../../../../../client/App/Shell/Home/CompleteAllButton/CompleteAllButton';

describe('CompleteAllButton component', () => {
  it('renders without crashing', () => {
    shallow(<CompleteAllButton />);
  });

  it('shows the correct tooltip and color if checked', () => {
    const wrapper = shallow(<CompleteAllButton checked />);

    expect(wrapper.find('IconButton')).toHaveProp('tooltip', 'Mark all unchecked');
    expect(wrapper.find('ActionDoneAll')).toHaveProp('color', blue500);
  });
});
