import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../style/Sveces.css';
import kvarcs from '../assets/kvarcs.jpg';
import ametists from '../assets/ametists.jpg';

function Sveces() {
    const [cartCount, setCartCount] = useState(0);
    const [sessionId, setSessionId] = useState(null);
    const [selectedAromats, setSelectedAromats] = useState({});
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [debug, setDebug] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    const addToCart = async (item) => {
        if (!sessionId) {
            showNotification('Sesijas ID nav iestatīts', 'error');
            return;
        }

        setLoading(true);

        const productData = {
            product_id: parseInt(item.id, 10),
            quantity: quantities[item.id] || 1,
            session_id: sessionId,
            price: parseFloat(item.price),
            image: item.name
        };

        setDebug(productData);

        try {
            console.log('Sending cart data:', productData);
            
            const response = await axios.post('http://127.0.0.1:8000/api/cart', productData);
            console.log('Server response:', response.data);
            
            const updatedCartCount = cartCount + (quantities[item.id] || 1);
            setCartCount(updatedCartCount);
            localStorage.setItem('cartCount', updatedCartCount.toString());
            showNotification('Prece pievienota grozam!');
        } catch (error) {
            console.error('Kļūda pievienojot grozam:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                
                let errorMessage = 'Kļūda pievienojot grozam';
                if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
                showNotification(errorMessage, 'error');
            } else {
                showNotification('Neizdevās savienoties ar serveri', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (id, change) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) + change, 1)
        }));
    };

    // Produktu dati, kas tiek rādīti lapā
    const products = [
        { id: 1, name: 'Kvarcs', price: '10.00', image: kvarcs, description: 'Sojas vaska svece ar dabīgiem akmeņiem - Kvarcs' },
        { id: 2, name: 'Ametists', price: '10.00', image: ametists, description: 'Sojas vaska svece ar dabīgiem akmeņiem - Ametists' }
    ];

    return (
        <div className="sveces-page">
            {/* Modern header with responsive navigation */}
            <header className="site-header">
                <div className="header-container">
                    <div className="logo-container">
                        <Link to="/" className="logo-link">
                            <span className="logo-text">Sun Aroma</span>
                        </Link>
                    </div>
                    
                    <div className="navigation-container">
                        <button 
                            className="menu-toggle"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className="menu-icon"></span>
                        </button>
                        
                        <nav className={`main-nav ${isMenuOpen ? 'nav-open' : ''}`}>
                            <Link to="/" className="nav-link">Sākums</Link>
                            <Link to="/shop" className="nav-link">Veikals</Link>
                        </nav>
                    </div>
                    
                    <div className="cart-container">
                        <Link to="/grozs" className="cart-link">
                            <span className="cart-icon">🛒</span>
                            <span className="cart-count">{cartCount}</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Notification system */}
            {notification.show && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            {/* Page banner */}
            <section className="page-banner">
                <div className="banner-content">
                    <h1>Dizaina sveces</h1>
                    <p>Unikālas sojas vaska sveces ar dabīgiem akmeņiem</p>
                </div>
            </section>

            {/* Debug information - only shown during development */}
            {debug && (
                <div className="debug-info">
                    <h3>Debug Information (Remove in production)</h3>
                    <pre>{JSON.stringify(debug, null, 2)}</pre>
                </div>
            )}

            {/* Product listing */}
            <section className="products-section">
                <div className="container">
                    <div className="products-grid">
                        {products.map((product) => (
                            <div key={product.id} className="product-card">
                                <div className="product-media">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="product-image" 
                                        loading="lazy"
                                    />
                                </div>
                                <div className="product-content">
                                    <h2 className="product-title">{product.name}</h2>
                                    <p className="product-price">{product.price} €</p>
                                    <p className="product-description">{product.description}</p>

                                    <div className="product-form">
                                        <div className="form-group">
                                            <label>Daudzums:</label>
                                            <div className="quantity-control">
                                                <button 
                                                    onClick={() => handleQuantityChange(product.id, -1)} 
                                                    className="quantity-btn decrease"
                                                    aria-label="Samazināt daudzumu"
                                                >
                                                    −
                                                </button>
                                                <span className="quantity-display">{quantities[product.id] || 1}</span>
                                                <button 
                                                    onClick={() => handleQuantityChange(product.id, 1)} 
                                                    className="quantity-btn increase"
                                                    aria-label="Palielināt daudzumu"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <button 
                                            className={`add-to-cart-btn ${loading ? 'loading' : ''}`}
                                            onClick={() => addToCart(product)}
                                            disabled={loading}
                                        >
                                            {loading ? 'Pievieno...' : 'Pievienot grozam'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="site-footer">
                <div className="container">
                    <p>© 2025 Sun Aroma</p>
                </div>
            </footer>
        </div>
    );
}

export default Sveces;