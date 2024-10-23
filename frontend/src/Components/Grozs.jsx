import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import '../style/Grozs.css';

function Grozs() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchCartItems = async () => {
            const sessionId = Cookies.get('session_id'); 
            console.log("Session ID:", sessionId); 

            if (sessionId) {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/cart', {
                        params: { session_id: sessionId },
                    });
                    console.log("Response data:", response.data); 
                    setCartItems(response.data); 
                } catch (error) {
                    console.error('Error fetching cart items', error);
                } finally {
                    setLoading(false); 
                }
            } else {
                console.log("No session ID found."); 
                setLoading(false); 
            }
        };

        fetchCartItems();
    }, []); 

    const removeFromCart = async (productId) => {
        const sessionId = Cookies.get('session_id'); 
        if (!sessionId) {
            console.error('No session ID found');
            return;
        }

        try {
            // Send a DELETE request to the backend to remove the item
            await axios.delete('http://127.0.0.1:8000/api/cart', {
                data: { session_id: sessionId, product_id: productId }
            });

            // Update the cart items state
            setCartItems(cartItems.filter(item => item.product_id !== productId)); 
            console.log(`Product with ID ${productId} removed from cart`);
        } catch (error) {
            console.error('Error removing item from cart', error);
        }
    };

    return (
        <div className="grozs-container">
            <h2>Grozs</h2>
            <Link to="/shop" className="continue-shopping-button">Turpināt iepirkties</Link>

            {loading ? ( 
                <p>ielādē produktus...</p>
            ) : (
                <div className="cart-items">
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <div key={item.product_id} className="cart-item">
                                <p>Produkta ID: {item.product_id}</p>
                                <p>Daudzums: {item.quantity}</p>
                                <p>Cena: {item.price.toFixed(2)} EUR</p>
                                <button onClick={() => removeFromCart(item.product_id)}>Izņemt</button>
                            </div>
                        ))
                    ) : (
                        <p className="empty-cart-message">Grozam nav pievienotas preces :(</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Grozs;
