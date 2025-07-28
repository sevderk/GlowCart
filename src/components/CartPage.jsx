import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = ({ cart, setCart }) => {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const increaseQuantity = (id) => {
  let warningShown = false;

  setCart(prev =>
    prev.map(item => {
      if (item.id === id) {
        if (item.quantity < item.stock) {
          return { ...item, quantity: item.quantity + 1 };
        } else if (!warningShown) {
          toast.warn("You cannot add more than available stock.");
          warningShown = true;
        }
      }
      return item;
    })
  );
};
;


  const decreaseQuantity = (id) => {
    const itemToDecrease = cart.find(item => item.id === id);
    if (itemToDecrease.quantity === 1) {
      setCart(prev => prev.filter(item => item.id !== id));
      toast.info("Product removed from cart.");
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.info("Product removed from cart.");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <ToastContainer position="top-center" autoClose={3000} />
      <h1 className="text-5xl font-bold mb-8 text-[#FF0099] dark:text-white text-center">your <span className="text-gradient">Glow✨Cart</span></h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-center">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center py-4 space-x-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain rounded-lg border border-gray-300 dark:border-gray-600"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold dark:text-white">{item.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Stock: {item.stock}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Price: ${item.price.toFixed(2)}</p>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className={`px-3 py-1 rounded ${
                        item.quantity === 1
                          ? 'bg-gray-400 text-white cursor-pointer'
                          : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                      }`}
                    >
                      -
                    </button>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      
                      className={`px-3 py-1 rounded ${
                        item.quantity >= item.stock
                          ? 'bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                      }`}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="px-3 py-1 bg-[#ff0099] text-white rounded hover:bg-[#990066]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-lg font-bold text-[#FF0099] dark:text-[#FF77CC]">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-right text-3xl font-extrabold text-[#FF0099] dark:text-[#FF77CC]">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
