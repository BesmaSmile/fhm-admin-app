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
    case adminConstants.UPDATE_ADMIN_STATUS : 
    return{
      ...state,
      administrators : state.administrators.map(administrator=>
        administrator.id===action.id ? {
          ...administrator,
          status : action.status,
          updatedAt : action.updatedAt,
        } : administrator)
    }
    default:
    return state;
  }

}