import React, {useEffect, useState} from 'react';
import Clients_List from 'components/mains/Clients/Clients_List';
import {clientActions} from 'store/actions';
import {connect} from 'react-redux';

import './Clients.scss';

const Clients=(props)=>{
  const [_pending, _setPending]=useState(true)
  const [_error, _setError]=useState()

  useEffect(()=>{
    if(!props.clients){
      loadClients()
    }
    else _setPending(false)
  }, [])

  const loadClients=()=>{
    _setPending(true)
    _setError()
    props.getClients().then((clients)=>{
      _setPending(false)
    }).catch(error=>{
      _setPending(false)
      _setError(error)
    })
  }

  const clientWithOrders=props.clients && props.clients.map(client=>({
    ...client,
    orders : props.orders[client.id]
  }))
  return (
    <div className='Clients relw100'>
      <div className='mar30'>
        {_pending && <div>Chargement en cours...</div>}
        {_error && <div>{_error}</div> }
        {!_pending && props.clients && 
          <Clients_List clients={clientWithOrders} 
            activateClientAccount={props.activateClientAccount}
            getClientOrders={props.getClientOrders}/>
        }
      </div>
    </div>
  )
}

const mapState=(state)=> ({
  clients : state.client.clients,
  orders : state.client.orders
})

const actionCreators = {
  getClients: clientActions.getClients,
  activateClientAccount : clientActions.activateClientAccount,
  getClientOrders : clientActions.getClientOrders,

}

export default connect(mapState,actionCreators)(Clients);