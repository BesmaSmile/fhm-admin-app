import React from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import Home from 'components/mains/Home/Home';
import Clients from 'components/mains/Clients/Clients';

import { Route, Switch } from "react-router-dom";

const MainPage=(props)=> {
  return (
    <MainLayout>
         
       {props.children}
      
    </MainLayout>
  );
}

export default MainPage;
