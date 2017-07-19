import React from 'react';
import {Route} from 'react-router';
import locationHelperBuilder from 'redux-auth-wrapper/history3/locationHelper';
import {connectedRouterRedirect} from 'redux-auth-wrapper/history3/redirect';
import {routerActions} from 'react-router-redux';
import Exterior from './index';
import Login from './Login';

const locationHelper = locationHelperBuilder({});

const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  authenticatedSelector: ({auth: {user}}) => !user,
  redirectAction: routerActions.replace,
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsNotAuthenticated'
});


export default (
  <Route component={userIsNotAuthenticated(Exterior)}>
    <Route path='login' component={Login} />
  </Route>
);