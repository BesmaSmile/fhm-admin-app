import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import SecurityIcon from '@material-ui/icons/Security';
import {permissionConstants} from 'consts';
import { connect } from 'react-redux';
import _ from 'lodash';
import './PermissionWrappers.scss';

const mapState = (state) => ({
  permissions : _.get(state.auth, 'user.permissions', {})
})

const PageWrapper=connect(mapState)(props=>{
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
    <div className='flex relw100 col aic jcc marb50'>
      <div className='pw-iconContainer marb40'>
        <SecurityIcon classes={{root :'pw-largIcon'}} fontSize='large'/>
        <CancelIcon classes={{root :'pw-smallIcon'}} fontSize='small'/>
      </div>
      <div className='fs20 cstronggrey'>Vous n'avez pas la permission pour afficher cette page. </div>
      <div className='fs14 cgrey extralight'> Demander à un administrateur de vous atttribuer la permission </div>
    </div>
  )
})

export {PageWrapper };


const ButtonWrapper=connect(mapState)(props=>{
  const {neededPermission, permissions, button}=props
  const disabled=!permissions[neededPermission]
  return button(disabled)
})

export {ButtonWrapper}

