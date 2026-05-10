import { createStore } from "redux";
import { myCreateStore } from "./my-redux";

const initialState = { count: 0, counterName: "Timer" };
const INCREMENT = "post/increment";
const DECREMENT = "post/decrement";
const INCREASE_BY = "post/incrementBy";
const DECREASE_BY = "post/decrementBy";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    case INCREASE_BY:
      return { ...state, count: state.count + action.payload };
    case DECREASE_BY:
      return { ...state, count: state.count - action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);
const myStore = myCreateStore(reducer);

console.log(store);
console.log(myStore);

const subscribe1 = myStore.subscribe(() => {
  console.log(myStore.getState());
});

const subscribe2 = myStore.subscribe(() => {
  console.log("Hello");
});

myStore.dispatch({ type: INCREMENT });
subscribe2();

myStore.dispatch({ type: INCREASE_BY, payload: 20 });
myStore.dispatch({ type: INCREMENT });
myStore.dispatch({ type: INCREASE_BY, payload: 20 });
