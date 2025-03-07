import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { loadStripe } from '@stripe/stripe-js';
import '../style/Grozs.css';

// Import images
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

// Stripe public key
const stripePromise = loadStripe('pk_test_51QCz78AK9APTSCzIjO2H3llHeq54Wxg6NZZCS0Q2q18BgUUGmcZgQ5djVec0IVUK2Fr9x3df8gOa5p59Paut2Yqc00jkYLdi3t');

function Grozs() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            const sessionId = Cookies.get('session_id');
            if (sessionId) {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/cart', {
                        params: { session_id: sessionId },
                    });
                    setCartItems(response.data);
                    
                    // Calculate total
                    const cartTotal = response.data.reduce(
                        (sum, item) => sum + (Number(item.price) * item.quantity), 
                        0
                    );
                    setTotal(cartTotal);
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

    const removeFromCart = async (productId) => {
        try {
            const sessionId = Cookies.get('session_id');
            await axios.post('http://127.0.0.1:8000/api/cart/remove', {
                session_id: sessionId,
                product_id: productId,
            });
            
            // Update local state
            const updatedCart = cartItems.filter(item => item.product_id !== productId);
            setCartItems(updatedCart);
            
            // Recalculate total
            const newTotal = updatedCart.reduce(
                (sum, item) => sum + (Number(item.price) * item.quantity), 
                0
            );
            setTotal(newTotal);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        
        try {
            // Update local state first for immediate UI feedback
            const updatedCart = cartItems.map(item => 
                item.product_id === productId 
                    ? { ...item, quantity: newQuantity } 
                    : item
            );
            setCartItems(updatedCart);
            
            // Recalculate total
            const newTotal = updatedCart.reduce(
                (sum, item) => sum + (Number(item.price) * item.quantity), 
                0
            );
            setTotal(newTotal);
            
            // Update on server
            const sessionId = Cookies.get('session_id');
            await axios.post('http://127.0.0.1:8000/api/cart/update', {
                session_id: sessionId,
                product_id: productId,
                quantity: newQuantity
            });
        } catch (error) {
            console.error('Error updating quantity:', error);
            // Revert to original state if there's an error
            fetchCartItems();
        }
    };

    const handleCheckout = async () => {
        setIsProcessing(true);
        
        const items = cartItems.map(item => ({
            name: `Product ${item.product_id}`,
            price: Number(item.price),
            quantity: item.quantity,
        }));
    
        // Calculate total amount in cents
        const totalAmount = Math.round(total * 100);
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create-checkout-session', {
                items: items,
                amount: totalAmount,
            });
    
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ 
                sessionId: response.data.id 
            });
    
            if (error) {
                console.error('Error redirecting to checkout:', error);
                setIsProcessing(false);
            } else {
                // Clear the cart after successful redirect
                await axios.post('http://127.0.0.1:8000/api/clear-cart', {
                    session_id: Cookies.get('session_id'),
                });
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            setIsProcessing(false);
        }
    };

    const productImages = {
        kvarcs, ametists, ziepes1, ziepes2, 
        aromats1, aromats2, aromats3,
        auskari1, auskari2, auskari3, auskari4,
    };

    const formatPrice = (price) => {
        if (isNaN(Number(price))) return '0.00';
        return Number(price).toFixed(2);
    };

    return (
        <div className="cart-page">
            <div className="cart-header">
                <h1>GROZS</h1>
                <Link to="/shop" className="continue-shopping">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Turpināt iepirkties
                </Link>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Ielādē produktus...</p>
                </div>
            ) : cartItems.length > 0 ? (
                <div className="cart-content">
                    <div className="cart-items-container">
                        <div className="cart-items-header">
                            <span className="header-product">Produkts</span>
                            <span className="header-price">Cena</span>
                            <span className="header-quantity">Daudzums</span>
                            <span className="header-total">Kopā</span>
                            <span className="header-actions"></span>
                        </div>
                        
                        {cartItems.map(item => (
                            <div key={item.product_id} className="cart-item">
                                <div className="item-product">
                                    {item.image ? (
                                        <img 
                                            src={productImages[item.image.toLowerCase()]} 
                                            alt={item.image} 
                                            className="item-image"
                                        />
                                    ) : (
                                        <div className="item-image-placeholder">
                                            Nav attēla
                                        </div>
                                    )}
                                    <span className="item-name">Produkts {item.product_id}</span>
                                </div>
                                
                                <span className="item-price">
                                    {formatPrice(item.price)} €
                                </span>
                                
                                <div className="item-quantity">
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        aria-label="Samazināt daudzumu"
                                    >
                                        −
                                    </button>
                                    <span className="quantity-value">{item.quantity}</span>
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                        aria-label="Palielināt daudzumu"
                                    >
                                        +
                                    </button>
                                </div>
                                
                                <span className="item-total">
                                    {formatPrice(item.price * item.quantity)} €
                                </span>
                                
                                <button 
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.product_id)}
                                    aria-label="Izņemt produktu"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                                        <line x1="10" y1="11" x2="10" y2="17"/>
                                        <line x1="14" y1="11" x2="14" y2="17"/>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className="cart-summary">
                        <div className="summary-header">
                            <h2>Pasūtījuma kopsavilkums</h2>
                        </div>
                        <div className="summary-row">
                            <span>Kopējā summa:</span>
                            <span className="summary-total">{total.toFixed(2)} €</span>
                        </div>
                        <button 
                            onClick={handleCheckout} 
                            className="checkout-button"
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Apstrādā...' : 'Pabeigt pasūtījumu'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="empty-cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                    </svg>
                    <h2>Grozs ir tukšs</h2>
                    <p>Jūsu grozam nav pievienotas preces</p>
                    <Link to="/shop" className="shop-now-button">
                        Sākt iepirkties
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Grozs;