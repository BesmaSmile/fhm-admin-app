import {authService} from 'services';
import {authConstants} from 'store/constants';

export const authActions= {
  checkSuperUser,
  registerSuperAdmin
}

function checkSuperUser(){
  return dispatch => {
    return authService.checkSuperUser().then(exists=>{
      dispatch({ type: authConstants.CHECK_SUPER_USER, exists })
    })
  }
}

function registerSuperAdmin(user, secretKey){
  return dispatch => {
    return authService.registerSuperAdmin(user, secretKey).then(user=>{
      dispatch({ type: authConstants.REGISTER_SUPER_ADMIN, user })
      return user
    })
  }
}