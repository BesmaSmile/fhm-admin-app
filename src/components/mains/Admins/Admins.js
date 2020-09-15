import React, { useEffect } from 'react';
import AdminsList from 'components/mains/Admins/AdminsList';
import { adminActions } from 'store/actions';
import { connect } from 'react-redux';
import { hooks } from 'functions';
import './Admins.scss';

const Admins=props=>{
  const adminsRequest = hooks.useRequest()

  useEffect(() => {
    if (!props.administrators) {
      loadAdmins()
    }
    // eslint-disable-next-line
  }, [])

  const loadAdmins = () => {
    adminsRequest.execute({
      action: props.getAdmins
    })
  }

  return (
    <div className='Admins relw100'>
      <div className='mar30'>
        <AdminsList administrators={props.administrators} 
          loading={adminsRequest.pending}
          error={adminsRequest.error}
          updateAdminStatus={props.updateAdminStatus}
          changePassword={props.changePassword}
          reload={loadAdmins}
          updateAdminPermissions={props.updateAdminPermissions} />
      </div>
    </div>
  )
}

const mapState = (state) => ({
  administrators: state.admin.administrators
})

const actionCreators = {
  getAdmins: adminActions.getAdmins,
  updateAdminStatus : adminActions.updateAdminStatus,
  updateAdminPermissions : adminActions.updateAdminPermissions,
  changePassword : adminActions.changePassword
}

export default connect(mapState, actionCreators)(Admins);