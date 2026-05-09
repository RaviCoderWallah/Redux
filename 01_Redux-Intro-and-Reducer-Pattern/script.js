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

let store = createStore(reducer, window. __REDUX_DEVTOOLS_EXTENSION__?.());

console.log(store);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({ type: INCREASE_BY, payload: 10 });
store.dispatch({ type: DECREASE_BY, payload: 5 });
