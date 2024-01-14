"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ingredient {
  ingredient: string;
  unit: string;
  quantity: number;
}

interface ModifyIngredientPayload {
  index: number | null;
  ingredient: Ingredient;
}

export interface IngredientListSliceState {
  value: Ingredient[];
}
const initialState: IngredientListSliceState = {
  value: [],
};

export const ingredientListSlice = createSlice({
  name: "ingredientList",
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<Ingredient>) => {
      state.value = [action.payload, ...state.value];
    },
    deleteIngredientFromList: (state, action: PayloadAction<number>) => {
      const newArr: Ingredient[] = state.value.filter((obj, index) => {
        return index !== action.payload;
      });
      state.value = newArr;
    },
    modifyIngredientFromList: (
      state,
      action: PayloadAction<ModifyIngredientPayload>
    ) => {
      const { index, ingredient } = action.payload;
      if (index !== null) {
        state.value.splice(index, 1, ingredient);
      }
    },
  },
});

export const {
  setIngredients,
  deleteIngredientFromList,
  modifyIngredientFromList,
} = ingredientListSlice.actions;
export default ingredientListSlice.reducer;
