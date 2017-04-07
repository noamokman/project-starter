import 'mdi/css/materialdesignicons.css';
import React from 'react';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles.css';
import Root from './components/Root';
import createStore from './create-store';

injectTapEventPlugin();

const store = createStore(browserHistory, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

render((
  <Root store={store} history={history} />
), document.getElementById('container'));