// import { productList } from "../productsDataList";
import { createSlice } from "@reduxjs/toolkit";

// export default function productsReducer(state = [], action) {
//   return state;
// }

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: "",
    list: [],
  },
  reducers: {
    fetchProducts(state) {
      state.loading = true;
    },
    fetchProductsError(state, action) {
      state.loading = false;
      state.error = action.payload || "Something Went Wrong ! ";
    },
    updateAllProducts(state, action) {
      state.loading = false;
      state.list = action.payload;
      state.error = "";
    },
  },
});

//selectors =========>>>>>>
export const getAllProducts = (state) => state.productList.list;
export const getProductLoading = (state) => state.productList.loading;
export const getProductError = (state) => state.productList.error;
// ===========>>>>>>>>>>

export const { fetchProducts, fetchProductsError, updateAllProducts } =
  slice.actions;

export default slice.reducer;
