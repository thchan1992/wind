"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setIngredients } from "../ingredientList/ingredientListSlice";

export interface IngredientIndexState {
  value: number | null;
}

const initialState: IngredientIndexState = {
  value: null,
};

export const ingredientIndexSlice = createSlice({
  name: "ingredientIndex",
  initialState,
  reducers: {
    setIngredientIndex: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setIngredientIndex } = ingredientIndexSlice.actions;
export default ingredientIndexSlice.reducer;
