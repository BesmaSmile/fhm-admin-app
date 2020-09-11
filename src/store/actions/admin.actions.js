import { adminService } from 'services';
import { adminConstants } from 'store/constants';
import {authConstants} from 'store/constants';

export const adminActions = {
  getAdmins,
  registerAdmin,
  updateAdminStatus
}

function getAdmins() {
  return dispatch => {
    return adminService.getAdmins().then(administrators => {
      dispatch({ type: adminConstants.GET_ADMINS, administrators })
      return administrators;
    })
  }
}

function registerAdmin(user, isFirstAdmin, secretKey){
  return dispatch => {
    return adminService.registerAdmin(user, isFirstAdmin, secretKey).then(user=>{
      if(isFirstAdmin)
        dispatch({ type: authConstants.LOGGED_IN, user })
      else 
        dispatch({ type: adminConstants.REGISTER_ADMIN, user })
      return user
    })
  }
}

function updateAdminStatus(id, status){
  return dispatch => {
    return adminService.updateAdminStatus(id, status).then((result)=>{
      dispatch({ type: adminConstants.UPDATE_ADMIN_STATUS, ...result})
      return result
    })
  }
}