import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, clearTodos, getTodos } from "../slices/todosSlice";
import { fetchTodo } from "../thunks/todosThunk";
import Todo from "./Todo";
import Loading from "./Loading";
import Wrapper from "./Wrapper";
import Tableheaders from "./Tableheaders";

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    dispatch(fetchTodo());
  };

  useEffect(() => {
    setIsDataLoaded(!isDataLoaded);
  }, [isLoading]);

  const handleClearTodos = () => {
    dispatch(clearTodos({}));
  };

  //Load localstorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    console.log(savedTodos);
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      dispatch(getTodos(parsedTodos));
    }
  }, []);

  if (isDataLoaded) {
    return <Loading />;
  }

  return (
    <div>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Todos</button>
      <Wrapper>
        <Tableheaders />
      </Wrapper>
      {todos.map((todo) => (
        <Wrapper key={todo.id}>
          <Todo id={todo.id} text={todo.text} />
        </Wrapper>
      ))}
    </div>
  );
};

export default Todos;
