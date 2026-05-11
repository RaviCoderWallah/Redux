//Actions Types
const CART_ADD_ITEMS = "cart/addItems";
const CART_REMOVE_ITEMS = "cart/removeItems";
const CART_INCREASE_QUNATITY = "cart/increaseQuantity";
const CART_DECREASE_QUNATITY = "cart/decreaseQuantity";

//Action Creators
export function cartAddItems(productID, quantity = 1) {
  return {
    type: CART_ADD_ITEMS,
    payload: { productID, quantity },
  };
}

export function cartRemoveItems(productID) {
  return { type: CART_REMOVE_ITEMS, payload: productID };
}

export function cartIncreaseQuantity(productID) {
  return { type: CART_INCREASE_QUNATITY, payload: productID };
}

export function cartDecreaseQuantity(productID) {
  return { type: CART_DECREASE_QUNATITY, payload: productID };
}

//Reducer
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case CART_ADD_ITEMS:
      return [...state, action.payload];

    case CART_REMOVE_ITEMS:
      return state.filter((item) => item.productID !== action.payload);

    case CART_INCREASE_QUNATITY:
      return state.map((item) => {
        if (item.productID === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

    case CART_DECREASE_QUNATITY:
      return state.map((item) => {
        if (item.productID === action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    default:
      return state;
  }
}
