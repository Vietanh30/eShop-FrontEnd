import { getCart, removeCart, updateCart } from "@/app/api/cartApi";
import { create } from "zustand";

function addToCart(cart, newItem) {
  console.log("getCart", cart);
  console.log("newItem", newItem);

  // If the cart is empty, add the new item with only the necessary fields
  if (!cart?.length) {
    console.log("Giỏ hàng trống, thêm newItem vào giỏ hàng.");
    return [
      {
        product: newItem.product,
        color: newItem.color,
        quantity: newItem.quantity,
      },
    ];
  }

  // Check if the product already exists in the cart
  const existingItemIndex = cart.findIndex(
    (item) =>
      item.product._id === newItem.product && item.color === newItem.color
  );

  if (existingItemIndex !== -1) {
    // Update the quantity if the product exists
    console.log(
      `Cập nhật số lượng cho sản phẩm: ${cart[existingItemIndex].product._id}`
    );
    const updatedCart = cart.map((item, index) =>
      index === existingItemIndex
        ? { ...item, quantity: item.quantity + newItem.quantity }
        : item
    );

    // Return only the necessary fields
    return updatedCart.map(({ product, color, quantity }) => ({
      product: product._id,
      color,
      quantity,
    }));
  } else {
    // Add the new item to the cart with only the necessary fields
    console.log("Thêm newItem vào giỏ hàng.");
    return [
      ...cart.map(({ product, color, quantity }) => ({
        product: product._id,
        color,
        quantity,
      })),
      {
        product: newItem.product,
        color: newItem.color,
        quantity: newItem.quantity,
      },
    ];
  }
}

export const useCart = create((set) => ({
  listCart: [],
  addCart: async (item, token) => {
    try {
      // Lấy giỏ hàng hiện tại
      const res = await getCart(token);

      // Cập nhật giỏ hàng với sản phẩm mới
      await updateCart(token, addToCart(res, item));

      // Gọi lại getCart để lấy dữ liệu giỏ hàng mới
      const updatedCart = await getCart(token);

      // Cập nhật listCart với dữ liệu mới
      set({ listCart: updatedCart });
    } catch (error) {
      console.error("Error updating cart:", error);
      // Xử lý lỗi nếu cần
    }
  },
  removeCart: async (id, token) => {
    const deleteCartRes = await removeCart(token, id);
    const res = await getCart(token);
    set({ listCart: res });
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
    try {
      // Lấy giỏ hàng hiện tại
      const res = await getCart(token);

      // Cập nhật giỏ hàng với số lượng mới
      const updatedCart = res.map((item) => {
        if (item.product._id === id && item.color === color) {
          return {
            ...item,
            quantity, // Cập nhật số lượng
          };
        }
        return item;
      });

      // Gọi API để cập nhật giỏ hàng trên server
      await updateCart(token, updatedCart);

      // Cập nhật lại listCart với giỏ hàng mới
      set({ listCart: updatedCart });
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Xử lý lỗi nếu cần
    }
  },
}));
