import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {connectedRouterRedirect} from 'redux-auth-wrapper/history3/redirect';
import {routerActions} from 'react-router-redux';
import Shell from './index';
import Home from './Home';
import About from './About';

const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: ({auth: {token}}) => token,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
});


export default (
  <Route component={userIsAuthenticated(Shell)}>
    <IndexRoute component={Home} />
    <Route path='about' component={About} />
  </Route>
);