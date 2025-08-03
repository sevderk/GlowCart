import React from 'react';
import { COLORS } from '../constants/colors';

const CartPage = ({ cart, setCart }) => {
  const handleIncrease = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.lightBg }}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: COLORS.primary }}>
          Your GlowCart
        </h2>

        {cart.length === 0 ? (
          <p className="text-center" style={{ color: COLORS.textGray }}>
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg shadow-md border"
                style={{
                  backgroundColor: COLORS.textLight,
                  borderColor: COLORS.borderLight,
                }}
              >
                {/* Left: Image + Info */}
                <div className="flex items-center space-x-4 w-full md:w-2/3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-contain rounded bg-white p-2"
                  />
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: COLORS.textBase }}>
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: COLORS.textGray }}>{item.brand}</p>
                    <p className="text-sm" style={{ color: COLORS.textGray }}>
                      In stock: {item.stock}
                    </p>
                    {item.quantity >= item.stock && (
                      <p className="text-xs mt-1 font-medium" style={{ color: COLORS.accent }}>
                        Reached max stock
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 w-full md:w-auto">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="text-white px-3 py-1.5 text-sm font-medium rounded transition"
                    style={{
                      backgroundColor:
                        item.quantity === 1 ? COLORS.borderLight : '#FF99CC',
                      color: COLORS.textLight,
                    }}
                  >
                    {item.quantity === 1 ? '🗑' : '-'}
                  </button>

                  <span style={{ color: COLORS.textBase }}>{item.quantity}</span>

                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="px-3 py-1.5 text-sm font-medium rounded transition"
                    style={{
                      backgroundColor:
                        item.quantity >= item.stock ? COLORS.borderLight : '#e60080',
                      color: COLORS.textLight,
                      cursor: item.quantity >= item.stock ? 'not-allowed' : 'pointer',
                    }}
                    disabled={item.quantity >= item.stock}
                  >
                    {item.quantity >= item.stock ? '🚫' : '+'}
                  </button>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm underline font-medium transition"
                    style={{ color: '#e60080' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right mt-8">
              <p style={{ color: COLORS.textBase }}>
                <strong>Total Items:</strong> {totalQuantity}
              </p>
              <p style={{ color: COLORS.textBase }}>
                <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
