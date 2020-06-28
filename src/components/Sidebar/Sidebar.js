import React from 'react';
import { Link, useHistory } from "react-router-dom";
import avatar from 'assets/img/avatar.svg';
import {connect} from 'react-redux';
import {authActions} from 'store/actions';
import './Sidebar.scss'

const Sidebar=(props)=>{
  const history=useHistory()
  const currentPath=history.location.pathname
  return(
    <div className={`Sidebar relh100vh ${props.className || ''}`}>
      <div className='sidebar-wrapper mar20'>
        <div className='sidebar-logo flex jcc aic col  padv15'>
          <div className='bauhaus93 fs50 lh50 cpurple'>FHM</div>
          <span className='cgrey txtac fs18 light'>Faci Hospitality Master</span>
        </div>

        <div className='sidebar-user flex row aic padv20'>
          <img className='circle' src={avatar} alt=''/>
          <div className='flex col marl20'>
            <span className='cstronggrey medium fs16'>{props.user.username}</span>
            <span className='cgrey extralight fs12'>{props.user.role==='super-admin' ? 'Super admin' : 'Admin'}</span>
          </div>
        </div>
        <div className="sidebar-items padv20 flex col">
          {props.items.map(item=>(
            <Link to={item.path} key={item.name} 
              className='sidebar-item pointer cgrey mar15 brad5' 
              active={currentPath===item.path ? 'true':'false'}>
              {item.name}
            </Link>

          ))}
        </div>
      </div>
      <div className='sidebar-logout pointer marh40 marv20 cgrey bold' onClick={props.logout}>Déconnexion</div>
    </div>
 )
}

Sidebar.defaultProps={
  items:[
    {name:'Accueil', path:'/accueil'},
    {name:'Clients', path:'/clients'},
    {name:'Commandes', path:'/commandes'},
    {name:'Catalogue', path:'/catalogue'},
    {name:'Utilisateurs', path:'/utilisateurs'}
  ],
  className:'w270'
}
const mapState=(state)=> ({
  user : state.auth.user
})

const actionCreators = {
  logout: authActions.logout
}

export default connect(mapState, actionCreators)(Sidebar);
