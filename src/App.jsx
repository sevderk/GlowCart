import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import HomePage from './views/HomePage';
import CartPage from './views/CartPage';
import FavoritesPage from './views/FavoritesPage';
import LoginPage from './views/LoginPage';
import ProfilePage from './views/ProfilePage';
import SignupPage from './views/SignupPage';
import Header from './components/Header';
import BrandsPage from './views/BrandsPage';
import ProductDetailPage from './views/ProductDetailPage';
import AllProductsPage from './views/AllProductsPage';


import { useFavorites } from './viewmodels/useFavorites';

function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    if (storedLogin === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const favoritesVM = useFavorites(); // no longer passing isLoggedIn

  return (
    <Router>
      <Header 
      isLoggedIn={isLoggedIn} 
      setIsLoggedIn={setIsLoggedIn} 
      cart={cart} 
      setCart={setCart} 
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}/>
      <Routes>
        <Route
          path="/"
          element={<HomePage cart={cart} setCart={setCart} favoritesVM={favoritesVM} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}
        />
        <Route
          path="/cart"
          element={<CartPage cart={cart} setCart={setCart} />}
        />
        <Route
          path="/favorites"
          element={<FavoritesPage cart={cart} setCart={setCart} favoritesVM={favoritesVM} />}
        />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<SignupPage />}
        />
        <Route
          path="/profile"
          element={<ProfilePage  setIsLoggedIn={setIsLoggedIn}/>}
        /> 
        <Route 
        path="/brands" 
        element={<BrandsPage />} 
        />
        <Route
        path="/product/:id"
        element={
        <ProductDetailPage
        cart={cart}
        setCart={setCart}
        favoritesVM={favoritesVM} />}
        />
        <Route
        path="/all-products"
        element={
        <AllProductsPage
        cart={cart}
        setCart={setCart}
        favoritesVM={favoritesVM}
        searchTerm={searchTerm} />}
      />

      </Routes>
    </Router>
  );
}

export default App;
