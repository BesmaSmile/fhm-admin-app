import React, { useEffect } from 'react';
import OrdersList from 'components/mains/Orders/OrdersList';
import { connect } from 'react-redux';
import { hooks } from 'functions';
import { clientActions } from 'store/actions';
import _ from 'lodash';
import './Orders.scss';

const Orders=(props)=>{
  const clientsRequest = hooks.useRequest()
  let orders=[]
  _.get(props, 'clients', []).forEach(client => {
    orders=[...orders, ...client.orders]
  });

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
    <div className='Orders relw100'>
      <div className='mar30'>
        {clientsRequest.pending && <div>Chargement en cours...</div>}
        {clientsRequest.error && <div>{clientsRequest.error}</div>}
        {!clientsRequest.pending && props.clients &&
          <OrdersList orders={orders} />
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
  activateClientAccount: clientActions.activateClientAccount,
}

export default connect(mapState, actionCreators)(Orders);