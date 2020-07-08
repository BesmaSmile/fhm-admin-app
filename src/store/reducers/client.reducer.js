import {clientConstants} from 'store/constants';

export function client(state = {}, action) {
  switch(action.type) {
    case clientConstants.GET_CLIENTS :
    return {
        ...state,
        clients : action.clients
    }
    case clientConstants.TOGGLE_CLIENT_ACCOUNT :
    return {
      ...state,
      clients : state.clients.map(client=>
        client.id===action.id ? {
          ...client,
          active : action.active
        } : client)
    }
    default :
    return state
  }
}
