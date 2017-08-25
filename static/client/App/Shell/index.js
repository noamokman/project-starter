import React from 'react';
import Layout from '../components/Layout';
import AppBar from './components/AppBar';

export default ({children}) => (
  <Layout>
    <AppBar />
    {children}
  </Layout>
);