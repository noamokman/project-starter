import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {localLogin, loadUser, authorize} from '../../../reducers/auth';
import {clearError} from './redux';
import {socketConnect} from 'redux-sockets';
import LoginForm from './LoginForm';

class LoginContainer extends Component {
  constructor () {
    super();

    this.login = this.login.bind(this);
  }

  componentDidMount () {
    const {token, loadUser, authorize, socketConnect} = this.props;

    if (!token) {
      return;
    }

    loadUser()
      .then(socketConnect)
      .then(authorize);
  }

  login (values) {
    const {localLogin, authorize, loadUser, socketConnect} = this.props;

    localLogin(values)
      .then(loadUser)
      .then(socketConnect)
      .then(authorize);
  }

  render () {
    const {clearError, error} = this.props;

    return (
      <LoginForm onSubmit={this.login} clearError={clearError} loginError={error} />
    );
  }
}

export default connect(
  ({auth: {token}, login: {error}}) => ({token, error}),
  dispatch => bindActionCreators({localLogin, authorize, loadUser, socketConnect, clearError}, dispatch)
)(LoginContainer);
