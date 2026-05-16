import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTodo,
  getTodoList,
  selectAll,
  unselectAll,
} from "./store/slices/todoSlice";

const App = () => {
  const todoList = useSelector(getTodoList);
  const dispatch = useDispatch();

  const [todoValue, setTodoValue] = useState("");
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [activeStatus, setActiveStatus] = useState("All");

  const handleSubmitTodo = () => {
    if (todoValue !== "") {
      const newTodo = {
        id: crypto.randomUUID(),
        todoTitle: todoValue,
        isCompleted: false,
      };
      dispatch(addNewTodo(newTodo));
      setTodoValue("");
    }
  };

  const handleSelectAll = () => {
    setIsAllSelected(true);
    dispatch(selectAll());
  };

  const handleUnSelectAll = () => {
    setIsAllSelected(false);
    dispatch(unselectAll());
  };

  const handleActiveTodo = () => {
    setActiveStatus("Active");
  };

  const handleCompletedTodo = () => {
    setActiveStatus("Completed");
  };

  const getBtnClx = (status) => {
    const isActive = activeStatus === status;
    return `${isActive ? "bg-violet-700 text-white hover:bg-violet-600" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}  rounded-sm px-4 py-1 cursor-pointer`;
  };

  const filteredTodoList = todoList.filter((todo) => {
    if (activeStatus === "Active") return !todo.isCompleted;
    if (activeStatus === "Completed") return todo.isCompleted;
    return true;
  });

  return (
    <main className="font-poppins bg-violet-600 min-h-screen flex items-center justify-center">
      <div className="bg-white max-w-xl w-full rounded-sm p-4">
        <h1 className="text-3xl text-gray-800 text-center font-semibold mb-6">
          Today's Tasks
        </h1>
        {/* Add New Todo  */}
        <div className="flex gap-4 my-6">
          <input
            type="text"
            placeholder="Add an item..."
            className="outline-1 outline-grey-500 rounded-sm px-2 py-1"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
          <button
            onClick={handleSubmitTodo}
            className="bg-violet-700 text-white rounded-sm px-4 py-1 cursor-pointer hover:bg-violet-600"
          >
            Submit
          </button>
        </div>
        {/* Search bar  */}
        <div className="my-6">
          <input
            type="text"
            placeholder="Search item..."
            className="outline-1 w-full outline-grey-500 rounded-sm px-2 py-1"
          />
        </div>
        {/* Todo's Status  */}
        <div className="my-4 flex items-center gap-4 justify-self-center">
          <button
            onClick={() => setActiveStatus("All")}
            className={getBtnClx("All")}
          >
            All
          </button>
          <button onClick={handleActiveTodo} className={getBtnClx("Active")}>
            Active
          </button>
          <button
            onClick={handleCompletedTodo}
            className={getBtnClx("Completed")}
          >
            Completed
          </button>
        </div>
        {/* Clear completed  */}
        <div className="my-4 flex items-center gap-4 justify-self-center">
          <button
            className={`${false ? "bg-violet-600 text-white cursor-pointer" : "text-white bg-gray-400 cursor-not-allowed"} rounded-sm px-4 py-1 `}
          >
            Clear Completed (0)
          </button>
        </div>
        {/* Select All  */}
        <div className="my-4 flex items-center gap-4 justify-self-center">
          {!isAllSelected ? (
            <button
              onClick={handleSelectAll}
              className="bg-violet-600 text-white rounded-sm px-4 py-1 cursor-pointer hover:bg-violet-700"
            >
              Select All
            </button>
          ) : (
            <button
              onClick={handleUnSelectAll}
              className="bg-violet-600 text-white rounded-sm px-4 py-1 cursor-pointer hover:bg-violet-700"
            >
              Unselect All
            </button>
          )}
        </div>
        {/* Todo List  */}
        <div className="px-4 flex flex-col gap-4">
          {[...filteredTodoList].reverse().map((todo) => {
            return <Todo key={todo.id} todoData={todo} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default App;
