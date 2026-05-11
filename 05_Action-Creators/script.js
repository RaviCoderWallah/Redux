import { createStore } from "redux";
import { productList } from "./productsDataList.js";
import productsReducer from "./productsReducer.js";
import cartReducer, {
  CART_ADD_ITEMS,
  CART_DECREASE_QUNATITY,
  CART_INCREASE_QUNATITY,
  CART_REMOVE_ITEMS,
} from "./cartReducer.js";
import whishListReducer, {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
} from "./whishListReducer.js";

//Make it own combine Reducers
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);

  return function (state = {}, action) {
    const nextState = {};

    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
    }

    return nextState;
  };
}

const reducer = combineReducers({
  productList: productsReducer,
  cartItems: cartReducer,
  whishList: whishListReducer,
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());

store.dispatch({
  type: CART_ADD_ITEMS,
  payload: { productID: 1, quantity: 1 },
});

store.dispatch({
  type: CART_ADD_ITEMS,
  payload: { productID: 2, quantity: 1 },
});
store.dispatch({
  type: CART_ADD_ITEMS,
  payload: { productID: 14, quantity: 1 },
});
store.dispatch({
  type: CART_ADD_ITEMS,
  payload: { productID: 15, quantity: 1 },
});
store.dispatch({ type: CART_REMOVE_ITEMS, payload: 1 });
store.dispatch({ type: CART_INCREASE_QUNATITY, payload: 2 });
store.dispatch({ type: CART_DECREASE_QUNATITY, payload: 14 });

store.dispatch({ type: WISHLIST_ADD_ITEM, payload: { productId: 18 } });
store.dispatch({ type: WISHLIST_ADD_ITEM, payload: { productId: 11 } });
store.dispatch({ type: WISHLIST_REMOVE_ITEM, payload: { productId: 11 } });
store.dispatch({ type: WISHLIST_REMOVE_ITEM, payload: { productId: 18 } });
