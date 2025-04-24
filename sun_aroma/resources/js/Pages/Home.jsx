import React from 'react'; 
import { Link } from '@inertiajs/react'; // Inertia.js saites imports
import EsAttels from '../../assets/es.jpg'; // Attēla imports (ceļš jāpielāgo pēc vajadzības)
import '../../style/App.css'; // CSS stila faila imports

/**
 * Home komponente - sākumlapas galvenā komponente
 * Parāda uzņēmuma Sun Aroma prezentāciju un navigācijas pogas
 */
function Home() {
  // Vienkārša navigācijas funkcija, kas izmanto window.location (alternatīva Inertia navigācijai)
  const navigateTo = (path) => {
    window.location.href = path;
  };
  
  return (
    <>
      {/* Galvenā sākumlapas sekcija */}
      <div className="home-hero">
        <div className="home-content">
          {/* Attēla konteiners kreisajā pusē */}
          <div className="home-image-container">
            <img src={EsAttels} alt="Sintija - Sun Aroma" className="home-image" />
          </div>
          
          {/* Teksta un pogu sekcija labajā pusē */}
          <div className="home-text">
            <h1>Sun Aroma</h1>
            <div className="home-divider"></div> {/* Atdalītājs starp virsrakstu un tekstu */}
            
            {/* Apraksta teksts par uzņēmumu */}
            <p>
              Čau! Esmu Sintija un esmu radījusi uzņemumu <span className="highlight">Sun Aroma</span>. Tas ir kaut kas vairāk kā vienkārši uzņēmums, tas ir stāsts par skaistiem un dabīgiem porduktiem.
            </p>
            <p>
              Kur satiekas dabīgi produkti ar skaistu dizainu.
            </p>
            <p>
              Sun Aromas sākums bija sojas vaska sveces, bet tagad tas ir plašs klāsts ar produktiem, sveces, ziepes, eposīda rotas un dekori, mājas un automašīnas aromāti.
            </p>
            
            {/* Navigācijas pogu sekcija */}
            <div className="home-buttons">
              <button className='shop-button' id='shop-button' onClick={() => navigateTo('/shop')}>Veikals</button>
              <button onClick={() => navigateTo('/meistarklase')}>Galerija</button>
              <button onClick={() => navigateTo('/piegade')}>Piegāde</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;