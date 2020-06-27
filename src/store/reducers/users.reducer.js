import {usersConstants} from 'store/constants';

export function users(state = {}, action) {
  switch(action.type) {
    case usersConstants.CHECK_SUPER_ADMIN :
    return {
        ...state,
        superAdminExists : action.exists
    }
    case usersConstants.REGISTER_SUPER_ADMIN :
    return {
      ...state,
      user : action.user
    }
    default :
    return state
  }
  
}
