import React from 'react';
import {Router, Route, Redirect} from 'react-router';
import App from './App';
import shellRoutes from './App/Shell/routes';
import exteriorRoutes from './App/Exterior/routes';

export default ({history}) => (
  <Router history={history}>
    <Route path='/' component={App}>
      {shellRoutes}
      {exteriorRoutes}
      <Redirect from='*' to='/' />
    </Route>
  </Router>
);