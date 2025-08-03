// src/services/productService.jsx
import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/sevderk/GlowCart/refs/heads/main/korean_beauty_products_full.json'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
