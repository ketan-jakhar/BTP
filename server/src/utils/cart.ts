import { Product } from '../types/entities';
export const calculateCartTotal = (cart: Product[]) => {
  const total = cart.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  return total;
};
