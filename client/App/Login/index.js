import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {routerActions} from 'react-router-redux';
import * as authActions from '../../reducers/auth';
import Login from './Login';

class LoginContainer extends Component {
  constructor () {
    super();

    this.login = this.login.bind(this);
  }

  componentDidMount () {
    const {auth, loadUser} = this.props;

    if (!auth.token) {
      return;
    }

    loadUser()
      .then(({error}) => {
        if (error) {
          console.log(error);

          return;
        }

        this.redirectBack();
      });
  }

  redirectBack () {
    const {location: {query: {redirect = '/'}}, replace} = this.props;

    replace(redirect);
  }

  login (values) {
    const {localLogin, loadUser} = this.props;

    localLogin(values)
      .then(loadUser)
      .then(() => this.redirectBack());
  }

  render () {
    return (
      <Login onSubmit={this.login} />
    );
  }
}

export default connect(
  ({auth}) => ({auth}),
  dispatch => bindActionCreators({...authActions, replace: routerActions.replace}, dispatch)
)(LoginContainer);
