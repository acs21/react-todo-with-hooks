import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";

const TodoListRow = ({ todo, onUpdateTodo, onDeleteTodo, onTodoStatus }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(todo.name);
  const [priority, setPriority] = useState(todo.priority);
  // cancel update and restore previous values
  const onClickCancel = () => {
    setName(todo.name);
    setPriority(todo.priority);
    setEditMode(false);
  };
  // set new todo values to parent state
  const onClickUpdate = () => {
    if (name) {
      onUpdateTodo(todo.id, name, priority);
      setEditMode(false);
    }
  };
  // set completed/incomplete status
  const onStatusClick = (e) => onTodoStatus(todo.id, e.target.checked);
  // toggle between edit mode and display mode
  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onStatusClick}
          />
        </td>
        {!editMode ? (
          <>
            <td>{name}</td>
            <td>{priority}</td>
          </>
        ) : (
          <>
            <td>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </td>
            <td>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </td>
          </>
        )}
        <td>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </td>
        <td>
          <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
        </td>
      </tr>
      {editMode && (
        <tr>
          <td colSpan="3">
            <button onClick={onClickUpdate}>Update</button>
            <button onClick={onClickCancel}>Cancel</button>
          </td>
        </tr>
      )}
    </>
  );
};

TodoListRow.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onTodoStatus: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default TodoListRow;
