import React, { useEffect } from 'react';
//import avatar from 'assets/img/avatar.png';
import SvgIcon from 'components/misc/SvgIcon/SvgIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Map from 'components/misc/Map/Map';
import TableList from 'components/misc/TableList/TableList';
import { Button } from '@material-ui/core';
import { useDialog } from 'components/misc/Dialog/Dialog';
import { useSnackbar } from 'notistack';
import { hooks } from 'functions';
import _ from 'lodash';
import moment from 'moment';
import { Link } from "react-router-dom";
import './Orders.scss';


const OrdersList = (props) => {
  const dialog = useDialog()
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'date', name: 'Date' },
    { key: 'status', name: 'Statut' },
    { key: 'delivered', name: 'Livraison' },
    { key: 'paid', name: 'Paiement' },
    { key: 'client', name: 'Client' },
    //{ key: 'phoneNumber', name: 'Téléphone' },
    //{ key: 'articles', name: 'Articles' },
    { key: 'mount', name: 'Montant' },
    { key: 'action', name: 'Actions' },
    
  ]
  const filters = [
    { key : 'status',name: 'Statut', type: 'select', value: 'all', fields: ['status'], options: [{ value: 'all', name: 'Tout' },{ value: 'pending', name: 'Nouveau' }, { value: 'delivered', name: 'Livré' },{ value: 'paid', name: 'Payé' } ] },
    { key : 'search', name: 'Rechercher', type: 'input', value :_.get(window.location, 'hash', '').substring(1), fields : ['client', 'id', 'phoneNumber', 'date', 'delivered', 'paid'] }
  ]

  const rows = props.orders.map(order => {
    const status=order.paid ? 'paid' : (order.delivered ? 'delivered' : 'pending')
    const updateOrderStatusRequest = hooks.useRequest()

    const approveDelivery=()=>{
      dialog.openConfirmation({
        title: "Approuver la livraison",
        message: "Voulez vous approuver la livraison de la commande ?",
        yesText: "Oui",
        noText: "Non"
      }).then(() => {
        updateOrderStatusRequest.execute({
          action: () => props.updateOrderStatus(order.client.id, order.id, 'delivered' ),
          success: () => enqueueSnackbar(`La livraison a bien été approuvée`, { variant: 'success' }),
          failure: (error) => enqueueSnackbar(error, { variant: 'error' }),
        })
      }).catch(error =>{console.log(error); console.log("rejected")})
    }

    const approvePayment=()=>{
      dialog.openConfirmation({
        title: "Approuver le paiement",
        message: "Voulez vous approuver le paiement de la commande ?",
        yesText: "Oui",
        noText: "Non"
      }).then(() => {
        updateOrderStatusRequest.execute({
          action: () => props.updateOrderStatus(order.client.id, order.id, 'paid' ),
          success: () => enqueueSnackbar(`Le paiement a bien été approuvé`, { variant: 'success' }),
          failure: (error) => enqueueSnackbar(error, { variant: 'error' }),
        })
      }).catch(error =>{console.log(error); console.log("rejected")})
    }

    
    return {
      id: { value: order.id, render: <div className='clt-orderCell'>{order.id}</div> },
      date: { value: moment(order.date).format('DD/MM/YYYY HH:mm'), render: <div className='clt-dateCell'>{moment(order.date).format('DD/MM/YYYY HH:mm')}</div> },
      status : {
        value : order.status,
        render : <div className='clt-orderCell'>{order.status==='paid' ? <span className='cgreen'>Payé</span> : (order.status==='delivered' ? <span className='corange'>Livré</span> : <span className='cblue'>Nouveau</span>)}</div>
      },
      delivered:{
        value: order.delivered ? moment(order.delivered).format('DD/MM/YYYY HH:mm') : '', 
        render: <div className='clt-dateCell'>{order.delivered ? moment(order.delivered).format('DD/MM/YYYY HH:mm') : '---'}</div> 
      },
      paid:{value: order.paid ? moment(order.paid).format('DD/MM/YYYY HH:mm') : '', render: <div className='clt-dateCell'>{order.paid ? moment(order.paid).format('DD/MM/YYYY HH:mm') :'----'}</div> },
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
      //articles: { value: order.articles.length, render: <div className='clt-orderCell'>{order.articles.length}</div> },
      mount : {value : order.mount, render : <div className='clt-orderCell'>{order.mount} DA</div> },
      action : {render : order.status!='paid' ? <Button disabled={updateOrderStatusRequest.pending} variant="contained" classes={{root : order.status=='pending' ? 'clt-deliveryButton' : 'clt-paymentButton'}} onClick={order.status==='pending' ? approveDelivery : approvePayment}>{order.status=='pending' ? 'Approuver livraison' :'Approuver paiement'} </Button>:''}
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