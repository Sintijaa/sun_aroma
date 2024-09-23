import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Sveces.css';
import kvarcs from '../assets/kvarcs.jpg';
import ametists from '../assets/ametists.jpg';

function Sveces() {
    return (
      
      <div className="sveces-container">
        <h1>Dizaina sveces</h1>
        <div className="image-gallery">
          <div className="image-item">
            <img src={kvarcs} alt="kvarcs" />
            <p>Sojas vaska svece ar dabīgiem akmeņiem-Kvarcs</p>
          </div>
          <div className="image-item">
            <img src={ametists} alt="ametists" />
            <p>Sojas vaska svece ar dabīgiem akmeņiem-Ametists</p>
          </div>
        </div>
      </div>
    );
}

export default Sveces;
