import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Router, Route } from 'react-router';
import { createHashHistory } from 'history';

import App from './App';
import './index.css';
import reducer from './reducers';
import About from './About';

const hashHistory = createHashHistory();
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
        <div>
        <Route Route exact path='/' component={App} />
        <Route path="/app" component={App}/>
        <Route path="/about" component={About}/>
        </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);