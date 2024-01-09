"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface KeywordState {
  value: string;
}

const initialState: KeywordState = {
  value: "",
};

export const keywordSlice = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    keywordOnChange: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { keywordOnChange } = keywordSlice.actions;
export default keywordSlice.reducer;
