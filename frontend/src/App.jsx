import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Shop from './Components/Shop';  
import Meistarklase from './Components/Meistarklase';
import Piegade from './Components/Piegade';
import Sveces from './Components/Sveces';
import Auskari from './Components/Auskari';
import Aromati from './Components/Aromati';
// import ParMums from './Components/ParMums';


// const App = () => {

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//     }
//   }



function Home() {
  const navigate = useNavigate();
      // <nav>
      //   <button onClick={() => scrollToSection('par-mums-section')}>Par Mums</button>
      // </nav>
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
        <Route path="/piegade" element={<Piegade/>} />
        <Route path="/sveces" element={<Sveces />} />
        <Route path="/auskari" element={<Auskari />} />
        <Route path="/aromati" element={<Aromati />} />
      </Routes>
    </Router>
  );
}



export default App;