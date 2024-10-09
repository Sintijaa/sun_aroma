import React from 'react';
import '../style/piegade.css';

const Piegade = () => {
  return (
    <div className="delivery-container">
     <div className="top-left-button">
          <Link to="/">
            <button className="button home-button">Uz sākumu</button>
          </Link>
        </div>
      <div className="delivery-box">
        <h1>Piegāde</h1>
        <ul>
          <h2>
            Saņemt pasūtījumu ar Omniva vai DPD pakomātu starpniecību visās Baltijas valstīs.
          </h2>
          <h2>
            Norēķins pēc priekšapmaksas rēķina saņemšanas ar bankas pārskaitījumu.
          </h2>
          <h2>
            Piegādes izmaksas EUR 3.00, ja pasūtījuma summa nepārsniedz EUR 50.00.
          </h2>
        </ul>
        <h2>
          Visi pasūtījumi tiek apstrādāti 1-3 darba dienu laikā.<br/>
          Ja pasūtījumu nebūs iespējams izsūtīt minētajā laikā, mēs ar Jums sazināsimies.
        </h2>
        <h2>
          Pirms pasūti, noteikti pārbaudi piegādes informāciju.<br/>
          Pārbaudi vai esi pareizi ievadījis pakomāta adresi, kā arī pārliecinies lai būtu norādīts precīzs telefona Nr.
        </h2>
      </div>
    </div>
  );
};

export default Piegade;
