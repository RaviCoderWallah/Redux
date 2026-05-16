import Todo from "./components/Todo";

const App = () => {
  const isActive = false;
  const btnClx = `${isActive ? "bg-violet-700 text-white hover:bg-violet-600" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}  rounded-sm px-4 py-1 cursor-pointer`;
  return (
    <main className="font-poppins bg-violet-600 min-h-screen flex items-center justify-center">
      <div className="bg-white max-w-xl w-full rounded-sm p-4">
        <h1 className="text-3xl text-center font-semibold my-6">
          Today's Tasks
        </h1>
        {/* Add New Todo  */}
        <div className="flex gap-4 my-6">
          <input
            type="text"
            placeholder="Add an item..."
            className="outline-1 outline-grey-500 rounded-sm px-2 py-1"
          />
          <button className="bg-violet-700 text-white rounded-sm px-4 py-1 cursor-pointer hover:bg-violet-600">
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
          <button className={btnClx}>All</button>
          <button className={btnClx}>Active</button>
          <button className={btnClx}>Completed</button>
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
          <button className="bg-violet-600 text-white rounded-sm px-4 py-1 cursor-pointer hover:bg-violet-700">
            Select All
          </button>
        </div>
        {/* Todo List  */}
        <div className="px-4 flex flex-col gap-4">
          <Todo />
          <Todo />
        </div>
      </div>
    </main>
  );
};

export default App;
