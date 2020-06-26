import React from 'react';
import Sidebar from 'components/Sidebar/Sidebar';

const MainLayout=(props)=>{
  return(
    <div className="flex fdr">
      <Sidebar />
      <header className="flex f1 col jcc aic relh100vh blight">
        {props.children}
      </header>
    </div>
  )
}

export default MainLayout