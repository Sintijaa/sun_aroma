import React from 'react';
import '../style/piegade.css';

const Piegade = () => {
  return (
    <div className="piegade-container">
      <h1 className="piegade-title">Piegādes informācija</h1>
      
      <div className="piegade-options">
        <div className="piegade-option">
          <div className="piegade-option-header">
            <h2>Saņemšana veikalā</h2>
            <span className="piegade-price">Bezmaksas</span>
          </div>
          
          <div className="piegade-details">
            <h3>Darba laiks:</h3>
            <ul className="piegade-schedule">
              <li><span>Pirmdiena - Piektdiena:</span> 14:00 - 18:00</li>
              <li><span>Sestdiena:</span> Slēgts</li>
              <li><span>Svētdiena:</span> Slēgts</li>
            </ul>
            <p className="piegade-info">Pasūtījumu varēsiet saņemt jau nākamajā darba dienā pēc pasūtījuma apstiprināšanas.</p>
            <p className="piegade-address">
              <strong>Adrese:</strong> Valmieras iela2, Cēsis
            </p>
          </div>
        </div>
        
        <div className="piegade-option">
          <div className="piegade-option-header">
            <h2>Piegāde ar pakomātu</h2>
            <span className="piegade-price">€3,50</span>
          </div>
          
          <div className="piegade-details">
            <h3>Piegādes informācija:</h3>
            <ul className="piegade-info-list">
              <li>Piegāde ar Omniva, DPD vai Latvijas Pasta pakomātiem</li>
              <li>Piegādes laiks: 1-2 darba dienas</li>
              <li>Paziņojums par sūtījuma ierašanos tiks nosūtīts uz jūsu e-pastu tālruni</li>
              <li>Sūtījums pakomātā glabāsies 7 dienas</li>
            </ul>
          </div>
        </div>
      </div>
       
      <div className="piegade-back-button-container">
        <a href="/" className="piegade-back-button">Atgriezties uz sākumu</a>
      </div>
    </div>
  );
};

export default Piegade;
















