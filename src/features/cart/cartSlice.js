import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const calculateTotals = (state) => {
  const { total, quantity } = state.items.reduce(
    (cartTotal, item) => {
      const itemTotal = item.price * item.quantity;
      cartTotal.total += itemTotal;
      cartTotal.quantity += item.quantity;
      return cartTotal;
    },
    { total: 0, quantity: 0 }
  );
  state.totalPrice = parseFloat(total.toFixed(2));
  state.totalQuantity = quantity;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      calculateTotals(state);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      calculateTotals(state);
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        calculateTotals(state);
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        calculateTotals(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
