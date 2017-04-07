import React from 'react';
import {Provider} from 'react-redux';
import Router from '../../routes';

export default ({store, history}) => (
  <Provider store={store}>
    <Router history={history} store={store} />
  </Provider>
);