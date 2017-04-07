import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {UserAuthWrapper} from 'redux-auth-wrapper';
import {routerActions} from 'react-router-redux';
import Shell from './index';
import Home from './Home';
import About from './About';

const userIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});


export default (
  <Route component={userIsAuthenticated(Shell)}>
    <IndexRoute component={Home} />
    <Route path='about' component={About} />
  </Route>
);