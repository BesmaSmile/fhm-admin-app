import React from 'react';
import foodImage from 'assets/img/food.jpg';

function Home() {
  return (
    <div className='flex col aic'>
        <img className="w350 brad10" src={foodImage} alt='food'/>
        <span
          className="fs30 mart50 cpurple"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         Welcome to Faci Hostpitality Master ! 
        </span>
    </div>
  );
}

export default Home;
