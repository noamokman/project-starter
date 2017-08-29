import React from 'react';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import './styles.css';
import Root from './components/Root';
import createStore from './create-store';

const store = createStore(browserHistory, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

const rootComponentRender = () => render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root'));

rootComponentRender();

if (module.hot) {
  module.hot.accept('./components/Root', () => rootComponentRender());
}