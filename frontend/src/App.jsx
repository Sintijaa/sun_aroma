import React, { useRef } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const aboutUsRef = useRef(null);

  const scrollToAboutUs = () => {
    aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="background">
      <div className="overlay">
        <div className="content">
          <span className="logo">Sun Aroma</span>
          <div className="button-container">
            <button className="custom-button" onClick={() => navigate('/shop')}>Doties uz veikalu</button>
            <button className="custom-button" onClick={() => navigate('/meistarklase')}>Meistarklases</button>
            <button className="custom-button" onClick={() => navigate('/piegade')}>Piegāde</button>
          </div>
        </div>
        <div className="scroll-down-arrow" onClick={scrollToAboutUs}>
          ⬇️ {/* Bultiņa, kas ritina uz leju */}
        </div>
      </div>

      {/* "About Us" sekcija */}
      <div ref={aboutUsRef} className="about-container">
        <h1>Par Mums</h1>
        <p>Sun Aroma ir uzņēmums, kas nodarbojas ar kvalitatīvu aromātu radīšanu jūsu mājai un automašīnai.</p>
        <p>Mēs piedāvājam arī meistarklases, kur jūs varat iemācīties, kā veidot aromātiskas sveces un citus aksesuārus.</p>
      </div>
    </div>
  );
}

export default Home;
