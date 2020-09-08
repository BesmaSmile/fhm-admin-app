import {clientConstants} from 'store/constants';

export function client(state = {orders : {}}, action) {
  switch(action.type) {
    case clientConstants.GET_CLIENTS :
    return {
        ...state,
        clients : action.clients
    }
    case clientConstants.UPDATE_CLIENT_STATUS :
    return {
      ...state,
      clients : state.clients.map(client=>
        client.id===action.id ? {
          ...client,
          status : action.status
        } : client)
    }
    case clientConstants.UPDATE_ORDER_STATUS :
    return{
      ...state,
      clients : state.clients.map(client=>client.id===action.clientId ?
        {
          ...client,
          orders : client.orders.map(order=>order.id===action.orderId ? {...order, status : action.status, [action.status] : action.date} : order)
        }    
        : client)
    }
    default :
    return state
  }
}
