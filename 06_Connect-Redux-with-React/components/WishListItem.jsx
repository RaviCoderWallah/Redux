import { useDispatch } from "react-redux";
import { whishListRemoveItem } from "../store/whishListReducer";

export default function WhishListItem({
  productId,
  title,
  rating,
  price,
  imageUrl,
}) {
  const dispatch = useDispatch();

  const handleRemoveWishList = () => {
    dispatch(whishListRemoveItem(productId));
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
      <div>
        <p
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={handleRemoveWishList}
        >
          Remove
        </p>
      </div>
    </div>
  );
}
