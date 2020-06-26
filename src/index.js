import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/index.scss';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import * as serviceWorker from './serviceWorker';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/home" component={HomePage}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
