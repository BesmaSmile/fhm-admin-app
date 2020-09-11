import React, { useEffect } from 'react';
//import avatar from 'assets/img/avatar.png';
import SvgIcon from 'components/misc/SvgIcon/SvgIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Map from 'components/misc/Map/Map';
import TableList from 'components/misc/TableList/TableList';
import { Link } from "react-router-dom";
import { useDialog } from 'components/misc/Dialog/Dialog';
import { useSnackbar } from 'notistack';
import { hooks } from 'functions';
import moment from 'moment';
import _ from 'lodash';
import './Clients.scss';

const AccountStatus=props=>{
  const {client, updateClientStatus}=props
  const { enqueueSnackbar } = useSnackbar();
  const dialog = useDialog()
  const updateClientStatusRequest = hooks.useRequest()

    const toggleAccount = () => {
      const status = client.status==='pending' || client.status==='disabled' ? 'enabled' : 'disabled'
      updateClientStatusRequest.execute({
        action: () => updateClientStatus(client.id, status),
        success: () => enqueueSnackbar(`Le compte du client a bien été ${status==='enabled' ? 'activé' : 'désactivé'} !`, { variant: 'success' }),
        failure: (error) => enqueueSnackbar(error, { variant: 'error' }),
      })
    }

    const handleAccountClick = () => {
      if (client.status==='enabled') {
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
  return(
    <div className='clt-detailContainer pointer' onClick={handleAccountClick}>
      <div className='clt-datailTop'>
        {!updateClientStatusRequest.pending && <SvgIcon name={client.status==='enabled' ? 'valid' : 'invalid'} />}
        {updateClientStatusRequest.pending && <CircularProgress size={20} />}
      </div>
      <div className='clt-clientCell'>
        {!updateClientStatusRequest.pending && client.status==='enabled' && 'Activé'}
        {!updateClientStatusRequest.pending && client.status==='disabled' && 'Désactivé'}
        {!updateClientStatusRequest.pending && client.status==='pending' && 'Nouveau'}
        {updateClientStatusRequest.pending && 'En cours...'}
      </div>
    </div>
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
    { key: 'status', name: 'Statut' },
    { key: 'orders', name: 'Commandes' },
    
  ]
  const filters = [
    { key : 'status',name: 'Statut', type: 'select', value: 'all', fields: ['status'], options: [{ value: 'all', name: 'Tout' },{ value: 'pending', name: 'Nouveau' }, { value: 'enabled', name: 'Activé' }, { value: 'disabled', name: 'Désactivé' }] },
    { key : 'search', name: 'Rechercher', type: 'input', value :_.get(window.location, 'hash', '').substring(1), fields : ['lastname', 'firstname', 'restaurant', 'phoneNumber', 'address', 'createdAt'] }
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
      createdAt: { value: moment(client.createdAt).format('DD/MM/YYYY HH:mm') , render: <div className='clt-clientCell'>{moment(client.createdAt).format('DD/MM/YYYY HH:mm')}</div> },
      updatedAt:  { value: client.updatedAt ? moment(client.updatedAt).format('DD/MM/YYYY HH:mm') : '', render: <div className='clt-clientCell'>{client.updatedAt ?  moment(client.updatedAt).format('DD/MM/YYYY HH:mm') : ''}</div> },
      restaurant: { value: client.restaurant, render: <div className='clt-clientCell'>{client.restaurant || '----'}</div> },
      phoneNumber: { value: client.phoneNumber, render: <div className='clt-clientCell'>{client.phoneNumber}</div> },

      address: {
        value: city,
        render: <div className={`clt-detailContainer ${_.get(client, 'address.location') ? 'pointer' : ''}`} onClick={handlePositionClick}>
          <div className='clt-datailTop'><SvgIcon name='mapLocation' color={_.get(client, 'address.location') ? 'var(--green)' : 'var(--lightgrey)'} /></div>
          <div className='clt-clientCell'> {city} </div>
        </div>
      },
      status: {
        value: client.status,
        render: <AccountStatus client={client} updateClientStatus={props.updateClientStatus}/>
      },
      orders: {
        value: client.orders.length,
        render: <Link to={{pathname:'/commandes', hash:client.phoneNumber}}>
        <div className='clt-detailContainer'>
          <div className='clt-datailTop fs25 lh25 bold cgreen'>{client.orders && client.orders.length}</div>
          <div className='clt-clientCell'>Commandes</div>
        </div></Link>
      },
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