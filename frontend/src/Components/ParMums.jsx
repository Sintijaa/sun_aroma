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
            Čau! Esmu Sintija un esmu radījusi uzņemumu Sun Aroma. Tas ir kaut kas vairāk kā vienkrārši uzņēmums, tas ir stāsts par skaistiem un dabīgiem porduktiem.
            Kur satiekas dabīgi produkti ar skaistu dizainu.
            Sun Aromas sākums bija sojas vaska sveces, bet tagad tas ir plašs klāsts ar produktiem, sveces, ziepes, eposīda rotas un dekori, mājas un automašīnas aromāti.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ParMums;
