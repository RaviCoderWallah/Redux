//Actions Types
const CART_ADD_ITEMS = "cart/addItems";
const CART_REMOVE_ITEMS = "cart/removeItems";
const CART_INCREASE_QUNATITY = "cart/increaseQuantity";
const CART_DECREASE_QUNATITY = "cart/decreaseQuantity";

//Action Creators
export function cartAddItems(productData) {
  return {
    type: CART_ADD_ITEMS,
    payload: productData,
  };
}

export function cartRemoveItems(productId) {
  return { type: CART_REMOVE_ITEMS, payload: productId };
}

export function cartIncreaseQuantity(productId) {
  return { type: CART_INCREASE_QUNATITY, payload: productId };
}

export function cartDecreaseQuantity(productId) {
  return { type: CART_DECREASE_QUNATITY, payload: productId };
}

//Reducer
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case CART_ADD_ITEMS: {
      const isExist = state.find(
        (item) => item.productId === action.payload.productId,
      );

      if (isExist) {
        return state.map((cartItem) => {
          if (cartItem.productId === isExist.productId) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case CART_REMOVE_ITEMS:
      return state.filter((item) => item.productId !== action.payload);

    case CART_INCREASE_QUNATITY:
      return state.map((item) => {
        if (item.productId === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

    case CART_DECREASE_QUNATITY:
      return state
        .map((item) => {
          if (item.productId === action.payload) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((cartItem) => cartItem.quantity > 0);
    default:
      return state;
  }
}
