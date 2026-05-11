import { combineReducers, createStore } from "redux";
import productsReducer from "./productsReducer.js";
import cartReducer from "./cartReducer.js";

import whishListReducer, {
  whishListAddItem,
  whishListRemoveItem,
} from "./whishListReducer.js";

import { cartAddItems } from "./cartReducer.js";
import { cartRemoveItems } from "./cartReducer.js";
import { cartIncreaseQuantity } from "./cartReducer.js";
import { cartDecreaseQuantity } from "./cartReducer.js";

const reducer = combineReducers({
  productList: productsReducer,
  cartItems: cartReducer,
  whishList: whishListReducer,
});

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());

store.dispatch(cartAddItems(1));
store.dispatch(cartAddItems(2));
store.dispatch(cartAddItems(14));
store.dispatch(cartRemoveItems(14));
store.dispatch(cartIncreaseQuantity(2));
store.dispatch(cartDecreaseQuantity(14));

store.dispatch(whishListAddItem(18));
store.dispatch(whishListAddItem(11));
store.dispatch(whishListRemoveItem(18));
store.dispatch(whishListRemoveItem(11));
