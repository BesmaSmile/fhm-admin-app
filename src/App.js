import React, {useState, useEffect} from 'react';
import RegisterSuperAdmin from 'pages/register_super_admin';
import LoginPage from 'pages/login';
import MainPage from 'pages/main';
import { Route, Switch, Redirect } from "react-router-dom";
import {authService} from 'services';
import {connect} from 'react-redux';

const App=(props)=>{
  const {user} = props
  const [loading, setLoading]= useState(!user)
  const [superAdminExists, setSuperAdminExists]=useState()
  useEffect(()=>{
    if(!user)
      authService.checkSuperUser().then(result=>{
        setSuperAdminExists(result.exists)
        setLoading(false)       
      })
  }, [user])
  return(
    <>
    {
      loading ? <div className='relh100vh flex col jcc aic'>Chargement de l'application...</div>
      : <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/dashboard"/> 
              : (superAdminExists 
                ? <Redirect to="/login"/>
                : <Redirect to="/inscription_super_admin"/>)
            }
          </Route>
          {!user && superAdminExists  && <Route to="/login" component={LoginPage}/> }
          {!user && !superAdminExists && <Route to="/inscription_super_admin" component={RegisterSuperAdmin} />}
          
          <MainPage/> 
        </Switch>
    }
    </>   
  )
}
const mapState=(state)=> ({
   user : state.auth.user
})

export default connect(mapState)(App);


