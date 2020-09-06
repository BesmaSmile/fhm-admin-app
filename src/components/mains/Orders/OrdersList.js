import React, { useEffect } from 'react';
//import avatar from 'assets/img/avatar.png';
import SvgIcon from 'components/misc/SvgIcon/SvgIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Map from 'components/misc/Map/Map';
import TableList from 'components/misc/TableList/TableList';
import { useDialog } from 'components/misc/Dialog/Dialog';
import { useSnackbar } from 'notistack';
import { hooks } from 'functions';
import _ from 'lodash';
import moment from 'moment';
import { Link } from "react-router-dom";
import './Orders.scss';


const OrdersList = (props) => {
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'date', name: 'Date' },
    { key: 'client', name: 'Client' },
    { key: 'phoneNumber', name: 'Téléphone' },
    { key: 'articles', name: 'Articles' }
  ]
  const filters = [
    /*{ key : 'status',name: 'Statut', type: 'select', value: 'all', fields: ['status'], options: [{ value: 'all', name: 'Tout' },{ value: 'active', name: 'Activé' }, { value: 'disabled', name: 'Désactivé' }] },*/
    { key : 'search', name: 'Rechercher', type: 'input', value :_.get(window.location, 'hash', '').substring(1), fields : ['client', 'id', 'phoneNumber'] }
  ]

  const rows = props.orders.map(order => {
    return {
      id: { value: order.id, render: <div className='clt-orderCell'>{order.id}</div> },
      date: { value: order.date, render: <div className='clt-orderCell'>{moment(order.date).format('DD/MM/YYYY')}</div> },
      client: { 
        value: `${order.client.lastname} ${order.client.firstname}`, 
        render: <div className='clt-orderCell'>
          <Link to={{pathname:'/clients', hash: _.get(order.client, 'phoneNumber')}}>
            {order.client.lastname} {order.client.firstname}
          </Link>
        </div> 
      },
      phoneNumber : {
        value: _.get(order.client, 'phoneNumber'),
        render: <div className='clt-orderCell'>{_.get(order.client, 'phoneNumber')}</div>
      },
      articles: { value: order.articles.length, render: <div className='clt-orderCell'>{order.articles.length}</div> }
    }

  })

  return (
    <div className='ord-ordersList brad15 bwhite'>
      <TableList title='Commandes'
        subTitle={`${props.orders.length} commandes(s)`}
        columns={columns}
        rows={rows}
        filters={filters} />
    </div>
  )
}

export default OrdersList;