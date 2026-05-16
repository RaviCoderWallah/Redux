import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../store/slices/couterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
