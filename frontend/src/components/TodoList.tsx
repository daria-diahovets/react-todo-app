import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type TAppDispatch, type TRootState } from "../redux/store";
import { selectFilteredTodos } from "../redux/todoState/selectors";
import { fetchAllTodos } from "../redux/todoState/todoSlice";
import TodoItem from "./TodoItem";

import classes from "./TodoList.module.css";

export default function TodoList() {
  const todos = useSelector(selectFilteredTodos);
  const { loading, error } = useSelector((state: TRootState) => state.todos);
  const dispatch = useDispatch<TAppDispatch>();

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  return (
    <ul className={classes.list}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {loading && (
        <li id={classes.loading}>
          <p>Loading...</p>
        </li>
      )}
      {error && (
        <li id={classes.error}>
          <p>{error}</p>
        </li>
      )}
      {todos.length === 0 && (
        <li>
          <p id="message">There are not todo yet...</p>
        </li>
      )}
    </ul>
  );
}
