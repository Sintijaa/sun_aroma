import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Meistarklase.css'; 
import cilveki from '../assets/cilveki.jpg';
import darbs from '../assets/darbs.jpg'; 
import sakums from '../assets/sakums.jpg';
import process from '../assets/process.jpg';

function Meistarklase() {
    return (
      <div className="meistarklase-container">
        <div className="top-left-button">
          <Link to="/">
            <button className="button home-button">Uz sākumu</button>
          </Link>
        </div>

        <h1>Meistarklases</h1>
        <div className="image-gallery">
          <div className="image-item">
            <img src={cilveki} alt="cilveki" />
            <p>Pirmā meistarklase sveču pagatavošanā</p>
          </div>
          <div className="image-item">
            <img src={darbs} alt="darbs" />
            <p>Gatavie darbi</p>
          </div>
          <div className="image-item">
            <img src={sakums} alt="sakums" />
            <p>Ieskats darba procesā</p>
          </div>
          <div className="image-item">
            <img src={process} alt="process" />
            <p>Gatavie darbi</p>
          </div>
        </div>
      </div>
    );
}

export default Meistarklase;
