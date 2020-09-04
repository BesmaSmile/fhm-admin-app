import React, {useEffect} from 'react';
//import avatar from 'assets/img/avatar.png';
import SvgIcon from 'components/misc/SvgIcon/SvgIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Map from 'components/misc/Map/Map';
import TableList from 'components/misc/TableList/TableList';
import {useDialog} from 'components/misc/Dialog/Dialog';
import { useSnackbar } from 'notistack';
import { hooks } from 'functions';
import  _ from 'lodash'; 
import './Clients.scss';


const ClientsList=(props)=>{

  const dialog=useDialog()
  const { enqueueSnackbar } = useSnackbar();
  const columns=[
    {key : 'lastname', name: 'Nom'},
    {key : 'firstname', name:'Prénom'},
    {key : 'restaurant', name:'Restaurant'},
    {key : 'phoneNumber', name:'Téléphone'},
    {key : 'address', name:'Adresse'},
    {key : 'orders', name:'Commandes'},
    {key : 'status', name:'Statut'},
  ]

  const raws=props.clients.map(client=>{
    const province=_.get(client, 'address.province')
    const municipality=_.get(client, 'address.municipality')
    const city = (province || municipality) && `${province ? province+',' : ''} ${municipality}`   
    const activateAccountRequest = hooks.useRequest()
    
    const toggleAccount=()=>{
      const active=!client.active
      activateAccountRequest.execute({
        action : ()=> props.activateClientAccount(client.id,active),
        success : ()=>enqueueSnackbar(`Le compte du client a bien été ${active ? 'activé' : 'désactivé'} !`, { variant: 'success' }),
        failure : (error)=>enqueueSnackbar(error, { variant: 'error' }),
      })
    }
  
    const handleAccountClick=()=>{
      if(client.active){
        dialog.openConfirmation({
          title : "Désactiver le compte du client",
          message : "Voulez vous désactiver le compte d'un client ?",
          yesText : "Oui",
          noText : "Non"
        }).then(()=>{
          toggleAccount()
        }).catch(error=>console.log("rejected"))
      }
      else toggleAccount()
    }
  
    const handlePositionClick=()=>{
      const location=_.get(client, 'address.location')
      if(location){
        const mapLocation=<Map className='w400 h250' zoom={13} {...location}/>
        dialog.open(mapLocation, false)
      } 
    }
    return{
      lastname : <div className='clt-clientCell'>{client.lastname}</div>,
      firstname : <div className='clt-clientCell'>{client.firstname}</div>,
      restaurant : <div className='clt-clientCell'>{client.restaurant || '--------'}</div>,
      phoneNumber:<div className='clt-clientCell'>{client.phoneNumber}</div>,

      address : <div className={`clt-detailContainer ${_.get(client, 'address.location') ? 'pointer' :''}`} onClick={handlePositionClick}>
                  <div className='clt-datailTop'><SvgIcon name='mapLocation' color={_.get(client, 'address.location') ? 'var(--green)' : 'var(--lightgrey)'}/></div>
                  <div className='clt-clientCell'> {city} </div>
                </div>,
      orders : <div className='clt-detailContainer'>
                <div className='clt-datailTop fs25 lh25 bold cgreen'>{client.orders && client.orders.length}</div>
                <div className='clt-clientCell'>Commandes</div>
              </div>,
      status :<div className='clt-detailContainer pointer' onClick={handleAccountClick}>
                <div className='clt-datailTop'>
                  {!activateAccountRequest.pending &&<SvgIcon name={client.active ? 'valid' : 'invalid'}/>}
                  {activateAccountRequest.pending && <CircularProgress size={20}/>}
                </div>

                <div className='clt-clientCell'>
                {!activateAccountRequest.pending && client.active && 'Activé'}
                {!activateAccountRequest.pending && !client.active && 'Désactivé'}
                {activateAccountRequest.pending  && 'En cours...'}
                </div>
              </div>
    } 

  })

  return(
    <div className='clt-clientsList brad15 bwhite'>
      <TableList title='Clients' 
        subTitle={`${props.clients.length} client(s)`}
        columns={columns}
        raws={raws}/>
    </div>
  )
}

export default ClientsList;