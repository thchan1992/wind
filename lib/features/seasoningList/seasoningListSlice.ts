"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SeasoningListSliceState {
  value: string[];
}

interface ModifySeasoningPayload {
  index: number;
  seasoning: string;
}

const initialState: SeasoningListSliceState = {
  value: [],
};

export const seasoningListSlice = createSlice({
  name: "seasoningList",
  initialState,
  reducers: {
    setSeasonings: (state, action: PayloadAction<string>) => {
      state.value = [action.payload, ...state.value].sort();
    },
    deleteSeasoningFromList: (state, action: PayloadAction<number>) => {
      const newArr: string[] = state.value.filter((obj, index) => {
        return index !== action.payload;
      });
      state.value = newArr;
    },
  },
});

export const { setSeasonings, deleteSeasoningFromList } =
  seasoningListSlice.actions;

export default seasoningListSlice.reducer;
