import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/index.scss';
import LoginPage from './pages/login';
import MainPage from './pages/main';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
          <Route exact path="/login" component={LoginPage} />
          <MainPage/>  
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
