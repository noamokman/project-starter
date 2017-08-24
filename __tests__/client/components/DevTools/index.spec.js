import React from 'react';
import DevTools from '../../../../client/components/DevTools';
import {shallow} from 'enzyme';
import {createStore, compose} from 'redux';

describe('DevTools component', () => {
  it('renders without crashing', () => {
    const store = createStore((state = {}) => state, {}, compose(DevTools.instrument()));

    shallow(<DevTools store={store} />);
  });
});