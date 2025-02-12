import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../style/Aromati.css';
import aromats1 from '../assets/aromats1.jpg';
import aromats2 from '../assets/aromats2.jpg';
import aromats3 from '../assets/aromats3.jpg';

function Aromati() {
    const [cartCount, setCartCount] = useState(0);
    const [sessionId, setSessionId] = useState(null);
    const [selectedAromats, setSelectedAromats] = useState({});
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        let existingSessionId = Cookies.get('session_id');
        if (!existingSessionId) {
            existingSessionId = `session_${Date.now()}`;
            Cookies.set('session_id', existingSessionId, { expires: 7 });
        }
        setSessionId(existingSessionId);

        // Load initial cart count from localStorage or set to 0
        const initialCartCount = parseInt(localStorage.getItem('cartCount')) || 0;
        setCartCount(initialCartCount);
    }, []);

    const addToCart = async (item) => {
        if (!sessionId) {
            console.error('Sesijas ID nav iestatīts');
            return;
        }

        const productData = {
            product_id: parseInt(item.id, 10),
            quantity: quantities[item.id] || 1,
            session_id: sessionId,
            price: parseFloat(item.price),
            // selected_aromats: selectedAromats[item.id] || item.name,
            image: item.alt
        };

        console.log(productData);

        try {
            await axios.post('http://127.0.0.1:8000/api/cart', productData);
            const updatedCartCount = cartCount + (quantities[item.id] || 1);
            setCartCount(updatedCartCount);
            localStorage.setItem('cartCount', updatedCartCount.toString());

        } catch (error) {
            console.error('Kļūda pievienojot grozam', error.response ? error.response.data : error.message);
        }
    };

    const handleQuantityChange = (id, change) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) + change, 1)
        }));
    };

    const handleAromatsChange = (id, aromats) => {
        setSelectedAromats((prev) => ({
            ...prev,
            [id]: aromats
        }));
    };

    const products = [
        {
            id: 9,
            name: "Mājas aromāts",
            alt: "aromats1",
            image: aromats1,
            description: "Mājas aromāts 50ml",
            price: "10.00",
            aromati: ["Ābols", "Plūme un rabarbers", "Tabaka un dzinatrs", "Mellene", "Upene", "Ķirsis", "Ambra", "Peonija" ] 
        },
        {
            id: 10,
            name: "Izsmidzināms mājas aromāts",
            alt: "aromats2",
            image: aromats2,
            description: "Izsmidzināms mājas aromāts ar 11 dažādiem aromātiem",
            price: "6.00",
            aromati: ["Ābols", "Plūme un rabarbers", "Tabaka un dzinatrs", "Mellene", "Upene", "Ķirsis", "Ambra", "Peonija" ]
        },
        {
            id: 11,
            name: "Skapja / automašīnas aromāts",
            alt: "aromats3",
            image: aromats3,
            description: "Aromāts ko vari iekarināt automašīnā vai skapī",
            price: "4.00",
            aromati: ["Ābols", "Plūme un rabarbers", "Tabaka un dzinatrs", "Mellene", "Upene", "Ķirsis", "Ambra", "Peonija" ]
        }
    ];

    return (
        <div className="aromati-container">
            <Link to="/shop" className="home-button">Sākums</Link>
            <Link to="/grozs" className="view-cart-button">Skatīt grozu ({cartCount})</Link>

            <h1>Mājas un automašīnas aromāti</h1>
            <div className="galerija">
                {products.map((product) => (
                    <div key={product.id} className="aromats-item">
                        {/* {product.name === "Skapja / automašīnas aromāts" && (
                            <div className="sold-out-circle">Izpārdots</div>
                        )} */}
                        <img src={product.image} alt={product.name} className="aromats-bilde" />
                        <div className="aromats-info">
                            <p className="aromats-apraksts">{product.name}</p>
                            <p className="aromats-price">{product.price}</p>
                            <p className="aromats-description">{product.description}</p>

                            <select
                                className="aromats-select"
                                value={selectedAromats[product.id] || product.name}
                                onChange={(e) => handleAromatsChange(product.id, e.target.value)}
                            >
                                {product.aromati.map((aromats, index) => (
                                    <option key={index} value={aromats}>{aromats}</option>
                                ))}
                            </select>

                            <div className="quantity-container">
                                <div className="quantity-controls">
                                    <button 
                                        onClick={() => handleQuantityChange(product.id, -1)} 
                                        className="quantity-button"
                                    >
                                        -
                                    </button>
                                    <span className="quantity-display">{quantities[product.id] || 1}</span>
                                    <button 
                                        onClick={() => handleQuantityChange(product.id, 1)} 
                                        className="quantity-button"
                                    >
                                        +
                                    </button>
                                </div>
                                <button 
                                    className="add-to-cart-button" 
                                    onClick={() => addToCart(product)}
                                    // disabled={product.name === "Skapja / automašīnas aromāts"}
                                >
                                    Pievienot grozam
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Aromati;
