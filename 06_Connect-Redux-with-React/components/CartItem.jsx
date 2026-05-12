import { useDispatch } from "../react-redux";
import {
  cartDecreaseQuantity,
  cartIncreaseQuantity,
} from "../store/slices/cartSlice";

export default function CartItem({
  productId,
  title,
  rating,
  price,
  imageUrl,
  quantity,
}) {
  const dispatch = useDispatch();

  const handleIncreaseQuantity = () => {
    dispatch(cartIncreaseQuantity(productId));
  };

  const handleDecreaseQuantity = () => {
    dispatch(cartDecreaseQuantity(productId));
  };

  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <img src={imageUrl} alt={title} />
        <div>
          <h3>{title}</h3>
          <p>{rating} ★ ★ ★ ★</p>
        </div>
      </div>
      <div className="item-price">${price}</div>
      <div className="item-quantity">
        <button onClick={handleDecreaseQuantity}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncreaseQuantity}>+</button>
      </div>
      <div className="item-total">${quantity * price}</div>
    </div>
  );
}
