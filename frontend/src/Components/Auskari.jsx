// src/components/Auskari.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Importēts js-cookie
import '../style/Auskari.css';
import auskari1 from '../assets/auskari1.jpg';
import auskari2 from '../assets/auskari2.jpg';
import auskari3 from '../assets/auskari3.jpg';
import auskari4 from '../assets/auskari4.jpg';

function Auskari() {
    const [cartItems, setCartItems] = useState([]);
    const [sessionId, setSessionId] = useState(null); // Sesijas ID

    useEffect(() => {
        // Pārbauda, vai sesijas ID cookie pastāv
        let existingSessionId = Cookies.get('session_id');
        
        if (!existingSessionId) {
            // Izveido jaunu sesijas ID, ja tāds nepastāv
            existingSessionId = `session_${Date.now()}`;
            Cookies.set('session_id', existingSessionId, { expires: 7 }); // Saglabā sesijas cookie uz 7 dienām
        }

        setSessionId(existingSessionId);
    }, []); // Izpilda vienreiz pēc komponenta montēšanas

    const addToCart = async (item) => {
        if (!sessionId) {
            console.error('Sesijas ID nav iestatīts');
            return;
        }

        const productData = {
            product_id: item.id,
            quantity: 1,
            session_id: sessionId,
            price: item.price
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cart', productData);
            setCartItems([...cartItems, item]);
            console.log(response.data.message); // Atbildes ziņojums no servera
        } catch (error) {
            if (error.response) {
                console.error('Kļūda pievienojot grozam', error.response.data);
            } else {
                console.error('Kļūda pievienojot grozam', error.message);
            }
        }
    };

    const products = [
        { id: 1, name: 'Epoksīda sveķu auskari ar sudraba folliju', price: '8.00 EUR', image: auskari1, description: 'Eleganti auskari ar sudraba folliju' },
        { id: 2, name: 'Auskari ar kaltētiem ziediem', price: '10.00 EUR', image: auskari2, description: 'Auskari ar skaistiem kaltētiem ziediem' },
        { id: 3, name: 'Auskari kas atgādinās par vasaru pat ziemā', price: '16.99 EUR', image: auskari3, description: 'Gaiši un krāsaini auskari' },
        { id: 4, name: 'Auskari spilgtiem cilvēkiem', price: '18.99 EUR', image: auskari4, description: 'Spilgti auskari pašizpausmei' }
    ];

    return (
        <div className="auskari-container">
            <Link to="/shop" className="home-button">Sākums</Link>
            <Link to="/grozs" className="view-cart-button">Skatīt grozu ({cartItems.length})</Link>

            <h1>Epoksīda sveķu rotas</h1>
            <div className="galerija">
                {products.map((product) => (
                    <div key={product.id} className="auskari-item">
                        <img src={product.image} alt={product.name} className="auskari-bilde" />
                        <div className="auskari-info">
                            <p className="auskari-name">{product.name}</p>
                            <p className="auskari-price">{product.price}</p>
                            <p className="auskari-description">{product.description}</p>
                            <button 
                                className="add-to-cart-button" 
                                onClick={() => addToCart(product)}
                            >
                                Pievienot grozam
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Auskari;
