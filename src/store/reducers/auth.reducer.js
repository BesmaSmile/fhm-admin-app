import {authConstants} from 'store/constants';

export function auth(state = {}, action) {
  switch(action.type) {
    case authConstants.CHECK_SUPER_ADMIN :
    return {
        ...state,
        superAdminExists : action.exists
    }
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
