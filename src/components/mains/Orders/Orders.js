import React, { useEffect } from 'react';
import OrdersList from 'components/mains/Orders/OrdersList';
import { connect } from 'react-redux';
import { hooks } from 'functions';
import { clientActions, catalogActions, orderActions } from 'store/actions';
import _ from 'lodash';
import './Orders.scss';

const Orders=(props)=>{
  const clientsRequest = hooks.useRequest()

  const calculateTotal = (articles) => {
    const total = articles.map(article=>{
      const product=props.products.find(product=>product.id===article.id);
      return{
        ...article,
        price : article.deliveredAt ? article.price : (article.imported ? product.importationPrice : product.price)
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
    orders=[...orders, ..._.get(client, 'orders', []).map(order=>({...order, client}))]
  });
  
  if(props.products){
    orders=orders.map(order=>{
      const articles=order.articles.map(article=>{
        const product=props.products.find(product=>product.id===article.id);
        return{
          ...article,
          product : product.nameFr,
          price : article.deliveredAt ? article.price : (article.imported ? product.importationPrice : product.price)
        }
      })
      return({
        ...order, 
        articles,
        mount : calculateTotal(articles)
      })
    })
  }

  return (
    <div className='Orders relw100'>
      <div className='mar30'>
        <OrdersList orders={orders} 
          loading={clientsRequest.pending}
          error={clientsRequest.error}
          updateOrderStatus={props.updateOrderStatus} 
          reload={loadClients}/>
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