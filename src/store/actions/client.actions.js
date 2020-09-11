import {clientService} from 'services';
import {clientConstants} from 'store/constants';

export const clientActions= {
  getClients,
  updateClientStatus
}

function getClients(){
  return dispatch => {
    return clientService.getClients().then(clients=>{
      dispatch({ type: clientConstants.GET_CLIENTS, clients })
      return clients;
    })
  }
}

function updateClientStatus(id, status){
  return dispatch => {
    return clientService.updateClientStatus(id, status).then((result)=>{
      dispatch({ type: clientConstants.UPDATE_CLIENT_STATUS, ...result })
      return result
    })
  }
}
