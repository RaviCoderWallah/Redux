import { createStore } from "redux";
import myCreateStore from "./my-redux";


const initialState = {count: 0, counterName: "Timer"};

const INCREMENT = "post/increment";
const DECREMENT = "post/decrement";
const INCREASE_BY = "post/incrementBy";
const DECREASE_BY = "post/decrementBy";

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    case INCREASE_BY:
      return { ...state, count: state.count + payload };
    case DECREASE_BY:
      return { ...state, count: state.count + payload };
    default:
      return state;
  }
}

const store = createStore(reducer);
const myStore = myCreateStore();

console.log(store);
console.log(myStore);

store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch({type: INCREMENT});
store.dispatch({type: INCREASE_BY, payload: 20});