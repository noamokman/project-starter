import React, {Component} from 'react';
import {Router, Route, Redirect} from 'react-router';
import {ReduxAsyncConnect} from 'redux-async-connect';
import App from './App';
import shellRoutes from './App/Shell/routes';
import exteriorRoutes from './App/Exterior/routes';

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
          {exteriorRoutes}
          <Redirect from='*' to='/' />
        </Route>
      </Router>
    );
  }
}