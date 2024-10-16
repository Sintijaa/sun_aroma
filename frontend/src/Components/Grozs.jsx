import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import the js-cookie library
import '../style/Grozs.css';

function Grozs({ removeFromCart }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchCartItems = async () => {
            const sessionId = Cookies.get('session_id'); // Get session ID from cookies
            console.log("Session ID:", sessionId); // Log session ID

            if (sessionId) {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/cart', {
                        params: { session_id: sessionId },
                    });
                    console.log("Response data:", response.data); // Log response data
                    setCartItems(response.data); // Set cart items from response
                } catch (error) {
                    console.error('Error fetching cart items', error);
                } finally {
                    setLoading(false); // Stop loading
                }
            } else {
                console.log("No session ID found."); // Log if no session ID
                setLoading(false); // Stop loading if no session ID
            }
        };

        fetchCartItems();
    }, []); // Run once on mount

    return (
        <div className="grozs-container">
            <h2>Grozs</h2>
            <Link to="/" className="continue-shopping-button">Turpināt iepirkties</Link>

            {loading ? ( // Show loading state
                <p>Loading cart items...</p>
            ) : (
                <div className="cart-items">
                    {cartItems.length > 0 ? (
                    cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                        <p>Produkta ID: {item.product_id}</p>
                        <p>Daudzums: {item.quantity}</p>
                <p>Cena: {item.price} EUR</p>
            <button onClick={() => removeFromCart(item.product_id)}>Izņemt</button>
        </div>
    ))
) : (
    <p className="empty-cart-message">Grozs ir tukšs</p>
)}
                </div>
            )}
        </div>
    );
}

export default Grozs;
