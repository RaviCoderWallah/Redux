import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../store/slices/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});
