// src/components/Aromati.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Importēts js-cookie
import '../style/Aromati.css';
import aromats1 from '../assets/aromats1.jpg';
import aromats2 from '../assets/aromats2.jpg';
import aromats3 from '../assets/aromats3.jpg';

function Aromati() {
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
        {
            id: 1,
            name: "Mājas aromāts",
            image: aromats1,
            description: "Mājas aromāts 50ml",
            price: "10.00 EUR"
        },
        {
            id: 2,
            name: "Izsmidzināms mājas aromāts",
            image: aromats2,
            description: "Izsmidzināms mājas aromāts ar 11 dažādiem aromātiem",
            price: "6.00 EUR"
        },
        {
            id: 3,
            name: "Skapja / automašīnas aromāts",
            image: aromats3,
            description: "Aromāts ko vari iekarināt automašīnā vai skapī",
            price: "4.00 EUR"
        }
    ];

    return (
        <div className="aromati-container">
            <Link to="/shop" className="home-button">Sākums</Link>
            <Link to="/grozs" className="view-cart-button">Skatīt grozu ({cartItems.length})</Link>

            <h1>Mājas un automašīnas aromāti</h1>
            <div className="galerija">
                {products.map((product) => (
                    <div key={product.id} className="aromats-item">
                        {/* Pievienojam sarkano apli ar uzrakstu "Izpārdots" tikai skapja aromātam */}
                        {product.name === "Skapja / automašīnas aromāts" && (
                            <div className="sold-out-circle">Izpārdots</div>
                        )}
                        <img src={product.image} alt={product.name} className="aromats-bilde" />
                        <div className="aromats-info">
                            <p className="aromats-apraksts">{product.name}</p>
                            <p className="aromats-price">{product.price}</p>
                            <p className="aromats-description">{product.description}</p>
                            <button 
                                className="add-to-cart-button" 
                                onClick={() => addToCart(product)}
                                disabled={product.name === "Skapja / automašīnas aromāts"} // Disable button if sold out
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

export default Aromati;
