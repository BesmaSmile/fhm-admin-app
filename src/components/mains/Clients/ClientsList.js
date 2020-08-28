import React, {useEffect} from 'react';
//import avatar from 'assets/img/avatar.png';
import SvgIcon from 'components/misc/SvgIcon/SvgIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useDialog} from 'components/misc/Dialog/Dialog';
import { useSnackbar } from 'notistack';
import { hooks } from 'functions';
import './Clients.scss';


const ClientCard=(props)=>{
  const {client, activateClientAccount, getClientOrders}=props
  const activateAccountRequest = hooks.useRequest()
  const dialog=useDialog()
  const { enqueueSnackbar } = useSnackbar();

  useEffect(()=>{
    getClientOrders(client.id).then(orders=>{
      console.log(orders)
    })
    // eslint-disable-next-line
  }, [])

  

  const toggleAccount=()=>{
    const active=!client.active
    activateAccountRequest.execute({
      action : ()=> activateClientAccount(client.id,active),
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

  return(
    <div className='clt-clientCard h100 relw100  flex'>
      <div className='flex row mar20 aic relw100'>
        {/*_photoUrl && <img className='h80 w80 marr15' src={_photoUrl} alt=''/>}
        {!_photoUrl && <img className='h80 w80 marr15' src={_photoUrl} alt=''/>*/}
        <div className='flex col marh10'>
          <div className='bold fs18 cstronggrey'>{client.firstname} {client.lastname}</div>
          <div className='fs14 cblue'>{client.restaurant || '--------'}</div>
          <div className='extralight fs12 cstronggrey'>{client.phoneNumber}</div>
        </div>
        <div className='flex row f1 jcfe'>
          <div className='clt-detailContainer'>
            <div className='clt-datailTop'><SvgIcon name='mapLocation' color={client.city ? 'var(--green)' : 'var(--lightgrey)'}/></div>
            <div className='clt-datailText'> {client.city} </div>
          </div>
          <div className='clt-detailContainer'>
            <div className='clt-datailTop fs25 lh25 bold cgreen'>{client.orders && client.orders.length}</div>
            <div className='clt-datailText'>Commandes</div>
          </div>
          <div className='clt-detailContainer pointer' onClick={handleAccountClick}>
            <div className='clt-datailTop'>
              {!activateAccountRequest.pending &&<SvgIcon name={client.active ? 'valid' : 'invalid'}/>}
              {activateAccountRequest.pending && <CircularProgress size={20}/>}
            </div>

            <div className='clt-datailText'>
            {!activateAccountRequest.pending && client.active && 'Activé'}
            {!activateAccountRequest.pending && !client.active && 'Désactivé'}
            {activateAccountRequest.pending  && 'En cours...'}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const ClientsList=(props)=>{
  return(
    <div className='clt-clientsList brad15 bwhite'>
    {props.clients.map((client,i)=>(<ClientCard key={i} 
      client={client} 
      activateClientAccount={props.activateClientAccount}
      getClientOrders={props.getClientOrders}
    />))}
    </div>
  )
}

export default ClientsList;