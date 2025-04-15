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

  const handleToggleCompleted = async (todo: ITodo, checked: boolean) => {
    const updatedTodo = { ...todo, completed: checked };
    await updateTodo(todo.id, { completed: checked });
    onUpdate(updatedTodo);
  };

  return (
    <ul>
      {todoList.length === 0 && (
        <li>
          <p id="message">There are not todo yet...</p>
        </li>
      )}
      {todoList.map((todo) => (
        <li key={todo.id} className={`${todo.completed ? "complete" : ""}`}>
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
