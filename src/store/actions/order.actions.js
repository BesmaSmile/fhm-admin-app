import { orderService } from 'services';
import {clientConstants} from 'store/constants';

export const orderActions= {
  updateOrderStatus
}


function updateOrderStatus(clientId, orderId, status){
  return dispatch => {
    return orderService.updateOrderStatus(clientId, orderId, status)
    .then((result)=>{
      dispatch({ type: clientConstants.UPDATE_ORDER_STATUS, ...result })
      return result
    })
  }
}
