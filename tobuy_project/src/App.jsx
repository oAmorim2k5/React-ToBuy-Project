import './App.css';

import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
      <div className="App">
        <Navbar />
        <Outlet />
        <div className='footer'>
        <p>Victor Amorim © 2025 ToBüY. Todos os direitos reservados.</p>
        </div>
      </div>
  )
}

export default App
