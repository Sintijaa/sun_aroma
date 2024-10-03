import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../style/Sveces.css';
import kvarcs from '../assets/kvarcs.jpg';
import ametists from '../assets/ametists.jpg';


function Sveces() {
   

    return (
        <div className="sveces-container">
            <Link to="/shop" className="home-button">Sākums</Link>

            <h1>Dizaina sveces</h1>
            <div className="galerija">
                <div className="svece">
                    <img src={kvarcs} alt="kvarcs" className="svece-bilde" />
                    <p className="svece-apraksts">Sojas vaska svece ar dabīgiem akmeņiem - Kvarcs</p>
                    <button className="add-to-cart-button" onClick={() => addToCart('Kvarcs')}>Pievienot grozam</button>
                </div>
                <div className="svece">
                    <img src={ametists} alt="ametists" className="svece-bilde" />
                    <p className="svece-apraksts">Sojas vaska svece ar dabīgiem akmeņiem - Ametists</p>
                    <button className="add-to-cart-button" onClick={() => addToCart('Ametists')}>Pievienot grozam</button>
                </div>
            </div>
        </div>
    );
}

export default Sveces;
