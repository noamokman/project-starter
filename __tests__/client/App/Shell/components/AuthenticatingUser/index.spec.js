import React from 'react';
import {shallow} from 'enzyme';
import AuthenticatingUser from '../../../../../../client/App/Shell/components/AuthenticatingUser';

describe('AuthenticatingUser container', () => {
  it('renders without crashing', () => {
    shallow(<AuthenticatingUser />);
  });
});
