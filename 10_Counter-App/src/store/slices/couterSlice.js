import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      if (state.value > 0) {
        state.value--;
      }
    },
  },
});

//selectors
export const getCouterValue = (state) => state.counter.value;

export const { increment, decrement } = slice.actions;

export default slice.reducer;
