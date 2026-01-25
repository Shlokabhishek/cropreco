import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout() {
      return initialState;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
