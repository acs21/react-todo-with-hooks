import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Todos from "../Todos";

const renderComponent = () => render(<Todos />);

describe("Todo App", () => {
  it("renders Todo App", () => {
    const { getByText } = renderComponent();
    expect(getByText("Incomplete Todos - 0")).toBeInTheDocument();
    expect(getByText("Completed Todos - 0")).toBeInTheDocument();
  });

  it("add a todo and render it", async () => {
    const { getByText, getByTestId } = renderComponent();
    fireEvent.change(getByTestId("add-todo-name"), {
      target: { value: "New Todo" },
    });
    fireEvent.click(getByTestId("add-todo-button"));
    expect(getByTestId("incomplete-title")).toHaveTextContent(
      "Incomplete Todos - 1"
    );
    expect(getByText("New Todo")).toBeInTheDocument();
  });

  it("edit a todo and update it", async () => {
    const { getByText, getByTestId, getByDisplayValue } = renderComponent();
    fireEvent.change(getByTestId("add-todo-name"), {
      target: { value: "New Todo" },
    });
    fireEvent.click(getByTestId("add-todo-button"));
    expect(getByTestId("incomplete-title")).toHaveTextContent(
      "Incomplete Todos - 1"
    );
    expect(getByText("New Todo")).toBeInTheDocument();
    fireEvent.click(getByText("Edit"));
    fireEvent.change(getByDisplayValue("New Todo"), {
      target: { value: "Updated Todo" },
    });
    fireEvent.change(getByDisplayValue("Medium"), {
      target: { value: "High" },
    });
    fireEvent.click(getByText("Update"));
    expect(getByText("Updated Todo")).toBeInTheDocument();
    expect(getByText("High")).toBeInTheDocument();
    const oldTodoName = screen.queryByText("New Todo");
    const oldTodoPriority = screen.queryByText("Medium");
    expect(oldTodoName).not.toBeInTheDocument();
    expect(oldTodoPriority).not.toBeInTheDocument();
  });

  it("delete a todo", async () => {
    const { getByText, getByTestId } = renderComponent();
    fireEvent.change(getByTestId("add-todo-name"), {
      target: { value: "New Todo" },
    });
    fireEvent.click(getByTestId("add-todo-button"));
    expect(getByTestId("incomplete-title")).toHaveTextContent(
      "Incomplete Todos - 1"
    );
    expect(getByText("New Todo")).toBeInTheDocument();
    fireEvent.click(getByText("Delete"));
    const oldTodoName = screen.queryByText("New Todo");
    const oldTodoPriority = screen.queryByText("Medium");
    expect(oldTodoName).not.toBeInTheDocument();
    expect(oldTodoPriority).not.toBeInTheDocument();
  });

  it("set status to completed", async () => {
    const { container, getByText, getByTestId } = renderComponent();
    fireEvent.change(getByTestId("add-todo-name"), {
      target: { value: "New Todo" },
    });
    fireEvent.click(getByTestId("add-todo-button"));
    expect(getByTestId("incomplete-title")).toHaveTextContent(
      "Incomplete Todos - 1"
    );
    expect(getByText("New Todo")).toBeInTheDocument();
    fireEvent.click(container.querySelector("input[type=checkbox]"));
    expect(getByTestId("incomplete-title")).toHaveTextContent(
      "Incomplete Todos - 0"
    );
    expect(getByTestId("completed-title")).toHaveTextContent(
      "Completed Todos - 1"
    );
    expect(getByText("New Todo")).toBeInTheDocument();
  });
});
