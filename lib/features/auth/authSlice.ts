"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  // token: string | undefined;
  isLogin: boolean;
  email: string;
}

export interface AuthState {
  // token: string | null | undefined;
  isLogin: boolean;
  email: string;
}

const initialState: AuthState = {
  // token: null,
  isLogin: false,
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<UserData>) => {
      // state.token = action.payload.token;
      state.isLogin = true;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isLogin = false;
      state.email = "";
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
