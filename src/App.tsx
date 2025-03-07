import { useState, useRef } from "react";

import Form from "./components/Form";
import TodoList from "./components/TodoList";

export type TList = {
  title: string;
  descr: string;
};

const DUMMY_TODOLIST: TList[] = [
  { title: "Water Flowers", descr: "Water the garden and indoor plants" },
  { title: "Buy Groceries", descr: "Milk, eggs, bread, and vegetables" },
  { title: "Finish Project", descr: "Complete the final report by Friday" },
  { title: "Call Mom", descr: "Check in and see how she's doing" },
  { title: "Exercise", descr: "Go for a 30-minute jog in the evening" },
];

function App() {
  const [data, setData] = useState<TList[]>(DUMMY_TODOLIST);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descrRef = useRef<HTMLInputElement | null>(null);

  function hadnleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!titleRef.current || !descrRef.current) return;
    const title = titleRef.current.value;
    const descr = descrRef.current.value;

    if (title.trim() === "" || descr.trim() === "") {
      alert("Please fill both fields!");
      return;
    }

    const newTodo = {
      title,
      descr,
    };

    setData((prev) => [newTodo, ...prev]);

    titleRef.current.value = "";
    descrRef.current.value = "";
  }

  function handleDeleteElement(id: number) {
    setData((prevData) => prevData.filter((_, index) => index !== id));
  }

  return (
    <>
      <h1>✨ ToDo List App ✨</h1>
      <Form
        handleSubmit={hadnleSubmit}
        titleRef={titleRef}
        descrRef={descrRef}
      />
      <TodoList todoList={data} onClose={handleDeleteElement} />
    </>
  );
}

export default App;
