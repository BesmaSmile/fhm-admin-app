import React from 'react';
import foodImage from 'assets/img/food.jpg' ;
import Sidebar from 'components/Sidebar/Sidebar';
function Home() {
  return (
    <div className="flex fdr">
      <Sidebar />
      <header className="flex f1 col jcc aic relh100vh blight">
        <img className="w350 brad10" src={foodImage} alt='food'/>
        <span
          className="fs30 mart50 cpurple"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         Welcome to Faci Hostpitality Master ! 
        </span>
      </header>
    </div>
  );
}

export default Home;
