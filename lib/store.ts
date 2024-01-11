"use client";

import { configureStore } from "@reduxjs/toolkit";
import keywordSlice from "./features/keyword/keywordSlice";
import ingredientSearchResSlice from "./features/ingredientSearchRes/ingredientSearchResSlice";
import ingredientListSlice from "./features/ingredientList/ingredientListSlice";
import chosenIngredientSlice from "./features/chosenIngredient/chosenIngredientSlice";
import showBoardSlice from "./features/showBoard/showBoardSlice";
export const store = configureStore({
  reducer: {
    keyword: keywordSlice,
    ingredientSearchRes: ingredientSearchResSlice,
    ingredientList: ingredientListSlice,
    chosenIngredient: chosenIngredientSlice,
    showBoard: showBoardSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
