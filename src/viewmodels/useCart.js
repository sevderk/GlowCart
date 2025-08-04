import { toast } from 'react-toastify';

export const useCart = (cart, setCart) => {
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

  return {
    cart,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  };
};
