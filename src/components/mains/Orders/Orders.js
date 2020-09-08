import React, { useEffect } from 'react';
import OrdersList from 'components/mains/Orders/OrdersList';
import { connect } from 'react-redux';
import { hooks } from 'functions';
import { clientActions, catalogActions, orderActions } from 'store/actions';
import _ from 'lodash';
import './Orders.scss';

const Orders=(props)=>{
  const clientsRequest = hooks.useRequest()

  const calculateTotal = (order) => {
    const total = order.articles.map(article=>{
      const product=props.products.find(product=>product.id===article.id);
      return{
        ...article,
        price : article.delivered ? article.price : (article.imported ? product.importationPrice : product.price)
      }
    }).reduce((article1, article2) => ({ 
      price : article1.price * article1.quantity + article2.price * article2.quantity,
      quantity: 1
    }), { price: 0, quantity: 0 })
    return total.price
  }

  
  useEffect(() => {
    if (!props.clients) {
      loadClients()
    }
    if(!props.catalog){
      props.getProducts()
    }
    // eslint-disable-next-line
  }, [])

  const loadClients = () => {
    clientsRequest.execute({
      action: props.getClients
    })
  }

  let orders=[]
  _.get(props, 'clients', []).forEach(client => {
    orders=[...orders, ...client.orders]
  });
  
  if(props.products){
    orders=orders.map(order=>({
      ...order, 
      mount : calculateTotal(order)
    }))
  }

  return (
    <div className='Orders relw100'>
      <div className='mar30'>
        {clientsRequest.pending && <div>Chargement en cours...</div>}
        {clientsRequest.error && <div>{clientsRequest.error}</div>}
        {!clientsRequest.pending && props.clients &&
          <OrdersList orders={orders} updateOrderStatus={props.updateOrderStatus}/>
        }
      </div>
    </div>
  )
}

const mapState = (state) => ({
  clients: state.client.clients,
  products : state.catalog.products
})

const actionCreators = {
  getClients: clientActions.getClients,
  getProducts : catalogActions.getProducts,
  activateClientAccount: clientActions.activateClientAccount,
  updateOrderStatus : orderActions.updateOrderStatus
}

export default connect(mapState, actionCreators)(Orders);