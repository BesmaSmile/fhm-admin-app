import React from 'react';
import Sidebar from 'components/Sidebar/Sidebar';

const MainLayout=(props)=>{
  return(
    <div className="flex fdr">
      <Sidebar />
      <div className="flex f1 col jcc aic relh100vh blight">
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout