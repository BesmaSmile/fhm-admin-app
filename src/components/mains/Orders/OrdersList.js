import React, { useRef } from 'react';
import TableList from 'components/misc/TableList/TableList';
import OrderDetails from 'components/misc/OrderDetails/OrderDetails';
import PrintForm from 'components/misc/PrintForm/PrintForm';
import { ButtonWrapper } from 'components/misc/PermissionWrappers/PermissionWrappers';
import { permissionConstants } from 'consts';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PrintIcon from '@material-ui/icons/Print';
import { useDialog } from 'components/misc/Dialog/Dialog';
import { useSnackbar } from 'notistack';
import { hooks } from 'functions';
import _ from 'lodash';
import {format} from 'date-fns';
import { Link } from "react-router-dom";
import './Orders.scss';

const OrderActions = props => {
  const { order, updateOrderStatus } = props
  const dialog = useDialog()
  const { enqueueSnackbar } = useSnackbar();
  const updateOrderStatusRequest = hooks.useRequest()

  const approveDelivery = () => {
    dialog.openConfirmation({
      title: "Approuver la livraison",
      message: "Voulez vous approuver la livraison de la commande ?",
      yesText: "Oui",
      noText: "Non"
    }).then(() => {
      updateOrderStatusRequest.execute({
        action: () => updateOrderStatus(order.client.id, order.id, 'delivered'),
        success: () => enqueueSnackbar(`La livraison a bien été approuvée`, { variant: 'success' }),
        failure: (error) => enqueueSnackbar(error.message, { variant: 'error' }),
      })
    }).catch(error => { console.log("rejected") })
  }

  const approvePayment = () => {
    dialog.openConfirmation({
      title: "Approuver le paiement",
      message: "Voulez vous approuver le paiement de la commande ?",
      yesText: "Oui",
      noText: "Non"
    }).then(() => {
      updateOrderStatusRequest.execute({
        action: () => props.updateOrderStatus(order.client.id, order.id, 'paid'),
        success: () => enqueueSnackbar(`Le paiement a bien été approuvé`, { variant: 'success' }),
        failure: (error) => enqueueSnackbar(error.message, { variant: 'error' }),
      })
    }).catch(error => { console.log("rejected") })
  }
  return (
    <ButtonWrapper
      neededPermission={order.status === 'pending' ? permissionConstants.APPROVE_DELIVERY : permissionConstants.APPROVE_PAYMENT}
      button={(disabled) => <Button
        disabled={disabled || updateOrderStatusRequest.pending}
        variant="outlined"
        classes={{ root: order.status === 'pending' ? 'od-deliveryButton' : 'od-paymentButton' }}
        onClick={order.status === 'pending' ? approveDelivery : approvePayment}>
        {order.status === 'pending' ? 'Approuver livraison' : 'Approuver paiement'}
      </Button>}
    />
  )
}
const OrdersList = (props) => {
  const dialog = useDialog()
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'createdAt', name: 'Créée le' },
    { key: 'status', name: 'Statut' },
    { key: 'deliveredAt', name: 'Livrée le' },
    { key: 'paidAt', name: 'Payée le' },
    { key: 'client', name: 'Client' },
    //{ key: 'phoneNumber', name: 'Téléphone' },
    //{ key: 'articles', name: 'Articles' },
    { key: 'mount', name: 'Montant' },
    { key: 'actions', name: 'Actions' },
    { key: 'options', name: 'Options' },

  ]
  const filters = [
    { key: 'status', name: 'Statut', type: 'select', value: 'all', fields: ['status'], options: [{ value: 'all', name: 'Tout' }, { value: 'pending', name: 'Nouveau' }, { value: 'delivered', name: 'Livré' }, { value: 'paid', name: 'Payé' }] },
    { key: 'search', name: 'Rechercher', type: 'input', value: _.get(window.location, 'hash', '').substring(1), fields: ['client', 'id', 'phoneNumber', 'createdAt', 'deliveredAt', 'paidAt'] }
  ]

  const mypage = useRef()

  const rows = _.get(props, 'orders', []).map(order => {

    const openOrder = () => {
      const orderDetails = <OrderDetails order={order} />
      dialog.open(orderDetails)
    }

    const openPrintForm = () => {
      const printForm = <PrintForm order={order} close={dialog.close} />
      dialog.open(printForm)
    }

    return {
      id: { value: order.id, render: <div className='od-orderCell'>{order.id}</div> },
      createdAt: { value: format(order.createdAt,'dd/MM/yyyy'), render: <div className='od-dateCell'>{format(order.createdAt,'dd/MM/yyyy')}</div> },
      status: {
        value: order.status,
        render: <div className='od-statusCell'>{order.status === 'paid' ? <div className='bgreen'>Payé</div> : (order.status === 'delivered' ? <div className='blightblue'>Livré</div> : <div className='borange'>Nouveau</div>)}</div>
      },
      deliveredAt: {
        value: order.deliveredAt ? format(order.deliveredAt,'dd/MM/yyyy') : '',
        render: <div className='od-dateCell'>{order.deliveredAt ? format(order.deliveredAt,'dd/MM/yyyy') : '---'}</div>
      },
      paidAt: { value: order.paidAt ? format(order.paidAt,'dd/MM/yyyy') : '', render: <div className='od-dateCell'>{order.paidAt ? format(order.paidAt,'dd/MM/yyyy') : '----'}</div> },
      client: {
        value: `${order.client.lastname} ${order.client.firstname}`,
        render: <div className='od-orderCell'>
          <Link to={{ pathname: '/clients', hash: _.get(order.client, 'phoneNumber') }}>
            {order.client.lastname} {order.client.firstname}
          </Link>
        </div>
      },
      phoneNumber: {
        value: _.get(order.client, 'phoneNumber'),
        render: <div className='od-orderCell'>{_.get(order.client, 'phoneNumber')}</div>
      },
      //articles: { value: order.articles.length, render: <div className='od-orderCell'>{order.articles.length}</div> },
      mount: { value: order.mount, render: <div className='od-orderCell'>{order.mount} DA</div> },
      actions: { render: order.status !== 'paid' ? <OrderActions order={order} updateOrderStatus={props.updateOrderStatus} /> : '' },
      options: {
        render:

          <div className='flex row'>
            <Tooltip title="Ouvrir" placement="top">
              <IconButton 
                onClick={openOrder}>
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Imprimer" placement="top">
              <IconButton
                onClick={openPrintForm}>
                <PrintIcon fontSize="small" />
              </IconButton>
            </Tooltip>

          </div>
      }
    }

  })

  return (
    <div className='ord-ordersList brad15 bwhite' ref={mypage}>
      <TableList title='Commandes'
        subTitle={`${_.get(props, 'orders.length', '--')} commandes(s)`}
        columns={columns}
        rows={rows}
        filters={filters}
        withRefresh={true}
        onRefresh={props.reload}
        loading={props.loading}
        error={props.error} />

    </div>
  )
}

export default OrdersList;