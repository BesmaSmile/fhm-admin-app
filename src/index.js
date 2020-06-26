import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/index.scss';
import LoginPage from './pages/login';
import MainPage from './pages/main';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import { createBrowserHistory } from 'history';
import Home from 'components/mains/Home/Home';
import Clients from 'components/mains/Clients/Clients';

//const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
          <Route exact path="/login" component={LoginPage} />
          <MainPage>
          <Route component={({ match }) =>
          <>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/clients" component={Clients}/>
            </>
          }/>
          </MainPage>
          
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
