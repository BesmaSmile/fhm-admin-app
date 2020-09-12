import React from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import Home from 'components/mains/Home/Home';
import Clients from 'components/mains/Clients/Clients';
import Orders from 'components/mains/Orders/Orders';
import Catalog from 'components/mains/Catalog/Catalog';
import Admins from 'components/mains/Admins/Admins';
import { Route } from "react-router-dom";
import {PageWrapper} from 'components/misc/PermissionWrappers/PermissionWrappers';

const pages=[
  {path : '/accueil', name:'home', component : <Home/> },
  {path : '/clients', name:'clients', component : <Clients/>},
  {path : '/commandes', name:'orders', component : <Orders/>},
  {path : '/catalogue', name:'catalog', component : <Catalog/>},
  {path : '/administrateurs', name:'admins', component : <Admins/>},
]
const MainPage=(props)=> {
  return (
    <MainLayout>
        {pages.map(page=><Route exact path={page.path} component={()=><PageWrapper name={page.name} page={page.component}/>}/>)}
      {/*<Route exact path="/"><Redirect to='/accueil'/></Route>
      <Route exact path="/accueil" component={()=><PageWrapper name='home' page={<Home/>}/>}/>
      <Route exact path="/clients" component={()=><PageWrapper name='home' page={<Clients}/>  
      <Route exact path="/commandes" component={()=><PageWrapper name='home' page={<Orders}/>  
      <Route exact path="/catalogue" component={()=><PageWrapper name='home' page={<Catalog}/>  
  <Route exact path="/administrateurs" component={()=><PageWrapper name='home' page={<Admins}/> */} 
    </MainLayout>
  );
}

export default MainPage;
