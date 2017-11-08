import React from 'react';
import {shallow} from 'enzyme';
import {createStore, compose} from 'redux';
import DevTools from '../../../../client/components/DevTools';

describe('DevTools component', () => {
  it('renders without crashing', () => {
    const store = createStore((state = {}) => state, {}, compose(DevTools.instrument()));

    shallow(<DevTools store={store} />);
  });
});