// src/components/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import CartIcon from '../assets/cart-icon.svg';


const HomePage = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [addedMessage, setAddedMessage] = useState('');

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/sevderk/GlowCart/refs/heads/main/korean_beauty_products_full.json')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

    const cartItemCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    setAddedMessage(`${product.title} added to cart!`);
    setTimeout(() => setAddedMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="flex justify-end items-center mb-4">
  <div
    className="relative cursor-pointer"
    onClick={() => navigate('/cart')}
  >
    <img
          src={CartIcon}
          alt="Cart"
          className="w-8 h-8 text-[#FF0099] dark:invert"
        />
    {cartItemCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-[#FF0099] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
        {cartItemCount}
      </span>
    )}
  </div>
</div>

      <h1 className="text-6xl font-bold text-center text-[#FF0099] dark:text-white mb-6"><span className="text-gradient">Glow✨Cart</span></h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      {addedMessage && (
        <div className="mb-4 text-center text-green-600 font-medium bg-green-100 border border-green-300 p-2 rounded">
            {addedMessage}
            </div>
        )}

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-300">Loading...</p>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">No products found.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddtoCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
