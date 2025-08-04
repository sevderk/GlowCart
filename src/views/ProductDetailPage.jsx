import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../models/productService';
import { COLORS } from '../constants/colors';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductDetailPage = ({ cart, setCart, favoritesVM }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [buttonState, setButtonState] = useState('default');

  const { addToFavorites, removeFromFavorites, isFavorite } = favoritesVM;

  useEffect(() => {
    fetchProducts().then((products) => {
      const found = products.find((p) => p.id === parseInt(id));
      setProduct(found);
    });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      return existing
        ? prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });
    setButtonState('added');
    setTimeout(() => setButtonState('goToCart'), 1000);
    setTimeout(() => setButtonState('default'), 2500);
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    const isFav = isFavorite(product.id);
    isFav ? removeFromFavorites(product.id) : addToFavorites(product);
  };

  if (!product) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  const buttonText =
    buttonState === 'default'
      ? 'Add to Cart'
      : buttonState === 'added'
      ? 'Added'
      : 'Go to Cart';

  const buttonStyle =
    buttonState === 'default'
      ? `bg-[#FF0099] hover:bg-[#e60080]`
      : buttonState === 'added'
      ? 'bg-green-600 hover:bg-green-700'
      : 'bg-blue-600 hover:bg-blue-700';

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Product Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col md:flex-row gap-10 border border-pink-100">
        {/* Product Image */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-h-[500px] object-contain rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-sm uppercase text-gray-500">
            {product.brand} — {product.mainCategory}, {product.category}
          </p>
          <p className="text-gray-700">{product.description}</p>

          <div className="flex items-center gap-4 mt-2">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-pink-600 font-medium">
                Save {product.discountPercentage}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 pt-6">
            <button
              onClick={handleAddToCart}
              className={`text-white font-semibold rounded-lg px-5 py-2.5 transition ${buttonStyle}`}
            >
              {buttonText}
            </button>

            <button
              onClick={handleToggleFavorite}
              className="text-xl transition-colors"
              title="Toggle Favorite"
              style={{
                color: isFavorite(product.id)
                ? '#e60080'
                : COLORS.textLightGray,
              }}
            >
              {isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          ⭐ {product.rating} (3 reviews)
        </h2>

        <div className="space-y-4">
          {product.comments?.length > 0 ? (
            product.comments.map((comment, index) => {
              const usernames = ['beautylover88', 'glowqueen21', 'kbeautyfan'];
              const user = usernames[index % usernames.length];

              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow border border-gray-200"
                >
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-sm">
                    {user.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{user}</p>
                    <p className="text-sm text-gray-600 mt-1">{comment}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500">No comments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
