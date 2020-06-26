import React from 'react';
import './Sidebar.scss'

const Sidebar=({className, items})=>{
  return(
    <div className={`Sidebar relh100vh ${className || ''}`}>
      <div className='sidebar-wrapper'>
        
        <div className='sidebar-logo flex jcc aic col  padv15'>
          <div className='bauhaus93 fs50 lh50 cwhite'>FHM</div>
          <span className='clightgrey txtac fs18 light'>Faci Hospitality Master</span>
        </div>
        <div className="sidebar-items padv20">
          {items.map((item,i)=>(
            <div key={item} className='sidebar-item pointer cgrey mar15 pad15 brad5' active={i===0 ?'true':'false'}>{item}</div>
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