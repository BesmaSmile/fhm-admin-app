import React from 'react';
import Sidebar from 'components/misc/Sidebar/Sidebar';
import "./MainLayout.scss";

const MainLayout=(props)=>{
  return(
    <div className="MainLayout flex fdr">
      <Sidebar className='w270'/>
      <div className="ml-container marl270 flex f1 col jcc aic relh100vh blight">
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout