import React, { useState } from 'react'; 
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';    


const ProductCard = ({ product, onAddtoCart }) => {
  const [buttonState, setButtonState] = useState('default'); // default, added, goToCart
  const navigate = useNavigate();

  const timeoutRef = useRef(null);

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

  // Component unmount olduğunda timeoutları temizle
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  let buttonText = 'Add to Cart';
  let buttonStyle = 'bg-[#FF0099] hover:bg-[#990066]';

  if (buttonState === 'added') {
    buttonText = 'Added';
    buttonStyle = 'bg-green-600 hover:bg-green-700';
  } else if (buttonState === 'goToCart') {
    buttonText = 'Go to Cart';
    buttonStyle = 'bg-blue-600 hover:bg-blue-700';
  }


  return (
    <div className="flex flex-col justify-between h-full w-full max-w-full bg-gray-50 to-white rounded-lg border border-pink-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transition-transform duration-300 hover:bg-indigo-200 transition">
      <img className="p-8 rounded-t-lg w-full h-[400px] object-contain" src={product.image} alt={product.title} />

      <div className="px-5 pb-5 flex flex-col justify-between flex-grow">
        <p className="text-sm text-gray-400 dark:text-gray-400">{product.brand}</p>
        <h5 className="text-xl font-semibold tracking-tight text-gray-800 dark:text-white">{product.title}</h5>
        <p className="mt-2 text-gray-600 dark:text-gray-200">{product.description}</p>
        <div className="mt-3 flex justify-between text-m text-gray-600 dark:text-gray-400">
          <span>⭐{product.rating}</span>
          <span className="text-emerald-600">Stock: {product.stock}</span>
          </div>
          <div className="flex justify-between items-center mt-5">
          <span className=" text-3xl font-semibold text-gray-900 px-2 py-1 rounded">${product.price}</span>
          <button
          onClick={handleClick}
            className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition ${buttonStyle}`}
          >
            {buttonText}
             </button>
          </div>
      </div>
    </div>
  );
};

export default ProductCard;
