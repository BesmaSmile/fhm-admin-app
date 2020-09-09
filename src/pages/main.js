import React from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import Home from 'components/mains/Home/Home';
import Clients from 'components/mains/Clients/Clients';
import Orders from 'components/mains/Orders/Orders';
import Catalog from 'components/mains/Catalog/Catalog';
import Admins from 'components/mains/Admins/Admins';
import { Route } from "react-router-dom";


const MainPage=(props)=> {
  return (
    <MainLayout>
      {/*<Route exact path="/"><Redirect to='/accueil'/></Route>*/}
      <Route exact path="/accueil" component={Home}/>
      <Route exact path="/clients" component={Clients}/>  
      <Route exact path="/commandes" component={Orders}/>  
      <Route exact path="/catalogue" component={Catalog}/>  
      <Route exact path="/administrateurs" component={Admins}/>  
    </MainLayout>
  );
}

export default MainPage;
