
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Importēts js-cookie
import '../style/Ziepes.css';
import ziepes1 from '../assets/ziepes1.jpg';
import ziepes2 from '../assets/ziepes2.jpg';


function Ziepes() {
    const [cartItems, setCartItems] = useState([]);
    const [sessionId, setSessionId] = useState(null); // Sesijas ID
    const { cartCount, updateCartCount } = useCartCount();


    useEffect(() => {
        // Pārbauda, vai sesijas ID cookie pastāv
        let existingSessionId = Cookies.get('session_id');
        
        if (!existingSessionId) {
            // Izveido jaunu sesijas ID, ja tāds nepastāv
            existingSessionId = `session_${Date.now()}`;
            Cookies.set('session_id', existingSessionId, { expires: 7 }); // Saglabā sesijas cookie uz 7 dienām
        }

        setSessionId(existingSessionId);
    }, []); // Izpilda vienreiz pēc komponenta montēšanas

    const addToCart = async (item) => {
        if (!sessionId) {
            console.error('Sesijas ID nav iestatīts');
            return;
        }

        const productData = {
            product_id: item.id,
            quantity: 1,
            session_id: sessionId,
            price: item.price
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cart', productData);
            setCartItems([...cartItems, item]);
            console.log(response.data.message);
            
            // Atjaunina groza skaitu
            updateCartCount(cartCount + 1);
        } catch (error) {
            if (error.response) {
                console.error('Kļūda pievienojot grozam', error.response.data);
            } else {
                console.error('Kļūda pievienojot grozam', error.message);
            }
        }
    };

    const products = [
        { id: 3, name: 'Ziepes ar kafiju', price: '5.00', image: ziepes1, description: 'Ziepes ar kafiju kas būs kā skrubis, ziepēm ir pievienota dabīgas apelsīna ēteriksā eļļa' },
        { id: 4, name: 'Ziepes ar kaltētu piparmētru', price: '5.00', image: ziepes2, description: 'Ziepes ar kaltētu piparmētu un ar pirparmētras ēterisko eļlu' },
       
    ];

    return (
        <div className="ziepes-container">
            <Link to="/shop" className="home-button">Sākums</Link>
            <Link to="/grozs" className="view-cart-button">Skatīt grozu ({cartCount})</Link>

            <h1>Dabīgas ziepes</h1>
            <div className="galerija">
                {products.map((product) => (
                    <div key={product.id} className="ziepes-item">
                        <img src={product.image} alt={product.name} className="ziepes-bilde" />
                        <div className="ziepes-info">
                            <p className="ziepes-name">{product.name}</p>
                            <p className="ziepes-price">{product.price}</p>
                            <p className="ziepes-description">{product.description}</p>
                            <button 
                                className="add-to-cart-button" 
                                onClick={() => addToCart(product)}
                            >
                                Pievienot grozam
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Ziepes;
