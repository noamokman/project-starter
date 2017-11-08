import React from 'react';
import {shallow} from 'enzyme';
import TextField from '../../../../../../../client/App/Exterior/Login/components/TextField';

describe('TextField component', () => {
  it('renders without crashing', () => {
    const meta = {};

    shallow(<TextField meta={meta} />);
  });

  it('should display error correctly', () => {
    const meta = {error: 'oops', touched: true};
    const wrapper = shallow(<TextField meta={meta} />);

    expect(wrapper.find('TextField')).toHaveProp('errorText', 'oops');
  });
});