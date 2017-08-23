import React from 'react';
import {shallow} from 'enzyme';
import AppBarActions from '../../../../../../client/App/Shell/components/AppBarActions/AppBarActions';

describe('AppBarActions component', () => {
  it('renders without crashing', () => {
    shallow(<AppBarActions />);
  });

  it('should render admin page button if passed on props', () => {
    const wrapper = shallow(<AppBarActions admin />);

    expect(wrapper.find({tooltip: 'Admin'}));
  });

  it('should not render admin page button if not admin', () => {
    const wrapper = shallow(<AppBarActions />);

    expect(wrapper.find({tooltip: 'Admin'})).not.toBePresent();
  });
});
