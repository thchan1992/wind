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
    <div className="flex w-full h-full">
      <div className="grid flex-grow card bg-base-300 rounded-box justify-center overflow-y-scroll h-full">
        <ul className="menu bg-base-200 w-40 rounded-box m-4">
          <li className="menu-title">Option</li>
          {seasoningOpt.map((obj, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  dispatch(setSeasonings(obj));
                }}
              >
                <a>{obj}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="divider divider-horizontal">➡️</div>
      <div className="grid flex-grow card bg-base-300 rounded-box justify-center overflow-y-scroll h-full">
        <ul className="menu bg-base-200 w-40 rounded-box m-4">
          <li className="menu-title">Your Seasonings</li>
          {seasoningList.map((obj, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  handleRemoveSeasoning(obj, i);
                }}
              >
                <a>{obj}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
