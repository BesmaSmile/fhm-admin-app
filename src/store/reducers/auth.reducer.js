import {authConstants} from 'store/constants';

export function auth(state = {}, action) {
  switch(action.type) {
    case authConstants.CHECK_SUPER_ADMIN :
    return {
        ...state,
        superAdminExists : action.exists
    }
    case authConstants.REGISTER_SUPER_ADMIN :
    return {
      ...state,
      user : action.user
    }
    default :
    return state
  }
  
}
