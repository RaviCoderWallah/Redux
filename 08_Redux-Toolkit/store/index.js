import productsReducer from "./slices/productsSlice.js";
import cartReducer from "./slices/cartSlice.js";
import whishListReducer from "./slices/whishListSlice.js";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    productList: productsReducer,
    cartItems: cartReducer,
    whishList: whishListReducer,
  },
});
