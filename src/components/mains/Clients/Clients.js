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
        {clientsRequest.pending && <div>Chargement en cours...</div>}
        {clientsRequest.error && <div>{clientsRequest.error}</div>}
        {!clientsRequest.pending && props.clients &&
          <ClientsList clients={props.clients}
            activateClientAccount={props.activateClientAccount} />
        }
      </div>
    </div>
  )
}

const mapState = (state) => ({
  clients: state.client.clients
})

const actionCreators = {
  getClients: clientActions.getClients,
  activateClientAccount: clientActions.activateClientAccount
}

export default connect(mapState, actionCreators)(Clients);