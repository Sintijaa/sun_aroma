import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Auskari.css'; // Atjaunots CSS faila nosaukums
import auskari1 from '../assets/auskari1.jpg';
import auskari2 from '../assets/auskari2.jpg';
import auskari3 from '../assets/auskari3.jpg';
import auskari4 from '../assets/auskari4.jpg';

function Auskari() {
    return (
        <div className="auskari-container">
            <Link to="/shop" className="home-button">Sākums</Link> {/* Poga uz veikalu */}

            <h1>Epoksīda sveķu rotas</h1>
            <div className="galerija">
                <div className="auskari-item">
                    <img src={auskari1} alt="auskari1" className="auskari-bilde" />
                    <p className="auskari-apraksts">Epoksīda sveķu auskari ar sudraba folliju</p>
                </div>
                <div className="auskari-item">
                    <img src={auskari2} alt="auskari2" className="auskari-bilde" />
                    <p className="auskari-apraksts">Auskari ar kaltētiem ziediem</p>
                </div>
                <div className="auskari-item">
                    <img src={auskari3} alt="auskari3" className="auskari-bilde" />
                    <p className="auskari-apraksts">Auskari kas atgādinās par vasaru pat ziemā</p>
                </div>
                <div className="auskari-item">
                    <img src={auskari4} alt="auskari4" className="auskari-bilde" />
                    <p className="auskari-apraksts">Auskari spilgtiem cilvēkiem</p>
                </div>
            </div>
        </div>
    );
}

export default Auskari;
