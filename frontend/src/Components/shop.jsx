import React from 'react';
import '../style/Shop.css';
import epoksids from '../assets/epoksids.jpg';
import sveces from '../assets/sveces.jpg'; 
import vasks from '../assets/vasks.jpg';
import burti from '../assets/burti.jpg';

function Shop() {
  return (
    <div>
      <h1>Kategorijas</h1>
      <div className="image-gallery">
        <div className="image-item">
          <img src={epoksids} alt="Epoksīds" />
          <p>Epoksīda dekori</p>
        </div>
        <div className="image-item">
          <img src={sveces} alt="Sveces" />
          <p>Sveces</p>
        </div>
        <div className="image-item">
          <img src={vasks} alt="Vasks" />
          <p>Aromātiskais vasks</p>
        </div>
        <div className="image-item">
          <img src={burti} alt="Burti" />
          <p>Epoksīda burti</p>
        </div>
      </div>
    </div>
  );
}
 
export default Shop;
