import React from 'react';
import {AppBar} from 'material-ui';
import Layout from '../components/Layout';

export default ({children}) => (
  <Layout>
    <AppBar title='PROJECT_READABLE_NAME' showMenuIconButton={false} />
    {children}
  </Layout>
);

