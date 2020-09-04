import {clientService} from 'services';
import {clientConstants} from 'store/constants';

export const clientActions= {
  getClients,
  activateClientAccount
}

function getClients(){
  return dispatch => {
    return clientService.getClients().then(clients=>{
      dispatch({ type: clientConstants.GET_CLIENTS, clients })
      return clients;
    })
  }
}

function activateClientAccount(id, active){
  return dispatch => {
    return clientService.activateClientAccount(id, active).then((result)=>{
      dispatch({ type: clientConstants.TOGGLE_CLIENT_ACCOUNT, id, active })
      return result
    })
  }
}
