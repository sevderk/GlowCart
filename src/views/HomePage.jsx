import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../models/productService';
import { COLORS } from '../constants/colors';
import HeroBanner from '../assets/heroBanner.png';
import SaleBanner from '../assets/saleBanner.png';
import { filterProductsByQuery, filterProductsBySearchTerm } from '../utils/filterProducts';
import { sortProducts } from '../utils/sortProducts';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HomePage = ({ cart, setCart, favoritesVM, searchTerm, setSearchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedMessage, setAddedMessage] = useState('');
  const [addedToFavoritesMessage, setAddedToFavoritesMessage] = useState('');
  const [sortOption, setSortOption] = useState('');
  const location = useLocation();

  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const filter = useMemo(() => query.get('filter'), [query]);

  const ourPicksRef = useRef(null);
  const bestSellersRef = useRef(null);
  const newRef = useRef(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = filterProductsByQuery(products, query);
    filtered = filterProductsBySearchTerm(filtered, searchTerm);
    filtered = sortProducts(filtered, sortOption);
    return filtered;
  }, [products, query, searchTerm, sortOption]);

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

    setAddedMessage(`${product.title} added to cart!`);
    setTimeout(() => setAddedMessage(''), 4000);
  };

  const handleToggleFavoriteMessage = (product, isAdding) => {
    if (isAdding) {
      setAddedToFavoritesMessage(`${product.title} added to favorites!`);
      setTimeout(() => setAddedToFavoritesMessage(''), 4000);
    }
  };

  const renderModernSlider = (title, productIds, ref) => {
    const sectionProducts = products.filter((p) => productIds.includes(p.id));

    const scroll = (direction) => {
      if (ref.current) {
        ref.current.scrollBy({
          left: direction === 'left' ? -300 : 300,
          behavior: 'smooth',
        });
      }
    };

    return (
      <div className="mb-14 relative group">
        <h2 className="text-xl font-bold mb-4 px-1" style={{ color: COLORS.textBase }}>{title}</h2>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hidden group-hover:block"
          >
            <FaChevronLeft />
          </button>
          <div
            ref={ref}
            className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth"
          >
            {sectionProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64">
                <ProductCard
                  product={product}
                  onAddtoCart={() => handleAddToCart(product)}
                  favoritesVM={favoritesVM}
                  onToggleFavorite={handleToggleFavoriteMessage}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hidden group-hover:block"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.lightBg }}>
      <div className="max-w-7xl mx-auto px-6">
        {location.pathname === '/' && !location.search && (
          <div className="mb-10">
            <img
              src={HeroBanner}
              alt="GlowCart Banner"
              className="w-full object-cover rounded-2xl"
            />
          </div>
        )}

        {filter === 'sale' && (
          <div className="mb-10">
            <img
              src={SaleBanner}
              alt="Sale Banner"
              className="w-full object-cover rounded-2xl"
            />
          </div>
        )}

        {addedMessage && (
          <div className="mb-4 text-center font-medium p-2 rounded"
               style={{
                 backgroundColor: '#d1fae5',
                 color: '#059669',
                 border: '1px solid #6ee7b7',
               }}>
            {addedMessage}
          </div>
        )}

        {addedToFavoritesMessage && (
          <div className="mb-4 text-center text-pink-600 font-medium bg-pink-100 border border-pink-300 p-2 rounded">
            {addedToFavoritesMessage}
          </div>
        )}

        {location.pathname === '/' && !location.search && (
          <>
            {renderModernSlider('✨ Our Picks', [2, 3, 7, 10, 15], ourPicksRef)}
            {renderModernSlider('🔥 Best Sellers', [1, 4, 8, 9, 11], bestSellersRef)}
            {renderModernSlider('🆕 New', [5, 6, 11, 12, 13], newRef)}
          </>
        )}
        
        {location.search && (
          <>
            <div className="flex justify-end mb-4">
              <select
                style={{
                  color: COLORS.textBase,
                  backgroundColor: 'white',
                  borderColor: COLORS.borderLight,
                  fontSize: '0.875rem',
                }}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="rounded px-3 py-2 shadow-sm focus:ring focus:ring-pink-200"
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
            ) : filteredProducts.length === 0 ? (
              <p className="text-center" style={{ color: COLORS.textGray }}>No products found.</p>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
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
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
