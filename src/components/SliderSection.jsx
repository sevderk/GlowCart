import React, { useRef } from 'react';
import { COLORS } from '../constants/colors';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductCard from './ProductCard';

const SliderSection = ({ title, products, onAddToCart, favoritesVM, onToggleFavorite }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.8;

    scrollRef.current.scrollTo({
      left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="mb-12 relative">
      <h2 className="text-xl font-bold mb-4 px-2" style={{ color: COLORS.textBase }}>{title}</h2>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full"
        >
          <FaChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 px-10 pb-2 scroll-smooth no-scrollbar"
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64">
              <ProductCard
                product={product}
                onAddtoCart={() => onAddToCart(product)}
                favoritesVM={favoritesVM}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default SliderSection;
