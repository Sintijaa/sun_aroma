// src/App.jsx
import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './App.css';
import Shop from './Components/Shop';  
import Meistarklase from './Components/Meistarklase';
import Sveces from './Components/Sveces';
import Auskari from './Components/Auskari';
import Aromati from './Components/Aromati';
import Ziepes from './Components/Ziepes';
import Header from './Components/Header';
import Burti from './Components/Burti';
import ParMums from './Components/ParMums'; 
import Grozs from './Components/Grozs.jsx';
import SuccessPage from './Components/Success.jsx';
import EsAttels from './assets/es.jpg'; // Path to image - make sure this path is correct

function Home() {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="home-hero">
        <div className="home-content">
          <div className="home-image-container">
            <img src={EsAttels} alt="Sintija - Sun Aroma" className="home-image" />
          </div>
          <div className="home-text">
            <h1>Sun Aroma</h1>
            <div className="home-divider"></div>
            <p>
              Čau! Esmu Sintija un esmu radījusi uzņemumu <span className="highlight">Sun Aroma</span>. Tas ir kaut kas vairāk kā vienkārši uzņēmums, tas ir stāsts par skaistiem un dabīgiem porduktiem.
            </p>
            <p>
              Kur satiekas dabīgi produkti ar skaistu dizainu.
            </p>
            <p>
              Sun Aromas sākums bija sojas vaska sveces, bet tagad tas ir plašs klāsts ar produktiem, sveces, ziepes, eposīda rotas un dekori, mājas un automašīnas aromāti.
            </p>
            
            <div className="home-buttons">
              <button className='shop-button' id='shop-button' onClick={() => navigate('/shop')}>Veikals</button>
              <button onClick={() => navigate('/meistarklase')}>Galerija</button>
              <button onClick={() => navigate('/piegade')}>Piegāde</button>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
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
  const location = useLocation(); 

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/meistarklase" element={<Meistarklase />} />
        <Route path="/sveces" element={<Sveces />} />
        <Route path="/auskari" element={<Auskari />} />
        <Route path="/aromati" element={<Aromati />} />
        <Route path="/ziepes" element={<Ziepes />} />
        <Route path="/burti" element={<Burti />} />
        <Route path="/grozs" element={<Grozs />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </>
  );
}

export default App;