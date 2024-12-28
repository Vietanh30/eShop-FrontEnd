import { getCart, updateCart } from "@/app/api/cartApi";
import { create } from "zustand";

function addToCart(cart, newItem) {
  if (!cart?.length) return [newItem];

  const check = cart.reduce((acc, item) => {
    return (
      acc ||
      (item?.productId == newItem?.productId && item?.color == newItem?.color)
    );
  }, false);
  return check
    ? cart.reduce((acc, item) => {
        if (
          item?.productId == newItem?.productId &&
          item?.color == newItem?.color
        ) {
          return [
            ...acc,
            { ...item, quantity: item.quantity + newItem.quantity },
          ];
        } else {
          return [...acc, item];
        }
      }, [])
    : [...cart, newItem];
}

export const useCart = create((set) => ({
  listCart: [],
  addCart: async (item, token) => {
    const res = await getCart(token);
    const newCart = await updateCart(token, addToCart(res, item));
    set({ listCart: newCart });
  },
  removeCart: async (id, color, token) => {
    const res = await getCart(token);
    const newCart = await updateCart(
      token,
      res.filter((item) => item.productId !== id || item.color !== color)
    );
    set({ listCart: newCart });
  },
  resetCart: async (token) => {
    const newCart = await updateCart(token, []);
    set({ listCart: [] });
  },
  fetchCart: async (token) => {
    const res = await getCart(token);
    set({ listCart: res });
  },
  updateQuantity: async (id, color, quantity, token) => {
    const res = await getCart(token);
    const newCart = await updateCart(
      token,
      res.map((item) => {
        if (item.productId === id && item.color === color) {
          return {
            ...item,
            quantity,
          };
        }
        else return item
      })
    );
    set({ listCart: newCart });
  },
}));
