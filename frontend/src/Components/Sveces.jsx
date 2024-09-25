import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Sveces.css'; // Tā pati CSS faila saite
import kvarcs from '../assets/kvarcs.jpg';
import ametists from '../assets/ametists.jpg';

function Sveces() {
    return (
        <div className="sveces-container">
         <Link to="/shop" className="home-button">Sākums</Link> {/* Poga uz veikalu */}

            <h1>Dizaina sveces</h1>
            <div className="galerija">
                <div className="svece">
                    <img src={kvarcs} alt="kvarcs" className="svece-bilde" />
                    <p className="svece-apraksts">Sojas vaska svece ar dabīgiem akmeņiem-Kvarcs</p>
                </div>
                <div className="svece">
                    <img src={ametists} alt="ametists" className="svece-bilde" />
                    <p className="svece-apraksts">Sojas vaska svece ar dabīgiem akmeņiem-Ametists</p>
                </div>
            </div>
        </div>
    );
}

export default Sveces;
