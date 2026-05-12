import { useSelector } from "../react-redux";
import WhishListItem from "../components/WishListItem";

export default function WhishList() {
  const whishList = useSelector((state) => state.whishList);
  return (
    <div className="cart-container">
      <h2>Items in Your Wish-List</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
        </div>
        {whishList?.map(({ productId, title, rating, price, imageUrl }) => (
          <WhishListItem
            key={productId}
            productId={productId}
            title={title}
            price={price}
            imageUrl={imageUrl}
            rating={rating}
          />
        ))}
      </div>
    </div>
  );
}
