"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface IngredientSearchResState {
  value: string[];
}

const initialState: IngredientSearchResState = {
  value: [],
};

export const ingredientSearchResSlice = createSlice({
  name: "ingredientSearchRes",
  initialState,
  reducers: {
    ingredientSearchResOnChange: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { ingredientSearchResOnChange } = ingredientSearchResSlice.actions;
export default ingredientSearchResSlice.reducer;
