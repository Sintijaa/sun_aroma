import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Aromati.css';
import aromats1 from '../assets/aromats1.jpg';
import aromats2 from '../assets/aromats2.jpg';
import aromats3 from '../assets/aromats3.jpg';

function Aromati() {
    const products = [
        {
            id: 1,
            name: "Mājas aromāts",
            image: aromats1,
            description: "Mājas aromāts 50ml",
            price: "10.00 EUR"
        },
        {
            id: 2,
            name: "Izsmidzināms mājas aromāts",
            image: aromats2,
            description: "Izsmidzināms mājas aromāts ar 11 dažādiem aromātiem",
            price: "6.00 EUR"
        },
        {
            id: 3,
            name: "Skapja / automašīnas aromāts",
            image: aromats3,
            description: "Aromāts ko vari iekarināt automašīnā vai skapī",
            price: "4.00 EUR"
        }
    ];

    const addToCart = (item) => {
        // Implement logic to add the product to the shopping cart
        console.log(`${item.name} pievienots grozam!`);
    };

    return (
        <div className="aromati-container">
            <Link to="/shop" className="home-button">Sākums</Link>

            <h1>Mājas un automašīnas aromāti</h1>
            <div className="galerija">
                {products.map((product) => (
                    <div key={product.id} className="aromats-item">
                        {/* Pievienojam sarkano apli ar uzrakstu "Izpārdots" tikai skapja aromātam */}
                        {product.name === "Skapja / automašīnas aromāts" && (
                            <div className="sold-out-circle">Izpārdots</div>
                        )}
                        <img src={product.image} alt={product.name} className="aromats-bilde" />
                        <div className="aromats-info">
                            <p className="aromats-apraksts">{product.name}</p>
                            <p className="aromats-price">{product.price}</p>
                            <p className="aromats-description">{product.description}</p>
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

export default Aromati;
