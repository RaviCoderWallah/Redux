//Action Types
const WISHLIST_ADD_ITEM = "wishList/addItem";
const WISHLIST_REMOVE_ITEM = "wishList/removeItem";

//Action Creators
export function whishListAddItem(productData) {
  return { type: WISHLIST_ADD_ITEM, payload: productData };
}

export function whishListRemoveItem(productId) {
  return { type: WISHLIST_REMOVE_ITEM, payload: { productId } };
}

//Reducer
export default function whishListReducer(state = [], action) {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      const isExist = state.find(
        (wishListItem) => wishListItem.productId === action.payload.productId,
      );
      if (isExist) {
        return [...state];
      } else {
        return [...state, action.payload];
      }

    case WISHLIST_REMOVE_ITEM:
      return state.filter(
        (wishListItem) => wishListItem.productId !== action.payload.productId,
      );
    default:
      return state;
  }
}
