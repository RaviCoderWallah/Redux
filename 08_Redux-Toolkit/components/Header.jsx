import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartIcon from "url:../assets/cart-icon.svg";
import WhishListIcon from "url:../assets/heart.svg";
import {
  fetchProducts,
  fetchProductsError,
  updateAllProducts,
} from "../store/slices/productsSlice";
// import { productList } from "../store/productsDataList";

export default function Header() {
  const cartItems = useSelector((state) => state.cartItems);
  const wishList = useSelector((state) => state.whishList);
  const totalQuantity = cartItems.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity;
  }, 0);

  //Fetching Products Data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "api/makeCall",
      payload: {
        url: "products",
        onSuccess: updateAllProducts.type,
        onStart: fetchProducts.type,
        onError: fetchProductsError.type,
      },
    });
    // dispatch(fetchProducts());
    // async function fetchingProduct() {
    //   try {
    //     const response = await fetch("https://fakestoreapi.com/products");
    //     const data = await response.json();
    //     dispatch(updateAllProducts(data));
    //   } catch (error) {
    //     dispatch(fetchProductsError());
    //   }
    // }
    // fetchingProduct();
  }, []);

  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Shopee</Link>
        </h1>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link className="cart-icon" to="/whishlist">
            <img src={WhishListIcon} alt="cart-icon" />
            <div className="cart-items-count">{wishList.length}</div>
          </Link>
          <Link className="cart-icon" to="/cart">
            <img src={CartIcon} alt="cart-icon" />
            <div className="cart-items-count">{totalQuantity}</div>
          </Link>
        </div>
      </div>
    </header>
  );
}
