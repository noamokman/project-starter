import React from 'react';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import {render} from 'react-dom';
import './styles.css';
import Root from './components/Root';
import createStore from './create-store';

const store = createStore(browserHistory, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

render((
  <Root store={store} history={history} />
), document.getElementById('root'));