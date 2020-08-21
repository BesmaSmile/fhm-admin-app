import React, {useEffect, useState} from 'react';
//import avatar from 'assets/img/avatar.png';
import SvgIcon from 'components/misc/SvgIcon/SvgIcon';
//import {clientService} from 'services';
import './Clients.scss';

const ClientCard=(props)=>{
  const {client, activateClientAccount, getClientOrders}=props
  const [_activatePending, _setActivatePending]=useState()

  useEffect(()=>{
    getClientOrders(client.id).then(orders=>{
      console.log(orders)
    })
    // eslint-disable-next-line
  }, [])

  const toogleAccount=()=>{
    _setActivatePending(true)
    activateClientAccount(client.id,!client.active).then(()=>{
      _setActivatePending(false)
    })
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
          <div className='clt-detailContainer pointer' onClick={toogleAccount}>
            <div className='clt-datailTop'><SvgIcon name={client.active ? 'valid' : 'invalid'}/></div>
            <div className='clt-datailText'>
            {!_activatePending && client.active && 'Activé'}
            {!_activatePending && !client.active && 'Désactivé'}
            {_activatePending  && 'En cours...'}
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