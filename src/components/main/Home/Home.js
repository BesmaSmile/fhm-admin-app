import React from 'react';
import './Home.css';
import foodImage from '../../../assets/images/food.jpg' ;
function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <img className="Home-img" src={foodImage} alt='food'/>
        <span
          className="Home-message"
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
