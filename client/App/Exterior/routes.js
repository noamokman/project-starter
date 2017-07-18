import React from 'react';
import {Route} from 'react-router';
import {connectedRouterRedirect} from 'redux-auth-wrapper/history3/redirect';
import {routerActions} from 'react-router-redux';
import Exterior from './index';
import Login from './Login';

const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: ({auth: {token}}) => !token,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated'
});


export default (
  <Route component={userIsNotAuthenticated(Exterior)}>
    <Route path='login' component={Login} />
  </Route>
);