import React from 'react';
import {AppBar} from 'material-ui';
import Layout from '../components/Layout';

export default ({children}) => (
  <Layout>
    <AppBar title='Project Starter' showMenuIconButton={false} />
    {children}
  </Layout>
);

