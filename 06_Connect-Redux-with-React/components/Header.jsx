import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartIcon from "url:../assets/cart-icon.svg";
import WhishListIcon from "url:../assets/heart.svg";

export default function Header() {
  const cartItems = useSelector((state) => state.cartItems);
  const totalQuantity = cartItems.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity;
  }, 0);
  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Shopee</Link>
        </h1>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link className="cart-icon" to="/whishlist">
            <img src={WhishListIcon} alt="cart-icon" />
            <div className="cart-items-count">{0}</div>
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
