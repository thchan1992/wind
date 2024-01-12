"use client";
import React from "react";
import { useState, useEffect } from "react";
import { seasoningListOpt } from "@/util/constants";
import type { RootState } from "../../lib/store";
import {
  deleteSeasoningFromList,
  setSeasonings,
} from "@/lib/features/seasoningList/seasoningListSlice";
import { useDispatch, useSelector } from "react-redux";
import useSeasoningList from "../hooks/useSeasoningList";
import { deleteIngredientFromList } from "@/lib/features/ingredientList/ingredientListSlice";
export default function SeasoningBoard() {
  const dispatch = useDispatch();
  const [seasoningOpt, setSeasoningOpt] = useState<string[]>([]);
  const seasoningList = useSelector(
    (state: RootState) => state.seasoningList.value
  );
  const savedSeasoningList = useSeasoningList();

  useEffect(() => {
    if (savedSeasoningList.length !== 0) {
      const arr = seasoningListOpt.filter(
        (obj) => !savedSeasoningList.includes(obj)
      );
      setSeasoningOpt(arr);
    } else {
      setSeasoningOpt(seasoningListOpt);
    }
  }, [seasoningList]);

  const handleRemoveSeasoning = (seasoning: string, index: number): void => {
    dispatch(deleteSeasoningFromList(index));
    const arr = [...seasoningOpt, seasoning].sort();
    setSeasoningOpt(arr);
  };

  return (
    <div className="border-solid">
      {seasoningOpt.map((obj, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              dispatch(setSeasonings(obj));
            }}
          >
            {obj}
          </div>
        );
      })}
      --------
      {seasoningList.length !== 0 &&
        seasoningList.map((obj, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                handleRemoveSeasoning(obj, i);
              }}
            >
              {obj}
            </div>
          );
        })}
    </div>
  );
}
