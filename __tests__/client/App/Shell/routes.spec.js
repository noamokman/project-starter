import React from 'react';
import {mount} from 'enzyme';
import routes from '../../../../client/App/Shell/routes';
import {Router, Route, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {object} from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import configureMockStore from 'redux-mock-store';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {routerReducer, routerMiddleware, routerActions} from 'react-router-redux';
import promiseMiddleware from 'redux-simple-promise';
import {multiClientMiddleware} from 'redux-axios-middleware';
import {createAxiosConfig} from '../../../../client/create-store';

describe('Shell routes component', () => {
  it('renders without crashing', () => {
    const mockStore = configureMockStore();
    const store = mockStore({auth: {}});

    mount(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='*'>
            {routes}
          </Route>
        </Router>
      </Provider>
    );
  });

  it('should go to admin if admin', () => {
    const store = createStore(
      combineReducers({routing: routerReducer, auth: (state = {}) => state}),
      {
        auth: {user: {admin: true}}
      },
      compose(applyMiddleware(routerMiddleware(browserHistory)))
    );

    store.dispatch(routerActions.push('/admin'));

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

    expect(wrapper.find('UserIsAdmin(LoadableComponent)')).toBePresent();
  });

  it('should go to about', () => {
    const store = createStore(
      combineReducers({routing: routerReducer, auth: (state = {}) => state}),
      {
        auth: {user: {}}
      },
      compose(applyMiddleware(routerMiddleware(browserHistory)))
    );

    store.dispatch(routerActions.push('/about'));

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

    expect(wrapper.find('LoadableComponent')).toBePresent();
  });

  it('should go from admin to home if not admin', () => {
    const store = createStore(
      combineReducers({routing: routerReducer, auth: (state = {}) => state}),
      {
        auth: {user: {admin: false}}
      },
      compose(applyMiddleware(routerMiddleware(browserHistory)))
    );

    store.dispatch(routerActions.push('/admin'));

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

    expect(wrapper.find('UserIsAdmin(LoadableComponent)')).not.toBePresent();
  });

  it('should render AuthenticatingUser if authenticating', () => {
    const store = createStore(
      combineReducers({routing: routerReducer, auth: (state = {}) => state}),
      {
        auth: {token: 'token'}
      },
      compose(applyMiddleware(
        routerMiddleware(browserHistory),
        promiseMiddleware(),
        multiClientMiddleware(createAxiosConfig())
      ))
    );

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

    expect(wrapper.find('AuthenticatingUser')).toBePresent();
  });
});
