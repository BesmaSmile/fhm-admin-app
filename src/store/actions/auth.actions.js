import {authService} from 'services';
import {authConstants} from 'store/constants';

export const authActions= {
  checkSuperUser,
  registerSuperAdmin,
  login,
  logout
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
      dispatch({ type: authConstants.LOGGED_IN, user })
      return user
    })
  }
}

function login(user){
  return dispatch => {
    return authService.login(user).then(user=>{
      dispatch({ type: authConstants.LOGGED_IN, user })
      return user
    })
  }
}

function logout(){
  return dispatch => {
    dispatch({ type: authConstants.LOGGED_OUT })
  }
}