import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductsData = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      return response.json();
    } catch (error) {
      throw error;
    }
  },
);

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: "",
    list: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something Went Wrong ! ";
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = "";
      });
  },
});

//selectors =========>>>>>>
export const getAllProducts = (state) => state.productList.list;
export const getProductLoading = (state) => state.productList.loading;
export const getProductError = (state) => state.productList.error;
// ===========>>>>>>>>>>



export default slice.reducer;
