import { adminService } from 'services';
import { adminConstants } from 'store/constants';
import {authConstants} from 'store/constants';

export const adminActions = {
  getAdmins,
  registerAdmin,
  updateAdminStatus,
  updateAdminPermissions,
  changePassword
}

function getAdmins() {
  return dispatch => {
    return adminService.getAdmins().then(administrators => {
      dispatch({ type: adminConstants.GET_ADMINS, administrators })
      return administrators;
    })
  }
}

function registerAdmin(user){
  return dispatch => {
    return adminService.registerAdmin(user).then(user=>{
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

function changePassword(id, password){
  return dispatch => {
    return adminService.changePassword(id, password).then((updates)=>{
      dispatch({ type: adminConstants.UPDATE_ADMIN, id, updates})
      return updates
    })
  }
}