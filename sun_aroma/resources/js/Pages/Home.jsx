import React from 'react';
import { Link } from '@inertiajs/react';
import EsAttels from '../../assets/es.jpg'; // Adjust path as needed
import '../../style/App.css'; // Pievienojam atsevišķu CSS failu

function Home() {
  // We'll use Inertia's router instead of useNavigate
  const navigateTo = (path) => {
    window.location.href = path;
  };
  
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
              <button className='shop-button' id='shop-button' onClick={() => navigateTo('/shop')}>Veikals</button>
              <button onClick={() => navigateTo('/meistarklase')}>Galerija</button>
              <button onClick={() => navigateTo('/piegade')}>Piegāde</button>
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

export default Home;