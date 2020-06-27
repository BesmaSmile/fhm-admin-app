import {usersService} from 'services';
import {usersConstants} from 'store/constants';

export const usersActions= {
  checkSuperUser,
  registerSuperAdmin
}

function checkSuperUser(){
  return dispatch => {
    return usersService.checkSuperUser().then(exists=>{
      dispatch({ type: usersConstants.CHECK_SUPER_USER, exists })
    })
  }
}

function registerSuperAdmin(user, secretKey){
  return dispatch => {
    return usersService.registerSuperAdmin(user, secretKey).then(user=>{
      dispatch({ type: usersConstants.REGISTER_SUPER_ADMIN, user })
      return user
    })
  }
}