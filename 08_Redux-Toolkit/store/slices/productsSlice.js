// import { productList } from "../productsDataList";
import { createSlice } from "@reduxjs/toolkit";

// export default function productsReducer(state = [], action) {
//   return state;
// }

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    list: [],
  },
  reducers: {
    fetchProducts(state) {
      state.loading = true;
    },
    updateAllProducts(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
  },
});

export const { fetchProducts, updateAllProducts } = slice.actions;
export default slice.reducer;
