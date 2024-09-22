import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Shop.css';
import epoksids from '../assets/epoksids.jpg';
import sveces from '../assets/sveces.jpg';
import vasks from '../assets/vasks.jpg';
import burti from '../assets/burti.jpg';

function Shop() {
  return (
    <div>
      <div className="top-left-button">
        <Link to="/">
          <button className="button home-button">Uz sākumu</button>
        </Link>
      </div>

      <h1>Kategorijas</h1>
      <div className="image-gallery">
        <div className="image-item">
          <Link to="/dekori">
            <img src={epoksids} alt="Epoksīds" />
            <div className="container">
              <button className="button type1">Epoksīda dekori</button>
            </div>
          </Link>
        </div>
        <div className="image-item">
          <Link to="/Sveces">
            <img src={sveces} alt="Sveces" />
            <div className="container">
              <button className="button type1">Sveces</button>
            </div>
          </Link>
        </div>
        <div className="image-item">
          <Link to="/vaski">
            <img src={vasks} alt="Vasks" />
            <div className="container">
              <button className="button type1">Aromātiskais vasks</button>
            </div>
          </Link>
        </div>
        <div className="image-item">
          <Link to="/burti">
            <img src={burti} alt="Burti" />
            <div className="container">
              <button className="button type1">Epoksīda burti</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Shop;
