// src/utils/sortProducts.js

export const sortProducts = (products, sortOption) => {
  const sorted = [...products];

  switch (sortOption) {
    case 'priceLowHigh':
      return sorted.sort((a, b) => a.price - b.price);
    case 'priceHighLow':
      return sorted.sort((a, b) => b.price - a.price);
    case 'ratingHighLow':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'discountHighLow':
      return sorted.sort((a, b) => b.discountPercentage - a.discountPercentage);
    default:
      return sorted;
  }
};
