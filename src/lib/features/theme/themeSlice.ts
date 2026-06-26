import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. Define the slice state shape
interface ThemeState {
  dark: boolean;
}

// 2. Define the root state shape that selectDark expects
interface RootState {
  theme: ThemeState;
}

const initialState: ThemeState = {
  dark: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.dark = !state.dark;
    },
    // 3. Type the action payload explicitly
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.dark = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

// 4. Fix: state is RootState, not boolean
export const selectDark = (state: RootState) => state.theme.dark;

export default themeSlice.reducer;