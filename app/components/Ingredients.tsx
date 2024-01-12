"use client";
import Link from "next/link";
import React from "react";
import { primaryButtonStyle } from "@/util/styles";
import type { RootState } from "../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { deleteIngredientFromList } from "@/lib/features/ingredientList/ingredientListSlice";
import IngredientBoard from "./IngredientBoard";
import { useState } from "react";
import {
  BoardStatus,
  setShowBoard,
} from "@/lib/features/showBoard/showBoardSlice";

import useIngredientList from "../hooks/useIngredientList";
import SeasoningBoard from "./SeasoningBoard";
import { requestRecipe } from "@/services/recipeService";
import { setRecipe } from "@/lib/features/recipe/recipeSlice";

export default function Ingredients() {
  const dispatch = useDispatch();
  const ingredientList = useIngredientList();
  // const ingredientList = useSelector(
  //   (state: RootState) => state.ingredientList.value
  // );
  const seasoningList = useSelector(
    (state: RootState) => state.seasoningList.value
  );
  const showBoard = useSelector((state: RootState) => state.showBoard.value);

  const [ingredientIndex, setIngredientIndex] = useState<number | null>(null);

  return (
    <div className="border-solid border-2 border-indigo-600">
      {ingredientList.map((ingredient, i) => {
        {
          return (
            <div key={i}>
              {ingredient.ingredient} {ingredient.quantity} {ingredient.unit}
              <button
                className={primaryButtonStyle}
                onClick={() => {
                  dispatch(deleteIngredientFromList(i));
                }}
              >
                Delete
              </button>
              <button
                className={primaryButtonStyle}
                onClick={() => {
                  setIngredientIndex(i);
                  dispatch(setShowBoard(BoardStatus.ModifyIngredientBoard));
                }}
              >
                Edit
              </button>
            </div>
          );
        }
      })}
      {showBoard === BoardStatus.ModifyIngredientBoard && (
        <IngredientBoard index={ingredientIndex} />
      )}
      <button
        onClick={() => {
          console.log("pressed");
          showBoard !== BoardStatus.SeasoningBoard
            ? dispatch(setShowBoard(BoardStatus.SeasoningBoard))
            : dispatch(setShowBoard(BoardStatus.Closed));
        }}
      >
        seasoning
      </button>
      {showBoard === BoardStatus.SeasoningBoard && <SeasoningBoard />}
      <button
        onClick={async () => {
          if (ingredientList.length !== 0) {
            const data = await requestRecipe(ingredientList, seasoningList);
            dispatch(setRecipe(data));
          } else {
            console.log("no ingredient detected");
          }
        }}
      >
        <Link href="/recipe">submit</Link>
      </button>
    </div>
  );
}
