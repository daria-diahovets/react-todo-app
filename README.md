# ✨ Advanced ToDo App

Welcome to the **Advanced ToDo App**! This is a modern, smooth, and highly interactive todo list built with React + TypeScript + Redux Toolkit.

---

![Screenshot]("link")

---

## 🔍 Features

- **Create** todos with title and description.
- **Delete** individual todos.
- **Update/Edit** todos directly inline.
- **Toggle Completed** status (done/not done).
- **Filter Todos**
  - Show **All** todos
  - Show only **Completed** todos
  - Show only **Active** (incomplete) todos
- **Filter by Date**
  - View all todos created on that day
- **Persistent Theme Switching**
  - Change between several colorful themes
  - Selected theme is **saved to localStorage** and auto-loaded on refresh
- **Beautiful Music and Sounds**
  - Can toggle great music and cute meow sounds

---

## 📉 Technologies

- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **localStorage** for theme persistence
- **Simple file-based fake API** for backend simulation (CRUD operations)

---

## 📊 State Management Details

### TodoState

```typescript
interface TodoState {
  todos: ITodo[];
  filter: "all" | "completed" | "active";
  selectedDate: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
```

- All todos are fetched asynchronously.
- Filtering is done using **createSelector** for memoization.

### ThemeState

```typescript
interface ThemeState {
  theme: Themes;
}
```

- Themes are stored and loaded from `localStorage`.

---

## 🌐 API Example (backend structure)

```json
{
  "id": "2lt0piu11dqm8r3xgf5",
  "date": "27/03/2025, 10:34",
  "title": "Exercise",
  "description": "Go for a 30-minute jog in the evening",
  "completed": false
}
```

- Date format: `dd/MM/yyyy, hh:mm`
- Filtering by date matches only the `dd/MM/yyyy` part.

---

## 💻 How to Run Locally

```bash
git clone https://github.com/daria-diahovets/react-todo-app.git
cd react-todo-app
# frontend part (in first terminal)
cd frontend
npm install
npm run dev
# backend part (in second terminal)
cd backend
npm install
node server.js
```

---

## 🎉 Join my Telegram Channel!

[Join Telegram](https://t.me/drzoidberg_portfolio)
Enjoy and happy coding! 🚀