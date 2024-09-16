import { useState } from 'react'
import './App.css'
import sakuma_bilde from './assets/sakuma_bilde.jpeg';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="background-cover">
      <img src={sakuma_bilde} alt="Sākuma bilde" />
      <h1>Sun Aroma</h1>
    </div>
  )
}

export default App;
