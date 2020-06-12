import React from 'react';
import logo from "assets/icons/logo.svg";
import './Sidebar.scss'

const Sidebar=({className, items})=>{
  return(
    <div className={`Sidebar relh100vh ${className || ''}`}>
      {/*<div className="sidebar-background" />*/}
      <div className='sidebar-wrapper'>
        <div className="sidebar-logo flex row aife jcc padv20 padh10">
          <img className='w34 h34' src={logo} alt="logo_image" />
          <div className='cwhite fs18 marl5'>Faci Hospitality Master</div>
        </div>
        <div className="sidebar-items padv20">
          {items.map((item,i)=>(
            <div key={item} className='sidebar-item pointer cwhite mar15 pad15 brad5' active={i==0 ?'true':'false'}>{item}</div>
          ))}
        </div>
      </div>
    </div>
 )
}

Sidebar.defaultProps={
  items:[
    'Accueil',
    'Clients',
    'Commandes',
  ],
  className:'w270'
}
export default Sidebar