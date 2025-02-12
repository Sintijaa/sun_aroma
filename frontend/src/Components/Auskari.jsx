// src/components/Auskari.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import '../style/Auskari.css';
import auskari1 from '../assets/auskari1.jpg';
import auskari2 from '../assets/auskari2.jpg';
import auskari3 from '../assets/auskari3.jpg';
import auskari4 from '../assets/auskari4.jpg';

function Auskari() {
    const [cartItems, setCartItems] = useState([]);
    const [sessionId, setSessionId] = useState(null); // State for session ID

    useEffect(() => {
        // Check if a session ID cookie exists
        let existingSessionId = Cookies.get('session_id');
        
        if (!existingSessionId) {
            // Create a new session ID if it doesn't exist
            existingSessionId = `session_${Date.now()}`; // Simple session ID generation
            Cookies.set('session_id', existingSessionId, { expires: 7 }); // Set cookie for 7 days
        }

        setSessionId(existingSessionId);
    }, []); // Run once on mount

    const addToCart = async (item) => {
        console.log('Current session ID:', sessionId);
        console.log('Item name:', item.name); // For debugging
    
        if (!sessionId) {
            console.error('Session ID is not set');
            return;
        }
    
        // Construct the image name based on the product name
        const imageName = item.name.toLowerCase(); // Convert to lowercase
        const productData = {
            product_id: item.id,
            quantity: 1,
            session_id: sessionId,
            image: imageName, // Use the constructed image name
            price: item.price
        };
        console.log('Payload to API:', productData);
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cart', productData);
            console.log(response.data);
            setCartItems([...cartItems, item]);
        } catch (error) {
            if (error.response) {
                console.error('Error adding to cart', error.response.data);
            } else {
                console.error('Error adding to cart', error.message);
            }
        }
    };

    const products = [
        { id: 5, name: 'Epoksīda sveķu auskari ar sudraba folliju', price: '8.00', image: auskari1, description: 'Eleganti auskari ar sudraba folliju' },
        { id: 6, name: 'Auskari ar kaltētiem ziediem', price: '10.00', image: auskari2, description: 'Auskari ar skaistiem kaltētiem ziediem' },
        { id: 7, name: 'Auskari kas atgādinās par vasaru pat ziemā', price: '16.99', image: auskari3, description: 'Gaiši un krāsaini auskari' },
        { id: 8, name: 'Auskari spilgtiem cilvēkiem', price: '18.99', image: auskari4, description: 'Spilgti auskari pašizpausmei' }
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
