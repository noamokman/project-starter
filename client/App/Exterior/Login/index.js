import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../../../reducers/auth';
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
        }
      });
  }


  login (values) {
    const {localLogin, loadUser} = this.props;

    localLogin(values)
      .then(loadUser);
  }

  render () {
    return (
      <Login onSubmit={this.login} />
    );
  }
}

export default connect(
  ({auth}) => ({auth}),
  dispatch => bindActionCreators(authActions, dispatch)
)(LoginContainer);
