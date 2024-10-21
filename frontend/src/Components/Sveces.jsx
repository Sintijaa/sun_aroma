// src/components/Sveces.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import the js-cookie library
import '../style/Sveces.css';
import kvarcs from '../assets/kvarcs.jpg';
import ametists from '../assets/ametists.jpg';

function Sveces() {
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
        if (!sessionId) {
            console.error('Session ID is not set');
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
            console.log(response.data.message); // Response from the backend
        } catch (error) {
            if (error.response) {
                console.error('Error adding to cart', error.response.data);
            } else {
                console.error('Error adding to cart', error.message);
            }
        }
    };
    
    const products = [
        { id: 1, name: 'Kvarcs', price: '15.99 EUR', image: kvarcs, description: 'Sojas vaska svece ar dabīgiem akmeņiem - Kvarcs' },
        { id: 2, name: 'Ametists', price: '19.99 EUR', image: ametists, description: 'Sojas vaska svece ar dabīgiem akmeņiem - Ametists' }
    ];

    return (
        <div className="sveces-container">
            <Link to="/shop" className="home-button">Sākums</Link>
            <Link to="/grozs" className="view-cart-button">Skatīt grozu ({cartItems.length})</Link>

            <h1>Dizaina sveces</h1>
            <div className="galerija">
                {products.map((product) => (
                    <div key={product.id} className="svece-item">
                        <img src={product.image} alt={product.name} className="svece-bilde" />
                        <div className="svece-info">
                            <p className="svece-name">{product.name}</p>
                            <p className="svece-price">{product.price}</p>
                            <p className="svece-description">{product.description}</p>
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

export default Sveces;
