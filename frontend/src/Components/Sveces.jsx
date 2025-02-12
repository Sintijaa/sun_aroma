import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../style/Sveces.css';
import kvarcs from '../assets/kvarcs.jpg';
import ametists from '../assets/ametists.jpg';

function Sveces() {
    // Stāvokļa mainīgie, lai saglabātu groza skaitu un sesijas ID
    const [cartCount, setCartCount] = useState(0);
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        // Pārbauda, vai sesijas ID jau pastāv cookies
        let existingSessionId = Cookies.get('session_id');
        
        // Ja nav esoša sesijas ID, izveido jaunu un saglabā cookies ar derīguma termiņu 7 dienas
        if (!existingSessionId) {
            existingSessionId = `session_${Date.now()}`;
            Cookies.set('session_id', existingSessionId, { expires: 7 });
        }
        
        // Iestata sesijas ID stāvokli ar esošo vai jauno ID
        setSessionId(existingSessionId);

        // Iegūst saglabāto groza skaitu no localStorage (vai 0, ja nav saglabāts)
        const savedCartCount = parseInt(localStorage.getItem('cartCount')) || 0;
        setCartCount(savedCartCount);
    }, []);

    // Funkcija, lai pievienotu produktu grozam
    const addToCart = async (item) => {
        // Pārbauda, vai sesijas ID ir iestatīts
        if (!sessionId) {
            console.error('Session ID is not set');
            return;
        }
    
        // Sagatavo produkta datus, ko sūtīt API
        const productData = {
            product_id: item.id,
            quantity: 1,
            session_id: sessionId,
            price: parseFloat(item.price), // Nodrošina, ka cena ir float tips
            image: item.name
        };

        console.log('Product Data to send:', productData);

        try {
            // Nosūta produkta datus uz API
            const response = await axios.post('http://127.0.0.1:8000/api/cart', productData);

            // Ja API atbilde ir veiksmīga, palielina groza skaitu un saglabā to localStorage
            if (response.status === 200) {
                const updatedCartCount = cartCount + 1;
                setCartCount(updatedCartCount);
                localStorage.setItem('cartCount', updatedCartCount); // Saglabā atjaunoto groza skaitu
            }
        } catch (error) {
            // Parāda kļūdu gadījumā, ja pievienošana grozam neizdodas
            console.error('Error adding to cart', error.response ? error.response.data : error.message);
        }
    };

    // Produktu dati, kas tiek rādīti lapā
    const products = [
        { id: 1, name: 'Kvarcs', price: '10.00', image: kvarcs, description: 'Sojas vaska svece ar dabīgiem akmeņiem - Kvarcs' },
        { id: 2, name: 'Ametists', price: '10.00', image: ametists, description: 'Sojas vaska svece ar dabīgiem akmeņiem - Ametists' }
    ];

    return (
        <div className="sveces-container">
            {/* Saites uz sākumlapu un grozu ar atjauninātu groza skaitu */}
            <Link to="/shop" className="home-button">Sākums</Link>
            <Link to="/grozs" className="view-cart-button">Skatīt grozu ({cartCount})</Link>

            <h1>Dizaina sveces</h1>
            <div className="galerija">
                {/* Produktu attēlošana un poga pievienošanai grozam */}
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
