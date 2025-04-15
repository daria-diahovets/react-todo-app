import { useState, useRef, useEffect } from "react";

import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { getTodos, addTodo, ITodo, deleteTodo } from "./api/api";
import MenuControls from "./components/MenuControls";

function App() {
  const [data, setData] = useState<ITodo[]>([]);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descrRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchAllTodo();
  }, []);

  async function fetchAllTodo() {
    await getTodos().then((data) => setData(data as ITodo[]));
  }

  function hadnleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!titleRef.current || !descrRef.current) return;
    const title = titleRef.current.value;
    const description = descrRef.current.value;

    if (title.trim() === "" || description.trim() === "") {
      alert("Please fill both fields!");
      return;
    }

    addTodo(title, description);

    titleRef.current.value = "";
    descrRef.current.value = "";
    fetchAllTodo();
  }
  console.log("App render");

  async function handleDeleteElement(id: string) {
    await deleteTodo(id);
    fetchAllTodo();
  }

  function handleUpdateElement(updateTodo: ITodo) {
    setData((prev) =>
      prev.map((todo) => (todo.id === updateTodo.id ? updateTodo : todo)),
    );
    fetchAllTodo();
  }

  return (
    <div className="container">
      <MenuControls />
      <h1>✨ ToDo List App ✨</h1>
      <Form
        handleSubmit={hadnleSubmit}
        titleRef={titleRef}
        descrRef={descrRef}
      />
      <TodoList
        todoList={data}
        onClose={handleDeleteElement}
        onUpdate={handleUpdateElement}
      />
      <div id="copyright">@dczoidberg</div>
    </div>
  );
}

export default App;
