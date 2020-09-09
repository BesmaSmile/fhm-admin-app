import React, { useEffect } from 'react';
import Form from 'components/misc/Form/Form';
import AdminForm from 'components/misc/AdminForm/AdminForm';
import { Button } from '@material-ui/core';
import './RegisterSuperAdmin.scss';
import { useSnackbar } from 'notistack';

const RegisterSuperAdmin = (props) => {
  const { enqueueSnackbar, closeSnackbar  } = useSnackbar();

  useEffect(() => {
    enqueueSnackbar(<span>Vous êtes le premier SUPER admin à s'inscrire à FHM ! <br/>En poursuivant l'inscription, vous devenez le Super-Admin de FHM !</span>,
      {
        variant: 'default',
        persist :true,
        anchorOrigin : {horizontal : 'top', vertical : 'center'},
        action : (key) => (
          <Button onClick={()=>closeSnackbar(key)}>
              <span className='cwhite'>Ok</span>
          </Button>
        )
      })
  }, [])

  const registerInputs = [
    {
      name: 'username',
      label: "Nom d'utilisateur",
      validation: { required: "Champs requis" }
    },
    {
      name: 'password',
      label: 'Mot de passe',
      type: 'password',
      validation: { required: 'Champs requis' }
    },
    {
      name: 'confirmPassword',
      label: 'Confirmer mot de passe',
      type: 'password',
      validation: { required: 'Champs requis' },
      combinedValdation: (values) => values.password === values.confirmPassword || "The passwords do not match"
    },
    {
      name: 'secretKey',
      label: 'Clé secrète',
      validation: { required: 'Champs requis' }
    }
  ]

  return (
    <div className='RegisterSuperAdmin padv20 flex col aic'>
      <div className='flex jcc col marb10 txtac'>
        <div className='bauhaus93 lh60 fs80 clightblue'>FHM</div>
        <span className='cstronggrey txtac fs18 light'>Faci Hospitality Master</span>
        <span className='cstronggrey txtac fs12 light mart15 txtal'>En poursuivant l'inscription, vous devenez le Super-Admin de FHM !</span>
      </div>
      <AdminForm isFirstAdmin={true} />
    </div>
  );
}


export default RegisterSuperAdmin;