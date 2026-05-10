import { createStore } from "redux";

const initialState = { post: 0, name: "Ravi Verma" };

const INCREMENT = "post/increment";
const DECREMENT = "post/decrement";
const INCREASE_BY = "post/incrementBy";
const DECREASE_BY = "post/decrementBy";

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case INCREMENT:
      return { ...state, post: state.post + 1 };
    case DECREMENT:
      return { ...state, post: state.post - 1 };
    case INCREASE_BY:
      return { ...state, post: state.post + payload };
    case DECREASE_BY:
      return { ...state, post: state.post + payload };
    default:
      return state;
  }
}

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());

console.log(store);

//subscibe returns unscribe funtions, which stops subscribe exceution
const subscribe1 = store.subscribe(() => {
  console.log(store.getState());
});

const subscribe2 = store.subscribe(() => {
  console.log("hello");
});

store.dispatch({ type: INCREASE_BY, payload: 10 });
subscribe2();

store.dispatch({ type: DECREASE_BY, payload: 5 });
store.dispatch({ type: INCREASE_BY, payload: 20 });
subscribe1();

store.dispatch({ type: DECREASE_BY, payload: 15 });
