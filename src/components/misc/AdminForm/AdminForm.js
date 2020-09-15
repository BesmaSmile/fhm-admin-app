import React, { useState } from 'react';
import Form from 'components/misc/Form/Form';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { adminActions } from 'store/actions';
import { connect } from 'react-redux';
import { hooks } from 'functions/hooks';
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";

const AdminForm = props => {
  const { close, registerAdmin, isFirstAdmin, onSuccess } = props
  const registerRequest = hooks.useRequest()
  const { enqueueSnackbar } = useSnackbar();
  const history=useHistory()
  const [_passwordVisible, _setPasswordVisible] = useState(false)

  const handleClickShowPassword = () => {
    _setPasswordVisible(!_passwordVisible)
  }

  const onSubmit = values => { 
    const {secretKey, confirmPassword ,...user}=values
    registerRequest.execute({
      action : ()=>registerAdmin(user,isFirstAdmin, secretKey),
      success : (result) => {
        console.log(result)
        enqueueSnackbar(`Le compte admin a bien été enregistré !`, { variant: 'success' });
        
        if(isFirstAdmin)
          history.replace('/')
        else if(onSuccess) onSuccess(result.id); else close()
      },
      failure : (error)=>enqueueSnackbar(error, { variant: 'error' })
    })
  }

  let adminInputs = [
    {
      name: 'username',
      label: "Nom de l'utilisateur",
      validation: { required: 'Champs requis' }
    },
    {
      name: 'password',
      label: 'Mot de passe',
      type: _passwordVisible ? 'text' : 'password',
      endAdornment:
        <InputAdornment position="end">
          <IconButton
            edge="end"
            onClick={handleClickShowPassword}
          >
            {_passwordVisible ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>,
      validation: { required: 'Champs requis' }
    },
    {
      name: 'confirmPassword',
      label: 'Confirmer mot de passe',
      type: 'password',
      validation: { required: 'Champs requis' },
      combinedValdation: (values) => values.password === values.confirmPassword || "Les mots de passe ne se correspondent pas"
    },
    {
      name: 'role',
      label: "Rôle",
      type: 'select',
      disabled : isFirstAdmin,
      defaultValue: isFirstAdmin ? 'super-admin' : 'admin',
      validation: { required: "Champs requis" },
      options: (values) => [{ value: 'admin', name: 'Admin' },{ value: 'super-admin', name: 'Super-admin' }, ]
    }
  ]

  if(isFirstAdmin){
    adminInputs.push({
      name:'secretKey',
      label:'Clé secrète',
      validation: {required: 'Champs requis'}
    })
  }
  return (
    <div className='AdminForm w400'>
      <Form title="Nouvel administrateur"
        inputs={adminInputs}
        onSubmit={onSubmit}
        submitText='Enregistrer'
        pending={registerRequest.pending}
        isDialog={!isFirstAdmin}
        cancel={close}
      />
    </div>
  )
}

const actionCreators = {
  registerAdmin: adminActions.registerAdmin

}

export default connect(() => ({}), actionCreators)(AdminForm);