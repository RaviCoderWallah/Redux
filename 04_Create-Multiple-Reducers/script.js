import { createStore } from "redux";
import { productList } from "./productsDataList.js";

const initialState = {
    products: productList,
    cartItems: [],
    wishList: [],
};

const CART_ADD_ITEMS = "cart/addItems";
const CART_REMOVE_ITEMS = "cart/removeItems";
const CART_INCREASE_QUNATITY = "cart/increaseQuantity";
const CART_DECREASE_QUNATITY = "cart/decreaseQuantity";

const WISHLIST_ADD_ITEM = 'wishList/addItem'
const WISHLIST_REMOVE_ITEM = 'wishList/removeItem'

function reducer(state = initialState, action) {
    switch (action.type) {
        case CART_ADD_ITEMS:
            return { ...state, cartItems: [...state.cartItems, action.payload] };

        case CART_REMOVE_ITEMS:
            return {
                ...state,
                cartItems: state.cartItems?.filter(
                    (item) => item.productID !== action.payload,
                ),
            };

        case CART_INCREASE_QUNATITY:
            return {
                ...state,
                cartItems: state.cartItems?.map((item) => {
                    if (item.productID === action.payload) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                }),
            };

        case CART_DECREASE_QUNATITY:
            return {
                ...state,
                cartItems: state.cartItems?.map((item) => {
                    if (item.productID === action.payload) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                }),
            };
        case WISHLIST_ADD_ITEM:
            return { ...state, wishList: [...state.wishList, action.payload] }

        case WISHLIST_REMOVE_ITEM:
            return {
                ...state,
                wishList: state.wishList.filter(
                    (wishListItem) => wishListItem.productId !== action.payload.productId
                ),
            }
        default:
            return state;
    }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());

store.dispatch({type: CART_ADD_ITEMS, payload: { productID: 1, quantity: 1 }});

store.dispatch({type: CART_ADD_ITEMS, payload: { productID: 2, quantity: 1 }});
store.dispatch({type: CART_ADD_ITEMS, payload: { productID: 14, quantity: 1 },});
store.dispatch({type: CART_ADD_ITEMS,payload: { productID: 15, quantity: 1 }});
store.dispatch({type: CART_REMOVE_ITEMS, payload: 1});
store.dispatch({ type: CART_INCREASE_QUNATITY,payload: 2});
store.dispatch({type: CART_DECREASE_QUNATITY, payload: 14});

store.dispatch({ type: WISHLIST_ADD_ITEM, payload: { productId: 18 } })
store.dispatch({ type: WISHLIST_ADD_ITEM, payload: { productId: 11 } })
store.dispatch({ type: WISHLIST_REMOVE_ITEM, payload: { productId: 11 } })
store.dispatch({ type: WISHLIST_REMOVE_ITEM, payload: { productId: 18 } })