import { combineReducers, createStore } from "redux";

import productsReducer from "./slices/productsSlice.js";
import cartReducer from "./slices/cartSlice.js";
import whishListReducer from "./slices/whishListSlice.js";
import { produce } from "immer";

const reducer = combineReducers({
  productList: productsReducer,
  cartItems: cartReducer,
  whishList: whishListReducer,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.(),
);

// const users = [
//   {
//     name: "Ravi",
//     age: 19,
//   },
//   {
//     name: "Mukesh",
//     age: 17,
//   },
// ];

// users[1].age = 20;

// let modifyUsers = users.map((user, index) => {
//   if (index === 1) {
//     return { ...user, age: 20 };
//   }
//   return user;
// });

//Using Immer.js
// const modifyUsers = produce(users, (copyUsers) => {
//   copyUsers[1].age = 20;
// });

// console.log(modifyUsers);
// console.log(users);
