import React, { useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import generateId from "../utils/generateId";

const Todos = () => {
  const [todoData, setTodoData] = useState([]);
  // add a todo with defaults
  const onAddTodo = (todoName) => {
    const todos = [
      ...todoData,
      {
        id: generateId(),
        name: todoName,
        priority: "Medium",
        completed: false,
      },
    ];
    setTodoData(todos);
  };
  // update a todo for fields - name/priority
  const onUpdateTodo = (id, name, priority) => {
    const todos = todoData.map((todo) =>
      todo.id === id ? { id, name, priority, completed: todo.completed } : todo
    );
    setTodoData(todos);
  };
  // delete a todo
  const onDeleteTodo = (id) => {
    const todos = todoData.filter((todo) => todo.id !== id);
    setTodoData(todos);
  };
  // update the todo to completed/incomplete
  const onTodoStatus = (id, completed) => {
    const todos = todoData.map((todo) =>
      todo.id === id
        ? { id, name: todo.name, priority: todo.priority, completed }
        : todo
    );
    setTodoData(todos);
  };
  // filter based on completed/incomplete status
  const incompleteTodos = todoData.filter((todo) => !todo.completed);
  const completedTodos = todoData.filter((todo) => todo.completed);
  return (
    <>
      <h1>Todo List</h1>
      <AddTodo onAddTodo={onAddTodo} />
      <h4 data-testid="incomplete-title">Incomplete Todos - {incompleteTodos.length}</h4>
      <TodoList
        todoData={incompleteTodos}
        onTodoStatus={onTodoStatus}
        onUpdateTodo={onUpdateTodo}
        onDeleteTodo={onDeleteTodo}
      />
      <h4 data-testid="completed-title">Completed Todos - {completedTodos.length}</h4>
      <TodoList
        todoData={completedTodos}
        onTodoStatus={onTodoStatus}
        onUpdateTodo={onUpdateTodo}
        onDeleteTodo={onDeleteTodo}
      />
    </>
  );
};
export default Todos;
