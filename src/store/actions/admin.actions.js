import { adminService } from 'services';
import { adminConstants } from 'store/constants';
import {authConstants} from 'store/constants';

export const adminActions = {
  getAdmins,
  registerAdmin,
  updateAdminStatus,
  updateAdminPermissions
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
      console.log(user)
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
    return adminService.updateAdminStatus(id, status).then((updates)=>{
      dispatch({ type: adminConstants.UPDATE_ADMIN,id, updates})
      return updates
    })
  }
}

function updateAdminPermissions(id, permissions){
  return dispatch => {
    return adminService.updateAdminPermissions(id, permissions).then((updates)=>{
      dispatch({ type: adminConstants.UPDATE_ADMIN, id, updates})
      return updates
    })
  }
}