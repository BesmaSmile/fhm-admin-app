import React, { useEffect } from 'react';
import AdminsList from 'components/mains/Admins/AdminsList';
import { adminActions } from 'store/actions';
import { connect } from 'react-redux';
import { hooks } from 'functions';
import './Admins.scss';

const Admins=props=>{
  const adminsRequest = hooks.useRequest()

  useEffect(() => {
    if (!props.clients) {
      loadAdmins()
    }
    // eslint-disable-next-line
  }, [])

  const loadAdmins = () => {
    adminsRequest.execute({
      action: props.getAdmins
    })
  }


  console.log(props.administrators)
  return (
    <div className='Admins relw100'>
      <div className='mar30'>
        {adminsRequest.pending && <div>Chargement en cours...</div>}
        {adminsRequest.error && <div>{adminsRequest.error}</div>}
        {!adminsRequest.pending && props.administrators &&
          <AdminsList administrators={props.administrators} />
        }
      </div>
    </div>
  )
}

const mapState = (state) => ({
  administrators: state.admin.administrators
})

const actionCreators = {
  getAdmins: adminActions.getAdmins
}

export default connect(mapState, actionCreators)(Admins);