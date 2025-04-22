import { createSelector } from "@reduxjs/toolkit";
import { type TRootState } from "../store";

export const selectFilteredTodos = createSelector(
  (state: TRootState) => state.todos.todos,
  (state: TRootState) => state.todos.filter,
  (state: TRootState) => state.todos.selectedDate,
  (todos, filter, selectedDate) => {
    let filteredTodos = todos;
    if (filter === "completed") {
      filteredTodos = filteredTodos.filter((todo) => todo.completed);
    }
    if (filter === "active") {
      filteredTodos = filteredTodos.filter((todo) => !todo.completed);
    }
    if (selectedDate) {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.date.startsWith(selectedDate),
      );
    }
    return filteredTodos;
  },
);
