import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product) => {
    setFavorites(prev => {
      if (!prev.find(p => p.id === product.id)) {
        toast.success(`${product.title} added to favorites!`);
        return [...prev, product];
      } else {
        return prev;
      }
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites(prev => {
      const updated = prev.filter(p => p.id !== id);
      toast.info('Removed from favorites.');
      return updated;
    });
  };

  const isFavorite = (id) => {
    return favorites.some(p => p.id === id);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
};
