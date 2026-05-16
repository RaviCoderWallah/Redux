import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  getCouterValue,
  increment,
} from "./store/slices/couterSlice";

const App = () => {
  const count = useSelector(getCouterValue);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement} disabled={count <= 0}>
        Decrement
      </button>
    </div>
  );
};

export default App;
