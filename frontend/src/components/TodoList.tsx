import { useState } from "react";
import { ITodo, updateTodo } from "../api/api";

interface ITodoList {
  todoList: ITodo[];
  onClose: (id: string) => void;
  onUpdate: (updateTodo: ITodo) => void;
}

export default function TodoList({ todoList, onClose, onUpdate }: ITodoList) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTodo, setEditedTodo] = useState<Partial<ITodo>>({});

  const handleEdit = (todo: ITodo) => {
    if (editingId === todo.id) {
      updateTodo(editingId, editedTodo).then(() => {
        onUpdate({ ...todo, ...editedTodo }); // update all list
        setEditingId(null); // exit edit mode
      });
    } else {
      setEditingId(todo.id);
      setEditedTodo({ title: todo.title, description: todo.description });
    }
  };

  return (
    <ul>
      {todoList.length === 0 && (
        <li>
          <p id="message">There are not todo yet...</p>
        </li>
      )}
      {todoList.map((todo, index) => (
        <li key={index}>
          <p>{todo.date}</p>
          {editingId === todo.id ? (
            <>
              <input
                type="text"
                id="title"
                value={editedTodo.title || ""}
                onChange={(e) =>
                  setEditedTodo({ ...editedTodo, title: e.target.value })
                }
                maxLength={25}
              />
              <input
                id="descr"
                type="text"
                value={editedTodo.description || ""}
                onChange={(e) =>
                  setEditedTodo({ ...editedTodo, description: e.target.value })
                }
                maxLength={150}
              />
            </>
          ) : (
            <>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </>
          )}

          <span id="edit" onClick={() => handleEdit(todo)}>
            {editingId === todo.id ? "✓" : "✎"}
          </span>
          <span id="close" onClick={() => onClose(todo.id)}>
            &#x2715;
          </span>
        </li>
      ))}
    </ul>
  );
}

/* &#x2713; */
