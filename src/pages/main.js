import React from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import Dashboard from 'components/mains/Dashboard/Dashboard';
import Clients from 'components/mains/Clients/Clients';
import Orders from 'components/mains/Orders/Orders';
import Catalog from 'components/mains/Catalog/Catalog';
import Admins from 'components/mains/Admins/Admins';
import { Route } from "react-router-dom";
import {PageWrapper} from 'components/misc/PermissionWrappers/PermissionWrappers';

const pages=[
  {path : '/dashboard', name:'dashboard', component : <Dashboard/> },
  {path : '/clients', name:'clients', component : <Clients/>},
  {path : '/commandes', name:'orders', component : <Orders/>},
  {path : '/catalogue', name:'catalog', component : <Catalog/>},
  {path : '/administrateurs', name:'admins', component : <Admins/>},
]
const MainPage=(props)=> {
  return (
    <MainLayout>
      {pages.map(page=><Route exact path={page.path} component={()=><PageWrapper name={page.name} page={page.component}/>}/>)}
    </MainLayout>
  );
}

export default MainPage;
