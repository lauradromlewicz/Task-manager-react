import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Projeto } from '../../../models/Projeto';
import logo from './../../imagens/logo.jpg';

function Home() {
  return (
    <div>
        <img src={logo} alt="Logo" width={1009}/>
    </div>
  );
}

export default Home;
