import productsReducer from "./slices/productsSlice.js";
import cartReducer from "./slices/cartSlice.js";
import whishListReducer from "./slices/whishListSlice.js";
import { configureStore } from "@reduxjs/toolkit";

function logger(store) {
  return function (next) {
    return function (action) {
      next(action);
    };
  };
}

export const store = configureStore({
  reducer: {
    productList: productsReducer,
    cartItems: cartReducer,
    whishList: whishListReducer,
  },
  middleware: () => [logger],
});
