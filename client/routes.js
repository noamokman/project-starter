import React from 'react';
import {Router, Route, Redirect} from 'react-router';
import {ReduxAsyncConnect} from 'redux-async-connect';
import App from './App';
import shellRoutes from './App/Shell/routes';
import Login from './App/Login';

export default ({history}) => (
  <Router history={history} render={props => <ReduxAsyncConnect {...props} />}>
    <Route path='/' component={App}>
      {shellRoutes}
      <Route path='login' component={Login} />
      <Redirect from='*' to='/' />
    </Route>
  </Router>
);