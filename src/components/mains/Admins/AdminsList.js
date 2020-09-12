import React from 'react';
import TableList from 'components/misc/TableList/TableList';
import AdminForm from 'components/misc/AdminForm/AdminForm';
import PermissionsForm from 'components/misc/PermissionsForm/PermissionsForm';
import SvgIcon from 'components/misc/SvgIcon/SvgIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import SecurityIcon from '@material-ui/icons/Security';
import LockIcon from '@material-ui/icons/Lock';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { Link } from "react-router-dom";
import { useDialog } from 'components/misc/Dialog/Dialog';
import { useSnackbar } from 'notistack';
import { hooks } from 'functions';
import moment from 'moment';
import _ from 'lodash';

const AdminActions = props => {
  const { administrator, updateAdminStatus } = props
  const { enqueueSnackbar } = useSnackbar();
  const dialog = useDialog()
  const updateAdminStatusRequest = hooks.useRequest()

  const toggleAccount = () => {
    const status = administrator.status === 'disabled' ? 'enabled' : 'disabled'
    updateAdminStatusRequest.execute({
      action: () => updateAdminStatus(administrator.id, status),
      success: () => enqueueSnackbar(`Le compte de l'administrateur a bien été ${status === 'enabled' ? 'activé' : 'désactivé'} !`, { variant: 'success' }),
      failure: (error) => enqueueSnackbar(error, { variant: 'error' }),
    })
  }

  const handleClick = () => {
    if (administrator.status === 'enabled') {
      dialog.openConfirmation({
        title: "Désactiver le compte de l'administrateur",
        message: "Voulez vous désactiver le compte d'un administrateur ?",
        yesText: "Oui",
        noText: "Non"
      }).then(() => {
        toggleAccount()
      }).catch(error => console.log("rejected"))
    }
    else toggleAccount()
  }

  return (
    <Button
      disabled={updateAdminStatus.pending}
      variant="outlined" 
      size="small"
      classes={{ root: administrator.status === 'enabled' ? 'adm-disableButton' : 'adm-enableButton' }}
      onClick={handleClick}>
      {administrator.status === 'enabled' ? 'Désactiver' : 'Activer'}
    </Button>
  )
}

const AdminsList = (props) => {

  const dialog = useDialog()
  const columns = [
    { key: 'username', name: "Nom d'utilisateur" },
    { key: 'createdAt', name: "Crée le " },
    { key: 'updatedAt', name: 'Modifié le' },
    { key: 'role', name: "Rôle" },
    { key: 'status', name: "Statut" },
    { key: 'actions', name: "Actions" },
    { key: 'options', name: "Options" }
  ]
  const filters = [
    { key: 'role', name: 'Rôle', type: 'select', value: 'all', fields: ['role'], options: [{ value: 'all', name: 'Tout' }, { value: 'admin', name: 'Admin' }, { value: 'super-admin', name: 'Super-admin' }] },
    { key: 'status', name: 'Statut', type: 'select', value: 'all', fields: ['status'], options: [{ value: 'all', name: 'Tout' }, { value: 'enabled', name: 'Activé' }, { value: 'disabled', name: 'Désactivé' }] },
    { key: 'search', name: 'Rechercher', type: 'input', value: _.get(window.location, 'hash', '').substring(1), fields: ['username', 'createdAt', 'updatedAt'] }
  ]
  const rows = _.get(props, 'administrators', []).map(administrator => {

    /*const handlePositionClick = () => {
      const location = _.get(client, 'address.location')
      if (location) {
        const mapLocation = <Map className='w400 h250' zoom={13} {...location} />
        dialog.open(mapLocation, false)
      }
    }*/
    console.log(administrator)
    const openPermissionsForm = () => {
      const permissionsForm = <PermissionsForm
        permissions={administrator.permissions}
        close={dialog.close}
        updateAdminPermissions={(permissions) => props.updateAdminPermissions(administrator.id, permissions)} />
      dialog.open(permissionsForm)
    }
    return {
      username: { value: administrator.username, render: <div className='adm-adminCell'>{administrator.username}</div> },
      createdAt: { value: administrator.createdAt ? moment(administrator.createdAt).format('DD/MM/YYYY HH:mm') : '', render: <div className='adm-dateCell'>{administrator.createdAt ? moment(administrator.createdAt).format('DD/MM/YYYY HH:mm') : '----'}</div> },
      updatedAt: { value: administrator.updatedAt ? moment(administrator.updatedAt).format('DD/MM/YYYY HH:mm') : '', render: <div className='adm-dateCell'>{administrator.updatedAt ? moment(administrator.updatedAt).format('DD/MM/YYYY HH:mm') : '----'}</div> },
      role: { value: administrator.role, render: <div className='adm-adminCell'>{administrator.role === 'super-admin' ? 'Super-admin' : 'Admin'}</div> },
      status: {
        value: administrator.status,
        render: <div className='adm-detailContainer pointer'>
          <div className='adm-datailTop'>
            <SvgIcon name={administrator.status} />
          </div>
          <div className='adm-clientCell'>
            {administrator.status === 'enabled' ? 'Activé'  : 'Désactivé'}
          </div>
        </div>
      },
      actions :{
        render : <AdminActions administrator={administrator} updateAdminStatus={props.updateAdminStatus}/>
      },
      options: {
        render: 
        <div className='flex row'>
          <Tooltip title="Permissions" placement="top">
            <IconButton
              onClick={openPermissionsForm}>
              <SecurityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Réinitialiser mot de passe" placement="top">
            <IconButton
              onClick={openPermissionsForm}>
              <LockIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      }
    }
  })

  const openAdminForm = () => {
    const adminForm = <AdminForm
      registerAdmin={props.registerAdmin}
      close={dialog.close} />

    dialog.open(adminForm, true)
  }



  return (
    <div className='adm-adminsList brad15 bwhite'>
      <TableList title='Administrateurs'
        subTitle={`${_.get(props, 'administrators.length', '--')} administrateurs(s)`}
        columns={columns}
        rows={rows}
        filters={filters}
        withAddButton={true}
        onAddClick={openAdminForm}
        withRefresh={true}
        onRefresh={props.reload}
        loading={props.loading}
        error={props.error} />
    </div>
  )
}

export default AdminsList;