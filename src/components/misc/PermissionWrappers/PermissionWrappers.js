import React from 'react';
import {permissionConstants} from 'consts';
import { connect } from 'react-redux';
import _ from 'lodash';

const mapState = (state) => ({
  permissions : _.get(state.auth, 'user.permissions', {})
})

const PageWrapper=connect(mapState)(props=>{
  console.log(props)
  const {permissions, page, name}=props
  const associatedPermissions = {
    'home' : permissionConstants.READ_DASHBOARD,
    'clients' :permissionConstants.READ_CLIENT,
    'orders' :permissionConstants.READ_ORDER,
    'catalog' :permissionConstants.READ_CATALOG,
    'admins' :permissionConstants.READ_ADMIN,
  }

  if(permissions[associatedPermissions[name]])
    return (<>{page}</>)
  else return (
    <div className='flex aic jcc pad50'>
      Vous n'avez pas accès à cette page. 
    </div>
  )
})

export {PageWrapper };

