import { combineReducers, createStore } from "redux";

import productsReducer from "./slices/productsSlice.js";
import cartReducer from "./slices/cartSlice.js";
import whishListReducer from "./slices/whishListSlice.js";

const reducer = combineReducers({
  productList: productsReducer,
  cartItems: cartReducer,
  whishList: whishListReducer,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.(),
);
