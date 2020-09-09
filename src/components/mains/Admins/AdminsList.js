import React from 'react';
import TableList from 'components/misc/TableList/TableList';
import AdminForm from 'components/misc/AdminForm/AdminForm';
import { Link } from "react-router-dom";
import { useDialog } from 'components/misc/Dialog/Dialog';
import { useSnackbar } from 'notistack';
import { hooks } from 'functions';
import _ from 'lodash';

const AdminsList = (props) => {

  const dialog = useDialog()
  const { enqueueSnackbar } = useSnackbar();
  const columns = [
    { key: 'username', name: "Nom d'utilisateur" },
    { key: 'role', name: "Rôle" }
  ]
  const filters = [
    { key : 'role',name: 'Rôle', type: 'select', value: 'all', fields: ['role'], options: [{ value: 'all', name: 'Tout' },{ value: 'admin', name: 'Admin' }, { value: 'super-admin', name: 'Super-admin' }] },
    { key : 'status',name: 'Statut', type: 'select', value: 'all', fields: ['status'], options: [{ value: 'all', name: 'Tout' },{ value: 'pending', name: 'Nouveau' }, { value: 'active', name: 'Activé' }, { value: 'disabled', name: 'Désactivé' }] },
    { key : 'search', name: 'Rechercher', type: 'input', value :_.get(window.location, 'hash', '').substring(1), fields : ['username'] }
  ]

  const rows = props.administrators.map(administrator => {
  
    //const activateAdminRequest = hooks.useRequest()

    /*const toggleAccount = () => {
      const status = client.status==='pending' || client.status==='disabled' ? 'active' : 'disabled'
      activateAccountRequest.execute({
        action: () => props.updateClientStatus(client.id, status),
        success: () => enqueueSnackbar(`Le compte du client a bien été ${status==='active' ? 'activé' : 'désactivé'} !`, { variant: 'success' }),
        failure: (error) => enqueueSnackbar(error, { variant: 'error' }),
      })
    }

    const handleAccountClick = () => {
      if (client.status==='active') {
        dialog.openConfirmation({
          title: "Désactiver le compte du client",
          message: "Voulez vous désactiver le compte d'un client ?",
          yesText: "Oui",
          noText: "Non"
        }).then(() => {
          toggleAccount()
        }).catch(error => console.log("rejected"))
      }
      else toggleAccount()
    }

    const handlePositionClick = () => {
      const location = _.get(client, 'address.location')
      if (location) {
        const mapLocation = <Map className='w400 h250' zoom={13} {...location} />
        dialog.open(mapLocation, false)
      }
    }*/
    return {
      username: { value: administrator.username, render: <div className='adm-adminCell'>{administrator.username}</div> },   
      role: { value: administrator.role, render: <div className='adm-adminCell'>{administrator.role==='super-admin' ? 'Super-admin' : 'Admin'}</div> },   
    }
  })

  const openAdminForm=()=>{
    const adminForm=<AdminForm
        registerAdmin={props.registerAdmin}
        close={dialog.close} />

    dialog.open(adminForm, true)
  }

  return (
    <div className='clt-adminsList brad15 bwhite'>
      <TableList title='Administrateurs'
        subTitle={`${props.administrators.length} administrateurs(s)`}
        columns={columns}
        rows={rows}
        filters={filters}
        withAddButton={true}
        onAddClick={openAdminForm} />
    </div>
  )
}

export default AdminsList;