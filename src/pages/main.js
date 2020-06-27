import React from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import Home from 'components/mains/Home/Home';
import Clients from 'components/mains/Clients/Clients';
import Orders from 'components/mains/Orders/Orders';
import Catalog from 'components/mains/Catalog/Catalog';
import Users from 'components/mains/Users/Users';
import { Route,Redirect } from "react-router-dom";


const MainPage=(props)=> {
  return (
    <MainLayout>
      {/*<Route exact path="/"><Redirect to='/accueil'/></Route>*/}
      <Route exact path="/accueil" component={Home}/>
      <Route exact path="/clients" component={Clients}/>  
      <Route exact path="/commandes" component={Orders}/>  
      <Route exact path="/catalogue" component={Catalog}/>  
      <Route exact path="/utilisateurs" component={Users}/>  
    </MainLayout>
  );
}

export default MainPage;
