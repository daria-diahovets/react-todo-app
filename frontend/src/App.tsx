import { useSelector } from "react-redux";
import { TRootState } from "./redux/store";

import Form from "./components/Form";
import TodoList from "./components/TodoList";
import MenuControls from "./components/MenuControls";
import FilterBtns from "./components/FilterBtns";

function App() {
  const theme = useSelector((state: TRootState) => state.themes.theme);

  return (
    <div className={`wrapper ${theme}`}>
      <MenuControls />
      <h1>✨ ToDo List App ✨</h1>
      <Form />
      <FilterBtns />
      <TodoList />
      <div id="copyright"><a target="_blank" href="https://t.me/drzoidberg_portfolio">@dczoidberg</a></div>
    </div>
  );
}

export default App;
