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

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleToggleFavorite = () => {
    const isFav = isFavorite(product.id);
    if (isFav) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
    if (onToggleFavorite) {
      onToggleFavorite(product, !isFav);
    }
  };

  const buttonText =
    buttonState === 'default' ? 'Add to Cart' :
    buttonState === 'added' ? 'Added' :
    'Go to Cart';

  const buttonStyle =
    buttonState === 'default'
      ? `bg-[${COLORS.primary}] hover:bg-[#e60080]`
      : buttonState === 'added'
      ? 'bg-green-600 hover:bg-green-700'
      : 'bg-blue-600 hover:bg-blue-700';

  return (
    <div
      className="relative flex flex-col justify-between h-full w-full rounded-lg border shadow-md transition-transform duration-300 cursor-pointer hover:shadow-xl hover:scale-[1.03]"
      style={{
        backgroundColor: COLORS.lightBg,
        borderColor: COLORS.borderLight,
        padding: '12px',
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Favorite */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleToggleFavorite();
        }}
        className="absolute top-3 right-3 text-xl"
        style={{
          color: isFavorite(product.id)
            ? COLORS.primary
            : COLORS.textLightGray,
        }}
        title="Toggle Favorite"
      >
        {isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Image */}
      <img
        className="p-4 rounded-t-lg w-full h-[200px] object-contain transition-transform duration-200 hover:scale-105"
        src={product.image}
        alt={product.title}
      />

      {/* Info */}
      <div className="px-3 pb-4 flex flex-col justify-between flex-grow">
        <p className="text-xs" style={{ color: COLORS.textGray }}>
          {product.brand}
        </p>
        <h5
          className="text-lg font-semibold tracking-tight"
          style={{ color: COLORS.textBase }}
        >
          {product.title}
        </h5>

        {product.discountPercentage > 0 && (
          <p className="mt-1 text-sm font-medium text-pink-600">
            Save {product.discountPercentage}%
          </p>
        )}

        <div
          className="mt-3 flex justify-between text-sm"
          style={{ color: COLORS.textDarkGray }}
        >
          <span>⭐ {product.rating}</span>
          <span className="text-green-600">Stock: {product.stock}</span>
        </div>

        {/* Price + Button */}
        <div className="flex justify-between items-center mt-4">
          <span
            className="text-xl font-semibold"
            style={{ color: COLORS.textBase }}
          >
            ${product.price}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className={`text-white font-medium rounded-lg text-sm px-4 py-2 transition duration-300 ${buttonStyle}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
