import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Aromati.css';
import aromats1 from '../assets/aromats1.jpg';
import aromats2 from '../assets/aromats2.jpg';
import aromats3 from '../assets/aromats3.jpg';

function Aromati() {
    const addToCart = (item) => {
        // Šeit var pievienot loģiku, lai pievienotu produktu grozam
        console.log(`${item} pievienots grozam!`);
    };

    return (
        <div className="aromati-container">
            <Link to="/shop" className="home-button">Sākums</Link>

            <h1>Mājas un automašīnas aromāti</h1>
            <div className="galerija">
                <div className="aromats-item">
                    <img src={aromats1} alt="aromats1" className="aromats-bilde" />
                    <p className="aromats-apraksts">Mājas aromāts</p>
                    <button className="add-to-cart-button" onClick={() => addToCart('Epoksīda sveķu auskari ar sudraba folliju')}>
                        Pievienot grozam
                    </button>
                </div>
                <div className="aromats-item">
                    <img src={aromats2} alt="aromats2" className="aromats-bilde" />
                    <p className="aromats-apraksts">Izsmidzināms mājas aromāts</p>
                    <button className="add-to-cart-button" onClick={() => addToCart('Auskari ar kaltētiem ziediem')}>
                        Pievienot grozam
                    </button>
                </div>
                <div className="aromats-item">
                    <img src={aromats3} alt="aromats3" className="aromats-bilde" />
                    <p className="aromats-apraksts">Skapja / automašīnas aromāts</p>
                    <button className="add-to-cart-button" onClick={() => addToCart('Auskari kas atgādinās par vasaru pat ziemā')}>
                        Pievienot grozam
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Aromati;
