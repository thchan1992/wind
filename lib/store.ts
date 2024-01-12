"use client";

import { configureStore } from "@reduxjs/toolkit";
import keywordSlice from "./features/keyword/keywordSlice";
import ingredientSearchResSlice from "./features/ingredientSearchRes/ingredientSearchResSlice";
import ingredientListSlice from "./features/ingredientList/ingredientListSlice";
import chosenIngredientSlice from "./features/chosenIngredient/chosenIngredientSlice";
import showBoardSlice from "./features/showBoard/showBoardSlice";
import seasoningListSlice from "./features/seasoningList/seasoningListSlice";
export const store = configureStore({
  reducer: {
    keyword: keywordSlice,
    ingredientSearchRes: ingredientSearchResSlice,
    ingredientList: ingredientListSlice,
    chosenIngredient: chosenIngredientSlice,
    showBoard: showBoardSlice,
    seasoningList: seasoningListSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
