import React, { useState } from 'react';
import Form from 'components/misc/Form/Form';
import { hooks } from 'functions/hooks';
import { useSnackbar } from 'notistack';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const AdminForm = props => {
  const { close, addAdmin } = props
  const addAdminyRequest = hooks.useRequest()
  const { enqueueSnackbar } = useSnackbar();
  const [_passwordVisible, _setPasswordVisible] = useState(false)

  const handleClickShowPassword = () => {
    _setPasswordVisible(!_passwordVisible)
  }

  const onSubmit = values => {
    addAdminyRequest.execute({
      action: () => addAdmin(values),
      success: (res) => {
        enqueueSnackbar(`Le compte admin a bien été enregistrée !`, { variant: 'success' })
        close()
      },
      failure: (error) => {
        enqueueSnackbar(error.message, { variant: error.added ? 'warning' : 'error' })
        if (error.added)
          close()
      }
    })
  }


  const adminInputs = [
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
      defaultValue: 'admin',
      validation: { required: "Champs requis" },
      options: (values) => [{ value: 'admin', name: 'Admin' },{ value: 'super-admin', name: 'Super-admin' }, ]
    }
  ]
  return (
    <div className='AdminForm w400'>
      <Form title="Nouvel administrateur"
        inputs={adminInputs}
        onSubmit={onSubmit}
        submitText='Enregistrer'
        pending={addAdminyRequest.pending}
        isDialog={true}
        cancel={close}
      />
    </div>
  )
}

export default AdminForm;