import React, { useState } from "react";
import PropTypes from "prop-types";
import TodoListRow from "./TodoListRow";
import "./styles.css";

const TodoList = ({ todoData, onTodoStatus, onUpdateTodo, onDeleteTodo }) => {
  const [sortMode, setSortMode] = useState("asc");
  const [sortField, setSortField] = useState("name");
  const sortIcon = sortMode === "asc" ? <span>▲</span> : <span>▼</span>;
  const onClickSort = (field) => {
    setSortMode(sortMode === "asc" ? "desc" : "asc");
    setSortField(field);
  };
  // sort data based on field selected and sort order
  const sortedTodoData = todoData.sort((a, b) => {
    return sortMode === "asc"
      ? a[sortField].localeCompare(b[sortField])
      : b[sortField].localeCompare(a[sortField]);
  });
  return (
    <>
      {todoData.length > 0 && (
        <table className="todo-list-table">
          <thead>
            <tr>
              <th>#</th>
              <th
                className="todo-sort-column"
                onClick={() => onClickSort("name")}
              >
                Name {sortField === "name" && sortIcon}
              </th>
              <th
                className="todo-sort-column"
                onClick={() => onClickSort("priority")}
              >
                Priority {sortField === "priority" && sortIcon}
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedTodoData.map((todo) => (
              <TodoListRow
                todo={todo}
                onTodoStatus={onTodoStatus}
                onUpdateTodo={onUpdateTodo}
                onDeleteTodo={onDeleteTodo}
                key={todo.id}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

TodoList.propTypes = {
  todoData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  onTodoStatus: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
