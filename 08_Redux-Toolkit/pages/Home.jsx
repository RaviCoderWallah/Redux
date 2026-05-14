import { useSelector } from "react-redux";
import Product from "../components/Product";

export default function Home() {
  const productsList = useSelector((state) => state.productList.list);
  const isLoading = useSelector((state) => state.productList.loading);

  return isLoading ? (
    <h1 style={{ textAlign: "center", fontSize: "40px" }}>Loading...</h1>
  ) : (
    <div className="products-container">
      {productsList?.map(({ id, title, rating, price, image }) => (
        <Product
          key={id}
          productId={id}
          title={title}
          rating={rating.rate}
          price={price}
          imageUrl={image}
        />
      ))}
    </div>
  );
}
