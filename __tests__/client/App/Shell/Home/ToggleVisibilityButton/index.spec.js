import React from 'react';
import {shallow} from 'enzyme';
import ToggleVisibilityButton from '../../../../../../client/App/Shell/Home/ToggleVisibilityButton';
import configureMockStore from 'redux-mock-store';

describe('ToggleVisibilityButton container', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({home: {visibility: true}});

    shallow(<ToggleVisibilityButton store={store} />);
  });
});
