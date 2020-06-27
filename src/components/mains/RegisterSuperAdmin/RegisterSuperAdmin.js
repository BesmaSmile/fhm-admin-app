import React, {useRef} from 'react';
import Form from 'components/misc/Form/Form';
import './RegisterSuperAdmin.scss';
import {useHistory} from "react-router-dom";
import { usersActions } from 'store/actions';
import {connect} from 'react-redux';

const RegisterSuperAdmin=(props) =>{
  const history=useHistory()
  const onSubmit = values => {
    const {secretKey, confirmPassword ,...user}=values
    console.log(secretKey)
    props.registerSuperAdmin(user, secretKey).then(result=>
    {
      console.log(result)
      history.replace('/')
    })
  }
  const registerInputs=[
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
    },
    {
      name:'confirmPassword',
      placeholder:'Confirmer mot de passe',
      type:'password',
      validation: { required: 'Confirmation mot de passe requise'},
      combinedValdation : (values) =>{
        console.log(values)
        return values.password === values.confirmPassword || "The passwords do not match"
      }
    },
    {
      name:'secretKey',
      placeholder:'Clé secrète',
      validation: {required: 'Clé secrète requise'}
    }
  ]
  
  return (
    <div className='RegisterSuperAdmin padv20 flex col aic'>
      <span className='cstronggrey txtac fs30 bold marb10'>Vous êtes le premier à s'inscrire à FHM !</span>
      <div className='w300 flex jcc col marb10 txtac'>
        <div className='bauhaus93 lh80 fs80 clightpurple'>FHM</div>
        <span className='cstronggrey txtac fs18 light'>Faci Hospitality Master</span>    
        <span className='cstronggrey txtac fs12 light mart15 txtal'>En poursuivant l'inscription, vous devenez le Super Administrateur de FHM !</span>
      </div>
      <Form className='w300' inputs={registerInputs} onSubmit={onSubmit} submitText='Enregistrer'
      />
    </div>
  );
}

const actionCreators = {
  registerSuperAdmin: usersActions.registerSuperAdmin

}

export default connect(()=>({}),actionCreators)( RegisterSuperAdmin);