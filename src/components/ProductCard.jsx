import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { COLORS } from '../constants/colors';

const ProductCard = ({ product, onAddtoCart, favoritesVM, onToggleFavorite }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = favoritesVM;
  const [buttonState, setButtonState] = useState('default');
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (buttonState === 'default') {
      onAddtoCart(product);
      setButtonState('added');
      timeoutRef.current = setTimeout(() => {
        setButtonState('goToCart');
        timeoutRef.current = setTimeout(() => {
          setButtonState('default');
        }, 1500);
      }, 1000);
    } else if (buttonState === 'goToCart') {
      navigate('/cart');
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleToggleFavorite = () => {
    const fav = isFavorite(product.id);
    fav ? removeFromFavorites(product.id) : addToFavorites(product);
    onToggleFavorite?.(product, !fav);
  };

  const buttonText =
    buttonState === 'default' ? 'Add to Cart' :
    buttonState === 'added' ? 'Added' :
    'Go to Cart';

  const defaultBtnBase =
    'text-white font-medium rounded-lg text-sm px-4 py-2 transition duration-300 hover:opacity-90';
  const btnClass =
    buttonState === 'default'
      ? defaultBtnBase
      : buttonState === 'added'
      ? `${defaultBtnBase} bg-emerald-600 hover:brightness-110`
      : `${defaultBtnBase} bg-blue-600 hover:brightness-110`;

  return (
    <div
      className="group relative flex h-full w-full flex-col justify-between rounded-lg border shadow-md transition-transform duration-300 md:hover:shadow-xl md:hover:scale-[1.02]"
      style={{ backgroundColor: COLORS.lightBg, borderColor: COLORS.borderLight, padding: 12 }}
    >
      {/* Favorite */}
      <button
        onClick={(e) => { e.stopPropagation(); handleToggleFavorite(); }}
        className="absolute top-3 right-3 text-lg sm:text-xl z-10"
        style={{ color: isFavorite(product.id) ? COLORS.primary : COLORS.textLightGray }}
        title="Toggle Favorite"
        aria-label="Toggle Favorite"
      >
        {isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Clickable area for navigation */}
      <div
        className="flex flex-col flex-grow cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {/* Image wrapper */}
        <div className="w-full overflow-hidden rounded-md bg-white aspect-[4/5]">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain bg-white transition-transform duration-200 md:group-hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="px-1.5 sm:px-3 pb-4 flex flex-col justify-between flex-grow">
          <p className="mt-2 text-xs" style={{ color: COLORS.textGray }}>{product.brand}</p>

          <h5 className="mt-1 text-sm sm:text-base font-semibold tracking-tight"
              style={{ color: COLORS.textBase }}>
            {product.title}
          </h5>

          {product.discountPercentage > 0 && (
            <p className="mt-1 text-xs sm:text-sm font-medium text-pink-600">
              Save {product.discountPercentage}%
            </p>
          )}

          <div className="mt-2 flex justify-between text-xs sm:text-sm"
               style={{ color: COLORS.textDarkGray }}>
            <span>⭐ {product.rating}</span>
            <span className="text-green-600">Stock: {product.stock}</span>
          </div>
        </div>
      </div>

      {/* Price + Button (separate so it won’t trigger navigation) */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-lg sm:text-xl font-semibold" style={{ color: COLORS.textBase }}>
          ${product.price}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); handleClick(); }}
          className={btnClass}
          style={buttonState === 'default' ? { backgroundColor: COLORS.primary } : undefined}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
