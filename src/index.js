import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
// import { createDevTools } from 'redux-devtools'
import {Router, Route, Redirect, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import * as reducers from './reducers';
import App from './containers/app';
import Pages from './containers/pages';

import './index.css';


const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const store = createStore(reducer);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="pages(/:pageId)" component={Pages}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
