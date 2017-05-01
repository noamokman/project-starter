import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as LoginActions from './redux';
import Login from './Login';

const LoginContainer = ({localLogin}) => (
  <Login onSubmit={localLogin} />
);

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => bindActionCreators(LoginActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
