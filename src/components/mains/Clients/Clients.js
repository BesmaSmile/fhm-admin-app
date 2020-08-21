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

  const clientWithOrders = props.clients && props.clients.map(client => ({
    ...client,
    orders: props.orders[client.id]
  }))
  return (
    <div className='Clients relw100'>
      <div className='mar30'>
        {clientsRequest.pending && <div>Chargement en cours...</div>}
        {clientsRequest.error && <div>{clientsRequest.error}</div>}
        {!clientsRequest.pending && props.clients &&
          <ClientsList clients={clientWithOrders}
            activateClientAccount={props.activateClientAccount}
            getClientOrders={props.getClientOrders} />
        }
      </div>
    </div>
  )
}

const mapState = (state) => ({
  clients: state.client.clients,
  orders: state.client.orders
})

const actionCreators = {
  getClients: clientActions.getClients,
  activateClientAccount: clientActions.activateClientAccount,
  getClientOrders: clientActions.getClientOrders,

}

export default connect(mapState, actionCreators)(Clients);