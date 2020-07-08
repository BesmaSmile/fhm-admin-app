import React, {useEffect, useState} from 'react';
import ClientsList from 'components/mains/Clients/ClientsList';
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

  return (
    <div className='Clients relw100'>
      <div className='mar30'>
        {_pending && <div>Chargement en cours...</div>}
        {_error && <div>{_error}</div> }
        {!_pending && props.clients && 
          <ClientsList clients={props.clients} 
            activateClientAccount={props.activateClientAccount}/>
        }
      </div>
    </div>
  )
}

const mapState=(state)=> ({
  clients : state.client.clients
})

const actionCreators = {
  getClients: clientActions.getClients,
  activateClientAccount : clientActions.activateClientAccount

}

export default connect(mapState,actionCreators)(Clients);