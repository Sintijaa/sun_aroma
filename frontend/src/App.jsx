import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Shop from './Components/Shop';  
import Meistarklase from './Components/Meistarklase';
import Piegade from './Components/Piegade';
import Sveces from './Components/Sveces';
import Auskari from './Components/Auskari';
import Aromati from './Components/Aromati';
import Grozs from './Components/Grozs';


function Home() {
  const navigate = useNavigate();

  return (
    <div className="background">
      <div className="content">
        <span className="logo">Sun Aroma</span>
        <div className="button-container">
          <button className="custom-button" onClick={() => navigate('/shop')}>Doties uz veikalu</button>
          <button className="custom-button" onClick={() => navigate('/meistarklase')}>Meistarklases</button>
          <button className="custom-button" onClick={() => navigate('/piegade')}>Piegāde</button>
        </div>
      </div>
    </div>
  );
}




function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/meistarklase" element={<Meistarklase />} />
        <Route path="/piegade" element={<Piegade />} />
        <Route path="/sveces" element={<Sveces />} />
        <Route path="/auskari" element={<Auskari />} />
        <Route path="/aromati" element={<Aromati />} />
        <Route path="/grozs" element={<Grozs />} />
      </Routes>
    </Router>
  );
}

export default App;
