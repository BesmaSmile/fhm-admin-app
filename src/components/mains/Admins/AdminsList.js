import React from 'react';
import TableList from 'components/misc/TableList/TableList';
import AdminForm from 'components/misc/AdminForm/AdminForm';
import PermissionsForm from 'components/misc/PermissionsForm/PermissionsForm';
import ChangePasswordForm from 'components/misc/ChangePasswordForm/ChangePasswordForm';
import { ButtonWrapper } from 'components/misc/PermissionWrappers/PermissionWrappers';
import { permissionConstants } from 'consts';
import SvgIcon from 'components/misc/SvgIcon/SvgIcon';
import SecurityIcon from '@material-ui/icons/Security';
import LockIcon from '@material-ui/icons/Lock';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { useDialog } from 'components/misc/Dialog/Dialog';
import { useSnackbar } from 'notistack';
import { hooks } from 'functions';
import {format} from 'date-fns';
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
      failure: (error) => enqueueSnackbar(error.message, { variant: 'error' }),
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
    <ButtonWrapper
      neededPermission={permissionConstants.TOGGLE_ADMIN_ACCOUNT}
      button={(disabled) =>
        <Button
          disabled={disabled || updateAdminStatus.pending}
          variant="outlined"
          size="small"
          classes={{ root: administrator.status === 'enabled' ? 'adm-disableButton' : 'adm-enableButton' }}
          onClick={handleClick}>
          {administrator.status === 'enabled' ? 'Désactiver' : 'Activer'}
        </Button>} />
  )
}

const AdminsList = (props) => {

  const dialog = useDialog()
  const columns = [
    { key: 'username', name: "Nom d'utilisateur" },
    { key: 'createdAt', name: "Crée le " },
    { key: 'updatedAt', name: 'Modifié le' },
    { key: 'status', name: "Statut" },
    { key: 'actions', name: "Actions" },
    { key: 'options', name: "Options" }
  ]
  const filters = [
    { key: 'status', name: 'Statut', type: 'select', value: 'all', fields: ['status'], options: [{ value: 'all', name: 'Tout' }, { value: 'enabled', name: 'Activé' }, { value: 'disabled', name: 'Désactivé' }] },
    { key: 'search', name: 'Rechercher', type: 'input', value: _.get(window.location, 'hash', '').substring(1), fields: ['username', 'createdAt', 'updatedAt'] }
  ]

  const openPermissionsForm = (id, permissions) => {
    const permissionsForm = <PermissionsForm
      permissions={permissions}
      close={dialog.close}
      updateAdminPermissions={(permissions) => props.updateAdminPermissions(id, permissions)} />
    dialog.open(permissionsForm)
  }

  const rows = _.get(props, 'administrators', []).map(administrator => {

    /*const handlePositionClick = () => {
      const location = _.get(client, 'address.location')
      if (location) {
        const mapLocation = <Map className='w400 h250' zoom={13} {...location} />
        dialog.open(mapLocation, false)
      }
    }*/



    const openChangePasswordForm = () => {
      const changePasswordForm = <ChangePasswordForm
        close={dialog.close}
        changePassword={(password) => props.changePassword(administrator.id, password)} />
      dialog.open(changePasswordForm)
    }

    return {
      username: { value: administrator.username, render: <div className='adm-adminCell'>{administrator.username}</div> },
      createdAt: { value: administrator.createdAt ? format(administrator.createdAt,'dd/MM/yyyy HH:mm') : '', render: <div className='adm-dateCell'>{administrator.createdAt ? format(administrator.createdAt,'dd/MM/yyyy HH:mm') : '----'}</div> },
      updatedAt: { value: administrator.updatedAt ? format(administrator.updatedAt,'dd/MM/yyyy HH:mm') : '', render: <div className='adm-dateCell'>{administrator.updatedAt ? format(administrator.updatedAt,'dd/MM/yyyy HH:mm') : '----'}</div> },
      status: {
        value: administrator.status,
        render: <div className='adm-detailContainer'>
          <div className='adm-datailTop'>
            <SvgIcon name={administrator.status} />
          </div>
          <div className='adm-clientCell'>
            {administrator.status === 'enabled' ? 'Activé' : 'Désactivé'}
          </div>
        </div>
      },
      actions: {
        render: <AdminActions administrator={administrator} updateAdminStatus={props.updateAdminStatus} />
      },
      options: {
        render:
          <div className='flex row'>
            <ButtonWrapper
              neededPermission={permissionConstants.READ_ADMIN_PERMISSIONS}
              button={(disabled) =>
                <Tooltip title="Permissions" placement="top">
                  <IconButton disabled={disabled}
                    onClick={() => openPermissionsForm(administrator.id, administrator.permissions)}>
                    <SecurityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>} />
            <ButtonWrapper
              neededPermission={permissionConstants.CHANGE_ADMIN_PASSWORD}
              button={(disabled) =>
                <Tooltip title="Changer mot de passe" placement="top">
                  <IconButton disabled={disabled}
                    onClick={openChangePasswordForm}>
                    <LockIcon fontSize="small" />
                  </IconButton>
                </Tooltip>} />
          </div>
      }
    }
  })

  const openAdminForm = () => {
    const adminForm = <AdminForm
      registerAdmin={props.registerAdmin}
      close={dialog.close}
      onSuccess={(id) => openPermissionsForm(id)}
    />

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