import { combineReducers, createStore } from "redux";

import productsReducer from "./productsReducer.js";
import cartReducer from "./cartReducer.js";
import whishListReducer from "./whishListReducer.js";


const reducer = combineReducers({
  productList: productsReducer,
  cartItems: cartReducer,
  whishList: whishListReducer,
});

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());
