import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoState/todoSlice";
import themeReducer from "./themeState/themeSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    themes: themeReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
