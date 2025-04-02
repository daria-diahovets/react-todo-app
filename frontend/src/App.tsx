import { useState, useRef, useEffect } from "react";

import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { getTodos, addTodo, ITodo, deleteTodo } from "./api/api";

// export type TList = {
//   title: string;
//   descr: string;
// };

// const DUMMY_TODOLIST: TList[] = [
//   { title: "Water Flowers", descr: "Water the garden and indoor plants" },
//   { title: "Buy Groceries", descr: "Milk, eggs, bread, and vegetables" },
//   { title: "Finish Project", descr: "Complete the final report by Friday" },
//   { title: "Call Mom", descr: "Check in and see how she's doing" },
//   { title: "Exercise", descr: "Go for a 30-minute jog in the evening" },
// ];

function App() {
  const [data, setData] = useState<ITodo[]>([]);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descrRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getTodos().then((data) => setData(data as ITodo[]));
  }, [data]);

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
  }

  function handleDeleteElement(id: string) {
    deleteTodo(id);
  }

  function handleUpdateElement(updateTodo: ITodo) {
    setData((prev) =>
      prev.map((todo) => (todo.id === updateTodo.id ? updateTodo : todo)),
    );
  }

  return (
    <>
      <h1>✨ ToDo List App ✨</h1>
      <Form
        handleSubmit={hadnleSubmit}
        titleRef={titleRef}
        descrRef={descrRef}
      />
      <TodoList todoList={data} onClose={handleDeleteElement} onUpdate={handleUpdateElement}/>
    </>
  );
}

export default App;
