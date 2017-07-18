import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {AppBar} from 'material-ui';
import Layout from '../components/Layout';
import LogoutButton from './components/LogoutButton';
import * as actions from '../../reducers/auth';

const Shell = ({logout, children}) => (
  <Layout>
    <AppBar title='Project Starter' showMenuIconButton={false} iconElementRight={<LogoutButton logout={logout} />} />
    {children}
  </Layout>
);

export default connect(
  null,
  dispatch => bindActionCreators(actions, dispatch)
)(Shell);