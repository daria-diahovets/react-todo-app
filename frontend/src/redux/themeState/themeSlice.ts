import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Themes =
  | "peach-theme"
  | "purple-theme"
  | "green-theme"
  | "blue-theme"
  | "pink-theme";

interface IThemeState {
  theme: Themes;
}

const savedTheme = (localStorage.getItem("theme") as Themes) || "peach-theme";

const initialState: IThemeState = {
  theme: savedTheme,
};

const themeSlice = createSlice({
  name: "themes",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<Themes>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
