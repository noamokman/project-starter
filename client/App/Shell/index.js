import React from 'react';
import {AppBar, IconButton} from 'material-ui';
import Layout from '../components/Layout';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';

const logout = (
  <IconButton tooltip='Logout'>
    <ActionExitToApp />
  </IconButton>
);

export default ({children}) => (
  <Layout>
    <AppBar title='Project Starter' showMenuIconButton={false} iconElementRight={logout} />
    {children}
  </Layout>
);