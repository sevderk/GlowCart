// src/viewmodels/useProducts.js

import { useEffect, useState } from 'react';
import { fetchProducts } from '../models/productService'; 


export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  

useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filtered result
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    products,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    loading,
  };
};
