import React, {useState} from 'react';
import Form from 'components/misc/Form/Form';
import './RegisterSuperAdmin.scss';
import {useHistory} from "react-router-dom";
import { authActions } from 'store/actions';
import {connect} from 'react-redux';

const RegisterSuperAdmin=(props) =>{
  const history=useHistory()
  const [pending, setPending]=useState(false)
  const [error, setError]=useState()

  const onSubmit = values => { 
    setPending(true)
    setError()
    const {secretKey, confirmPassword ,...user}=values
    props.registerSuperAdmin(user, secretKey).then(result=>
    {
      history.replace('/')
    }).catch(error=>{
      setPending(false)
      setError(error)
    })
  }
  const registerInputs=[
    {
      name:'username',
      label:"Nom d'utilisateur *",
      validation: {required: "Nom d'utilisateur requis"}
    },
    {
      name:'password',
      label:'Mot de passe *',
      type:'password',
      validation: {required: 'Mot de passe requis'}
    },
    {
      name:'confirmPassword',
      label:'Confirmer mot de passe *',
      type:'password',
      validation: { required: 'Confirmation mot de passe requise'},
      combinedValdation : (values) =>values.password === values.confirmPassword || "The passwords do not match"
    },
    {
      name:'secretKey',
      label:'Clé secrète *',
      validation: {required: 'Clé secrète requise'}
    }
  ]
  
  return (
    <div className='RegisterSuperAdmin padv20 flex col aic'>
      <span className='cstronggrey txtac fs18 medium marb10'>Vous êtes le premier SUPER admin à s'inscrire à FHM !</span>
      <div className='w300'>
        <div className='flex jcc col marb10 txtac'>
          <div className='bauhaus93 lh80 fs80 clightblue'>FHM</div>
          <span className='cstronggrey txtac fs18 light'>Faci Hospitality Master</span>    
          <span className='cstronggrey txtac fs12 light mart15 txtal'>En poursuivant l'inscription, vous devenez le Super Administrateur de FHM !</span> 
        </div>
        <Form inputs={registerInputs} 
          onSubmit={onSubmit} 
          submitText='Enregistrer'
          pending={pending}
          error={error}
        />
      </div>
    </div>
  );
}

const actionCreators = {
  registerSuperAdmin: authActions.registerSuperAdmin

}

export default connect(()=>({}),actionCreators)( RegisterSuperAdmin);