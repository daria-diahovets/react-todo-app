import { useRef } from "react";
import { useDispatch } from "react-redux";
import { type TAppDispatch } from "../redux/store";
import { addTodo } from "../redux/todoState/todoSlice";

import classes from "./Form.module.css";

export default function Form() {
  const dispatch = useDispatch<TAppDispatch>();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descrRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!titleRef.current || !descrRef.current) return;
    const title = titleRef.current.value;
    const description = descrRef.current.value;

    if (title.trim() === "" || description.trim() === "") {
      alert("Please fill both fields!");
      return;
    }

    dispatch(addTodo({ title, description }));

    titleRef.current.value = "";
    descrRef.current.value = "";
  }
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <input
        type="text"
        name="title"
        placeholder="TITLE"
        ref={titleRef}
        maxLength={25}
      />
      <input
        type="text"
        name="description"
        placeholder="DESCRIPTION"
        ref={descrRef}
        maxLength={50}
      />
      <button>Create</button>
    </form>
  );
}
