import React from 'react';
import ProductCard from '../components/ProductCard';
import { COLORS } from '../constants/colors';

const FavoritesPage = ({ favoritesVM, cart, setCart }) => {
  const { favorites } = favoritesVM;

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.lightBg }}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-2xl font-semibold mb-8 text-center" style={{ color: COLORS.primary }}>
          Your Favorites
        </h1>

        {favorites.length === 0 ? (
          <p className="text-center" style={{ color: COLORS.textGray }}>
            No favorite products yet.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddtoCart={(p) => {
                  setCart((prev) => {
                    const existing = prev.find((item) => item.id === p.id);
                    if (existing) {
                      return prev.map((item) =>
                        item.id === p.id
                          ? { ...item, quantity: item.quantity + 1 }
                          : item
                      );
                    } else {
                      return [...prev, { ...p, quantity: 1 }];
                    }
                  });
                }}
                favoritesVM={favoritesVM}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
