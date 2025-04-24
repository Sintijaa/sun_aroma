import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import '../../style/Shop.css';
import epoksids from '../../assets/epoksids.jpg';
import sveces from '../../assets/sveces.jpg';
import burti from '../../assets/burti.jpg';
import ziepes from '../../assets/ziepes.jpg';
import aromats1 from '../../assets/aromats1.jpg';
import auskari2 from '../../assets/auskari2.jpg';
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
  // Stāvoklis, lai sekotu līdzi preču skaitam iepirkumu grozā
  const [cartItemsCount, setCartItemsCount] = useState(0);
  // Stāvoklis, lai kontrolētu mobilās izvēlnes redzamību
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect hooks izpildās, kad komponents tiek ielādēts
  useEffect(() => {
    // Iegūst groza preču skaitu no sīkdatnēm, kad komponents tiek ielādēts
    const count = Cookies.get('cart_items_count') || 0;
    setCartItemsCount(Number(count));
  }, []);

  return (
    <div className="shop-container">
      {/* Moderna galvene ar responsīvu navigāciju */}
      <header className="shop-header">
        {/* Logotipa sadaļa */}
        <div className="logo-container">
          <Link href="/" className="logo-link">
            <span className="logo-text">Sun Aroma</span>
          </Link>
        </div>
        
        {/* Navigācijas izvēlne */}
        <div className="navigation-container">
          {/* Mobilās izvēlnes pārslēgšanas poga */}
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="menu-icon"></span>
          </button>
          
          {/* Galvenās navigācijas saites - parāda/slēpj atkarībā no isMenuOpen stāvokļa */}
          <nav className={`main-nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link href="/" className="nav-link">Sākums</Link>
            <Link href="/shop" className="nav-link active">Veikals</Link>
          </nav>
        </div>
        
        {/* Iepirkumu grozs ar preču skaitu */}
        <div className="cart-container">
          <Link href="/grozs" className="cart-link">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cartItemsCount}</span>
          </Link>
        </div>
      </header>

      {/* Galvenā satura zona */}
      <main className="shop-main">
        {/* Kategoriju sadaļa ar režģa izkārtojumu */}
        <section className="categories-section">
          <h1 className="section-title">Mūsu kategorijas</h1>
          
          {/* Produktu kategoriju režģis */}
          <div className="categories-grid">
            {categories.map(category => (
              <Link href={category.path} key={category.id} className="category-card">
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
        
        {/* Populāro produktu sadaļa */}
        <section className="featured-section">
          <h2 className="section-title">Populārākie produkti</h2>
          <div className="featured-products">
            {/* Vieta populārākajiem produktiem */}
          </div>
        </section>
      </main>

      {/* Lapas kājene ar autortiesību informāciju */}
      <footer className="shop-footer">
        <p>© 2025 Sun Aroma</p>
      </footer>
    </div>
  );
}

export default Shop;