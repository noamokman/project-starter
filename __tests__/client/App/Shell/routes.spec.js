import React from 'react';
import {shallow} from 'enzyme';
import routes from '../../../../client/App/Shell/routes';
import {Router, Route, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';

describe('Shell routes component', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({auth: {}});

    shallow(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='*'>
            {routes}
          </Route>
        </Router>
      </Provider>
    );
  });
});
