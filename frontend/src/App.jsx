import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Shop from './Components/Shop';  

function Home() {
  const navigate = useNavigate();

  return (
    <div className="background">
      <div className="content">
        <h1>Sun Aroma</h1>
        <button onClick={() => navigate('/shop')}>Doties uz veikalu</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Define route for the Home component */}
        <Route path="/" element={<Home />} />
        {/* Define route for the Shop component */}
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;
