import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../style/Ziepes.css';
import ziepes1 from '../../assets/ziepes1.jpg';
import ziepes2 from '../../assets/ziepes2.jpg';

// Ziepes komponente, kas attēlo dabīgo ziepju produktu lapu
function Ziepes() {
    // Stāvokļi, lai uzglabātu dažādus datus un lietotāja interakcijas
    const [cartCount, setCartCount] = useState(0); // Groza preču skaits
    const [sessionId, setSessionId] = useState(null); // Lietotāja sesijas ID
    const [selectedType, setSelectedType] = useState({}); // Izvēlētie ziepju veidi
    const [quantities, setQuantities] = useState({}); // Preču daudzumi
    const [loading, setLoading] = useState(false); // Ielādes statuss
    const [notification, setNotification] = useState({ show: false, message: '', type: '' }); // Paziņojumu stāvoklis
    const [debug, setDebug] = useState(null); // Atkļūdošanas informācija
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobilās izvēlnes statuss

    // Tiek izpildīts, kad komponente tiek ielādēta
    useEffect(() => {
        // Pārbauda vai jau ir sesijas ID, ja nav - izveido jaunu
        let existingSessionId = Cookies.get('session_id');
        if (!existingSessionId) {
            existingSessionId = `session_${Date.now()}`;
            Cookies.set('session_id', existingSessionId, { expires: 7 });
        }
        setSessionId(existingSessionId);

        // Ielādē sākotnējo groza preču skaitu no localStorage vai iestata 0
        const initialCartCount = parseInt(localStorage.getItem('cartCount')) || 0;
        setCartCount(initialCartCount);
    }, []);

    // Funkcija paziņojumu parādīšanai
    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    // Funkcija preces pievienošanai grozam
    const addToCart = async (item) => {
        if (!sessionId) {
            showNotification('Sesijas ID nav iestatīts', 'error');
            return;
        }

        setLoading(true);

        // Sagatavo preces datus nosūtīšanai
        const productData = {
            product_id: parseInt(item.id, 10),
            quantity: quantities[item.id] || 1,
            session_id: sessionId,
            price: parseFloat(item.price),
            selected_type: selectedType[item.id] || item.types[0],
            image: item.alt
        };

        setDebug(productData);

        try {
            console.log('Sending cart data:', productData);
            
            // Nosūta datus uz serveri
            const response = await axios.post('/cart', productData);
            console.log('Server response:', response.data);
            
            // Atjaunina groza preču skaitu
            const updatedCartCount = cartCount + (quantities[item.id] || 1);
            setCartCount(updatedCartCount);
            localStorage.setItem('cartCount', updatedCartCount.toString());
            showNotification('Prece pievienota grozam!');
        } catch (error) {
            console.error('Kļūda pievienojot grozam:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                
                // Apstrādā kļūdas paziņojumu
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

    // Funkcija preču daudzuma izmaiņai
    const handleQuantityChange = (id, change) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) + change, 1)
        }));
    };

    // Funkcija ziepju veida izmaiņai
    const handleTypeChange = (id, type) => {
        setSelectedType((prev) => ({
            ...prev,
            [id]: type
        }));
    };

    // Produktu dati, kas tiek rādīti lapā
    const products = [
        {
            id: 3,
            name: "Ziepes ar kafiju",
            alt: "ziepes1",
            image: ziepes1,
            description: "Ziepes ar kafiju kas būs kā skrubis, ziepēm ir pievienota dabīgas apelsīna ēteriskā eļļa",
            price: "5.00",
            types: ["Ar aromātu", "Bez aromāta"]
        },
        {
            id: 4,
            name: "Ziepes ar kaltētu piparmētru",
            alt: "ziepes2",
            image: ziepes2,
            description: "Ziepes ar kaltētu piparmētu un ar pirparmētras ēterisko eļlu",
            price: "5.00",
            types: ["Ar aromātu", "Bez aromāta"]
        },
    ];

    return (
        <div className="ziepes-page">
            {/* Moderna galvene ar responsīvu navigāciju */}
            <header className="site-header">
                <div className="header-container">
                    {/* Logotips un mājas lapas saite */}
                    <div className="logo-container">
                        <Link href="/" className="logo-link">
                            <span className="logo-text">Sun Aroma</span>
                        </Link>
                    </div>
                    
                    {/* Navigācijas izvēlne */}
                    <div className="navigation-container">
                        {/* Poga mobilās izvēlnes atvēršanai/aizvēršanai */}
                        <button 
                            className="menu-toggle"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className="menu-icon"></span>
                        </button>
                        
                        {/* Galvenā navigācija */}
                        <nav className={`main-nav ${isMenuOpen ? 'nav-open' : ''}`}>
                            <Link href="/" className="nav-link">Sākums</Link>
                            <Link href="/shop" className="nav-link">Veikals</Link>
                        </nav>
                    </div>
                    
                    {/* Groza ikona ar preču skaitu */}
                    <div className="cart-container">
                        <Link href="/grozs" className="cart-link">
                            <span className="cart-icon">🛒</span>
                            <span className="cart-count">{cartCount}</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Paziņojumu sistēma */}
            {notification.show && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            {/* Lapas baners */}
            <section className="page-banner">
                <div className="banner-content">
                    <h1>Dabīgās ziepes</h1>
                    <p>Roku darbs ar dabīgām sastāvdaļām un ēteriskām eļļām</p>
                </div>
            </section>


            {/* Produktu saraksts */}
            <section className="products-section">
                <div className="container">
                    <div className="products-grid">
                        {/* Cikls caur visiem produktiem */}
                        {products.map((product) => (
                            <div key={product.id} className="product-card">
                                {/* Produkta attēls */}
                                <div className="product-media">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="product-image" 
                                        loading="lazy"
                                    />
                                </div>
                                {/* Produkta informācija */}
                                <div className="product-content">
                                    <h2 className="product-title">{product.name}</h2>
                                    <p className="product-price">{product.price} €</p>
                                    <p className="product-description">{product.description}</p>

                                    {/* Produkta pievienošanas forma */}
                                    <div className="product-form">
                                        {/* Ziepju veida izvēle */}
                                        <div className="form-group">
                                            <label htmlFor={`type-select-${product.id}`}>
                                                Izvēlieties veidu:
                                            </label>
                                            <div className="select-wrapper">
                                                <select
                                                    id={`type-select-${product.id}`}
                                                    value={selectedType[product.id] || product.types[0]}
                                                    onChange={(e) => handleTypeChange(product.id, e.target.value)}
                                                >
                                                    {product.types.map((type, index) => (
                                                        <option key={index} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Daudzuma kontroles */}
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

                                        {/* Pievienot grozam poga */}
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

            {/* Lapas kājene */}
            <footer className="site-footer">
                <div className="container">
                    <p>© 2025 Sun Aroma</p>
                </div>
            </footer>
        </div>
    );
}

export default Ziepes;