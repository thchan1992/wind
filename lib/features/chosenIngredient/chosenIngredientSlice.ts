"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChosenIngredientState {
  value: string;
}

const initialState: ChosenIngredientState = {
  value: "",
};

export const chosenIngredientSlice = createSlice({
  name: "chosenIngredient",
  initialState,
  reducers: {
    setChosenIngredient: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChosenIngredient } = chosenIngredientSlice.actions;
export default chosenIngredientSlice.reducer;
