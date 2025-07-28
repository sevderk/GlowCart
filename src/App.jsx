import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import { useState } from 'react';


function App() {
  const [cart, setCart] = useState([]);



  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
}

export default App;

