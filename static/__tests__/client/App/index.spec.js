import React from 'react';
import App from '../../../client/App';
import {shallow} from 'enzyme';

describe('App component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('should not render DevTools in production', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find('DevTools')).toBePresent();

    const env = process.env.NODE_ENV;

    process.env.NODE_ENV = 'production';

    const productionWrapper = shallow(<App />);

    expect(productionWrapper.find('DevTools')).toBeEmpty();
    process.env.NODE_ENV = env;
  });
});