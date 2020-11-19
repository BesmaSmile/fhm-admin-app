import React, { useEffect, useState } from 'react';
import foodImage from 'assets/img/food.jpg';
import { Select, MenuItem, CircularProgress, FormControl, InputLabel } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { clientActions } from 'store/actions';
import { connect } from 'react-redux';
import { hooks } from 'functions';
import _ from 'lodash';
import DateChart from 'components/misc/DateChart/DateChart';
import StatusChart from 'components/misc/StatusChart/StatusChart';
import './Dashboard.scss';

const CountCard = props => {
  const { count, pending, title, icon, color } = props
  return (
    <div className="db-chartContainer w150 flex row jcsb aic pad20" style={{backgroundColor : color}}>
      {icon}
      <div className='flex col aic aife fs30 medium cwhite'>
        <div className='h30'>
          {pending && <CircularProgress size={25} />}
          {!pending && count && <span>{count}</span>}
        </div>
        <div className='mart10 fs12 cwhite extralight txtar'>{title}</div>
      </div>
    </div>
  )
}
const Dashboard = props => {
  const clientsRequest = hooks.useRequest()
  const [_filter, _setFilter] = useState("month")
  const { getClients } = props
  let orders = [], clients;
  _.get(props, 'clients', []).forEach(client => {
    orders = [...orders, ..._.get(client, 'orders', []).map(order => ({ ...order, client }))]
  });
  switch (_filter) {
    case 'month':
      clients = _.get(props, 'clients', []).filter(client => client.createdAt.getMonth() === new Date().getMonth())
      orders = orders.filter(order => order.createdAt.getMonth() === new Date().getMonth())
      break;
    case 'year':
      clients = _.get(props, 'clients', []).filter(client => client.createdAt.getFullYear() === new Date().getFullYear())
      orders = orders.filter(order => order.createdAt.getFullYear() === new Date().getFullYear())
      break;
    default :
      clients = props.clients
      break;
  }

  useEffect(() => {
    if (!props.clients) {
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
    { name: 'enabled', label: 'Activé', color: '#4CD89F' },
    { name: 'disabled', label: 'Désactivé', color: '#F66161' },
  ];

  const orderStatus = [
    { name: 'pending', label: 'Nouveau', color: '#ECA64B' },
    { name: 'delivered', label: 'Délivré', color: '#5ED7E3' },
    { name: 'paid', label: 'Payé', color: '#5EE36B' },
  ];

  const filters = [
    { value: 'all', name: 'Tout' },
    { value: 'month', name: 'Mois courrant' },
    { value: 'year', name: 'Année courrante' },
  ]

  return (
    <div className='Dashboard relw100'>
      <div className='mar20'>
        <div className='flex row jcsb'>
          <div className='flex row'>
            <CountCard pending={clientsRequest.pending}
              color='#F4368B'
              count={clients && clients.filter(client => client.status === 'pending').length}
              title='Nouveaux Clients'
              icon={<PeopleAltIcon />} />
            <CountCard pending={clientsRequest.pending}
              color='#DF8D21'
              count={clients && orders.filter(order => order.status === 'pending').length}
              title='Nouvelles commandes'
              icon={<ShoppingCartIcon />} />
            <CountCard pending={clientsRequest.pending}
              color='#AF55BE'
              count={_.get(clients, 'length')}
              title='Total clients'
              icon={<PeopleAltIcon />} />
            <CountCard pending={clientsRequest.pending}
              color='#2CA992'
              count={clients && _.get(orders, 'length')}
              title='Total commandes'
              icon={<ShoppingCartIcon />} />
          </div>
          <Select classes={{ root: 'db-filter' }}
            label="Filtrer"
            onChange={(e) => { _setFilter(e.target.value) }}
            value={_filter}>
            {filters.map(filter => (
              <MenuItem key={filter.value} value={filter.value}>{filter.name}</MenuItem>
            ))}
          </Select>
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
