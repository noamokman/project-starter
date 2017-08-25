import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {connectedRouterRedirect} from 'redux-auth-wrapper/history3/redirect';
import {routerActions} from 'react-router-redux';
import Shell from './';
import loadable from 'loadable-components';

import AuthenticatingUser from './components/AuthenticatingUser';

const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: ({auth: {user}}) => !!user,
  authenticatingSelector: ({auth: {user, token}}) => token && !user,
  AuthenticatingComponent: AuthenticatingUser,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
});

const userIsAdmin = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: ({auth: {user}}) => user && user.admin,
  redirectAction: routerActions.replace,
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsAdmin'
});

const Home = loadable(() => import('./Home'));
const About = loadable(() => import('./About'));
const Admin = loadable(() => import(/* webpackChunkName: "admin" */ './Admin'));

export default (
  <Route component={userIsAuthenticated(Shell)}>
    <IndexRoute component={Home} />
    <Route path='about' component={About} />
    <Route path='admin' component={userIsAdmin(Admin)} />
  </Route>
);