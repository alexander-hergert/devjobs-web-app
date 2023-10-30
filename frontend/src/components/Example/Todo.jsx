import React from "react";
import { useDispatch } from "react-redux";
import { updateTodo, removeTodo } from "../slices/todosSlice";
import { useRef } from "react";

const Todo = ({ id, text }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleUpdateTodo = () => {
    const inputText = inputRef.current.value;
    const updatedTodo = {
      id: id,
      text: inputText,
    };
    inputRef.current.value = null;
    if (inputText) {
      dispatch(updateTodo(updatedTodo));
    }
  };

  const handleRemoveTodo = () => {
    dispatch(removeTodo(id));
  };

  return (
    <>
      <span>{text}</span>
      <input type="text" ref={inputRef} />
      <button onClick={handleUpdateTodo}>Update</button>
      <button onClick={handleRemoveTodo}>Remove</button>
    </>
  );
};

export default Todo;
