import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cartState");
    if (!savedCart) return undefined;
    return JSON.parse(savedCart);
  } catch (error) {
    console.error("Error loading cart:", error);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },

  preloadedState: {
    cart: loadCartFromStorage(),
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("cartState", JSON.stringify(state.cart));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
});

export default store;
