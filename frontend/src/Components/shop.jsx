import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Shop.css';
import epoksids from '../assets/epoksids.jpg';
import sveces from '../assets/sveces.jpg';
import burti from '../assets/burti.jpg';
import ziepes from '../assets/ziepes.jpg';
import aromats1 from '../assets/aromats1.jpg';
import auskari2 from '../assets/auskari2.jpg';
import Cookies from 'js-cookie';

// Category data for easy management
const categories = [
  { id: 'sveces', name: 'Sveces', image: sveces, path: '/Sveces' },
  { id: 'burti', name: 'Epoksīda burti', image: burti, path: '/burti' },
  { id: 'ziepes', name: 'Ziepes no kazas piena bāzes', image: ziepes, path: '/ziepes' },
  { id: 'aromati', name: 'Mājas un automašīnas aromāti', image: aromats1, path: '/aromati' },
  { id: 'auskari', name: 'Rotas no epoksīda sveķiem', image: auskari2, path: '/auskari' }
];

function Shop() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Get cart count from cookies when component mounts
    const count = Cookies.get('cart_items_count') || 0;
    setCartItemsCount(Number(count));
  }, []);

  return (
    <div className="shop-container">
      {/* Modern header with responsive navigation */}
      <header className="shop-header">
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
            <Link to="/shop" className="nav-link active">Veikals</Link>
          </nav>
        </div>
        
        <div className="cart-container">
          <Link to="/grozs" className="cart-link">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cartItemsCount}</span>
          </Link>
        </div>
      </header>

      <main className="shop-main">
        <section className="categories-section">
          <h1 className="section-title">Mūsu kategorijas</h1>
          
          <div className="categories-grid">
            {categories.map(category => (
              <Link to={category.path} key={category.id} className="category-card">
                <div className="category-image-container">
                  <img src={category.image} alt={category.name} className="category-image" />
                </div>
                <div className="category-overlay">
                  <h3 className="category-name">{category.name}</h3>
                  <span className="category-cta">Apskatīt</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        <section className="featured-section">
          <h2 className="section-title">Populārākie produkti</h2>
          <div className="featured-products">
            {/* You can add a few featured products here */}
          </div>
        </section>
      </main>

      <footer className="shop-footer">
        <p>© 2025 Sun Aroma</p>
      </footer>
    </div>
  );
}

export default Shop;