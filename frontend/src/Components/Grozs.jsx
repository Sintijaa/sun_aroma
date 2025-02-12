import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { loadStripe } from '@stripe/stripe-js';
import '../style/Grozs.css';
import kvarcs from '../assets/kvarcs.jpg';
import ametists from '../assets/ametists.jpg';
import ziepes1 from '../assets/ziepes1.jpg';
import ziepes2 from '../assets/ziepes2.jpg';
import aromats1 from '../assets/aromats1.jpg';
import aromats2 from '../assets/aromats2.jpg';
import aromats3 from '../assets/aromats3.jpg';
import auskari1 from '../assets/auskari1.jpg';
import auskari2 from '../assets/auskari2.jpg';
import auskari3 from '../assets/auskari3.jpg';
import auskari4 from '../assets/auskari4.jpg';


// Directly set your Stripe public key here
const stripePromise = loadStripe('pk_test_51QCz78AK9APTSCzIjO2H3llHeq54Wxg6NZZCS0Q2q18BgUUGmcZgQ5djVec0IVUK2Fr9x3df8gOa5p59Paut2Yqc00jkYLdi3t');

function Grozs() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            const sessionId = Cookies.get('session_id');
            if (sessionId) {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/cart', {
                        params: { session_id: sessionId },
                    });
                    console.log("Full Response:", response);
                    console.log("Cart Items Response:", response.data);
                    setCartItems(response.data);
                } catch (error) {
                    console.error('Error fetching cart items', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
        
        // Optionally send a request to the backend to update the cart
        const sessionId = Cookies.get('session_id');
        axios.post('http://127.0.0.1:8000/api/cart/remove', {
            session_id: sessionId,
            product_id: productId,
        }).catch(error => {
            console.error('Error removing item from cart:', error);
        });
    };

    const handleCheckout = async () => {
        const items = cartItems.map(item => ({
            name: `Product ${item.product_id}`,
            price: Number(item.price),
            quantity: item.quantity,
        }));
    
        // Calculate total amount in cents (ensure it's an integer)
        const totalAmount = Math.round(items.reduce((total, item) => total + (item.price * item.quantity), 0) * 100);
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create-checkout-session', {
                items: items,
                amount: totalAmount, // Pass the total amount here
            });
    
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId: response.data.id });
    
            if (error) {
                console.error('Error redirecting to checkout:', error);
            } else {
                // Clear the cart after successful redirect
                await axios.post('http://127.0.0.1:8000/api/clear-cart', {
                    session_id: Cookies.get('session_id'),
                });
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };
    
    
    
    

    const productImages = {
        kvarcs: kvarcs,
        ametists: ametists,
        ziepes1: ziepes1,
        ziepes2: ziepes2,
        aromats1: aromats1,
        aromats2: aromats2,
        aromats3: aromats3,
        auskari1: auskari1,
        auskari2: auskari2,
        auskari3: auskari3,
        auskari4: auskari4,

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
                                {/* <p>Produkta ID: {item.product_id}</p> */}
                                {item.image ? (
                                    <img src={productImages[item.image.toLowerCase()]} alt={item.image} />
                                ) : (
                                    <p>Attēls nav pieejams</p>
                                )}
                                <p>Daudzums: {item.quantity}</p>
                                <p>Cena: {isNaN(Number(item.price)) ? '0.00' : Number(item.price).toFixed(2)} EUR</p>
                                <button className='remove-from-cart' onClick={() => removeFromCart(item.product_id)}>Izņemt</button>
                            </div>
                        ))
                    ) : (
                        <p className="empty-cart-message">Grozam nav pievienotas preces :(</p>
                    )}
                </div>
            )}

            {cartItems.length > 0 && (
                <button onClick={handleCheckout} className="checkout-button">
                    Pabeigt pasūtījumu
                </button>
            )}
        </div>
    );
}

export default Grozs;
