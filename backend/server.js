const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const uniqid = require("uniqid");

const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;
const FILE_PATH = "./todos.json";

app.use(cors());
app.use(bodyParser.json());

const formatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
});

const readTodos = () => {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
};

const writeTodos = (todo) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(todo, null, 2));
};
// GET
app.get("/todos", (req, res) => {
  res.json(readTodos());
});
// POST
app.post("/todos", (req, res) => {
  const todos = readTodos();
  console.log(req.body);
  const newTodo = {
    id: uniqid(),
    date: formatter.format(new Date()),
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };
  todos.push(newTodo);
  console.log(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});
// PUT - UPDATE
app.put("/todos/:id", (req, res) => {
  let todos = readTodos();
  todos = todos.map((todo) =>
    todo.id == req.params.id ? { ...todo, ...req.body } : todo,
  );
  writeTodos(todos);
  res.json({ message: "Todo updated" });
});
// DELETE
app.delete("/todos/:id", (req, res) => {
  let todos = readTodos();
  todos = todos.filter((todo) => todo.id != req.params.id);
  writeTodos(todos);
  res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
