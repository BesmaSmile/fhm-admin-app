import React, {useState} from 'react';
import Form from 'components/misc/Form/Form';
import './Login.scss';
import {useHistory} from "react-router-dom";
import { authActions } from 'store/actions';
import {connect} from 'react-redux';

const Login=(props) =>{
  const history=useHistory()
  const [pending, setPending]=useState(false)
  const [error, setError]=useState()

  const onSubmit = values => { 
    setPending(true)
    setError()
    props.login(values).then(result=>
    {
      history.replace('/')
    }).catch(error=>{
      setPending(false)
      setError(error)
    })
  }

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
      <div className='w300 flex jcc col marb30 txtac'>
        <div className='bauhaus93 lh80 fs80 clightpurple'>FHM</div>
        <span className='cstronggrey fs18 light'>Faci Hospitality Master</span>
        <div visible={error ? 'true' : 'false'} className='reg-error fs14 cred medium txtal mart5'>{error ? '⚠ '+error : ''}</div>
      </div>
      <Form className='w300' 
        inputs={loginInputs} 
        onSubmit={onSubmit} 
        submitText='Se connecter'
        pending={pending}
      />
    </div>
  );
}

const actionCreators = {
  login: authActions.login

}

export default connect(()=>({}),actionCreators)(Login);