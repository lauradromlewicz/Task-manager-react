import React from 'react';
import logo from './../../imagens/logo.jpg';

function Home() {
  return (
    <div className="home-container">
      <img src={logo} alt="Logo" className="home-logo" />
    </div>
  );
}

export default Home;