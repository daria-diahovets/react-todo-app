import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  type ITodo,
  getTodos,
  addTodo as apiAddTodo,
  deleteTodo as apiDeleteTodo,
  updateTodo as apiUpdateTodo,
} from "../../api/api";

interface ITodoState {
  todos: ITodo[];
  filter: "all" | "completed" | "active";
  selectedDate: string | null; // ISO
  loading: boolean;
  error: string | null;
}

const initialState: ITodoState = {
  todos: [],
  filter: "all",
  selectedDate: null,
  loading: false,
  error: null,
};

// ASYNC THUNK FUNCTIONS
export const fetchAllTodos = createAsyncThunk("todos/fetchAll", async () => {
  const response = await getTodos();
  return response || [];
});

export const addTodo = createAsyncThunk(
  "todos/add",
  async ({ title, description }: { title: string; description: string }) => {
    await apiAddTodo(title, description);
    const response = await getTodos();
    return response || [];
  },
);

export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (id: string) => {
    await apiDeleteTodo(id);
    const response = await getTodos();
    return response || [];
  },
);

export const updateTodo = createAsyncThunk(
  "todos/update",
  async (todo: ITodo) => {
    await apiUpdateTodo(todo.id, todo);
    const response = await getTodos();
    return response || [];
  },
);

// SLICE
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<"all" | "completed" | "active">) {
      state.filter = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string | null>) {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchAllTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllTodos.fulfilled,
        (state, action: PayloadAction<ITodo[]>) => {
          state.loading = false;
          state.todos = action.payload;
        },
      )
      .addCase(fetchAllTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos.";
      })
      // HANDLERS
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
        state.todos = action.payload;
      })
      .addCase(
        deleteTodo.fulfilled,
        (state, action: PayloadAction<ITodo[]>) => {
          state.todos = action.payload;
        },
      )
      .addCase(
        updateTodo.fulfilled,
        (state, action: PayloadAction<ITodo[]>) => {
          state.todos = action.payload;
        },
      );
  },
});

export const { setFilter, setSelectedDate } = todoSlice.actions;

export default todoSlice.reducer;
