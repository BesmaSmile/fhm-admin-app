import {adminConstants} from 'store/constants';

export function admin(state = {}, action) {
  switch(action.type) {
    case adminConstants.GET_ADMINS :
    return {
        ...state,
        administrators : action.administrators
    }
    case adminConstants.REGISTER_ADMIN : 
    return{
      ...state,
      administrators :[...state.administrators , action.user]
    }
    default:
    return state;
  }

}