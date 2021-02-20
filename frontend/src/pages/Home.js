import React from "react";

import background from '../images/background.jpg'

/**
 * Home screen, you can honestly change whatever
 */
const Home = () => {
  return (
    <div className="home">
      <img src={background} width="100%" height="100%"/>
      <h1 className="home-title">
        A free peer-to-peer network offering resume advice that respects your
        privacy.
      </h1>
      <br/>
      <h2 className="home-subtitle">
        Get honest feedback and tips to make your resume stand out from people
        who’ve been in your shoes
      </h2>
      <div className="background">
        
      </div>
    </div>
    
  );
};

export default Home;
