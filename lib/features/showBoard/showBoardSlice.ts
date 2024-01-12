"use client";

import { createSlice } from "@reduxjs/toolkit";

export enum BoardStatus {
  Closed = "CLOSED",
  IngredientBoard = "INGREDIENTBOARD",
  SeasoningBoard = "SEASONINGBOARD",
  ModifyIngredientBoard = "MODIFYINGREDIENTBOARD",
  SavedRecipesList = "SAVEDRECIPESLIST",
}

export interface ShowBoardState {
  value: BoardStatus;
}

const initialState: ShowBoardState = {
  value: BoardStatus.Closed,
};

export const showBoardSlice = createSlice({
  name: "showBoard",
  initialState,
  reducers: {
    setShowBoard: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setShowBoard } = showBoardSlice.actions;
export default showBoardSlice.reducer;
