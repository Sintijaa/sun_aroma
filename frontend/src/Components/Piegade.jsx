// src/piegade.jsx

import React from 'react';
import '../style/Piegade.css';

function Piegade() {
    return (
        <div className="piegade-container">
            <h1 className="piegade-title">Piegādes Informācija</h1>
            <div className="piegade-details">
                <h2>1. Piegādes Metodes</h2>
                <ul>
                    <li><strong>Standarta Piegāde:</strong> 3-5 darba dienas - 3.00 EUR</li>
                    <li><strong>Ekspress Piegāde:</strong> 1-2 darba dienas - 5.00 EUR</li>
                    <li><strong>Bezmaksas Piegāde:</strong> Pasūtījumiem virs 50.00 EUR</li>
                </ul>
            </div>
            <div className="piegade-details">
                <h2>2. Piegādes Reģioni</h2>
                <p>Piegāde pieejama visā Latvijā, izņemot attālos reģionus.</p>
            </div>
            <div className="piegade-details">
                <h2>3. Piegādes Laiks</h2>
                <p>Piegādes laiks ir atkarīgs no izvēlētās piegādes metodes. Mēs cenšamies nodrošināt ātru un efektīvu piegādi.</p>
            </div>
            <div className="piegade-details">
                <h2>4. Pasūtījumu Sekotspēja</h2>
                <p>Pēc pasūtījuma veikšanas jūs saņemsiet izsekošanas numuru, lai varētu sekot sava pasūtījuma statusam.</p>
            </div>
            <div className="piegade-details">
                <h2>5. Jautājumi un Atbalsts</h2>
                <p>Ja jums ir kādi jautājumi par piegādi, lūdzu, sazinieties ar mūsu klientu atbalsta centru.</p>
            </div>
        </div>
    );
}

export default Piegade;
