import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {localLogin, loadUser} from '../../../reducers/auth';
import {clearError} from './redux';
import LoginForm from './LoginForm';

class LoginContainer extends Component {
  constructor () {
    super();

    this.login = this.login.bind(this);
  }

  componentDidMount () {
    const {token, loadUser} = this.props;

    if (!token) {
      return;
    }

    loadUser();
  }

  login (values) {
    const {localLogin, loadUser} = this.props;

    localLogin(values)
      .then(loadUser);
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
  dispatch => bindActionCreators({localLogin, loadUser, clearError}, dispatch)
)(LoginContainer);
