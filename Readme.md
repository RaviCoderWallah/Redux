# Redux Complete Guide

# 01 - Redux Fundamentals
If you uncommet mutating state then state and prevState obj memory same reference, so if any time state change then automatically prevState change. 
If you use non-mutating state method then you create a new reference of obj and prevState is older state, which never equal to new object reference. 

```
let state = { count: 0 };
let prevState = state;
function increment() {
    // Mutating State 
    // state.count++; //prevState = 3, state = 3

    //Non-Mutating State
    state = { count: state.count + 1 } //prevState = 0, state = 3
}
```
## Why we need non-mutating state 
Most of the state managment libary use this method, like React, redux etc. Because with the help of Non-Mutating State React detects something new changes, means state update.
If you use mutating method then prevState and state same reference menas prevState == state which true, means react think don't any change. That's problem create.

## What redux termonlogy 
Why Reducer name? Why not State Updater?
Reducer - state and action ko lekar, logic perform karkae, ek value retun karana - that's why name - reducer
Facts: Same as Reduce method on array in JS. Same work, array lekar ek value retrun karana

```
let reduxState = { post: 1, name: "Ravi Verma", age: 19 };

function reducer(state, action) {
  if (action.type == "post/increment") {
    return { ...state, post: state.post + 1 };
  } else if (action.type == "post/decrement") {
    return { ...state, post: state.post - 1 };
  } else if (action.type == "post/incrementBy") {
    return { ...state, post: state.post + action.payload };
  } else if (action.type == "post/decrementBy") {
    return { ...state, post: state.post - action.payload };
  }
  return state;
}

```
### What Redux do behind the scenes 
```
// reduxState = reducer(reduxState, { type: "post/increment" })
// reduxState = reducer(reduxState, { type: "post/decrement" })
// reduxState = reducer(reduxState, { type: "post/square" })
// reduxState = reducer(reduxState, { type: "post/incrementBy", payload: 10 });
// reduxState = reducer(reduxState, { type: "post/decrementBy", payload: 10 });
```
It's call reducer funtion with action.

## Redux Use Step - 

### 1. Run this command 
```
npm i init -y
```

### 2. Run this command 
```
npm install --g parcel
```

### 3. Remove `main: script.js` in package.json and add module type
Go to package.json and remove **main: script.js** and go to main **script.js** file and add **type="module"**

### 4. Run this command 
```
npm i redux
```

### 5. For running server, run this command 
```
npx parcel index.html
```

## Redux first use 
First, import createStore, althought its not recommended but learning purpose its ok ! Make reducer funtion. Initialize initial state.
```
import { createStore } from "redux";

const initialState = { post: 0, name: "Ravi Verma" };

function reducer(state = initialState, action) {
  if (action.type == "post/increment") {
    return { ...state, post: state.post + 1 };
  } else if (action.type == "post/decrement") {
    return { ...state, post: state.post - 1 };
  } else if (action.type == "post/incrementBy") {
    return { ...state, post: state.post + action.payload };
  } else if (action.type == "post/decrementBy") {
    return { ...state, post: state.post - action.payload };
  }
  return state;
}
```
## See console.log(createRoot) function 
You give some properties, inside it not all mostly use. Only use dispatch, subscribe, getState method.
```
{dispatch: ƒ, subscribe: ƒ, getState: ƒ, replaceReducer: ƒ, @@observable: ƒ}
```

## See console.log(createRoot.getState()) 
It's give state.
```
{post: 10, name: 'Ravi Verma'}
```

### Use dispatch and subscribe method 
```
let store = createStore(reducer);

console.log(store);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({ type: "post/incrementBy", payload: 10 });
store.dispatch({ type: "post/decrementBy", payload: 5 });

```
#### Subscriebe: use for notify when state changes
#### Dispath: use as a call store with action.


