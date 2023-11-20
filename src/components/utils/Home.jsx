import React, {useState } from "react";

const Home = () => {
  const [input, SetInput] = useState("");
  const initialState = {
    id: generateUniqueId(),
    list: "Welcome",
    isEdit: false,
  };
  const [todoList, setTodoList] = useState([initialState]);

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  const addInputChangeHandler = (e) => {
    SetInput(e.target.value);
  };

  const addTodo = () => {
    if (input !== "") {
      setTodoList((prevTodoList) => [
        ...prevTodoList,
        { id: generateUniqueId(), list: input, isEdit: false },
      ]);
    }
    SetInput("");
  };

  const toggleHandler = (id) => {
    const updatedList = todoList.map((todo) =>
      todo.id === id
        ? { ...todo, isEdit: todo.isEdit === true ? false : true }
        : todo
    );
    setTodoList(updatedList);
  };

  const editChangeHandler = (e, id) => {
    const updatedList = todoList.map((todo) =>
      todo.id === id ? { ...todo, list: e.target.value, isEdit: true } : todo
    );
    setTodoList(updatedList);
  };

  const removeHandler = (id) => {
    const updatedList = todoList.filter((todo) => {
      return todo.id !== id;
    });

    setTodoList(updatedList);
  };

  return (
    <>
      <div className="flex justify-center flex-col items-center">
    <div className="flex justify-center mt-10 bg-blue-900 p-5 rounded w-4/3 sm:w-[890px] text-white"> Add Todo here... </div>
        <div className="flex justify-center my-5 bg-blue-900 p-5 rounded w-4/3 sm:w-[890px] ">
          <input
            className="h-12 bg-blue-200 flex items-center p-3 rounded mr-5"
            onChange={(e) => addInputChangeHandler(e)}
            value={input}
          />
          <button onClick={addTodo} className="btn-primary">
            Add
          </button>
        </div>

        {/* render area// */}
        <div className="bg-blue-900 p-10 rounded w-4/3 sm:w-[890px]">
          {todoList.map((todo) => {
            return (
              <div
                className=" h-12 flex justify-center mb-3 bg-blue-900"
                key={todo.id}
              >
                {todo.isEdit === true ? (
                  <input
                    className=" bg-blue-200 flex items-center p-3 rounded mr-5"
                    onChange={(e) => editChangeHandler(e, todo.id)}
                    value={todo.list}
                  />
                ) : (
                  <span className="bg-blue-200 flex items-center p-3 rounded mr-5">
                    {todo.list}
                  </span>
                )}
                <div className="flex justify-left">
                  <div className="flex gap-2">
                    {todo.isEdit === false ? (
                      <button
                        className="btn-primary"
                        onClick={() => toggleHandler(todo.id)}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        className="btn-primary"
                        onClick={() => toggleHandler(todo.id)}
                      >
                        Save
                      </button>
                    )}
                    <button
                      className="btn-primary"
                      onClick={() => {
                        removeHandler(todo.id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
