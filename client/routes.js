import React, {Component} from 'react';
import {Router, Route, Redirect} from 'react-router';
import {ReduxAsyncConnect} from 'redux-async-connect';
import App from './App';
import shellRoutes from './App/Shell/routes';
import Login from './App/Login';

export default class Routes extends Component {
  static renderRouter (props) {
    return (<ReduxAsyncConnect {...props} />);
  }

  render () {
    const {history} = this.props;

    return (
      <Router history={history} render={this.renderRouter}>
        <Route path='/' component={App}>
          {shellRoutes}
          <Route path='login' component={Login} />
          <Redirect from='*' to='/' />
        </Route>
      </Router>
    );
  }
}