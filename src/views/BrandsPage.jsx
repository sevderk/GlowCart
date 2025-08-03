import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../models/productService';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const uniqueBrands = [...new Set(data.map((p) => p.brand))];
        setBrands(uniqueBrands);
      })
      .catch((err) => console.error('Error loading brands:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">Available Brands</h1>
      <ul className="max-w-xl mx-auto grid grid-cols-2 gap-4">
        {brands.map((brand, index) => (
          <li
            key={index}
            className="bg-white dark:bg-gray-800 shadow p-4 rounded text-center text-gray-800 dark:text-white"
          >
            {brand}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandsPage;
