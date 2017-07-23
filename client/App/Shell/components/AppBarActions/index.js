import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {routerActions} from 'react-router-redux';
import {logout} from '../../../../reducers/auth';
import AppBarActions from './AppBarActions';

class AppBarActionsContainer extends Component {
  constructor () {
    super();

    this.handleAbout = this.handleAbout.bind(this);
    this.handleAdmin = this.handleAdmin.bind(this);
  }

  handleAbout () {
    this.props.push('/about');
  }

  handleAdmin () {
    this.props.push('/admin');
  }

  render () {
    const {logout, user = {}} = this.props;

    return (
      <AppBarActions onLogout={logout} admin={user.admin} onAbout={this.handleAbout} onAdmin={this.handleAdmin} />
    );
  }
}

export default connect(
  ({auth: {user}}) => ({user}),
  dispatch => bindActionCreators({logout, push: routerActions.push}, dispatch)
)(AppBarActionsContainer);