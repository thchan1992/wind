"use client";

import { configureStore } from "@reduxjs/toolkit";
import keywordSlice from "./features/keyword/keywordSlice";
import ingredientSearchResSlice from "./features/ingredientSearchRes/ingredientSearchResSlice";

export const store = configureStore({
  reducer: {
    keyword: keywordSlice,
    ingredientSearchRes: ingredientSearchResSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
