import { createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action) => {
  return state.findIndex(
    (item) => item.productId === action.payload?.productId,
  );
};

const slice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    cartAddItems(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    cartRemoveItems(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) state.splice(existingItemIndex, 1);
    },
    cartIncreaseQuantity(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) state[existingItemIndex].quantity += 1;
    },
    cartDecreaseQuantity(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity -= 1;
        if (state[existingItemIndex].quantity === 0) {
          state.splice(existingItemIndex, 1);
        }
      }
    },
  },
});

export const {
  cartAddItems,
  cartRemoveItems,
  cartIncreaseQuantity,
  cartDecreaseQuantity,
} = slice.actions;

export default slice.reducer;
