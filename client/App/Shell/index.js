import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {AppBar, IconButton} from 'material-ui';
import Layout from '../components/Layout';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import * as actions from '../../reducers/auth';

class Shell extends Component {
  constructor () {
    super();

    this.renderLogoutButton = this.renderLogoutButton.bind(this);
  }

  renderLogoutButton () {
    const {logout} = this.props;

    return (
      <IconButton tooltip='Logout' onTouchTap={logout}>
        <ActionExitToApp />
      </IconButton>
    );
  }
  render () {
    return (
      <Layout>
        <AppBar title='Project Starter' showMenuIconButton={false} iconElementRight={this.renderLogoutButton()} />
        {this.props.children}
      </Layout>
    );
  }
}
export default connect(
  null,
  dispatch => bindActionCreators(actions, dispatch)
)(Shell);