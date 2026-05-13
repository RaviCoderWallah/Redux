import { createSlice } from "@reduxjs/toolkit";

function findExistingItem(state, action) {
  return state.findIndex(
    (state) => state.productId === action.payload.productId,
  );
}

const slice = createSlice({
  name: "wishList",
  initialState: [],
  reducers: {
    whishListAddItem(state, action) {
      const existingIndex = findExistingItem(state, action);
      if (state[existingIndex]) {
        state;
      } else {
        state.push(action.payload);
      }
    },
    whishListRemoveItem(state, action) {
      const existingIndex = findExistingItem(state, action);
      state.splice(existingIndex, 1);
    },
  },
});

console.log(slice);

export const { whishListAddItem, whishListRemoveItem } = slice.actions;
export default slice.reducer;
