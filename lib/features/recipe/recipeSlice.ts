"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface RecipeState {
  value: string;
}

const initialState: RecipeState = {
  value: "",
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipe: (state, action: PayloadAction<string>) => {
      // const arr = action.payload.split("★");

      state.value = action.payload;
    },
  },
});

export const { setRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
