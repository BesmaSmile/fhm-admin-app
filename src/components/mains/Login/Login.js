import React from 'react';
import Form from 'components/misc/Form/Form';
import './Login.scss';
import {useHistory} from "react-router-dom";

const Login=() =>{
  const history=useHistory()
  const onSubmit = values => history.replace('/home')
  const loginInputs=[
    {
      name:'username',
      placeholder:"Nom d'utilisateur",
      validation: {required: "Nom d'utilisateur requis"}
    },
    {
      name:'password',
      placeholder:'Mot de passe',
      type:'password',
      validation: {required: 'Mot de passe requis'}
    }
  ]
  
  return (
    <div className='Login relh100vh flex col aic'>
      <div className='flex jcc col marb30'>
        <div className='bauhaus93 lh80 fs80 clightpurple'>FHM</div>
        <span className='cstronggrey txtac fs18 light'>Faci Hospitality Master</span>
      </div>
      <Form inputs={loginInputs} onSubmit={onSubmit} submitText='Se connecter'
      />
    </div>
  );
}

export default Login;