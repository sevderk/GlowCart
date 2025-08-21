import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../models/productService';
import { COLORS } from '../constants/colors';
import { filterProductsBySearchTerm } from '../utils/filterProducts';
import { sortProducts } from '../utils/sortProducts';

const AllProductsPage = ({ cart, setCart, favoritesVM, searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleToggleFavoriteMessage = () => {};

  let filtered = filterProductsBySearchTerm(products, searchTerm);
  filtered = sortProducts(filtered, sortOption);

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.lightBg }}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800" >
          All Products
        </h2>

        <div className="flex justify-end mb-6">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded px-3 py-2 shadow-sm focus:ring focus:ring-pink-200"
            style={{
              color: COLORS.textBase,
              backgroundColor: 'white',
              borderColor: COLORS.borderLight,
              fontSize: '0.875rem',
            }}
          >
            <option value="">Sort by</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="ratingHighLow">Rating: High to Low</option>
            <option value="discountHighLow">Discount: High to Low</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center" style={{ color: COLORS.textGray }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center" style={{ color: COLORS.textGray }}>No products found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddtoCart={() => handleAddToCart(product)}
                favoritesVM={favoritesVM}
                onToggleFavorite={handleToggleFavoriteMessage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;
