
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Shop.css';
import epoksids from '../assets/epoksids.jpg';
import sveces from '../assets/sveces.jpg';
import vasks from '../assets/vasks.jpg';
import burti from '../assets/burti.jpg';
import ziepes from '../assets/ziepes.jpg';
import aromats1 from '../assets/aromats1.jpg';
import auskari2 from '../assets/auskari2.jpg';
import Cookies from 'js-cookie'; // Import the js-cookie library

function Shop() {
  // Get the number of items in the cart from the cookie or local state
  const cartItemsCount = Cookies.get('cart_items_count') || 0;

  return (
    <div>
      <div className="top-left-button">
        <Link to="/">
          <button className="button home-button">Sākums</button>
        </Link>
      </div>

      <h1>Kategorijas</h1>
      
      {/* Cart Link with Item Count */}
      <div className="top-right-button">
        <Link to="/grozs">
          <button className="button cart-button">Grozs ({cartItemsCount})</button>
        </Link>
      </div>

      <div className="image-gallery">
        <div className="image-item">
          <Link to="/dekori">
            <img src={epoksids} alt="Epoksīds" />
            <div className="container">
              <button className="button type1">Epoksīda dekori</button>
            </div>
          </Link>
        </div>
        <div className="image-item">
          <Link to="/Sveces">
            <img src={sveces} alt="Sveces" />
            <div className="container">
              <button className="button type1">Sveces</button>
            </div>
          </Link>
        </div>
        <div className="image-item">
          <Link to="/vaski">
            <img src={vasks} alt="Vasks" />
            <div className="container">
              <button className="button type1">Aromātiskais vasks</button>
            </div>
          </Link>
        </div>
        <div className="image-item">
          <Link to="/burti">
            <img src={burti} alt="Burti" />
            <div className="container">
              <button className="button type1">Epoksīda burti</button>
            </div>
          </Link>
        </div>
        <div className="image-item">
          <Link to="/ziepes">
            <img src={ziepes} alt="Ziepes" />
            <div className="container">
              <button className="button type1">Ziepes no kazas piena bāzes</button>
            </div>
          </Link>
        </div>
        <div className="image-item">
          <Link to="/aromati">
            <img src={aromats1} alt="Aromāts" />
            <div className="container">
              <button className="button type1">Mājas un automašīnasa aromāti</button>
            </div>
          </Link>
        </div>
        <div className="image-item">
          <Link to="/auskari">
            <img src={auskari2} alt="Auskari" />
            <div className="container">
              <button className="button type1">Rotas no epoksīda sveķiem</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Shop;
