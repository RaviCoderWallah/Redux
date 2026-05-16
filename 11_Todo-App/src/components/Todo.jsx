const Todo = () => {
  return (
    <div className="flex justify-between bg-gray-100 p-4 rounded-sm hover:bg-gray-200">
      <input type="checkbox" name="todo" className="scale-110" />
      <label htmlFor="todo" className="text-lg text-gray-600">
        Weather App
      </label>
      <div className="flex items-center gap-2">
        <button className="bg-green-700 text-white opacity-90 rounded-sm px-4 py-1 cursor-pointer hover:bg-green-600">
          Edit
        </button>
        <button className="bg-red-700 text-white opacity-90 rounded-sm px-4 py-1 cursor-pointer hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
