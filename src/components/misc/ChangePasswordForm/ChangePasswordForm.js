import React, {useState} from 'react';
import Form from 'components/misc/Form/Form';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { hooks } from 'functions/hooks';
import { useSnackbar } from 'notistack';

const ChangePasswordForm=props=>{
  const {close, changePassword} = props
  const changePasswordRequest=hooks.useRequest()
  const [_passwordVisible, _setPasswordVisible] = useState(false)
  const { enqueueSnackbar } = useSnackbar();

  const handleClickShowPassword = () => {
    _setPasswordVisible(!_passwordVisible)
  }

  const onSubmit=values=>{
    changePasswordRequest.execute({
      action: () => changePassword(values.password),
      success: (res) => {
        enqueueSnackbar(`Le nouveau mot de passe à bien été enregistré`, { variant: 'success' })
        close()
      },
      failure: (error) => {
        enqueueSnackbar(error.message, { variant :'error' })
      }
    })
  }

  const changePasswordInputs=[
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
      type: 'password',
      validation: { required: 'Champs requis' },
      combinedValdation: (values) => values.password === values.confirmPassword || "Les mots de passe ne se correspondent pas"
    }
  ]
  return (
    <div className='ChangePasswordForm'>
      <Form title="Changement mot de passe"
        inputs={changePasswordInputs}
        onSubmit={onSubmit}
        submitText='Enregistrer'
        pending={changePasswordRequest.pending}
        isDialog={true}
        cancel={close}
      />
    </div>
  )
}

export default ChangePasswordForm;