import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';

import Dashboard from './components/Dashboard';
import NewUrl from './components/NewUrl';
import HistoryUrls from './components/HistoryUrls';
import Login from './components/Login';
import NotFound from './components/NotFound';

require('./styles/App.scss');

const logger = createLogger();
const store = createStore(
  allReducers,
  applyMiddleware(thunk, promise, logger)
);

// Render the main component into the dom
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Dashboard}>
        <Route path="new-url" component={NewUrl} />
        <Route path="history-urls" component={HistoryUrls} />
        <Route path="login" component={Login} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
