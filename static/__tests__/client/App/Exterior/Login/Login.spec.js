import React from 'react';
import {shallow} from 'enzyme';
import Login from '../../../../../client/App/Exterior/Login/Login';

describe('Login component', () => {
  it('renders without crashing', () => {
    shallow(<Login />);
  });

  it('should render a SnackBar if an error occurs', () => {
    const wrapper = shallow(<Login loginError={'error'} />);

    expect(wrapper.find('Snackbar')).toHaveLength(1);
    expect(wrapper.find('Snackbar')).toHaveProp('message', 'error');
  });
});