import productsReducer from "./slices/productsSlice.js";
import cartReducer from "./slices/cartSlice.js";
import whishListReducer from "./slices/whishListSlice.js";
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "./middleware/logger.js";
import { apiMiddleware } from "./middleware/api.js";

export const store = configureStore({
  reducer: {
    productList: productsReducer,
    cartItems: cartReducer,
    whishList: whishListReducer,
  },
  // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware],
});
