import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Shop from './Components/Shop';  
import Meistarklase from './Components/Meistarklase';
import Sveces from './Components/Sveces';
import Auskari from './Components/Auskari';
import Aromati from './Components/Aromati';




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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/meistarklase" element={<Meistarklase />} />
        <Route path="/sveces" element={<Sveces />} />
        <Route path="/auskari" element={<Auskari />} />
        <Route path="/aromati" element={<Aromati />} />
      </Routes>
    </Router>
  );
}



export default App;
