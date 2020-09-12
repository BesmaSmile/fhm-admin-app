import React from 'react';
import Form from 'components/misc/Form/Form';
import Divider from '@material-ui/core/Divider';
import { hooks } from 'functions/hooks';
import { useSnackbar } from 'notistack';
import { permissionConstants } from 'consts';

import _ from 'lodash';

const PermissionsForm = props => {
  const { close, updateAdminPermissions, permissions } = props
  const updateAdminPermissionsRequest = hooks.useRequest()
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = values => {
    const toSend = _.pickBy(values, value=>value===true);
    console.log(toSend)
    updateAdminPermissionsRequest.execute({
      action: () => updateAdminPermissions(values),
      success: (res) => {
        enqueueSnackbar(`Les permissions on bien été attribuées à l'administrateur !`, { variant: 'success' })
        close()
      },
      failure: (error) => {
        enqueueSnackbar(error, { variant: 'error' })
      }
    })
  }

  const form = {
    dashboard: {
      title: 'Tableau de bord',
      permissions: [
        {
          name: permissionConstants.READ_DASHBOARD,
          label: 'Afficher le tableau de bord'
        }
      ]
    },
    client: {
      title: 'Clients',
      permissions: [
        {
          name: permissionConstants.READ_CLIENT,
          label :  'Afficher la liste des clients'
        },
        {
          name: permissionConstants.TOGGLE_CLIENT_ACCOUNT,
          label : "Activer/désactiver le compte d'un client"
        },
      ]
    },
    order: {
      title: 'Commandes',
      permissions: [
        {
          name: permissionConstants.READ_ORDER,
          label : 'Afficher la liste des commandes'
        },
        {
          name: permissionConstants.READ_DELIVERY_ORDER,
          label :'Afficher les bons de livraison'
        },
        {
          name: permissionConstants.READ_PURCHASE_ORDER,
          label : 'Afficher les bons de commande'
        },
        {
          name: permissionConstants.PRINT_DELIVERY_ORDER,
          label :'Imprimer un bon de livraion'
        },
        {
          name: permissionConstants.PRINT_PURCHASE_ORDER,
          label :'Imprimer un bon de paiement'
        },
        {
          name: permissionConstants.APPROVE_DELIVERY,
          label : "Approuver la livraison d'une commande"
        },
        {
          name: permissionConstants.APPROVE_PAYMENT,
          label :"Approuver le paiement d'une commande"
        },
      ]
    },
    catalog: {
      title: 'Catalogue de produits',
      permissions: [
        {
          name: permissionConstants.READ_CATALOG,
          label :"Afficher le catalogue de produits"

        },
        {
          name: permissionConstants.UPDATE_CATALOG,
          label :"Modifier le catologue de produits"
        }
      ]
    },
    admin: {
      title: 'Gestion des administrateurs',
      permissions: [
        {
          name: permissionConstants.READ_ADMIN,
          label:'Afficher la liste des administrateurs'
        },
        {
          name: permissionConstants.TOGGLE_ADMIN_ACCOUNT,
          label : "Activer/désactiver le compte d'un administrateur"
        },
        {
          name: permissionConstants.RESET_ADMIN_PASSWORD,
          label: "Réinitialiser le mot de passe d'un administrateur"
        },
        {
          name: permissionConstants.READ_ADMIN_PERMISSIONS,
          label: "Afficher les persmissions d'un administrateur"
        },
        {
          name: permissionConstants.UPDATE_ADMIN_PERMISSIONS,
          label: "Modifier les persmissions d'un administrateur"
        },

      ]
    }
  }

  let formInputs = []
  Object.keys(form).forEach(key => {
    formInputs.push({
      content : 
        <div className='mart20 marb10'>
          <div className='medium fs20 cblue marb5'>{form[key].title}</div>
          <Divider />
        </div>
    })
    form[key].permissions.forEach(permission=>{
      formInputs.push({
        name : permission.name,
        label : permission.label,
        type : 'check',
        defaultValue : _.get(permissions, permission.name, false)
      })
    })
  });

  return (
    <div className='PermissionsForm w550'>
      <Form title="Permission administrateur"
        inputs={formInputs}
        onSubmit={onSubmit}
        submitText='Enregistrer'
        pending={updateAdminPermissionsRequest.pending}
        isDialog={true}
        cancel={close}
      />
    </div>
  )
}

export default PermissionsForm;