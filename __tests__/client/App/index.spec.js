import React from 'react';
import App from '../../../client/App/index';
import renderer from 'react-test-renderer';

describe('App component', () => {
  it('should render properly', () => {
    const component = renderer.create(
      <App />
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
