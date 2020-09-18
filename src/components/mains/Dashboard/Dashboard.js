import React, { useEffect, useState } from 'react';
import foodImage from 'assets/img/food.jpg';
import CircularProgress from '@material-ui/core/CircularProgress';
import { clientActions } from 'store/actions';
import { connect } from 'react-redux';
import { hooks } from 'functions';
import _ from 'lodash';
import DateChart from 'components/misc/DateChart/DateChart';
import StatusChart from 'components/misc/StatusChart/StatusChart';
import './Dashboard.scss';

const CountCard = props => {
  const { count, pending, title } = props
  return (
    <div className='db-chartContainer w100 flex col aic pad20'>
      <div className='f1 flex aic jcc fs30 bold cblue'>
        <div className='h50 flex jcc aic'>{pending && <CircularProgress size={30} />}</div>
        <div className='mart10'>{!pending && count && <span>{count}</span>}</div>
      </div>

      <div className='fs16 cstronggrey extralight'>{title}</div>
    </div>
  )
}
const Dashboard = props => {
  const clientsRequest = hooks.useRequest()
  const [_filter, _setFilter] = useState("month")
  const { clients, getClients } = props
  let orders = []
  _.get(props, 'clients', []).forEach(client => {
    orders = [...orders, ..._.get(client, 'orders', []).map(order => ({ ...order, client }))]
  });

  useEffect(() => {
    if (!clients) {
      loadClients()
    }
    // eslint-disable-next-line
  }, [])

  const loadClients = () => {
    clientsRequest.execute({
      action: getClients
    })
  }

  const clientStatus = [
    { name: 'pending', label: 'Nouveau', color: '#9FA1AA' },
    { name: 'enabled', label: 'Activé', color: 'rgb(21, 190, 49)' },
    { name: 'disabled', label: 'Désactivé', color: 'rgb(245, 45, 10)' },
  ];

  const orderStatus = [
    { name: 'pending', label: 'Nouveau', color: 'orange' },
    { name: 'delivered', label: 'Délivré', color: 'rgb(68, 170, 218)' },
    { name: 'paid', label: 'Payé', color: 'rgb(21, 190, 49)' },
  ];

  return (
    <div className='Dashboard relw100'>
      <div className='mar20'>
        <div className='flex row'>
          <CountCard pending={clientsRequest.pending} count={_.get(clients, 'length')} title='Clients' />
          <CountCard pending={clientsRequest.pending} count={clients && _.get(orders, 'length')} title='Commandes' />
        </div>
        <div className='flex col'>
          <div className='flex row jcsb'>
            <div className='relw50'><div className='db-chartContainer'><StatusChart elements={clients || []} title='Clients' status={clientStatus} /></div></div>
            <div className='relw50'><div className='db-chartContainer'><StatusChart elements={orders || []} title='Commandes' status={orderStatus} /></div></div>
          </div>
          <div className='db-chartContainer'><DateChart filter={_filter} elements={clients || []} title="Clients" /></div>
          <div className='db-chartContainer'><DateChart filter={_filter} elements={orders || []} title="Commandes" /></div>
          
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  clients: state.client.clients,
})

const actionCreators = {
  getClients: clientActions.getClients
}

export default connect(mapState, actionCreators)(Dashboard);
