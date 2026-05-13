import { produce } from "immer";

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
  return { type: CART_REMOVE_ITEMS, payload: { productId } };
}

export function cartIncreaseQuantity(productId) {
  return { type: CART_INCREASE_QUNATITY, payload: { productId } };
}

export function cartDecreaseQuantity(productId) {
  return { type: CART_DECREASE_QUNATITY, payload: { productId } };
}

//Reducer
export default function cartReducer(originalState = [], action) {
  return produce(originalState, (state) => {
    const existingItemIndex = state.findIndex(
      (item) => item.productId === action.payload?.productId,
    );

    switch (action.type) {
      case CART_ADD_ITEMS: {
        if (existingItemIndex !== -1) {
          state[existingItemIndex].quantity += 1;
        } else {
          state.push({ ...action.payload, quantity: 1 });
        }
        break;
      }

      case CART_REMOVE_ITEMS: {
        if (existingItemIndex !== -1) state.splice(existingItemIndex, 1);
        break;
      }

      case CART_INCREASE_QUNATITY: {
        if (existingItemIndex !== -1) state[existingItemIndex].quantity += 1;
        break;
      }

      case CART_DECREASE_QUNATITY: {
        if (existingItemIndex !== -1) {
          state[existingItemIndex].quantity -= 1;
          if (state[existingItemIndex].quantity === 0) {
            state.splice(existingItemIndex, 1);
          }
        }
        break;
      }
    }
  });
}
