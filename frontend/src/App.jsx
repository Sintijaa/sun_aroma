// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './App.css';
import Shop from './Components/Shop';  
import Meistarklase from './Components/Meistarklase';
import Sveces from './Components/Sveces';
import Auskari from './Components/Auskari';
import Ziepes from './Components/Ziepes';
import Aromati from './Components/Aromati';
import PaymentForm from './Components/PaymentForm.jsx';
import Header from './Components/Header';
import ParMums from './Components/ParMums'; // Importējam ParMums komponenti

const stripePromise = loadStripe('YOUR_PUBLIC_KEY'); // Aizstājiet ar savu Stripe publisko atslēgu

function Home() {
  const navigate = useNavigate();

  return (
    <div className="background">
      <div className="content">
        <h1>Sun Aroma</h1>
        <button onClick={() => navigate('/shop')}>Doties uz veikalu</button>
        <button onClick={() => navigate('/meistarklase')}>Meistarklases</button>
        <button onClick={() => navigate('/piegade')}>Piegāde</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  );
}

// Izveidojam atsevišķu komponenti maršrutu pārvaldīšanai
function AppRoutes() {
  const location = useLocation(); // Tagad ir pareizajā vietā, iekš Router konteksta

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/meistarklase" element={<Meistarklase />} />
        <Route path="/sveces" element={<Sveces />} />
        <Route path="/auskari" element={<Auskari />} />
        <Route path="/ziepes" element={<Ziepes />} />
        <Route path="/aromati" element={<Aromati />} />
        <Route path="/payment" element={
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        } />
      </Routes>

      {/* Tikai zem sākumlapas maršruta rādām sadaļu ParMums */}
      {location.pathname === '/' && <ParMums />}
    </>
  );
}

export default App;
