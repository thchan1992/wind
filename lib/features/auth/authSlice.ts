"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  token: string;
  email: string;
}

export interface AuthState {
  token: string | null;
  email: string;
}

const initialState: AuthState = {
  token: null,
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<UserData>) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.token = null;
      state.email = "";
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
