import { adminService } from 'services';
import { adminConstants } from 'store/constants';

export const adminActions = {
  getAdmins
}

function getAdmins() {
  return dispatch => {
    return adminService.getAdmins().then(administrators => {
      dispatch({ type: adminConstants.GET_ADMINS, administrators })
      return administrators;
    })
  }
}