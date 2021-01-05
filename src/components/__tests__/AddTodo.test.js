import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddTodo from "../AddTodo";

const addTodoFn = () => null;
const renderComponent = () => render(<AddTodo onAddTodo={addTodoFn} />);

describe("Add Todo", () => {
  it("renders add todo component", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("add-todo-name")).toBeInTheDocument();
    expect(getByTestId("add-todo-button")).toBeInTheDocument();
  });

  it("add text on field", () => {
    const { getByTestId } = renderComponent();
    fireEvent.change(getByTestId("add-todo-name"), {
      target: { value: "New Todo" },
    });
    expect(getByTestId("add-todo-name")).toHaveValue("New Todo");
  });
});
