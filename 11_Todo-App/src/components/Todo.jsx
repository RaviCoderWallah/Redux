import { useDispatch } from "react-redux";
import {
  deleteTodo,
  editCompletedStatus,
  editTodo,
} from "../store/slices/todoSlice";
import { useState } from "react";

const Todo = ({ todoData }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [todoEditValue, setTodoEditValue] = useState(todoData.todoTitle);

  const saveTodo = (id) => {
    setIsEdit(false);
    dispatch(editTodo({ todoId: id, editedValue: todoEditValue }));
  };

  return (
    <div className="flex justify-between bg-gray-100 p-4 rounded-sm hover:bg-gray-200">
      <input
        type="checkbox"
        name="todo"
        className="scale-120"
        checked={todoData.isCompleted}
        onChange={() => dispatch(editCompletedStatus({ todoId: todoData.id }))}
      />
      {!isEdit ? (
        <label htmlFor="todo" className="text-lg text-gray-600">
          {todoData.todoTitle}
        </label>
      ) : (
        <input
          type="text"
          className="outline-1 outline-violet-500 pl-2 rounded-sm"
          value={todoEditValue}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              saveTodo(todoData.id);
            }
          }}
          onChange={(e) => setTodoEditValue(e.target.value)}
        />
      )}

      <div className="flex items-center gap-2">
        {!isEdit ? (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-green-700 text-white opacity-90 rounded-sm px-4 py-1 cursor-pointer hover:bg-green-600"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={() => saveTodo(todoData.id)}
            className="bg-green-700 text-white opacity-90 rounded-sm px-4 py-1 cursor-pointer hover:bg-green-600"
          >
            Save
          </button>
        )}

        <button
          onClick={() => dispatch(deleteTodo({ todoId: todoData.id }))}
          className="bg-red-700 text-white opacity-90 rounded-sm px-4 py-1 cursor-pointer hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
