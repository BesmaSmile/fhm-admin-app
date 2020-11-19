import {authConstants} from 'store/constants';

export function auth(state = {}, action) {
  switch(action.type) {
    case authConstants.LOGGED_IN :
    return {
      ...state,
      user : action.user
    }
    case authConstants.LOGGED_OUT : 
    return {
      ...state,
      user : undefined
    }
    default :
    return state
  }
  
}
