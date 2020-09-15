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
      administrators :[{...action.user, createdAt : action.user.createdAt }, ...state.administrators]
    }
    case adminConstants.UPDATE_ADMIN : 
    return{
      ...state,
      administrators : state.administrators.map(administrator=>
        administrator.id===action.id ? {
          ...administrator,
          ...action.updates
        } : administrator)
    }
    default:
    return state;
  }

}