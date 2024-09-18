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
          <div class="container">
            <button class="button type1">
            Epoksīda dekori
            </button>
          </div>
        </div>
        <div className="image-item">
          <img src={sveces} alt="Sveces" />
          <div class="container">
            <button class="button type1">
            Sveces
            </button>
          </div>
        </div>
        <div className="image-item">
          <img src={vasks} alt="Vasks" />
          <div class="container">
            <button class="button type1">
            Aromātiskais vasks
            </button>
          </div>
        </div>
        <div className="image-item">
          <img src={burti} alt="Burti" />
          <div class="container">
            <button class="button type1">
            Epoksīda burti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Shop;
