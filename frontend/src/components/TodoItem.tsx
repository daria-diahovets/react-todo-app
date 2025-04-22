import { useState } from "react";
import { ITodo } from "../api/api";
import { useDispatch } from "react-redux";
import { type TAppDispatch } from "../redux/store";
import { deleteTodo, updateTodo } from "../redux/todoState/todoSlice";

import classes from "./TodoItem.module.css";

export default function TodoItem({ todo }: { todo: ITodo }) {
  const dispatch = useDispatch<TAppDispatch>();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTodo, setEditedTodo] = useState<Partial<ITodo>>({});

  function handleDeleteElement(id: string) {
    dispatch(deleteTodo(id));
  }

  const handleEdit = (todo: ITodo) => {
    if (editingId === todo.id) {
      dispatch(updateTodo({ ...todo, ...editedTodo } as ITodo));
      setEditingId(null);
    } else {
      setEditingId(todo.id);
      setEditedTodo({ title: todo.title, description: todo.description });
    }
  };

  const handleToggleCompleted = async (todo: ITodo, checked: boolean) => {
    dispatch(updateTodo({ ...todo, completed: checked }));
  };

  return (
    <li
      key={todo.id}
      className={`${todo.completed ? classes.complete : ""}`}
    >
      <label htmlFor={todo.id}>
        <input
          id={todo.id}
          checked={todo.completed}
          onChange={(e) => handleToggleCompleted(todo, e.target.checked)}
          type="checkbox"
          hidden
          name="complete"
        />
        <span>✓</span>
      </label>
      <div>
        <p>{todo.date}</p>
        {editingId === todo.id ? (
          <>
            <input
              type="text"
              id={classes.title}
              value={editedTodo.title || ""}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, title: e.target.value })
              }
              maxLength={25}
            />
            <input
              id={classes.descr}
              type="text"
              value={editedTodo.description || ""}
              onChange={(e) =>
                setEditedTodo({
                  ...editedTodo,
                  description: e.target.value,
                })
              }
              maxLength={50}
            />
          </>
        ) : (
          <>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </>
        )}
      </div>
      <span id={classes.edit} onClick={() => handleEdit(todo)}>
        {editingId === todo.id ? "✓" : "✎"}
      </span>
      <span id={classes.close} onClick={() => handleDeleteElement(todo.id)}>
        &#x2715;
      </span>
    </li>
  );
}
