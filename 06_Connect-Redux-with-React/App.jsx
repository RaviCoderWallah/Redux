import Product from "./components/Product";
import { productList } from "./store/productsDataList";

import "./App.css";

const App = () => {
  console.log(productList);
  return (
    <div className="products-container">
      {productList?.map(({ id, image, title, price, rating }) => {
        return (
          <Product
            key={id}
            imageUrl={image}
            title={title}
            price={price}
            rating={rating.rate}
          />
        );
      })}
    </div>
  );
};

export default App;
