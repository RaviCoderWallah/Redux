export const CART_ADD_ITEMS = "cart/addItems";
export const CART_REMOVE_ITEMS = "cart/removeItems";
export const CART_INCREASE_QUNATITY = "cart/increaseQuantity";
export const CART_DECREASE_QUNATITY = "cart/decreaseQuantity";

export default function cartReducer(state = [], action) {
    switch (action.type) {
        case CART_ADD_ITEMS:
            return [...state, action.payload];

        case CART_REMOVE_ITEMS:
            return state.filter(
                (item) => item.productID !== action.payload,
            )

        case CART_INCREASE_QUNATITY:
            return state.map((item) => {
                if (item.productID === action.payload) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })

        case CART_DECREASE_QUNATITY:
            return state.map((item) => {
                if (item.productID === action.payload) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
        default:
            return state;
    }
}