import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {localLogin, loadUser} from '../../../reducers/auth';
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
    return (
      <LoginForm onSubmit={this.login} />
    );
  }
}

export default connect(
  ({auth: {token}}) => ({token}),
  dispatch => bindActionCreators({localLogin, loadUser}, dispatch)
)(LoginContainer);
