import React, { useState } from "react";
import PropTypes from "prop-types";

const AddTodo = ({ onAddTodo }) => {
  const [todoName, setTodoName] = useState("");
  const onTodoChange = (event) => {
    const value = event.target.value;
    setTodoName(value);
  };
  const onClickAdd = (event) => {
    event.preventDefault();
    if (todoName) {
      onAddTodo(todoName);
      setTodoName("");
    }
  };
  return (
    <form onSubmit={onClickAdd}>
      <input
        placeholder="Please enter a Todo"
        onChange={onTodoChange}
        value={todoName}
        data-testid="add-todo-name"
      />
      <button type="submit" onClick={onClickAdd} data-testid="add-todo-button">
        Add
      </button>
    </form>
  );
};

AddTodo.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodo;
