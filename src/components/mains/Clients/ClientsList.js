import React from 'react';
//import avatar from 'assets/img/avatar.png';
import SvgIcon from 'components/misc/SvgIcon/SvgIcon';
import Map from 'components/misc/Map/Map';
import TableList from 'components/misc/TableList/TableList';
import {ButtonWrapper} from 'components/misc/PermissionWrappers/PermissionWrappers';
import {permissionConstants} from 'consts';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import { useDialog } from 'components/misc/Dialog/Dialog';
import { useSnackbar } from 'notistack';
import { hooks } from 'functions';
import {format} from 'date-fns';
import _ from 'lodash';
import './Clients.scss';

const ClientActions = props => {
  const { client, updateClientStatus } = props
  const { enqueueSnackbar } = useSnackbar();
  const dialog = useDialog()
  const updateClientStatusRequest = hooks.useRequest()

  const toggleAccount = () => {
    const status = client.status === 'pending' || client.status === 'disabled' ? 'enabled' : 'disabled'
    updateClientStatusRequest.execute({
      action: () => updateClientStatus(client.id, status),
      success: () => enqueueSnackbar(`Le compte du client a bien été ${status === 'enabled' ? 'activé' : 'désactivé'} !`, { variant: 'success' }),
      failure: (error) => enqueueSnackbar(error.message, { variant: 'error' }),
    })
  }

  const handleClick = () => {
    if (client.status === 'enabled') {
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
  return (
    <ButtonWrapper 
      neededPermission={permissionConstants.TOGGLE_CLIENT_ACCOUNT}
      button={(disabled)=><Button
        disabled={disabled || updateClientStatus.pending}
        variant="outlined" 
        size="small"
        classes={{ root: client.status === 'enabled' ? 'clt-disableButton' : 'clt-enableButton' }}
        onClick={handleClick}>
        {client.status === 'enabled' ? 'Désactiver' : 'Activer'}
      </Button>}
      />
    
  )
}

const ClientsList = (props) => {

  const dialog = useDialog()
  const columns = [
    { key: 'lastname', name: 'Nom' },
    { key: 'firstname', name: 'Prénom' },
    { key: 'createdAt', name: 'Créé le' },
    { key: 'updatedAt', name: 'Modifié le' },
    { key: 'restaurant', name: 'Restaurant' },
    { key: 'phoneNumber', name: 'Téléphone' },
    { key: 'address', name: 'Adresse' },
    { key: 'orders', name: 'Commandes' },
    { key: 'status', name: 'Statut' },
    { key: 'actions', name: 'actions' },


  ]
  const filters = [
    { key: 'status', name: 'Statut', type: 'select', value: 'all', fields: ['status'], options: [{ value: 'all', name: 'Tout' }, { value: 'pending', name: 'Nouveau' }, { value: 'enabled', name: 'Activé' }, { value: 'disabled', name: 'Désactivé' }] },
    { key: 'search', name: 'Rechercher', type: 'input', value: _.get(window.location, 'hash', '').substring(1), fields: ['lastname', 'firstname', 'restaurant', 'phoneNumber', 'address', 'createdAt'] }
  ]

  const rows = _.get(props, 'clients', []).map(client => {
    const province = _.get(client, 'address.province')
    const municipality = _.get(client, 'address.municipality')
    const city = (province || municipality) && `${province ? province + ',' : ''} ${municipality}`


    const handlePositionClick = () => {
      const location = _.get(client, 'address.location')
      if (location) {
        const mapLocation = <Map className='w400 h250' zoom={13} {...location} />
        dialog.open(mapLocation, false)
      }
    }
    return {
      lastname: { value: client.lastname, render: <div className='clt-clientCell'>{client.lastname}</div> },
      firstname: { value: client.firstname, render: <div className='clt-clientCell'>{client.firstname}</div> },
      createdAt: { value: format(client.createdAt,'dd/MM/yyyy'), render: <div className='clt-dateCell'>{format(client.createdAt,'dd/MM/yyyy')}</div> },
      updatedAt: { value: client.updatedAt ? format(client.updatedAt,'dd/MM/yyyy') : '', render: <div className='clt-dateCell'>{client.updatedAt ? format(client.updatedAt,'dd/MM/yyyy') : ''}</div> },
      restaurant: { value: client.restaurant, render: <div className='clt-clientCell'>{client.restaurant || '----'}</div> },
      phoneNumber: { value: client.phoneNumber, render: <div className='clt-clientCell'>{client.phoneNumber}</div> },

      address: {
        value: city,
        render: <div className={`clt-detailContainer ${_.get(client, 'address.location') ? 'pointer' : ''}`} onClick={handlePositionClick}>
          <div className='clt-datailTop'><SvgIcon name='mapLocation' color={_.get(client, 'address.location') ? 'var(--green)' : 'var(--lightgrey)'} /></div>
          <div className='clt-clientCell'> {city} </div>
        </div>
      },
      orders: {
        value: client.orders.length,
        render: <Link to={{ pathname: '/commandes', hash: client.phoneNumber }}>
          <div className='fs25 lh25 bold txtac'>{client.orders && client.orders.length}</div>
        </Link>
      },
      status: {
        value: client.status,
        render: <div className='clt-detailContainer'>
          <div className='clt-datailTop'>
            <SvgIcon name={client.status} />
          </div>
          <div className='clt-clientCell'>
            {client.status === 'enabled' && 'Activé'}
            {client.status === 'disabled' && 'Désactivé'}
            {client.status === 'pending' && 'Nouveau'}
          </div>
        </div>
      },
      actions: {
        render: <ClientActions client={client} updateClientStatus={props.updateClientStatus} />
      }

    }

  })

  return (
    <div className='clt-clientsList brad15 bwhite'>
      <TableList title='Clients'
        subTitle={`${_.get(props, 'clients.length', '--')} client(s)`}
        columns={columns}
        rows={rows}
        filters={filters}
        withRefresh={true}
        onRefresh={props.reload}
        loading={props.loading}
        error={props.error} />
    </div>
  )
}

export default ClientsList;