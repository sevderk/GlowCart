// src/utils/filterProducts.js

export const filterProductsByQuery = (products, query) => {
  const filter = query.get('filter');
  if (!filter) return products;

  switch (filter.toLowerCase()) {
    case 'sale':
      return products.filter((p) => p.discountPercentage > 0);
    case 'skincare':
    case 'suncare':
    case 'makeup':
    case 'hair':
      return products.filter(
        (p) => p.mainCategory?.toLowerCase() === filter.toLowerCase()
      );
    default:
      return products;
  }
};

export const filterProductsBySearchTerm = (products, searchTerm) => {
  if (!searchTerm.trim()) return products;

  return products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
