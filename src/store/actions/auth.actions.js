import {authService} from 'services';
import {authConstants} from 'store/constants';

export const authActions= {
  login,
  logout
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