import React from 'react';
import '../style/ParMums.css';
import EsAttels from '../assets/es.jpg'; // Norādi uz attēlu

function ParMums() {
  return (
    <section className="par-mums-section">
      <div className="par-mums-container">
        <img src={EsAttels} alt="Es" className="par-mums-image" />
        <div className="par-mums-text">
          <h2>Par mums</h2>
          <p>
            Mēs esam komanda, kas rada aromātiskās sveces un citus produktus, lai piepildītu jūsu mājas ar patīkamu smaržu un
            komfortu.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ParMums;
