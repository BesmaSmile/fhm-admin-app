import React, { useState } from 'react';
import Form from 'components/misc/Form/Form';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { adminActions } from 'store/actions';
import { connect } from 'react-redux';
import { hooks } from 'functions/hooks';
import { useSnackbar } from 'notistack';

const AdminForm = props => {
  const { close, registerAdmin, onSuccess } = props
  const registerRequest = hooks.useRequest()
  const { enqueueSnackbar } = useSnackbar()
  const [_passwordVisible, _setPasswordVisible] = useState(false)

  const handleClickShowPassword = () => {
    _setPasswordVisible(!_passwordVisible)
  }

  const onSubmit = values => { 
    const {secretKey, confirmPassword ,...user}=values
    registerRequest.execute({
      action : ()=>registerAdmin(user),
      success : (result) => {
        enqueueSnackbar(`Le compte admin a bien été enregistré !`, { variant: 'success' });
        if(onSuccess) onSuccess(result.id); else close()
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
            {_passwordVisible ? <VisibilityOff /> : <Visibility /> }
          </IconButton>
        </InputAdornment>,
      validation: { required: 'Champs requis' }
    },
    {
      name: 'confirmPassword',
      label: 'Confirmer mot de passe',
      type: _passwordVisible ? 'text' : 'password',
      validation: { required: 'Champs requis' },
      combinedValdation: (values) => values.password === values.confirmPassword || "Les mots de passe ne se correspondent pas"
    }
  ]

  return (
    <div className='AdminForm w400'>
      <Form title="Nouvel administrateur"
        inputs={adminInputs}
        onSubmit={onSubmit}
        submitText='Enregistrer'
        pending={registerRequest.pending}
        isDialog={true}
        cancel={close}
      />
    </div>
  )
}

const actionCreators = {
  registerAdmin: adminActions.registerAdmin

}

export default connect(() => ({}), actionCreators)(AdminForm);