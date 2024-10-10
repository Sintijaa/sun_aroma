import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Auskari.css'; // Atjaunots CSS faila nosaukums
import auskari1 from '../assets/auskari1.jpg';
import auskari2 from '../assets/auskari2.jpg';
import auskari3 from '../assets/auskari3.jpg';
import auskari4 from '../assets/auskari4.jpg';

function Auskari() {
    const addToCart = (item) => {
        // Loģika, lai pievienotu produktu grozam
        console.log(`${item} pievienots grozam!`);
    };

    return (
        <div className="auskari-container">
            <Link to="/shop" className="home-button">Sākums</Link>

            <h1>Epoksīda sveķu rotas</h1>
            <div className="galerija">
                <div className="auskari-item">
                    <img src={auskari1} alt="auskari1" className="auskari-bilde" />
                    <p className="auskari-apraksts">Epoksīda sveķu auskari ar sudraba folliju</p>
                    <button className="add-to-cart-button" onClick={() => addToCart('Epoksīda sveķu auskari ar sudraba folliju')}>
                        Pievienot grozam
                    </button>
                </div>
                <div className="auskari-item">
                    <img src={auskari2} alt="auskari2" className="auskari-bilde" />
                    <p className="auskari-apraksts">Auskari ar kaltētiem ziediem</p>
                    <button className="add-to-cart-button" onClick={() => addToCart('Auskari ar kaltētiem ziediem')}>
                        Pievienot grozam
                    </button>
                </div>
                <div className="auskari-item">
                    <img src={auskari3} alt="auskari3" className="auskari-bilde" />
                    <p className="auskari-apraksts">Auskari kas atgādinās par vasaru pat ziemā</p>
                    <button className="add-to-cart-button" onClick={() => addToCart('Auskari kas atgādinās par vasaru pat ziemā')}>
                        Pievienot grozam
                    </button>
                </div>
                <div className="auskari-item">
                    <img src={auskari4} alt="auskari4" className="auskari-bilde" />
                    <p className="auskari-apraksts">Auskari spilgtiem cilvēkiem</p>
                    <button className="add-to-cart-button" onClick={() => addToCart('Auskari spilgtiem cilvēkiem')}>
                        Pievienot grozam
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Auskari;
