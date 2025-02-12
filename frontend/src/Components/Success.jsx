import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'; // Add this import for navigation
import '../style/Success.css'; // Import your CSS file

const SuccessPage = () => {
    useEffect(() => {
        const clearCart = async () => {
            try {
                const sessionId = Cookies.get('session_id');
                if (sessionId) {
                    await axios.post('http://127.0.0.1:8000/api/clear-cart', {
                        session_id: sessionId,
                    });
                } else {
                    console.error('No session ID found.');
                }
            } catch (error) {
                console.error('Error clearing cart:', error);
            }
        };

        clearCart();
    }, []);

    return (
        <div className="success-container">
            <div className="success-message">
                <h1 className="success-title">Pladies par tavu pirkumu!</h1>
                {/* <p className="success-text">Your order has been successfully placed. We appreciate your business!</p> */}
                <Link to="/shop" className="success-button">Doties uz veikalu</Link>
            </div>
        </div>
    );
};

export default SuccessPage;
