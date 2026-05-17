import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "todoList",
  initialState: [
    { id: crypto.randomUUID(), todoTitle: "Read books", isCompleted: false },
    { id: crypto.randomUUID(), todoTitle: "Coding", isCompleted: false },
  ],
  reducers: {
    addNewTodo(state, action) {
      state.push(action.payload);
    },
    deleteTodo(state, action) {
      return state.filter((todo) => todo.id !== action.payload.todoId);
    },
    editTodo(state, action) {
      const todo = state.find((todo) => todo.id === action.payload.todoId);
      if (todo) {
        todo.todoTitle = action.payload.editedValue;
      }
    },
    editCompletedStatus(state, action) {
      const todo = state.find((todo) => todo.id === action.payload.todoId);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    selectAll(state) {
      return state.map((todo) => ({ ...todo, isCompleted: true }));
    },
    unselectAll(state) {
      return state.map((todo) => ({ ...todo, isCompleted: false }));
    },
  },
});

// selectors
export const getTodoList = (state) => state.todo;

export const {
  addNewTodo,
  editTodo,
  deleteTodo,
  editCompletedStatus,
  selectAll,
  unselectAll,
} = slice.actions;

export default slice.reducer;
