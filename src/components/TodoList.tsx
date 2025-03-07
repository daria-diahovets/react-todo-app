import { type TList } from "../App";

interface ITodoList {
  todoList: TList[];
  onClose: (id: number) => void;
}

export default function TodoList({ todoList, onClose }: ITodoList) {
  return (
    <ul>
      {todoList.length === 0 && <li><p id="message">There are not todo yet...</p></li>}
      {todoList.map((list, index) => (
        <li key={index}>
          <h3>{list.title}</h3>
          <p>{list.descr}</p>
          <span onClick={() => onClose(index)}>&#x2715;</span>
        </li>
      ))}
    </ul>
  );
}
