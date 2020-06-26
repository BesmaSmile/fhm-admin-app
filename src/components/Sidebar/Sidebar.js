import React from 'react';
import { Link, useHistory } from "react-router-dom";
import avatar from 'assets/img/avatar.svg';

import './Sidebar.scss'

const Sidebar=({className, items})=>{
  const history=useHistory()
  const currentPath=history.location.pathname
  return(
    <div className={`Sidebar relh100vh ${className || ''}`}>
      <div className='sidebar-wrapper mar20'>
        
        <div className='sidebar-logo flex jcc aic col  padv15'>
          <div className='bauhaus93 fs50 lh50 cpurple'>FHM</div>
          <span className='cgrey txtac fs18 light'>Faci Hospitality Master</span>
        </div>

        <div className='sidebar-user flex row aic padv20'>
          <img className='circle' src={avatar} alt=''/>
          <div className='marl10 cgrey medium'>Ali FACI</div>
        </div>
        <div className="sidebar-items padv20 flex col">
          {items.map((item,i)=>(
            <Link to={item.path} key={item} 
              className='sidebar-item pointer cgrey mar15 brad5' 
              active={currentPath===item.path ? 'true':'false'}>
              {item.name}
            </Link>

          ))}
        </div>
      </div>
    </div>
 )
}

Sidebar.defaultProps={
  items:[
    {name:'Accueil', path:'/accueil'},
    {name:'Clients', path:'/clients'},
    {name:'Commandes', path:'/commandes'},
    {name:'Catalogue', path:'/catalogue'}
  ],
  className:'w270'
}
export default Sidebar