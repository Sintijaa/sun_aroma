import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Aromati.css';
import aromats1 from '../assets/aromats1.jpg';
import aromats2 from '../assets/aromats2.jpg';
import aromats3 from '../assets/aromats3.jpg';

function Sveces() {
    return (
        <div className="aromati-container">
        <Link to="/shop" className="home-button">Sākums</Link>

        <h1>Mājas un automašīnas aromāti</h1>
        <div className="galerija">
            <div className="auskari-item">
                <img src={aromats1} alt="aromats1" className="auskari-bilde" />
                <p className="auskari-apraksts">Epoksīda sveķu auskari ar sudraba folliju</p>
            </div>
            <div className="auskari-item">
                <img src={aromats2} alt="aromats2" className="auskari-bilde" />
                <p className="auskari-apraksts">Auskari ar kaltētiem ziediem</p>
            </div>
            <div className="auskari-item">
                <img src={aromats3} alt="aromats3tfgrtfghg" className="auskari-bilde" />
                <p className="auskari-apraksts">Auskari kas atgādinās par vasaru pat ziemā</p>
            </div>
        </div>
    </div>
    );
}

export default Sveces;
