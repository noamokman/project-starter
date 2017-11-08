import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {object} from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import configureMockStore from 'redux-mock-store';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {routerReducer, routerMiddleware, routerActions} from 'react-router-redux';
import {mount} from 'enzyme';
import routes from '../../../../client/App/Exterior/routes';

describe('Exterior routes component', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({auth: {}});

    const wrapper = mount(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/'>
            {routes}
          </Route>
        </Router>
      </Provider>
    );

    wrapper.unmount();
  });

  it('should render the login page', () => {
    const reducer = (state = {}) => state;
    const store = createStore(
      combineReducers({routing: routerReducer, auth: reducer, login: reducer}),
      {
        auth: {},
        login: {}
      },
      compose(applyMiddleware(routerMiddleware(browserHistory)))
    );

    store.dispatch(routerActions.push('/login'));

    const muiTheme = getMuiTheme(lightBaseTheme);

    const wrapper = mount(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/'>
            {routes}
          </Route>
        </Router>
      </Provider>, {
        childContextTypes: {
          muiTheme: object.isRequired
        },
        context: {muiTheme}
      }
    );

    expect(wrapper.find('LoginContainer')).toBePresent();
  });
});


