import React, { useEffect } from 'react';
import ClientsList from 'components/mains/Clients/ClientsList';
import { clientActions } from 'store/actions';
import { connect } from 'react-redux';
import { hooks } from 'functions';
import './Clients.scss';

const Clients = (props) => {
  const clientsRequest = hooks.useRequest()

  useEffect(() => {
    if (!props.clients) {
      loadClients()
    }
    // eslint-disable-next-line
  }, [])

  const loadClients = () => {
    clientsRequest.execute({
      action: props.getClients
    })
  }

  return (
    <div className='Clients relw100'>
      <div className='mar30'>
        <ClientsList clients={props.clients}
          loading={clientsRequest.pending}
          error={clientsRequest.error}
          updateClientStatus={props.updateClientStatus} 
          reload={loadClients}/>
      </div>
    </div>
  )
}

const mapState = (state) => ({
  clients: state.client.clients,
  user : state.auth.user
})

const actionCreators = {
  getClients: clientActions.getClients,
  updateClientStatus: clientActions.updateClientStatus
}

export default connect(mapState, actionCreators)(Clients);