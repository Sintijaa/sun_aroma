import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Aromati.css';
import aromats1 from '../assets/aromats1.jpg';
import aromats2 from '../assets/aromats2.jpg';
import aromats3 from '../assets/aromats3.jpg';

function Sveces() {
    return (
        <div className="aromaticontainer">
            <Link to="/shop" className="home-button">Sākums</Link> {/* Poga uz veikalu */}
            <div className="galerija">
            <h1>Aromāti</h1>
                <div className="aromats">
                    <img src={aromats1} alt="aromats1" className="aromats-bilde" />
                    <p className="aromats-apraksts">Aromāts 1</p>
                </div>
                <div className="aromats">
                    <img src={aromats2} alt="aromats2" className="aromats-bilde" />
                    <p className="aromats-apraksts">Aromāts 2</p>
                </div>
                <div className="aromats">
                    <img src={aromats3} alt="aromats3" className="aromats-bilde" />
                    <p className="aromats-apraksts">Aromāts 3</p>
                </div>
            </div>
        </div>
    );
}

export default Sveces;
