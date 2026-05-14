import { useSelector } from "react-redux";
import Product from "../components/Product";
import {
  getAllProducts,
  getProductError,
  getProductLoading,
} from "../store/slices/productsSlice";

export default function Home() {
  const productsList = useSelector(getAllProducts);
  const isLoading = useSelector(getProductLoading);
  const isError = useSelector(getProductError);

  return isLoading ? (
    <h1 style={{ textAlign: "center", fontSize: "40px" }}>Loading...</h1>
  ) : (
    isError || (
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
    )
  );
}
