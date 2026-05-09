/*
//Core, how changes detected in React, Redux and other state management libaries
let state = { count: 0 };
let prevState = state;
function increment() {
    // Mutating State 
    // state.count++; //prevState = 3, state = 3

    //Non-Mutating State
    state = { count: state.count + 1 } //prevState = 0, state = 3
}
*/ let reduxState = {
    post: 1,
    name: "Ravi Verma",
    age: 19
};
//Why Reducer name? Why not State Updater?
//Reducer - state and action ko lekar, logic perform karkae, ek value retun karana - that's why name - reducer 
//Facts: Same as Reduce method on array in JS. Same work, array lekar ek value retrun karana
function reducer(state, action) {
    if (action.type == "post/increment") return {
        ...state,
        post: state.post + 1
    };
    else if (action.type == "post/decrement") return {
        ...state,
        post: state.post - 1
    };
    else if (action.type == "post/incrementBy") return {
        ...state,
        post: state.post + action.payload
    };
    else if (action.type == "post/decrementBy") return {
        ...state,
        post: state.post - action.payload
    };
    return state;
}
//WHat Redux will Do behind the scenes
// reduxState = reducer(reduxState, { type: "post/increment" })
// reduxState = reducer(reduxState, { type: "post/decrement" })
// reduxState = reducer(reduxState, { type: "post/square" })
reduxState = reducer(reduxState, {
    type: "post/incrementBy",
    payload: 10
});
console.log(reduxState);
reduxState = reducer(reduxState, {
    type: "post/decrementBy",
    payload: 10
});
console.log(reduxState);

//# sourceMappingURL=01_Redux-Intro-and-Reducer-Pattern.672d4772.js.map
