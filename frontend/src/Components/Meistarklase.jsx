import React from 'react';
import '../style/Meistarklase.css'; // Make sure the path to your CSS file is correct
import cilveki from '../assets/cilveki.jpg';
import darbs from '../assets/darbs.jpg'; 
import sakums from '../assets/sakums.jpg';
import process from '../assets/process.jpg';

function Meistarklase() {
    return (
      <div className="meistarklase-container">
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
